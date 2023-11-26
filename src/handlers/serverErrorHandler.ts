import { Request, Response } from "@tinyhttp/app";
import { logger } from "../logger";

export const serverErrorHandler = (err: Error, req: Request, res: Response) => {
  logger.error(err);

  res.status(500).json({
    error: err.message,
  });
};
