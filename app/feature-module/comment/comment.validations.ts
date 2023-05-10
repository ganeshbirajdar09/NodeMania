import { body } from "express-validator";
import { validate } from "../../utility/validate";


export const COMMENT_VALIDATIONS = [
    body("message").exists().withMessage("message is required").isString().withMessage("message must be a string value").isLength({ min: 1 }).withMessage("message must have atleast 1 letter"),
    body("tournamentId").exists().withMessage("tournamentId is required").isString().withMessage("tournamentId must be a string value").isMongoId().withMessage("commendId must be in a valid mongodId format")
]
export const COMMENT_EDIT_VALIDATIONS = [
    body("message").exists().withMessage("message is required").isString().withMessage("message must be a string value").isLength({ min: 1 }).withMessage("message must have atleast 1 letter"),
    body("_id").exists().withMessage("_id is required").isString().withMessage("_id must be a string value").isMongoId().withMessage("_id must be in a valid mongodId format ")
]
export const FLAG_COMMENT_VALIDATIONS = [
    body("commentId").exists().withMessage("commentid is required").isString().withMessage("message must be a string value").isMongoId().withMessage("commendId must be in a valid mongodId format")
]