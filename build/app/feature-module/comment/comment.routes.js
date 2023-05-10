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
const comment_service_1 = __importDefault(require("./comment.service"));
const comment_validations_1 = require("./comment.validations");
const router = (0, express_1.Router)();
//read all comments of a tournament or requests
router.get("/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PARAM_ID_VALIDATIONS, global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield comment_service_1.default.readAll(queryData, req.params.id, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id/review", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PARAM_ID_VALIDATIONS, global_validations_1.PAGINATION_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const result = yield comment_service_1.default.readReviews(queryData, req.params.id, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//comment on tournament
router.post("/", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), comment_validations_1.COMMENT_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, tournamentId } = req.body;
        const result = yield comment_service_1.default.create(tournamentId, res.locals.user, message);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//flag a comment 
router.patch("/flag", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), comment_validations_1.FLAG_COMMENT_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.body;
        const result = yield comment_service_1.default.flagComment(commentId, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//edit comment in tournament
router.patch("/", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), comment_validations_1.COMMENT_EDIT_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = req.body;
        const result = yield comment_service_1.default.editComment(comment, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//delete comment 
router.delete("/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.USER]), global_validations_1.PARAM_ID_VALIDATIONS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comment_service_1.default.remove(req.params.id, res.locals.user);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
