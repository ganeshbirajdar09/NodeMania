import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";
import { PAGINATION_VALIDATIONS, PARAM_ID_VALIDATIONS } from "../../utility/global.validations";
import notificationService from "./notification.service";


const router = Router();

router.get("/", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query
        const result = await notificationService.getAll(queryData, res.locals.user)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
});


export default router