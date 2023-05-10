import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { TournamentModel } from "./tournament.schema";
import { ITournament } from "./tournament.types";

const create = (tournament: ITournament) => TournamentModel.create(tournament);

const find = (pipeline: PipelineStage[]) => TournamentModel.aggregate(pipeline);

const findOne = (filter: FilterQuery<ITournament>) => TournamentModel.findOne(filter);

const update = (filter: FilterQuery<ITournament>, data: UpdateQuery<ITournament>) => TournamentModel.updateMany(filter, data);

export default {
    find,
    create,
    findOne,
    update,
};
