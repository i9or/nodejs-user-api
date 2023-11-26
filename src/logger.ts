import pino from "pino";

export const logger = pino({
  level: "debug", // TODO: add warn level if running in production mode
  transport: {
    target: "pino-pretty",
  },
});
