import { AppRouteOptions } from "@ts-rest/express";
import { contract } from "../my-api";

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
