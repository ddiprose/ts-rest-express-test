import { GenericMiddleware } from "./types";

const logRoute: GenericMiddleware = (req, res, next) => {
  console.log("Called: ", req.tsRestRoute.method, req.tsRestRoute.path);
  next();
};

export const logRouteMiddleware = logRoute as any;
