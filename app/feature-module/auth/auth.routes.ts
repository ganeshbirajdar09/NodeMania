import { Router, Request, Response, NextFunction } from "express";
import authService from "./auth.service";
import { ResponseHandler } from "../../utility/response.handler"
import { ADMIN_REGISTRATION_VALIDATOR, LOGIN_VALIDATOR, REFRESH_TOKEN_VALIDATIONS, REGISTRATION_VALIDATOR } from "./auth.validation";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";

const router = Router();

router.post("/refreshtoken", REFRESH_TOKEN_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        const result = await authService.generateAccessToken(refreshToken)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})
router.post("/register", REGISTRATION_VALIDATOR, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const result = await authService.createUser(user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error)
    }
})
router.post("/login", LOGIN_VALIDATOR, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = req.body;
        const result = await authService.login(credentials);
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})


export default router;