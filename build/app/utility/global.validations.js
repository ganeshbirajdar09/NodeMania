"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGINATION_VALIDATIONS = exports.PARAM_ID_VALIDATIONS = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("./validate");
exports.PARAM_ID_VALIDATIONS = [
    (0, express_validator_1.param)("id").exists().withMessage("id is required").isMongoId().withMessage("must be a valid mongoId"),
    validate_1.validate
];
//validations for genericPipeline
exports.PAGINATION_VALIDATIONS = [
    (0, express_validator_1.query)("page").optional().isNumeric().withMessage("page value must be numeric"),
    (0, express_validator_1.query)("limit").optional().isNumeric().withMessage("limit value must be numeric"),
    (0, express_validator_1.query)("sortFilter").optional().isString().isLength({ min: 1 }).withMessage("sortFilter must be string"),
    (0, express_validator_1.query)("sortOrder").optional().isString().isLength({ min: 3 }).isIn(["asc", "dsc"]).withMessage("must be eithr asc or dsc"),
    (0, express_validator_1.query)("isModerator").optional().isString().isLength({ min: 3 }).isIn(["true", "false"]).withMessage("must be eithr true or false"),
    validate_1.validate
];
