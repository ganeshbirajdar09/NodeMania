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
const participant_repo_1 = __importDefault(require("./participant.repo"));
const participant_responses_1 = require("./participant.responses");
const user_pipelines_1 = require("../user/user.pipelines");
const tournament_responses_1 = require("../tournament/tournament.responses");
const constants_1 = require("../../utility/constants");
const create = (participant) => __awaiter(void 0, void 0, void 0, function* () {
    const oldParticipant = yield findOne({ userId: participant.userId });
    if (oldParticipant)
        throw participant_responses_1.PARTICIPANT_RESPONSES.ALREADY_EXISTS;
    return yield participant_repo_1.default.create(participant);
});
const getAll = (queryData = {}, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, user_pipelines_1.getAllUsers)(Object.assign({ isDeleted: false }, filterParam), queryData);
    const result = yield participant_repo_1.default.find(pipeline);
    if (result.length < 1)
        throw participant_responses_1.PARTICIPANT_RESPONSES.NO_DATA_TO_DISPLAY;
    return result;
});
const findOne = (filterParam) => __awaiter(void 0, void 0, void 0, function* () { return yield participant_repo_1.default.findOne(filterParam); });
const update = (filterparam, participantData) => __awaiter(void 0, void 0, void 0, function* () {
    const participant = yield findOne(filterparam);
    if (!participant)
        throw participant_responses_1.PARTICIPANT_RESPONSES.NOT_FOUND;
    if (participant.timeTaken > 0)
        throw participant_responses_1.PARTICIPANT_RESPONSES.ALREADY_PLAYED;
    yield participant_repo_1.default.update(filterparam, participantData);
    return participant_responses_1.PARTICIPANT_RESPONSES.UPDATE_SUCCESS;
});
const play = (playDetails, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne({ _id: playDetails.tournamentId, status: constants_1.STATUSES.APPROVED, isCompleted: false, participants: { $in: [userId] } });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    yield update({ userId: userId }, { $set: playDetails });
    return tournament_responses_1.TOURNAMENT_RESPONSES.PLAY_SUCCESS;
});
exports.default = {
    create, findOne, update, getAll, play
};
