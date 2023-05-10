import { ExcludedPath, ExcludedPaths } from "../utility/authorize";
import { Route, Routes } from "./routes.types";
import Routers from "../feature-module/index"



export const routes: Routes = [
    new Route("/user", Routers.UserRouter),
    new Route("/auth", Routers.AuthRouter),
    new Route("/level", Routers.LevelRouter),
    new Route("/word", Routers.WordRouter),
    new Route("/category", Routers.CategoryRouter),
    new Route("/tournament", Routers.TournamentRouter),
    new Route("/notification", Routers.NotificationRouter),
    new Route("/comment", Routers.CommentRouter),
    new Route("/participant", Routers.ParticipantRouter),
];


export const excludedPaths: ExcludedPaths = [
    new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/auth/register", "POST"),
    new ExcludedPath("/auth/refreshtoken", "POST"),
];
