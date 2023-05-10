"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_repo_1 = __importDefault(require("./category.repo"));
const database_utilities_1 = require("../../utility/database.utilities");
const category_responses_1 = require("./category.responses");
const word_service_1 = __importDefault(require("../word/word.service"));
const create = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const oldCategory = yield findOne({ name: name.toLowerCase() });
    if (oldCategory)
        throw category_responses_1.CATEGORY_RESPONSES.ALREADY_EXISTS;
    return yield category_repo_1.default.create({ name: name.toLowerCase() });
});
const getAll = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, database_utilities_1.genericPipeline)(queryData);
    return yield category_repo_1.default.find(pipeline);
});
// const getAll = async (queryData: IGenericPipleline = {}, filterParam: FilterQuery<ICategory> = {}) => {
//     const pipeline = getAllCategories({ isDeleted: false, ...filterParam, }, queryData);
//     const result = await categoryRepo.find(pipeline)
//     if (result.length < 1) throw TOURNAMENT_RESPONSES.NO_DATA_TO_DISPLAY
//     return result
// }
const findAll = (filterParam) => category_repo_1.default.findAll(filterParam);
const findById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () { return yield findOne({ _id: categoryId }); });
const findOne = (filterParam) => __awaiter(void 0, void 0, void 0, function* () { return yield category_repo_1.default.findOne(filterParam); });
const update = (filterParam, categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = categoryData;
    const category = yield findOne({ _id: filterParam });
    if (!category)
        throw category_responses_1.CATEGORY_RESPONSES.NOT_FOUND;
    if (category.name == name)
        throw category_responses_1.CATEGORY_RESPONSES.ALREADY_EXISTS;
    yield category_repo_1.default.update({ _id: filterParam }, categoryData);
    return category_responses_1.CATEGORY_RESPONSES.UPDATE_SUCCESS;
});
const removeCategoryWithWords = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield findById(categoryId);
    if (!category)
        throw category_responses_1.CATEGORY_RESPONSES.NOT_FOUND;
    yield word_service_1.default.removeWordsByCategories(categoryId);
    const result = yield update({ _id: categoryId }, { $set: { isDeleted: true } });
    if (!result)
        throw category_responses_1.CATEGORY_RESPONSES.DELETE_FAILURE;
    return category_responses_1.CATEGORY_RESPONSES.DELETE_SUCCESS;
});
exports.default = {
    getAll,
    create,
    findOne,
    update,
    removeCategoryWithWords,
    findById,
    findAll
};
