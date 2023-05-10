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
const user_responses_1 = require("../user/user.responses");
const comment_repo_1 = __importDefault(require("./comment.repo"));
const comment_responses_1 = require("./comment.responses");
const notification_service_1 = __importDefault(require("../notification/notification.service"));
const tournament_service_1 = __importDefault(require("../tournament/tournament.service"));
const constants_1 = require("../../utility/constants");
const tournament_responses_1 = require("../tournament/tournament.responses");
const user_service_1 = __importDefault(require("../user/user.service"));
const create = (tournamentId, user, message) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_service_1.default.findOne({ _id: tournamentId });
    if (!tournament || tournament.status.toString() == constants_1.STATUSES.REJECTED)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    const commentType = tournament.status.toString() == constants_1.STATUSES.APPROVED ? constants_1.COMMENT_TYPES.TOURNAMENT : constants_1.COMMENT_TYPES.REQUEST;
    const userExists = yield user_service_1.default.findOne({ _id: user.id });
    if (!userExists)
        throw user_responses_1.USER_RESPONSES.NOT_FOUND;
    return yield comment_repo_1.default.create({ type: commentType, userId: userExists._id, tournamentId: tournamentId, message: message });
});
const getAll = (queryData = {}, tournamentId, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, database_utilities_1.genericPipeline)(Object.assign({ isDeleted: "false", isFlagged: "false", tournamentId: new mongoose_1.Types.ObjectId(tournamentId), sortFilter: "createdAt", sortOrder: "desc" }, queryData));
    const result = yield comment_repo_1.default.find(pipeline);
    if (result.length < 1)
        throw user_responses_1.USER_RESPONSES.NO_DATA_TO_DISPLAY;
    return result;
});
const findOne = (filterParam) => __awaiter(void 0, void 0, void 0, function* () { return yield comment_repo_1.default.findOne(filterParam); });
const update = (filterparam, data) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield findOne(filterparam);
    if (!comment)
        throw comment_responses_1.COMMENT_RESPONSES.NOT_FOUND;
    yield comment_repo_1.default.update(filterparam, data);
    return comment_responses_1.COMMENT_RESPONSES.UPDATE_SUCCESS;
});
const readAll = (queryData, tournamentId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_service_1.default.findOne({ _id: tournamentId, status: constants_1.STATUSES.APPROVED });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    queryData.type = 'tournament';
    return yield getAll(queryData, tournamentId, { type: "tournament" });
});
const readReviews = (queryData, tournamentId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_service_1.default.findOne({ _id: tournamentId });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    if (tournament.organizer.toString() != user.id && user.role != constants_1.ROLES.ADMIN)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.FORBIDDEN;
    queryData.type = 'request';
    return yield getAll(queryData, tournamentId);
});
const flagComment = (commentId, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userExists = yield user_service_1.default.findOne({ _id: user.id });
    if (!userExists)
        throw user_responses_1.USER_RESPONSES.NOT_FOUND;
    const comment = yield findOne({ _id: commentId, isDeleted: false });
    if (((_a = userExists.role) === null || _a === void 0 ? void 0 : _a.toString()) != constants_1.ROLES.ADMIN && !userExists.isModerator && (comment === null || comment === void 0 ? void 0 : comment.userId) == userExists._id)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.FORBIDDEN;
    const tournament = yield tournament_service_1.default.findOne({ _id: comment === null || comment === void 0 ? void 0 : comment.tournamentId });
    const flag = !(comment === null || comment === void 0 ? void 0 : comment.isFlagged);
    yield notification_service_1.default.create({ userId: comment === null || comment === void 0 ? void 0 : comment.userId, message: flag ? `your comment in ${tournament === null || tournament === void 0 ? void 0 : tournament.name} tournament was flagged and was deleted` : '`flag status of your comment in ${tournament?.name} tournament was revoked`' });
    yield update({ _id: commentId }, { $set: { isFlagged: flag } });
    return comment_responses_1.COMMENT_RESPONSES.FLAGGED_SUCCESS;
});
const editComment = (comment, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, _id } = comment;
    const userExists = yield user_service_1.default.findOne({ _id: user.id });
    if (!userExists)
        throw user_responses_1.USER_RESPONSES.NOT_FOUND;
    const commentExists = yield findOne({ _id: _id, userId: user.id, isFlagged: false, isDeleted: false });
    if (!commentExists)
        throw comment_responses_1.COMMENT_RESPONSES.NOT_FOUND;
    return yield update({ _id: _id }, { $set: { message: message } });
});
const remove = (commentId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield findOne({ _id: commentId, isFlagged: false, isDeleted: false });
    if (!comment)
        throw comment_responses_1.COMMENT_RESPONSES.NOT_FOUND;
    if (user.role == constants_1.ROLES.ADMIN || comment.userId.toString() == user.id) {
        return yield update({ _id: commentId }, { $set: { isDeleted: true } });
    }
    return comment_responses_1.COMMENT_RESPONSES.FORBIDDEN;
});
exports.default = {
    create, getAll, findOne, update, flagComment, readAll, editComment, readReviews, remove
};
