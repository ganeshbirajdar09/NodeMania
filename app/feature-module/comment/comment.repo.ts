import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { IComment } from "./comment.types";
import { CommentModel } from "./comment.schema";


const create = (notification: IComment) => CommentModel.create(notification)

const find = (pipeline: PipelineStage[]) => CommentModel.aggregate(pipeline);

const findOne = (filter: FilterQuery<IComment>) => CommentModel.findOne(filter);

const update = (filter: FilterQuery<IComment>, data: UpdateQuery<IComment>) => CommentModel.updateMany(filter, data);



export default {
    create, find, findOne, update
}