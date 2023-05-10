"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAY_TOURNAMENT_VALIDATIONS = exports.JOIN_TOURNAMENT_VALIDATIONS = exports.TOURNAMENT_CREATE_VALIDATIONS = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.TOURNAMENT_CREATE_VALIDATIONS = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required").isString().withMessage("name must be a string"),
    (0, express_validator_1.body)("categories").exists().withMessage("name is required").isArray({ min: 1 }).withMessage("At least one category is required"),
    (0, express_validator_1.body)("startDate").exists().withMessage("start date is required").isDate().withMessage("must in YYYY-MM-DD format"),
    (0, express_validator_1.body)("endDate").exists().withMessage("start date is required").isDate().withMessage("must in YYYY-MM-DD format"),
    (0, express_validator_1.body)("level").exists().withMessage("Level is required").isIn(['easy', 'medium', 'hard']),
    (0, express_validator_1.body)("words").exists().withMessage("words are required").isArray({ min: 1 }).withMessage("At least one word is required"),
    (0, express_validator_1.body)("wordLimit").exists().withMessage("wordLimit is required").isInt({ min: 1 }).withMessage("Word limit must be a greater than 1"),
    validate_1.validate,
];
exports.JOIN_TOURNAMENT_VALIDATIONS = [
    (0, express_validator_1.body)("tournamentId").exists().withMessage("tournamentId is required").isString().withMessage("tournamentId must be a string").isMongoId().withMessage("must be in a valid mongodb format"),
    validate_1.validate,
];
exports.PLAY_TOURNAMENT_VALIDATIONS = [
    (0, express_validator_1.body)("tournamentId").exists().withMessage("tournamentId is required").isString().withMessage("tournamentId must be a string").isMongoId().withMessage("must be in a valid mongodb format"),
    (0, express_validator_1.body)("score").exists().withMessage("score is required").isInt({ min: 0 }).withMessage("score must a number and atleast 0").isMongoId(),
    (0, express_validator_1.body)("timeTaken").exists().withMessage("timeTaken is required").isInt({ min: 1 }).withMessage("timeTaken must a number and atleast 1").isMongoId(),
    validate_1.validate,
];
