import { Router, Request, Response, NextFunction } from "express";
import categoryService from "./category.service";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";
import { PAGINATION_VALIDATIONS, PARAM_ID_VALIDATIONS } from "../../utility/global.validations";
import { CREATE_CATEGORY_VALIDATIONS, UPDATE_CATEGORY_VALIDATIONS } from "./category.validations";


const router = Router();

router.get("/:id", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query
        const result = await categoryService.getAll(queryData)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})

router.post("/", permit([ROLES.ADMIN]), CREATE_CATEGORY_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const result = await categoryService.create(name)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})
router.patch("/", permit([ROLES.ADMIN]), UPDATE_CATEGORY_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, ...categoryData } = req.body
        const result = await categoryService.update(_id, categoryData)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})


router.delete("/:id", permit([ROLES.ADMIN]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.removeCategoryWithWords(req.params.id)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})

router.get("/:id", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.findById(req.params.id)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})


export default router;