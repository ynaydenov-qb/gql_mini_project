import { AuthenticationError } from "apollo-server";
import { Request } from "express";

export const authenticationContextMiddleware = ({ req }: { req: Request }) => {
  const authHeaderUser: string = req.headers.authorization || "";
  const expectedHeader: string = process.env.AUTH_TOKEN!;

  if (authHeaderUser !== expectedHeader) {
    throw new AuthenticationError("Unauthorized");
  }

  return {};
};
