import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";
import wordService from "./word.service";
import { PAGINATION_VALIDATIONS, PARAM_ID_VALIDATIONS } from "../../utility/global.validations";
import { ADD_WORD_VALIDATIONS, UPDATE_WORD_VALIDATIONS } from "./word.validations";

const router = Router();

router.get("/", permit([ROLES.ADMIN,ROLES.USER]), PAGINATION_VALIDATIONS,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query
        const result = await wordService.getAll(queryData);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

router.post("/", permit([ROLES.ADMIN]), ADD_WORD_VALIDATIONS,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const word = req.body;
        const result = await wordService.create(word);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

router.patch("/", permit([ROLES.ADMIN]), UPDATE_WORD_VALIDATIONS,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, ...wordData } = req.body;
        const result = await wordService.update(_id, wordData);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
router.delete("/:id", permit([ROLES.ADMIN]), PARAM_ID_VALIDATIONS,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await wordService.remove(req.params.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

router.get("/:id", permit([ROLES.ADMIN,ROLES.USER]),PARAM_ID_VALIDATIONS ,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await wordService.findById(req.params.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});


export default router;
