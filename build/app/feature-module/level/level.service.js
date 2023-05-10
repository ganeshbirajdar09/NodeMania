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
const level_repo_1 = __importDefault(require("./level.repo"));
const database_utilities_1 = require("../../utility/database.utilities");
const level_responses_1 = require("./level.responses");
const word_service_1 = __importDefault(require("../word/word.service"));
const create = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const oldLevel = yield findOne({ name: name.toLowerCase() });
    if (oldLevel)
        throw level_responses_1.LEVEL_RESPONSES.ALREADY_EXISTS;
    return yield level_repo_1.default.create({ name: name.toLowerCase() });
});
const getAll = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, database_utilities_1.genericPipeline)(queryData);
    return yield level_repo_1.default.find(pipeline);
});
const findById = (levelId) => __awaiter(void 0, void 0, void 0, function* () { return yield findOne({ _id: levelId }); });
const update = (filterparam, levelData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = levelData;
    const level = yield findOne({ _id: filterparam });
    if (!level)
        throw level_responses_1.LEVEL_RESPONSES.NOT_FOUND;
    if (level.name == name)
        throw level_responses_1.LEVEL_RESPONSES.ALREADY_EXISTS;
    yield level_repo_1.default.update({ _id: filterparam }, { $set: { name: name } });
    return level_responses_1.LEVEL_RESPONSES.UPDATE_SUCCESS;
});
const findOne = (filterparam) => __awaiter(void 0, void 0, void 0, function* () { return yield level_repo_1.default.findOne(filterparam); });
const remove = (levelId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield update({ _id: levelId }, { $set: { isDeleted: true } });
    yield word_service_1.default.update({ level: levelId }, { $set: { level: "no level" } });
    if (!result)
        throw level_responses_1.LEVEL_RESPONSES.DELETE_FAILURE;
    return level_responses_1.LEVEL_RESPONSES.DELETE_SUCCESS;
});
exports.default = {
    getAll,
    create,
    findOne,
    update,
    remove,
    findById
};
