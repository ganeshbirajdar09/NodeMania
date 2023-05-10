import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { UserModel } from "./user.schema";
import { IUser } from "./user.types";

const create = (user: IUser) => UserModel.create(user);
const findOne = (filterParam: FilterQuery<IUser>) => UserModel.findOne(filterParam);
const find = (pipeline: PipelineStage[]) => UserModel.aggregate(pipeline);
const update = (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => UserModel.updateMany(filter, data);

export default {
  create,
  findOne,
  find,
  update
};
