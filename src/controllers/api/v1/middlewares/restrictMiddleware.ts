import { NextFunction, Request, Response } from "@tinyhttp/app";
import { logger } from "../../../../logger";

export const restrictMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.debug("### RESTRICTED AREA ###");

  try {
    return next();
  } catch (err: unknown) {
    return next(err);
  }
};
