import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";
import { getAllWords } from "./word.pipeline";
import wordRepo from "./word.repo";
import { WORD_RESPONSES } from "./word.responses";
import { IWord } from "./word.types";
import { FilterQuery, Types, UpdateQuery } from "mongoose";

const create = async (word: IWord) => {
    const { name, categories, level } = word;
    const oldWord = await findOne({ name: name.toLowerCase() });
    if (oldWord) throw WORD_RESPONSES.ALREADY_EXISTS;
    return await wordRepo.create({ name: name.toLowerCase(), categories, level });
}

const findOne = async (filterParam: FilterQuery<IWord>) => await wordRepo.findOne(filterParam);

const getAll = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<IWord> = {}) => {
    const pipeline = getAllWords({ isDeleted: false, ...filterParam, }, queryData);
    return await wordRepo.find(pipeline)
}
const findById = async (wordId: string) => await findOne({ _id: wordId })

const update = async (filterparam: FilterQuery<IWord>, data: UpdateQuery<IWord>) => {
    const word = await findOne({ _id: filterparam });
    if (!word) throw WORD_RESPONSES.NOT_FOUND;
    const { categories, level } = data;
    const updatedWordData: Partial<IWord> = {};

    if (level) updatedWordData.level = level
    if (categories) updatedWordData.categories = categories

    await wordRepo.update({ _id: filterparam }, data);

    return WORD_RESPONSES.UPDATE_SUCCESS;
};
const removeWordsByCategories = async (categoryId: string) => {
    const words = await getAll({}, { categories: new Types.ObjectId(categoryId), isDeleted: false });
    for (let word of words) {
        if (word.categories.length > 1) {
            await update({ _id: word._id }, { $pull: { categories: categoryId } })
        }
        else {
            await update({ _id: word._id }, { isDeleted: true })
        }
    }
    return true
}

const remove = async (wordId: string) => {
    const result = await update({ _id: wordId }, { $set: { isDeleted: true } });
    if (!result) throw WORD_RESPONSES.UPDATE_FAILURE
    return WORD_RESPONSES.DELETE_SUCCESS

}
export default {
    create,
    findOne,
    update,
    remove,
    getAll,
    findById,
    removeWordsByCategories
};
