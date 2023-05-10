import { FilterQuery, Types, UpdateQuery } from "mongoose";
import userRepo from "./user.repo";
import { IUser } from "./user.types";
import { IGenericPipleline } from "../../utility/database.utilities";
import { Payload } from "../auth/auth.types";
import { USER_RESPONSES } from "./user.responses";
import tournamentService from "../tournament/tournament.service";
import { COMMENT_TYPES, ROLES, STATUSES } from "../../utility/constants";
import { TOURNAMENT_RESPONSES } from "../tournament/tournament.responses";
import commentService from "../comment/comment.service";
import { getAllUsers } from "./user.pipelines";
import authService from "../auth/auth.service";
import notificationService from "../notification/notification.service";
import participantService from "../participant/participant.service";

const create = (user: IUser) => userRepo.create(user);
const createModerator = (user: IUser) => authService.createModerator(user);
const findOne = (filterParam: FilterQuery<IUser>) => userRepo.findOne(filterParam);

const update = async (filterparam: FilterQuery<IUser>, data: UpdateQuery<IUser>) => {
  const user = await findOne(filterparam);
  if (!user) throw TOURNAMENT_RESPONSES.NOT_FOUND;
  await userRepo.update(filterparam, data);
  return USER_RESPONSES.UPDATE_SUCCESS;
};
const getAll = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<IUser> = {}) => {
  const pipeline = getAllUsers({ isDeleted: false, ...filterParam, }, queryData);
  const result = await userRepo.find(pipeline)
  if (result.length < 1) throw USER_RESPONSES.NO_DATA_TO_DISPLAY
  return result
}

//GENERIC GET-ALL
const getAllUsersTournaments = async (queryData: IGenericPipleline, user: Payload, filterParam: FilterQuery<IUser>) => {
  const oldUser = await findOne({ _id: user.id });
  if (!oldUser) throw USER_RESPONSES.NOT_FOUND;
  const tournaments = await tournamentService.getAll(queryData, filterParam);
  return tournaments
}

const allTournamentsHosted = async (queryData: IGenericPipleline, user: Payload) => await getAllUsersTournaments(queryData, user, { status: new Types.ObjectId(STATUSES.APPROVED), organizer: user.id })

const allTournamentRequests = async (queryData: IGenericPipleline, user: Payload) => await getAllUsersTournaments(queryData, user, { organizer: new Types.ObjectId(user.id) })

const getParticipatedTournaments = async (queryData: IGenericPipleline, userId: string) => await participantService.getAll(queryData, { userId: new Types.ObjectId(userId) })

const promoteToModerator = async (userId: string) => {
  await update({ _id: userId }, { $set: { isModerator: true } })
  await notificationService.create({ userId: userId, message: `you were promoted to moderator` })
  return USER_RESPONSES.SUCCESSFULL_PROMOTION
}

const findById = async (userId: string, user: Payload) => {
  const userExists = await findOne({ _id: userId, isDeleted: false }).select({ password: 0 });
  if (!userExists) throw USER_RESPONSES.NOT_FOUND;

  const { email, ...userData } = userExists
  if (user.id == userId || user.role == ROLES.ADMIN) {
    return userExists
  }
  return userData;
}

const remove = async (userId: string) => {
  await update({ _id: userId, isDeleted: false }, { $set: { isDeleted: true } });
  return USER_RESPONSES.DELETE_SUCCESS
}

export default {
  create,
  createModerator,
  getAll,
  findOne,
  remove,
  update,
  allTournamentRequests,
  getParticipatedTournaments,
  allTournamentsHosted,
  promoteToModerator,
  findById
};
