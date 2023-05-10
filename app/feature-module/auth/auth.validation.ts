import { body } from "express-validator";
import { validate } from "../../utility/validate";


export const ADMIN_REGISTRATION_VALIDATOR = [
    body("name").exists().withMessage("name is required").isString().withMessage("name must be a string value"),
    body("email").exists().withMessage("email is required").isEmail().withMessage("email should in a valid email format"),
    body("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("password is required"),
    validate
]
export const REGISTRATION_VALIDATOR = [
    body("username").exists().withMessage("name is required").isString().withMessage("name must be a string value"),
    body("email").exists().withMessage("email is required").isEmail().withMessage("email should in a valid email format"),
    body("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("password is required"),
    validate
]

export const LOGIN_VALIDATOR = [
    body("email").exists().withMessage("email is required").isEmail().withMessage("email should in a valid email format"),
    body("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("password is required"),
    validate
]
export const REFRESH_TOKEN_VALIDATIONS = [
    body("refreshToken").exists().withMessage("refreshtoken is required").isString().withMessage("refreshToken should ben in a valid email format"),
    validate
]