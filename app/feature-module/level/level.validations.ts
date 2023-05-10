import { body } from "express-validator";
import { validate } from "../../utility/validate";


export const CREATE_LEVEL_VALIDATIONS = [
    body("name").exists().withMessage("name is required").isString().withMessage("name must be a string value"),
    validate
]
export const UPDATE_LEVEL_VALIDATIONS = [
    body("name").exists().withMessage("name is required").isString().withMessage("name must be a string value"),
    body("_id").exists().withMessage("_id is required").isMongoId().withMessage("_id must be in a valid mongoId format"),
    validate
]