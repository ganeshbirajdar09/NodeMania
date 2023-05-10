"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_LEVEL_VALIDATIONS = exports.CREATE_LEVEL_VALIDATIONS = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.CREATE_LEVEL_VALIDATIONS = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required").isString().withMessage("name must be a string value"),
    validate_1.validate
];
exports.UPDATE_LEVEL_VALIDATIONS = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required").isString().withMessage("name must be a string value"),
    (0, express_validator_1.body)("_id").exists().withMessage("_id is required").isMongoId().withMessage("_id must be in a valid mongoId format"),
    validate_1.validate
];
