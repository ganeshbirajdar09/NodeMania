import { Router, Request, Response, NextFunction } from "express";
import levelService from "./level.service";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";
import { CREATE_LEVEL_VALIDATIONS, UPDATE_LEVEL_VALIDATIONS } from "./level.validations";
import { PAGINATION_VALIDATIONS, PARAM_ID_VALIDATIONS } from "../../utility/global.validations";


const router = Router();

router.get("/", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query
        const result = await levelService.getAll(queryData)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
});

router.get("/:id", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await levelService.findById(req.params.id)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
});

router.post("/", permit([ROLES.ADMIN]), CREATE_LEVEL_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const result = await levelService.create(name)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
});

router.patch("/", permit([ROLES.ADMIN]), UPDATE_LEVEL_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, ...data } = req.body
        const result = await levelService.update(_id, data)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
});


router.delete("/:id", permit([ROLES.ADMIN]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await levelService.remove(req.params.id)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
});

export default router;
