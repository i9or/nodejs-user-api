import { Request, Response } from "@tinyhttp/app";
import { logger } from "../logger";

export const notFoundHandler = (req: Request, res: Response) => {
  logger.error(`404 Not Found: ${req.method} ${req.path}`);

  res.status(404).json({
    message: "Resource not found",
  });
};
