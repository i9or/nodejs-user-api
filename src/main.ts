import "dotenv/config";

import { App } from "@tinyhttp/app";
import { pinoHttp } from "pino-http";
import { cors } from "@tinyhttp/cors";
import * as bodyParser from "body-parser";

import { logger } from "./logger";
import { serverErrorHandler } from "./handlers/serverErrorHandler";
import { notFoundHandler } from "./handlers/notFoundHandler";
import { ApiV1Controller } from "./controllers/api/v1/ApiV1Controller";
import { PORT } from "./configuration";

(async () => {
  const httpLogger = pinoHttp({ logger });

  const app = new App({
    noMatchHandler: notFoundHandler,
    onError: serverErrorHandler,
  });

  try {
    app
      .use(httpLogger)
      .use(
        cors({
          credentials: true,
        }),
      )
      .options("*", cors())
      .use(bodyParser.json())
      .use(ApiV1Controller.path, new ApiV1Controller().router)
      .listen(PORT, () => {
        logger.info(`🚀 Listening on http://localhost:${PORT}`);
      });
  } catch (err: unknown) {
    logger.error(err);
  }
})();
