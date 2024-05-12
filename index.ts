import { AppRouteOptions, createExpressEndpoints, initServer } from '@ts-rest/express';
import express from 'express';
import { contract, openApiDocument } from './my-api';
// import { initialize } from 'express-openapi';
import swaggerUi from 'swagger-ui-express';
import { getPost, getPostRoute } from './routes/get-post';
import { AppRoute } from '@ts-rest/core';
import { createPost } from './routes/create-post';
import { logRouteMiddleware } from './middleware/log-route';

const s = initServer();

// type A = AppRouteOptions<typeof contract.getPost>




// const getPostHandler: A['handler'] = async({ params: { id } }) => {
//   // const post = prisma.post.findUnique({ where: { id } });

//   return {
//     status: 200,
//     body: {
//       body: 'Hello world',
//       id,
//       title: 'My first post',
//     }
//   };
// }

const router = s.router(contract, {
  createPost: {
    middleware: [
      logRouteMiddleware,
    ],
    handler: createPost,
  },
  getPost: s.route(contract.getPost, {
    middleware: [
      logRouteMiddleware,
    ],
    handler: getPost,
  }),
});


const app = express()
  .use(express.json())
  .use('/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.listen(3000);

createExpressEndpoints(contract, router, app);
