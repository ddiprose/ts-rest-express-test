import { initServer } from "@ts-rest/express";
import { logRouteMiddleware } from "../middleware/log-route";
import { contract } from "../my-api";
import { createPost } from "./create-post";
import { getPost } from "./get-post";

export const router = initServer().router(contract, {
  createPost: {
    middleware: [logRouteMiddleware],
    handler: createPost,
  },
  getPost: {
    middleware: [logRouteMiddleware],
    handler: getPost,
  },
});
