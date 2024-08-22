import { AuthenticationError } from "apollo-server";
import { logger } from "../logger";

export const authenticationContextMiddleware = ({ req }: { req: any }) => {
  const authHeaderUser: string = req.headers.authorization || "";
  const expectedHeader: string = process.env.AUTH_TOKEN!;

  if (authHeaderUser !== expectedHeader) {
    logger.error(`Unauthorized access attempt: ${req.method} ${req.url}`);
    throw new AuthenticationError("Unauthorized");
  }
  logger.info(
    `Received request: ${req.method} ${req.url} with headers: ${JSON.stringify(
      req.headers
    )}`
  );

  return {};
};
