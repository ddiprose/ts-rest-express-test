// in folder @types/fastify/index.d.ts
import fastify from "fastify"; 

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    verifyJWT: function;
  }
}