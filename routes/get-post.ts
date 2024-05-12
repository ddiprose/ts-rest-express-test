// import { initServer } from "@ts-rest/fastify";
import { AppRouteOptions, initServer } from "@ts-rest/express";
import { contract } from "../my-api";
import { AppRoute } from "@ts-rest/core";
import { AppRouteImplementation, AppRouteImplementationOrOptions } from "@ts-rest/express/src/lib/types";

// const route = { ...contract.getPost,
//     preHandler: app.auth([
//         app.verifyJWT,
//       ], {
//         relation: 'and'
//       }) as any,
// } as typeof contract.getPost;

export const getPostRoute = initServer().route(contract.getPost, {
  middleware: [
    (req, res, next) => {
      console.log("Called: ", req.tsRestRoute.method, req.tsRestRoute.path);
      next();
    },
  ],
  handler: async ({ params: { id }, query: { foo } }) => {
    // const post = await prisma.post.findUnique({ where: { id } });

    return {
      status: 200,
      body: {
        id,
        title: "Hello, world!",
        body: "This is a post.",
      },
    };
  },
});

type a = ReturnType<typeof initServer>['route']
type b = Parameters<ReturnType<typeof initServer>['route']>[0]

// const compose = <T extends any[], S extends ReturnType<typeof initServer>>(middlewares: T, server: S, route: Parameters<S['route']>[0], handler: Parameters<S['route']>[1]) => {
//   return server.route(route, handler);
// }

// const compose = <T extends any[], R extends Parameters<ReturnType<typeof initServer>['route']>>(middlewares: T, route: R[0], handler: Exclude<R[1], AppRouteOptions<R[0]>>) => {
//   return initServer().route(route, { middleware: middlewares, handler: 'handler' in handler ? handler.handler : handler });
// }

// const compose = <T extends any[], R extends AppRoute>(middlewares: T, route: R, args: AppRouteImplementation<R>) => {
//    return initServer().route(route, {
//     handler: args,
//    });
// }

export const getPost: AppRouteOptions<
  typeof contract.getPost
>["handler"] = async ({ params: { id }, query: { foo } }) => {
  // const post = await prisma.post.findUnique({ where: { id } });

  return {
    status: 200,
    body: {
      id,
      title: "Hello, world!",
      body: "This is a post.",
    },
  };
};
