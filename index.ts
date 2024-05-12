import { createExpressEndpoints } from '@ts-rest/express';
import express from 'express';
import { contract, openApiDocument } from './my-api';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import logger from 'pino-http'
import { randomUUID } from 'crypto';

// function handle (req, res) {
//   req.log.info('something else')
//   res.end('hello world')
// }

const app = express()
app.use(express.json())
app.use(logger({
  // Define a custom request id function
  genReqId: function (req, res) {
    const existingID = req.id ?? req.headers["x-request-id"]
    if (existingID) return existingID
    const id = randomUUID()
    res.setHeader('X-Request-Id', id)
    return id
  },

  // Set to `false` to prevent standard serializers from being wrapped.
  wrapSerializers: true,

  // Define a custom logger level
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    } else if (res.statusCode >= 500 || err) {
      return 'error'
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent'
    }
    return 'info'
  },

  // Define a custom receive message
  customReceivedMessage: function (req, res) {
    return 'request received'
  },

  // Define a custom error message
  customErrorMessage: function (req, res, err) {
    return 'request errored with status code: ' + res.statusCode
  },
}))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.listen(3000);

createExpressEndpoints(contract, router, app);
