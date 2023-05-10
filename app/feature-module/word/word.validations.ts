import { body } from "express-validator";
import { validate } from "../../utility/validate";


export const ADD_WORD_VALIDATIONS = [
    body("name").exists().withMessage("name is required").isString().withMessage("name must be a string value"),
    body("categories").exists().withMessage("categories is required").isArray().isLength({ min: 1 }).withMessage("add atleaset 1 category"),
    body("level").exists().withMessage("level is required").withMessage("level must be in a valid mongoId format"),
    validate
]
export const UPDATE_WORD_VALIDATIONS = [
    body("_id").exists().withMessage("_id is required").isMongoId().withMessage("_id must be in a valid mongoId format"),
    body("categories").optional().isArray().isLength({ min: 1 }).withMessage("add atleaset 1 category"),
    body("level").optional().isMongoId().withMessage("level must be in a valid mongoId format"),
    validate
]