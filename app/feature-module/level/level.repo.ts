import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { LevelModel } from "./level.schema";
import { ILevel } from "./level.types";

const create = (level: ILevel) => LevelModel.create(level);

const find = (pipeline: PipelineStage[]) => LevelModel.aggregate(pipeline);

const findOne = (filter: FilterQuery<ILevel>) => LevelModel.findOne(filter);

const update = (filter: FilterQuery<ILevel>, data: UpdateQuery<ILevel>) => LevelModel.updateMany(filter, data);


export default {
    find,
    create,
    findOne,
    update,
};
