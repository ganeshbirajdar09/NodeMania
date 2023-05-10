import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/constants";
import { PAGINATION_VALIDATIONS, PARAM_ID_VALIDATIONS } from "../../utility/global.validations";
import participantService from "./participant.service";
import { JOIN_TOURNAMENT_VALIDATIONS, PLAY_TOURNAMENT_VALIDATIONS } from "../tournament/tournament.validations";


const router = Router();

//play --> send time and score
router.patch("/", permit([ROLES.ADMIN, ROLES.USER]), PLAY_TOURNAMENT_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playDetails = req.body
        const result = await participantService.play(playDetails, res.locals.user.id);
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
});
//join a tournament
router.post("/join", permit([ROLES.ADMIN, ROLES.USER]), JOIN_TOURNAMENT_VALIDATIONS, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tournamentId } = req.body
        const result = await participantService.joinTournament(tournamentId, res.locals.user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

//leave a tournament
router.patch("/leave", permit([ROLES.ADMIN, ROLES.USER]), JOIN_TOURNAMENT_VALIDATIONS,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tournamentId } = req.body
        const result = await participantService.leaveTournament(tournamentId, res.locals.user.id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

export default router