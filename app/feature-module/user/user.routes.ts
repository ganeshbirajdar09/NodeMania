import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";
import { PAGINATION_VALIDATIONS, PARAM_ID_VALIDATIONS } from "../../utility/global.validations";
import userService from "./user.service";
import { REGISTRATION_VALIDATOR } from "../auth/auth.validation";
import { COMMENT_VALIDATIONS } from "../comment/comment.validations";


const router = Router();

router.get("/", permit([ROLES.ADMIN]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query;
        const result = await userService.getAll(queryData);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//create moderator
router.post("/", permit([ROLES.ADMIN]), REGISTRATION_VALIDATOR, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const result = await userService.createModerator(user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
//promote user to moderator
router.patch("/promote/:id", permit([ROLES.ADMIN]), PARAM_ID_VALIDATIONS, PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.promoteToModerator(req.params.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
router.get("/participated", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query;
        const result = await userService.getParticipatedTournaments(queryData, res.locals.user.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
router.get("/hosted", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query;
        const result = await userService.allTournamentsHosted(queryData, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
router.get("/approvals", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query;
        const result = await userService.allTournamentRequests(queryData, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

router.get("/:id", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.findById(req.params.id, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", permit([ROLES.ADMIN]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.remove(req.params.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});



export default router