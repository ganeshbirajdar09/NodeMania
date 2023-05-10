import { body,check } from "express-validator";
import { validate } from "../../utility/validate";

export const TOURNAMENT_CREATE_VALIDATIONS = [
    body("name").exists().withMessage("name is required").isString().withMessage("name must be a string"),
    body("categories").exists().withMessage("name is required").isArray({ min: 1 }).withMessage("At least one category is required"),
    body("startDate").exists().withMessage("start date is required").isDate().withMessage("must in YYYY-MM-DD format"),
    check("endDate")
    .isDate()
    .withMessage("endDate should be a date")
    .custom((endDate, { req }) => {
      if (
        req.body &&
        new Date(endDate).getTime() < new Date(req?.body.startDate).getTime()
      ) {
        throw new Error("start date must be before end date");
      }
      return true;
    }),
    body("level").exists().withMessage("Level is required").isIn(['easy', 'medium', 'hard']),
    body("words").exists().withMessage("words are required").isArray({ min: 1 }).withMessage("At least one word is required"),
    body("wordLimit").exists().withMessage("wordLimit is required").isInt({ min: 1 }).withMessage("Word limit must be a greater than 1"),
    validate,
]
export const JOIN_TOURNAMENT_VALIDATIONS = [
    body("tournamentId").exists().withMessage("tournamentId is required").isString().withMessage("tournamentId must be a string").isMongoId().withMessage("must be in a valid mongodb format"),
    validate,
]
export const PLAY_TOURNAMENT_VALIDATIONS = [
    body("tournamentId").exists().withMessage("tournamentId is required").isString().withMessage("tournamentId must be a string").isMongoId().withMessage("must be in a valid mongodb format"),
    body("score").exists().withMessage("score is required").isInt({ min: 0 }).withMessage("score must a number and atleast 0").isMongoId(),
    body("timeTaken").exists().withMessage("timeTaken is required").isInt({ min: 1 }).withMessage("timeTaken must a number and atleast 1").isMongoId(),
    validate,
]