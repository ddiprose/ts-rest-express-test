import { contract } from "../my-api";
import { AppRouteOptions } from "@ts-rest/express";

export const createPost: AppRouteOptions<
  typeof contract.createPost
>["handler"] = async ({ req, body }) => {
  // const post = await prisma.post.findUnique({ where: { id } });

  return {
    status: 201,
    body: {
      id: '1',
      ...body,
    },
  };
};

// export const createPost = s.route(contract.createPost, async ({ request, body }) => {
//   // const post = await prisma.post.create({
//   //   data: body,
//   // });
//   request.log.info("Post created", body);
//   request.log.error({ err: new Error() }, 'error');

//   return {
//     status: 201,
//     body: {
//       id: "1",
//       ...body,
//     },
//   };
// });
