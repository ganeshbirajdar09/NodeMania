import { FilterQuery, Schema, Types, UpdateQuery } from "mongoose";
import { ITournament } from "./tournament.types";
import tournamentRepo from "./tournament.repo";
import { IGenericPipleline } from "../../utility/database.utilities";
import { TOURNAMENT_RESPONSES } from "./tournament.responses";
import { getAllTournaments } from "./tournament.pipelines";
import { COMMENT_TYPES, ROLES, STATUSES } from "../../utility/constants";
import levelService from "../level/level.service";
import { LEVEL_RESPONSES } from "../level/level.responses";
import categoryService from "../category/category.service";
import { CATEGORY_RESPONSES } from "../category/category.responses";
import { Payload } from "../auth/auth.types";
import notificationService from "../notification/notification.service";
import commentService from "../comment/comment.service";
import wordService from "../word/word.service";
import { WORD_RESPONSES } from "../word/word.responses";
import { NOTIFICATION_TYPES } from "../notification/notification.types";

const create = async (user: Payload, tournamentData: ITournament) => {
    const oldTournament = await findOne({ name: tournamentData.name.toLowerCase() })
    if (oldTournament) throw TOURNAMENT_RESPONSES.ALREADY_EXISTS;

    const { categories, level, words } = tournamentData

    const levelExists = await levelService.findById(level);
    if (!levelExists) throw LEVEL_RESPONSES.NOT_FOUND;

    for (let category of categories) {
        const categoryExists = await categoryService.findOne({ _id: category });
        if (!categoryExists) throw CATEGORY_RESPONSES.NOT_FOUND
    }
    for (let word of words) {
        const wordExists = await wordService.findOne({ _id: word, level: tournamentData.level });
        if (!wordExists) throw WORD_RESPONSES.NOT_FOUND
    }
    tournamentData.organizer = user.id;
    if (user.role == ROLES.ADMIN) {
        tournamentData.status = STATUSES.APPROVED;
        tournamentData.toBeFeatured = true
    }

    //TODO: handle endDate
    // //TODO: WORDS
    // const tournamentObj: ITournament = {
    //     endDate: endDate ? new Date(endDate) : new Date(new Date(startDate).getTime() + (7 * 24 * 60 * 60 * 1000)),
    // }

    return await tournamentRepo.create(tournamentData);
}

//GENERIC GET-ALL
const getAll = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<ITournament> = {}) => {
    const pipeline = getAllTournaments({ isDeleted: false, ...filterParam, }, queryData);
    const result = await tournamentRepo.find(pipeline)
    if (result.length < 1) throw TOURNAMENT_RESPONSES.NO_DATA_TO_DISPLAY
    return result
}

const getAllApproved = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<ITournament> = {}) => await getAll(queryData, { status: new Types.ObjectId(STATUSES.APPROVED), ...filterParam })

const getAllFeatured = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<ITournament> = {}) => await getAll(queryData, { status: new Types.ObjectId(STATUSES.APPROVED), toBeFeatured: true, ...filterParam })

const getAllPending = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<ITournament> = {}) => await getAll(queryData, { status: new Types.ObjectId(STATUSES.PENDING), ...filterParam })

const getTournamentComments = async (queryData: IGenericPipleline, tournamentId: string) => await commentService.getAll(queryData, tournamentId)

const getAllUpcoming = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<ITournament> = {}) => {
    const currentDate = new Date();
    return await getAll(queryData, { status: new Types.ObjectId(STATUSES.APPROVED), startDate: { $gt: currentDate }, ...filterParam })
}

const findById = async (tournamentId: string) => await findOne({ _id: tournamentId });

const update = async (filterparam: FilterQuery<ITournament>, tournamentData: UpdateQuery<ITournament>) => {
    const tournament = await findOne(filterparam);
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND;
    await tournamentRepo.update(filterparam, tournamentData);
    return TOURNAMENT_RESPONSES.UPDATE_SUCCESS;
};


const findOne = async (filterparam: FilterQuery<ITournament>) => await tournamentRepo.findOne(filterparam);

const setTournamentStatus = async (tournamentId: string, status: string) => {
    const tournament = await findOne({ _id: tournamentId, status: STATUSES.PENDING });
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND;
    const newStatus = status == STATUSES.APPROVED ? 'approved' : 'rejected'
    const newWords = [];
    if (newStatus == "approved") {
        for (let word of tournament.extraWords) {
            const wordExists = await wordService.findOne({ name: word.name?.toLowerCase() });
            if (!wordExists) {
                const categories = await categoryService.findAll({ _id: { $in: word.categories } })
                if (word.categories.length !== categories.length) throw CATEGORY_RESPONSES.NOT_FOUND;
                word.level = tournament.level.toString();
                const createdWord = await wordService.create(word);
                newWords.push(createdWord._id);
            }
            else {
                wordExists.categories = wordExists.categories.map(e => e.toString());
                const extraCategories = word.categories.filter((category: string) => !wordExists.categories.includes(category))
                await wordService.update({ _id: wordExists._id }, { $push: { categories: extraCategories } })
            }
            await update({ _id: tournamentId }, { $push: { words: newWords } })
        }
    }
    const message = newStatus == STATUSES.APPROVED ?  NOTIFICATION_TYPES.TOURNAMENT_APPROVE(tournament.name) : NOTIFICATION_TYPES.TOURNAMENT_REJECT(tournament.name)
    await notificationService.create({ userId: tournament.organizer, message: message })
    return await update({ _id: tournament._id }, { $set: { status: status } })
}

const remove = async (tournamentId: string, user: Payload) => {
    const tournament = await findOne({ _id: tournamentId, isDeleted: false, status: STATUSES.PENDING, organizer: user.id })
    if (!tournament && user.role != ROLES.ADMIN) throw TOURNAMENT_RESPONSES.NOT_FOUND
    await update({ _id: tournamentId }, { $set: { isDeleted: true } })
    return TOURNAMENT_RESPONSES.DELETE_SUCCESS
}

const featureATournament = async (tournamentId: string) => {
    const tournament = await findOne({ _id: tournamentId });
    if(!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND
    await update({ _id: tournamentId }, { $set: { toBeFeatured: true } })

    await notificationService.create({ userId: tournament?.organizer as string, message: NOTIFICATION_TYPES.WAS_FEATURED(tournament?.name) })
    return TOURNAMENT_RESPONSES.ADDED_TO_FEATURED
}


const getTournamentRequestComments = async (queryData: IGenericPipleline, tournamentId: string) => {
    const tournament = await findOne({ _id: tournamentId });
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND;
    queryData.type = COMMENT_TYPES.REQUEST;
    return await commentService.getAll(queryData, tournamentId)
}

const editDetails = async (tournamentId: string, data: UpdateQuery<ITournament>,user: Payload) => {
    const tournament = await findOne({ _id: tournamentId, status: { $ne: STATUSES.REJECTED } })
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND;

    if (tournament.status.toString() == STATUSES.PENDING) {
        //TODO: HANDLE 

        const { categories, level, words } = data;

        const levelExists = await levelService.findById(level);
        if (!levelExists) throw LEVEL_RESPONSES.NOT_FOUND;

        for (let category of categories) {
            const categoryExists = await categoryService.findOne({ _id: category });
            if (!categoryExists) throw CATEGORY_RESPONSES.NOT_FOUND
        }
        for (let word of words) {
            const wordExists = await wordService.findOne({ _id: word, level: level });
            if (!wordExists) throw WORD_RESPONSES.NOT_FOUND
        }
        await update({ _id: tournamentId, isDeleted: false }, { $set: data })
    }
    //TODO: HANDLE DATE EXTEND

}

export default {
    getAll,
    create,
    findOne,
    update,
    remove,
    findById,
    editDetails,
    getAllUpcoming,
    getAllApproved,
    getAllFeatured,
    getAllPending,
    setTournamentStatus,
    featureATournament,
    getTournamentComments,
    getTournamentRequestComments
};
