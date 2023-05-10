"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_WORD_VALIDATIONS = exports.ADD_WORD_VALIDATIONS = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_WORD_VALIDATIONS = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required").isString().withMessage("name must be a string value"),
    (0, express_validator_1.body)("categories").exists().withMessage("categories is required").isArray().isLength({ min: 1 }).withMessage("add atleaset 1 category"),
    (0, express_validator_1.body)("level").exists().withMessage("level is required").withMessage("level must be in a valid mongoId format"),
    validate_1.validate
];
exports.UPDATE_WORD_VALIDATIONS = [
    (0, express_validator_1.body)("_id").exists().withMessage("_id is required").isMongoId().withMessage("_id must be in a valid mongoId format"),
    (0, express_validator_1.body)("categories").optional().isArray().isLength({ min: 1 }).withMessage("add atleaset 1 category"),
    (0, express_validator_1.body)("level").optional().isMongoId().withMessage("level must be in a valid mongoId format"),
    validate_1.validate
];
