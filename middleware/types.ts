import { AppRoute } from "@ts-rest/core";
import { AppRouteOptions } from "@ts-rest/express";

export type GenericMiddleware = Exclude<AppRouteOptions<AppRoute>['middleware'], undefined>[number];
