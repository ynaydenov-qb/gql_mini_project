import { ApolloServer, AuthenticationError } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import * as dotenv from "dotenv";
import { logger } from "./logger";

dotenv.config();

const authenticationContextMiddleware = ({ req }: { req: any }) => {
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authenticationContextMiddleware,
});

server.listen().then(({ url }) => {
  logger.info(`Server started at ${url}`);
  console.log(`Server started at ${url}`);
});
