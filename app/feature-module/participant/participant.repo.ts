import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { IParticipant } from "./participant.types";
import { participantModel } from "./participant.schema";

const create = (category: IParticipant) => participantModel.create(category);

const find = (pipeline: PipelineStage[]) => participantModel.aggregate(pipeline)

const findOne = (filter: FilterQuery<IParticipant>) => participantModel.findOne(filter);

const update = (filter: FilterQuery<IParticipant>, data: UpdateQuery<IParticipant>) => participantModel.updateMany(filter, data);


export default {
    find,
    create,
    findOne,
    update,
};
