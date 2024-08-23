import { AuthenticationError } from "apollo-server";
import { Request } from "express";
import { env } from "../environment";

export const authenticationContextMiddleware = ({ req }: { req: Request }) => {
  const authHeaderUser: string = req.headers.authorization || "";
  const expectedHeader: string = env.get("AUTH_TOKEN");

  if (authHeaderUser !== expectedHeader) {
    throw new AuthenticationError("Unauthorized");
  }

  return {};
};
