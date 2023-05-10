import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";
import { PAGINATION_VALIDATIONS, PARAM_ID_VALIDATIONS } from "../../utility/global.validations";
import commentService from "./comment.service";
import { COMMENT_EDIT_VALIDATIONS, COMMENT_VALIDATIONS, FLAG_COMMENT_VALIDATIONS } from "./comment.validations";


const router = Router();

//read all comments of a tournament or requests
router.get("/:id", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query
        const result = await commentService.readAll(queryData, req.params.id, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
router.get("/:id/review", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query
        const result = await commentService.readReviews(queryData, req.params.id, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//comment on tournament
router.post("/", permit([ROLES.ADMIN, ROLES.USER]), COMMENT_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, tournamentId } = req.body
        const result = await commentService.create(tournamentId, res.locals.user, message);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//flag a comment 
router.patch("/flag", permit([ROLES.ADMIN, ROLES.USER]), FLAG_COMMENT_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { commentId } = req.body
        const result = await commentService.flagComment(commentId, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//edit comment in tournament
router.patch("/", permit([ROLES.ADMIN, ROLES.USER]), COMMENT_EDIT_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = req.body
        const result = await commentService.editComment(comment, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
//delete comment 
router.delete("/:id", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await commentService.remove(req.params.id, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
export default router;