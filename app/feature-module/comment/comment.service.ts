import { FilterQuery, Schema, Types, UpdateQuery } from "mongoose";
import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";
import { Payload } from "../auth/auth.types";
import { USER_RESPONSES } from "../user/user.responses";
import commentRepo from "./comment.repo";
import { IComment } from "./comment.types";
import { COMMENT_RESPONSES } from "./comment.responses";
import notificationService from "../notification/notification.service";
import tournamentService from "../tournament/tournament.service";
import { COMMENT_TYPES, ROLES, STATUSES } from "../../utility/constants";
import { TOURNAMENT_RESPONSES } from "../tournament/tournament.responses";
import userService from "../user/user.service";
import { NOTIFICATION_TYPES } from "../notification/notification.types";

const create = async (tournamentId: string, user: Payload, message: string) => {
    const tournament = await tournamentService.findOne({ _id: tournamentId });
    if (!tournament || tournament.status.toString() == STATUSES.REJECTED) throw TOURNAMENT_RESPONSES.NOT_FOUND;

    const commentType = tournament.status.toString() == STATUSES.APPROVED ? COMMENT_TYPES.TOURNAMENT : COMMENT_TYPES.REQUEST

    const userExists = await userService.findOne({ _id: user.id });
    if (!userExists) throw USER_RESPONSES.NOT_FOUND
    if (commentType == COMMENT_TYPES.REQUEST) {
        let message;
        let recipient;
        if (user.role == ROLES.ADMIN) {
            message = NOTIFICATION_TYPES.ADMIN_REVIEW(tournament.name)
            recipient = tournament.organizer;
        }
        else {
            message = NOTIFICATION_TYPES.USER_REVIEW(tournament.name)
            recipient = user.id;
        }
        notificationService.create({ message: message, userId: recipient })
    }
    return await commentRepo.create({ type: commentType, userId: userExists._id, tournamentId: tournamentId, message: message });
}

const getAll = async (queryData: IGenericPipleline = {}, tournamentId: string, filterParam: FilterQuery<IComment> = {}) => {
    const pipeline = genericPipeline({ isDeleted: "false", isFlagged: "false", tournamentId: new Types.ObjectId(tournamentId), sortFilter: "createdAt", sortOrder: "desc", ...queryData })
    const result = await commentRepo.find(pipeline)
    if (result.length < 1) throw USER_RESPONSES.NO_DATA_TO_DISPLAY
    return result
}

const findOne = async (filterParam: FilterQuery<IComment>) => await commentRepo.findOne(filterParam)

const update = async (filterparam: FilterQuery<IComment>, data: UpdateQuery<IComment>) => {
    const comment = await findOne(filterparam);
    if (!comment) throw COMMENT_RESPONSES.NOT_FOUND;
    await commentRepo.update(filterparam, data);
    return COMMENT_RESPONSES.UPDATE_SUCCESS;
};

const readAll = async (queryData: IGenericPipleline, tournamentId: string, user: Payload) => {
    const tournament = await tournamentService.findOne({ _id: tournamentId, status: STATUSES.APPROVED });
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND

    queryData.type = 'tournament'
    return await getAll(queryData, tournamentId, { type: "tournament" })
}
const readReviews = async (queryData: IGenericPipleline, tournamentId: string, user: Payload) => {
    const tournament = await tournamentService.findOne({ _id: tournamentId });
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND

    if (tournament.organizer.toString() != user.id && user.role != ROLES.ADMIN) throw TOURNAMENT_RESPONSES.FORBIDDEN
    queryData.type = 'request'
    return await getAll(queryData, tournamentId)

}

const flagComment = async (commentId: string, user: Payload) => {
    const userExists = await userService.findOne({ _id: user.id });
    if (!userExists) throw USER_RESPONSES.NOT_FOUND;
    const comment = await findOne({ _id: commentId, isDeleted: false });

    if (userExists.role?.toString() != ROLES.ADMIN && !userExists.isModerator && comment?.userId == userExists._id) throw TOURNAMENT_RESPONSES.FORBIDDEN

    const tournament = await tournamentService.findOne({ _id: comment?.tournamentId })
    const flag = !comment?.isFlagged

    await notificationService.create({ userId: comment?.userId as string, message: flag ? `your comment in ${tournament?.name} tournament was flagged and was deleted` : '`flag status of your comment in ${tournament?.name} tournament was revoked`' })
    await update({ _id: commentId }, { $set: { isFlagged: flag } })

    return COMMENT_RESPONSES.FLAGGED_SUCCESS
}

const editComment = async (comment: IComment, user: Payload,) => {
    const { message, _id } = comment
    const userExists = await userService.findOne({ _id: user.id });
    if (!userExists) throw USER_RESPONSES.NOT_FOUND;

    const commentExists = await findOne({ _id: _id, userId: user.id, isFlagged: false, isDeleted: false })
    if (!commentExists) throw COMMENT_RESPONSES.NOT_FOUND;
    return await update({ _id: _id }, { $set: { message: message } })
}

const remove = async (commentId: string, user: Payload) => {
    const comment = await findOne({ _id: commentId, isFlagged: false, isDeleted: false });
    if (!comment) throw COMMENT_RESPONSES.NOT_FOUND;
    if (user.role == ROLES.ADMIN || comment.userId.toString() == user.id) {
        return await update({ _id: commentId }, { $set: { isDeleted: true } })
    }
    return COMMENT_RESPONSES.FORBIDDEN

}
export default {
    create, getAll, findOne, update, flagComment, readAll, editComment, readReviews, remove
}