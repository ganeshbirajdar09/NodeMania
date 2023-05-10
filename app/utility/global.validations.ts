import { body, query, param } from "express-validator";
import { validate } from "./validate";


export const PARAM_ID_VALIDATIONS = [
    param("id").exists().withMessage("id is required").isMongoId().withMessage("must be a valid mongoId"),
    validate
]

//validations for genericPipeline
export const PAGINATION_VALIDATIONS = [
    query("page").optional().isNumeric().withMessage("page value must be numeric"),
    query("limit").optional().isNumeric().withMessage("limit value must be numeric"),
    query("sortFilter").optional().isString().isLength({ min: 1 }).withMessage("sortFilter must be string"),
    query("sortOrder").optional().isString().isLength({ min: 3 }).isIn(["asc", "dsc"]).withMessage("must be eithr asc or dsc"),
    query("isModerator").optional().isString().isLength({ min: 3 }).isIn(["true", "false"]).withMessage("must be eithr true or false"),
    validate
]