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
const response_handler_1 = require("../../utility/response.handler");
const authorize_1 = require("../../utility/authorize");
const constants_1 = require("../../utility/constants");
const global_validations_1 = require("../../utility/global.validations");
const user_service_1 = __importDefault(require("./user.service"));
const auth_validation_1 = require("../auth/auth.validation");
const router = (0, express_1.Router)();
router.get("/", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield user_service_1.default.getAll(queryData);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//create moderator
router.post("/", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), auth_validation_1.REGISTRATION_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.default.createModerator(user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//promote user to moderator
router.patch("/promote/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), global_validations_1.PARAM_ID_VALIDATIONS, global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.promoteToModerator(req.params.id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.get("/participated", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield user_service_1.default.getParticipatedTournaments(queryData, res.locals.user.id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.get("/hosted", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield user_service_1.default.allTournamentsHosted(queryData, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.get("/approvals", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield user_service_1.default.allTournamentRequests(queryData, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PARAM_ID_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.findById(req.params.id, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), global_validations_1.PARAM_ID_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.remove(req.params.id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
