import { Application, json, NextFunction, Request, Response } from "express";
import { authorize } from "../utility/authorize";
import { excludedPaths, routes } from "./routes.data";
import { ResponseHandler } from "../utility/response.handler";
import helmet from "helmet";

export const registerRoutes = (app: Application) => {
  app.use(helmet());
  app.use(json());
  app.use(authorize(excludedPaths));

  for (let route of routes) {
    app.use(route.path, route.router);
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
