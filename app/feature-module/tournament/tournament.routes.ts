import { Router, Request, Response, NextFunction } from "express";
import tournamentService from "./tournament.service";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";
import { PAGINATION_VALIDATIONS, PARAM_ID_VALIDATIONS } from "../../utility/global.validations";


const router = Router();

//create a tournament
router.post("/", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournamentData = req.body;
        const { user } = res.locals
        const result = await tournamentService.create(user, tournamentData);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

// all 
router.get("/", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query;
        const result = await tournamentService.getAllApproved(queryData);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

// featured
router.get("/featured", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query;
        const result = await tournamentService.getAllFeatured(queryData);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
//feature a tournament
router.patch("/featured/:id", permit([ROLES.ADMIN]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tournamentService.featureATournament(req.params.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//upcoming
router.get("/upcoming", permit([ROLES.ADMIN, ROLES.USER]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query;
        const result = await tournamentService.getAllUpcoming(queryData);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//tourny requests
router.get("/pending", permit([ROLES.ADMIN]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryData = req.query;
        const result = await tournamentService.getAllPending(queryData);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//set tourny status
router.patch("/status", permit([ROLES.ADMIN]), PAGINATION_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, status } = req.body;
        const result = await tournamentService.setTournamentStatus(_id, status);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//get tourny by Id
router.get("/:id", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tournamentService.findById(req.params.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});
//edit tournament details
router.patch("/:id", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tournamentService.findById(req.params.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//delete a tournament
router.delete("/:id", permit([ROLES.ADMIN, ROLES.USER]), PARAM_ID_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tournamentService.remove(req.params.id, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});


export default router;
