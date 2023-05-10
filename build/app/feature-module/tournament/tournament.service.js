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
const tournament_repo_1 = __importDefault(require("./tournament.repo"));
const tournament_responses_1 = require("./tournament.responses");
const tournament_pipelines_1 = require("./tournament.pipelines");
const constants_1 = require("../../utility/constants");
const level_service_1 = __importDefault(require("../level/level.service"));
const level_responses_1 = require("../level/level.responses");
const category_service_1 = __importDefault(require("../category/category.service"));
const category_responses_1 = require("../category/category.responses");
const notification_service_1 = __importDefault(require("../notification/notification.service"));
const comment_service_1 = __importDefault(require("../comment/comment.service"));
const participant_service_1 = __importDefault(require("../participant/participant.service"));
const word_service_1 = __importDefault(require("../word/word.service"));
const word_responses_1 = require("../word/word.responses");
const notification_types_1 = require("../notification/notification.types");
const create = (user, tournamentData) => __awaiter(void 0, void 0, void 0, function* () {
    const oldTournament = yield findOne({ name: tournamentData.name.toLowerCase() });
    if (oldTournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.ALREADY_EXISTS;
    const { categories, level, words } = tournamentData;
    const levelExists = yield level_service_1.default.findById(level);
    if (!levelExists)
        throw level_responses_1.LEVEL_RESPONSES.NOT_FOUND;
    for (let category of categories) {
        const categoryExists = yield category_service_1.default.findOne({ _id: category });
        if (!categoryExists)
            throw category_responses_1.CATEGORY_RESPONSES.NOT_FOUND;
    }
    for (let word of words) {
        const wordExists = yield word_service_1.default.findOne({ _id: word, level: tournamentData.level });
        if (!wordExists)
            throw word_responses_1.WORD_RESPONSES.NOT_FOUND;
    }
    tournamentData.organizer = user.id;
    if (user.role == constants_1.ROLES.ADMIN) {
        tournamentData.status = constants_1.STATUSES.APPROVED;
        tournamentData.toBeFeatured = true;
    }
    //TODO: handle endDate
    // //TODO: WORDS
    // const tournamentObj: ITournament = {
    //     endDate: endDate ? new Date(endDate) : new Date(new Date(startDate).getTime() + (7 * 24 * 60 * 60 * 1000)),
    // }
    return yield tournament_repo_1.default.create(tournamentData);
});
const findById = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () { return yield findOne({ _id: tournamentId }); });
const update = (filterparam, tournamentData) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne(filterparam);
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    yield tournament_repo_1.default.update(filterparam, tournamentData);
    return tournament_responses_1.TOURNAMENT_RESPONSES.UPDATE_SUCCESS;
});
//GENERIC GET-ALL
const getAll = (queryData = {}, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, tournament_pipelines_1.getAllTournaments)(Object.assign({ isDeleted: false }, filterParam), queryData);
    const result = yield tournament_repo_1.default.find(pipeline);
    if (result.length < 1)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NO_DATA_TO_DISPLAY;
    return result;
});
const findOne = (filterparam) => __awaiter(void 0, void 0, void 0, function* () { return yield tournament_repo_1.default.findOne(filterparam); });
const setTournamentStatus = (tournamentId, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tournament = yield findOne({ _id: tournamentId, status: constants_1.STATUSES.PENDING });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    const newStatus = status == constants_1.STATUSES.APPROVED ? 'approved' : 'rejected';
    if (newStatus == "approved") {
        for (let word of tournament.extraWords) {
            const wordExists = yield word_service_1.default.findOne({ name: (_a = word.name) === null || _a === void 0 ? void 0 : _a.toLowerCase() });
            //FIXME: check categories 
            if (!wordExists) {
                const categories = yield category_service_1.default.findAll({ _id: { $in: word.categories } });
                if (word.categories.length !== categories.length)
                    throw category_responses_1.CATEGORY_RESPONSES.NOT_FOUND;
                word.level = tournament.level.toString();
                yield word_service_1.default.create(word);
            }
            else {
                //TODO: 
                wordExists.categories = wordExists.categories.map(e => e.toString());
                const extraCategories = word.categories.filter((category) => !wordExists.categories.includes(category));
                yield word_service_1.default.update({ _id: wordExists._id }, { $push: { categories: extraCategories } });
            }
        }
        //TODO: insertMany
        // await wordService.create({ ...word, level: tournament.level })
    }
    const message = notification_types_1.NOTIFICATION_TYPES.TOURNAMENT_APPROVE(tournament.name);
    yield notification_service_1.default.create({ userId: tournament.organizer, message: message });
    return yield update({ _id: tournament._id }, { $set: { status: status } });
});
const remove = (tournamentId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne({ _id: tournamentId, isDeleted: false, status: constants_1.STATUSES.PENDING, organizer: user.id });
    if (!tournament && user.role != constants_1.ROLES.ADMIN)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    yield update({ _id: tournamentId }, { $set: { isDeleted: true } });
    return tournament_responses_1.TOURNAMENT_RESPONSES.DELETE_SUCCESS;
});
const featureATournament = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield update({ _id: tournamentId }, { $set: { toBeFeatured: true } });
    const tournament = yield findOne({ _id: tournamentId });
    yield notification_service_1.default.create({ userId: tournament === null || tournament === void 0 ? void 0 : tournament.organizer, message: `your ${tournament === null || tournament === void 0 ? void 0 : tournament.name} was added to the official featured list of tournaments` });
    return tournament_responses_1.TOURNAMENT_RESPONSES.ADDED_TO_FEATURED;
});
const getAllApproved = (queryData = {}, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () { return yield getAll(queryData, Object.assign({ status: new mongoose_1.Types.ObjectId(constants_1.STATUSES.APPROVED) }, filterParam)); });
const getAllFeatured = (queryData = {}, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () { return yield getAll(queryData, Object.assign({ status: new mongoose_1.Types.ObjectId(constants_1.STATUSES.APPROVED), toBeFeatured: true }, filterParam)); });
const getAllPending = (queryData = {}, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () { return yield getAll(queryData, Object.assign({ status: new mongoose_1.Types.ObjectId(constants_1.STATUSES.PENDING) }, filterParam)); });
const getTournamentComments = (queryData, tournamentId) => __awaiter(void 0, void 0, void 0, function* () { return yield comment_service_1.default.getAll(queryData, tournamentId); });
const getAllUpcoming = (queryData = {}, filterParam = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    return yield getAll(queryData, Object.assign({ status: new mongoose_1.Types.ObjectId(constants_1.STATUSES.APPROVED), startDate: { $gt: currentDate } }, filterParam));
});
const getTournamentRequestComments = (queryData, tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne({ _id: tournamentId });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    queryData.type = constants_1.COMMENT_TYPES.REQUEST;
    return yield comment_service_1.default.getAll(queryData, tournamentId);
});
const joinTournament = (tournamentId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne({ _id: tournamentId, status: constants_1.STATUSES.APPROVED, isCompleted: false });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    if (tournament.organizer.toString() == user.id)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.OWN_TOURNAMENT;
    yield update({ _id: tournamentId }, { $push: { participants: user.id } });
    yield participant_service_1.default.create({ userId: user.id, tournamentId: tournament._id.toString() });
    return tournament_responses_1.TOURNAMENT_RESPONSES.JOIN_SUCCESS;
});
const leaveTournament = (tournamentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne({ _id: tournamentId, status: constants_1.STATUSES.APPROVED, isCompleted: false, participants: { $in: [userId] } });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    yield update({ _id: tournamentId }, { $pull: { participants: userId } });
    yield participant_service_1.default.update({ userId: userId }, { $set: { isDeleted: true } });
    return tournament_responses_1.TOURNAMENT_RESPONSES.LEAVE_SUCCESS;
});
const play = (playDetails, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne({ _id: playDetails.tournamentId, status: constants_1.STATUSES.APPROVED, isCompleted: false, participants: { $in: [userId] } });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    yield participant_service_1.default.update({ userId: userId }, { $set: playDetails });
    return tournament_responses_1.TOURNAMENT_RESPONSES.PLAY_SUCCESS;
});
const editDetails = (tournamentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne({ _id: tournamentId, status: { $ne: constants_1.STATUSES.REJECTED } });
    if (!tournament)
        throw tournament_responses_1.TOURNAMENT_RESPONSES.NOT_FOUND;
    if (tournament.status.toString() == constants_1.STATUSES.PENDING) {
        //TODO: HANDLE 
    }
});
exports.default = {
    getAll,
    create,
    findOne,
    update,
    play,
    remove,
    findById,
    editDetails,
    joinTournament,
    getAllUpcoming,
    getAllApproved,
    getAllFeatured,
    getAllPending,
    leaveTournament,
    setTournamentStatus,
    featureATournament,
    getTournamentComments,
    getTournamentRequestComments
};
