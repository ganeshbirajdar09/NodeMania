import { FilterQuery, PipelineStage, Schema, UpdateQuery } from "mongoose";
import { ILevel } from "./level.types";
import levelRepo from "./level.repo";
import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";
import { LEVEL_RESPONSES } from "./level.responses";
import wordService from "../word/word.service";

const create = async (name: string) => {
  const oldLevel = await findOne({ name: name.toLowerCase() })
  if (oldLevel) throw LEVEL_RESPONSES.ALREADY_EXISTS
  return await levelRepo.create({ name: name.toLowerCase() });
}

const getAll = async (queryData: IGenericPipleline) => {
  const pipeline = genericPipeline(queryData);
  return await levelRepo.find(pipeline);
};

const findById = async (levelId: string | Schema.Types.ObjectId) => await findOne({ _id: levelId });

const update = async (filterparam: FilterQuery<ILevel>, levelData: UpdateQuery<ILevel>) => {
  const { name } = levelData;
  const level = await findOne({ _id: filterparam });
  if (!level) throw LEVEL_RESPONSES.NOT_FOUND;
  if (level.name == name) throw LEVEL_RESPONSES.ALREADY_EXISTS;
  await levelRepo.update({ _id: filterparam }, { $set: { name: name } });
  return LEVEL_RESPONSES.UPDATE_SUCCESS;
};

const findOne = async (filterparam: FilterQuery<ILevel>) => await levelRepo.findOne(filterparam)

const remove = async (levelId: string) => {
  const result = await update({ _id: levelId }, { $set: { isDeleted: true } });
  await wordService.update({ level: levelId }, { $set: { level: "no level" } })
  if (!result) throw LEVEL_RESPONSES.DELETE_FAILURE
  return LEVEL_RESPONSES.DELETE_SUCCESS
}

export default {
  getAll,
  create,
  findOne,
  update,
  remove,
  findById
};
