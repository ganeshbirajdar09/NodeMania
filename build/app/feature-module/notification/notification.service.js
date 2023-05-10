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
const mongoose_1 = require("mongoose");
const database_utilities_1 = require("../../utility/database.utilities");
const notification_repo_1 = __importDefault(require("./notification.repo"));
const user_responses_1 = require("../user/user.responses");
const create = (notification) => __awaiter(void 0, void 0, void 0, function* () { return yield notification_repo_1.default.create(notification); });
const getAll = (queryData = {}, user) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, database_utilities_1.genericPipeline)(Object.assign({ userId: new mongoose_1.Types.ObjectId(user.id), sortFilter: "createdAt", sortOrder: "desc" }, queryData));
    const result = yield notification_repo_1.default.find(pipeline);
    if (result.length < 1)
        throw user_responses_1.USER_RESPONSES.NO_DATA_TO_DISPLAY;
    return result;
});
const generateNotificationMessage = (messsage) => {
};
exports.default = {
    create, getAll
};
