import { FilterQuery, PipelineStage, Schema, Types, UpdateQuery } from "mongoose";
import { ICategory } from "./category.types";
import categoryRepo from "./category.repo";
import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";
import { CATEGORY_RESPONSES } from "./category.responses";
import wordService from "../word/word.service";
import { getAllCategories } from "./category.pipelines";
import { TOURNAMENT_RESPONSES } from "../tournament/tournament.responses";

const create = async (name: string) => {
    const oldCategory = await findOne({ name: name.toLowerCase() })
    if (oldCategory) throw CATEGORY_RESPONSES.ALREADY_EXISTS;
    return await categoryRepo.create({ name: name.toLowerCase() });
}
const getAll = async (queryData: IGenericPipleline) => {
    const pipeline = genericPipeline(queryData)
    return await categoryRepo.find(pipeline)
}
// const getAll = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<ICategory> = {}) => {
//     const pipeline = getAllCategories({ isDeleted: false, ...filterParam, }, queryData);
//     const result = await categoryRepo.find(pipeline)
//     if (result.length < 1) throw TOURNAMENT_RESPONSES.NO_DATA_TO_DISPLAY
//     return result
// }

const findAll=(filterParam: FilterQuery<ICategory>)=>categoryRepo.findAll(filterParam);

const findById = async (categoryId: string | Schema.Types.ObjectId) => await findOne({ _id: categoryId });

const findOne = async (filterParam: FilterQuery<ICategory>) => await categoryRepo.findOne(filterParam);

const update = async (filterParam: FilterQuery<ICategory>, categoryData: UpdateQuery<ICategory>) => {
    const { name } = categoryData;
    const category = await findOne({ _id: filterParam });
    if (!category) throw CATEGORY_RESPONSES.NOT_FOUND;
    if (category.name == name) throw CATEGORY_RESPONSES.ALREADY_EXISTS
    await categoryRepo.update({ _id: filterParam }, categoryData)

    return CATEGORY_RESPONSES.UPDATE_SUCCESS
}

const removeCategoryWithWords = async (categoryId: string) => {
    const category = await findById(categoryId)
    if (!category) throw CATEGORY_RESPONSES.NOT_FOUND;
    await wordService.removeWordsByCategories(categoryId)

    const result = await update({ _id: categoryId }, { $set: { isDeleted: true } })
    if (!result) throw CATEGORY_RESPONSES.DELETE_FAILURE
    return CATEGORY_RESPONSES.DELETE_SUCCESS
}
export default {
    getAll,
    create,
    findOne,
    update,
    removeCategoryWithWords,
    findById,
    findAll
};
