import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { CategoryModel } from "./category.schema";
import { ICategory } from "./category.types";

const create = (category: ICategory) => CategoryModel.create(category);

const find = (pipeline: PipelineStage[]) => CategoryModel.aggregate(pipeline)

const findOne = (filter: FilterQuery<ICategory>) => CategoryModel.findOne(filter);

const update = (filter: FilterQuery<ICategory>, data: UpdateQuery<ICategory>) => CategoryModel.updateMany(filter, data);

const findAll=(filter: FilterQuery<ICategory>)=>CategoryModel.find(filter)


export default {
    find,
    create,
    findOne,
    update,
    findAll
};
