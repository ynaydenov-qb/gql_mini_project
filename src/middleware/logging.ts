import { Request } from "express";
import { logger } from "../logger";

export const loggingContextMiddleware = ({ req }: { req: Request }) => {
  logger.info(
    `Received request: ${req.method} ${req.url} with headers: ${JSON.stringify(
      req.headers
    )}`
  );

  return {};
};
