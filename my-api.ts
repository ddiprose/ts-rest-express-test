
import { initContract } from '@ts-rest/core';
import { generateOpenApi } from '@ts-rest/open-api';
import { z } from 'zod';

const c = initContract();

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});

export const contract = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    responses: {
      201: PostSchema,
    },
    body: z.object({
      title: z.string(),
      body: z.string(),
    }),
    summary: 'Create a post',
  },
  getPost: {
    method: 'GET',
    path: `/posts/:id`,
    query: z.object({
        foo: z.string().optional()
    }),
    responses: {
      200: PostSchema.nullable(),
    },
    summary: 'Get a post by id',
  },
});

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: 'Posts API',
    version: '1.0.0',
  },
});