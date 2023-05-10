"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLAG_COMMENT_VALIDATIONS = exports.COMMENT_EDIT_VALIDATIONS = exports.COMMENT_VALIDATIONS = void 0;
const express_validator_1 = require("express-validator");
exports.COMMENT_VALIDATIONS = [
    (0, express_validator_1.body)("message").exists().withMessage("message is required").isString().withMessage("message must be a string value").isLength({ min: 1 }).withMessage("message must have atleast 1 letter"),
    (0, express_validator_1.body)("tournamentId").exists().withMessage("tournamentId is required").isString().withMessage("tournamentId must be a string value").isMongoId().withMessage("commendId must be in a valid mongodId format")
];
exports.COMMENT_EDIT_VALIDATIONS = [
    (0, express_validator_1.body)("message").exists().withMessage("message is required").isString().withMessage("message must be a string value").isLength({ min: 1 }).withMessage("message must have atleast 1 letter"),
    (0, express_validator_1.body)("_id").exists().withMessage("_id is required").isString().withMessage("_id must be a string value").isMongoId().withMessage("_id must be in a valid mongodId format ")
];
exports.FLAG_COMMENT_VALIDATIONS = [
    (0, express_validator_1.body)("commentId").exists().withMessage("commentid is required").isString().withMessage("message must be a string value").isMongoId().withMessage("commendId must be in a valid mongodId format")
];
