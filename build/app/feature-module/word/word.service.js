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
const word_pipeline_1 = require("./word.pipeline");
const word_repo_1 = __importDefault(require("./word.repo"));
const word_responses_1 = require("./word.responses");
const mongoose_1 = require("mongoose");
const create = (word) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, categories, level } = word;
    const oldWord = yield findOne({ name: name.toLowerCase() });
    if (oldWord)
        throw word_responses_1.WORD_RESPONSES.ALREADY_EXISTS;
    return yield word_repo_1.default.create({ name: name.toLowerCase(), categories, level });
});
const findOne = (filterParam) => __awaiter(void 0, void 0, void 0, function* () { return yield word_repo_1.default.findOne(filterParam); });
const getAll = (queryData = {}, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, word_pipeline_1.getAllWords)(Object.assign({ isDeleted: false }, filterParam), queryData);
    return yield word_repo_1.default.find(pipeline);
});
const findById = (wordId) => __awaiter(void 0, void 0, void 0, function* () { return yield findOne({ _id: wordId }); });
const update = (filterparam, data) => __awaiter(void 0, void 0, void 0, function* () {
    const word = yield findOne({ _id: filterparam });
    if (!word)
        throw word_responses_1.WORD_RESPONSES.NOT_FOUND;
    const { categories, level } = data;
    const updatedWordData = {};
    if (level)
        updatedWordData.level = level;
    if (categories)
        updatedWordData.categories = categories;
    yield word_repo_1.default.update({ _id: filterparam }, data);
    return word_responses_1.WORD_RESPONSES.UPDATE_SUCCESS;
});
const removeWordsByCategories = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const words = yield getAll({}, { categories: new mongoose_1.Types.ObjectId(categoryId), isDeleted: false });
    for (let word of words) {
        if (word.categories.length > 1) {
            yield update({ _id: word._id }, { $pull: { categories: categoryId } });
        }
        else {
            yield update({ _id: word._id }, { isDeleted: true });
        }
    }
    return true;
});
const remove = (wordId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield update({ _id: wordId }, { $set: { isDeleted: true } });
    if (!result)
        throw word_responses_1.WORD_RESPONSES.UPDATE_FAILURE;
    return word_responses_1.WORD_RESPONSES.DELETE_SUCCESS;
});
exports.default = {
    create,
    findOne,
    update,
    remove,
    getAll,
    findById,
    removeWordsByCategories
};
