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
const express_1 = require("express");
const tournament_service_1 = __importDefault(require("./tournament.service"));
const response_handler_1 = require("../../utility/response.handler");
const authorize_1 = require("../../utility/authorize");
const constants_1 = require("../../utility/constants");
const global_validations_1 = require("../../utility/global.validations");
const tournament_validations_1 = require("./tournament.validations");
const router = (0, express_1.Router)();
//create a tournament
router.post("/", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentData = req.body;
        const { user } = res.locals;
        const result = yield tournament_service_1.default.create(user, tournamentData);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
// all 
router.get("/", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield tournament_service_1.default.getAllApproved(queryData);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
// featured
router.get("/featured", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield tournament_service_1.default.getAllFeatured(queryData);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//feature a tournament
router.patch("/featured/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), global_validations_1.PARAM_ID_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tournament_service_1.default.featureATournament(req.params.id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//upcoming
router.get("/upcoming", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield tournament_service_1.default.getAllUpcoming(queryData);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//tourny requests
router.get("/pending", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield tournament_service_1.default.getAllPending(queryData);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//set tourny status
router.patch("/status", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, status } = req.body;
        const result = yield tournament_service_1.default.setTournamentStatus(_id, status);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//join a tournament
router.post("/join", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), tournament_validations_1.JOIN_TOURNAMENT_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournamentId } = req.body;
        const result = yield tournament_service_1.default.joinTournament(tournamentId, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//leave a tournament
router.patch("/leave", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), tournament_validations_1.JOIN_TOURNAMENT_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournamentId } = req.body;
        const result = yield tournament_service_1.default.leaveTournament(tournamentId, res.locals.user.id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
// //play (getting the data)
// router.patch("/play", permit([ROLES.ADMIN, ROLES.USER]), PLAY_TOURNAMENT_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const playDetails = req.body
//         const result = await tournamentService.play(playDetails, res.locals.user.id);
//         res.send(new ResponseHandler(result));
//     } catch (error) {
//         next(error);
//     }
// });
//get tourny by Id
router.get("/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PARAM_ID_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tournament_service_1.default.findById(req.params.id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//edit tournament details
router.patch("/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PARAM_ID_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tournament_service_1.default.findById(req.params.id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//delete a tournament
router.delete("/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PARAM_ID_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tournament_service_1.default.remove(req.params.id, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
