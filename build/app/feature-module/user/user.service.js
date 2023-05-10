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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_repo_1 = __importDefault(require("./user.repo"));
const user_responses_1 = require("./user.responses");
const tournament_service_1 = __importDefault(require("../tournament/tournament.service"));
const constants_1 = require("../../utility/constants");
const tournament_responses_1 = require("../tournament/tournament.responses");
const user_pipelines_1 = require("./user.pipelines");
const auth_service_1 = __importDefault(require("../auth/auth.service"));
const notification_service_1 = __importDefault(require("../notification/notification.service"));
const participant_service_1 = __importDefault(require("../participant/participant.service"));
const create = (user) => user_repo_1.default.create(user);
const createModerator = (user) => auth_service_1.default.createModerator(user);
const findOne = (filterParam) => user_repo_1.default.findOne(filterParam);
const update = (filterparam, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield findOne(filterparam);
    if (!user)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    yield user_repo_1.default.update(filterparam, data);
    return user_responses_1.USER_RESPONSES.UPDATE_SUCCESS;
});
const getAll = (queryData = {}, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, user_pipelines_1.getAllUsers)(Object.assign({ isDeleted: false }, filterParam), queryData);
    const result = yield user_repo_1.default.find(pipeline);
    if (result.length < 1)
        throw user_responses_1.USER_RESPONSES.NO_DATA_TO_DISPLAY;
    return result;
});
//GENERIC GET-ALL
const getAllUsersTournaments = (queryData, user, filterParam) => __awaiter(void 0, void 0, void 0, function* () {
    const oldUser = yield findOne({ _id: user.id });
    if (!oldUser)
        throw user_responses_1.USER_RESPONSES.NOT_FOUND;
    const tournaments = yield tournament_service_1.default.getAll(queryData, filterParam);
    return tournaments;
});
const allTournamentsHosted = (queryData, user) => __awaiter(void 0, void 0, void 0, function* () { return yield getAllUsersTournaments(queryData, user, { status: new mongoose_1.Types.ObjectId(constants_1.STATUSES.APPROVED), organizer: user.id }); });
const allTournamentRequests = (queryData, user) => __awaiter(void 0, void 0, void 0, function* () { return yield getAllUsersTournaments(queryData, user, { organizer: new mongoose_1.Types.ObjectId(user.id) }); });
const getParticipatedTournaments = (queryData, userId) => __awaiter(void 0, void 0, void 0, function* () { return yield participant_service_1.default.getAll(queryData, { userId: new mongoose_1.Types.ObjectId(userId) }); });
const promoteToModerator = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield update({ _id: userId }, { $set: { isModerator: true } });
    yield notification_service_1.default.create({ userId: userId, message: `you were promoted to moderator` });
    return user_responses_1.USER_RESPONSES.SUCCESSFULL_PROMOTION;
});
const findById = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield findOne({ _id: userId, isDeleted: false }).select({ password: 0 });
    if (!userExists)
        throw user_responses_1.USER_RESPONSES.NOT_FOUND;
    const { email } = userExists, userData = __rest(userExists, ["email"]);
    if (user.id == userId || user.role == constants_1.ROLES.ADMIN) {
        return userExists;
    }
    return userData;
});
const remove = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield update({ _id: userId, isDeleted: false }, { $set: { isDeleted: true } });
    return user_responses_1.USER_RESPONSES.DELETE_SUCCESS;
});
exports.default = {
    create,
    createModerator,
    getAll,
    findOne,
    remove,
    update,
    allTournamentRequests,
    getParticipatedTournaments,
    allTournamentsHosted,
    promoteToModerator,
    findById
};
