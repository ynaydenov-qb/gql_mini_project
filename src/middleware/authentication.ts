import { AuthenticationError } from "apollo-server";
import { Request } from "express";
import { logger } from "../logger";

export const authenticationContextMiddleware = ({ req }: { req: Request }) => {
  const authHeaderUser: string = req.headers.authorization || "";
  const expectedHeader: string = process.env.AUTH_TOKEN!;

  if (authHeaderUser !== expectedHeader) {
    throw new AuthenticationError("Unauthorized");
  }
  logger.info(
    `Received request: ${req.method} ${req.url} with headers: ${JSON.stringify(
      req.headers
    )}`
  );

  return {};
};
