import { FilterQuery, UpdateQuery } from "mongoose";
import { IParticipant } from "./participant.types";
import participantRepo from "./participant.repo";
import { PARTICIPANT_RESPONSES } from "./participant.responses";
import { IGenericPipleline } from "../../utility/database.utilities";
import { getAllUsers } from "../user/user.pipelines";
import { TOURNAMENT_RESPONSES } from "../tournament/tournament.responses";
import { STATUSES } from "../../utility/constants";
import tournamentService from "../tournament/tournament.service";
import { Payload } from "../auth/auth.types";

const create = async (participant: IParticipant) => {
    const oldParticipant = await findOne({ userId: participant.userId })
    if (oldParticipant) throw PARTICIPANT_RESPONSES.ALREADY_EXISTS;
    return await participantRepo.create(participant);
}

const getAll = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<IParticipant> = {}) => {
    const pipeline = getAllUsers({ isDeleted: false, ...filterParam, }, queryData);
    const result = await participantRepo.find(pipeline)
    if (result.length < 1) throw PARTICIPANT_RESPONSES.NO_DATA_TO_DISPLAY
    return result
}

const findOne = async (filterParam: FilterQuery<IParticipant>) => await participantRepo.findOne(filterParam);

const update = async (filterparam: FilterQuery<IParticipant>, participantData: UpdateQuery<IParticipant>) => {
    const participant = await findOne(filterparam);
    if (!participant) throw PARTICIPANT_RESPONSES.NOT_FOUND;

    if (participant.timeTaken as number > 0) throw PARTICIPANT_RESPONSES.ALREADY_PLAYED
    await participantRepo.update(filterparam, participantData);
    return PARTICIPANT_RESPONSES.UPDATE_SUCCESS;
};
const play = async (playDetails: IParticipant, userId: string) => {
    const tournament = await findOne({ _id: playDetails.tournamentId, status: STATUSES.APPROVED, isCompleted: false, participants: { $in: [userId] } });
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND
    await update({ userId: userId }, { $set: playDetails })
    return TOURNAMENT_RESPONSES.PLAY_SUCCESS;
}

const joinTournament = async (tournamentId: string, user: Payload) => {
    const tournament = await tournamentService.findOne({ _id: tournamentId, status: STATUSES.APPROVED, isCompleted: false });
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND;

    if (tournament.organizer.toString() == user.id) throw TOURNAMENT_RESPONSES.OWN_TOURNAMENT;

    await update({ _id: tournamentId }, { $push: { participants: user.id } })
    await create({ userId: user.id, tournamentId: tournament._id.toString() })
    return TOURNAMENT_RESPONSES.JOIN_SUCCESS
}

const leaveTournament = async (tournamentId: string, userId: string) => {
    const tournament = await findOne({ _id: tournamentId, status: STATUSES.APPROVED, isCompleted: false, participants: { $in: [userId] } });
    if (!tournament) throw TOURNAMENT_RESPONSES.NOT_FOUND;

    await tournamentService.update({ _id: tournamentId }, { $pull: { participants: userId } });
    await update({ userId: userId }, { $set: { isDeleted: true } });

    return TOURNAMENT_RESPONSES.LEAVE_SUCCESS;
};


export default {
    create, findOne, update, getAll, play, joinTournament, leaveTournament
}