import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import { ApolloServer, AuthenticationError } from "apollo-server";
import { Request } from "express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers/mainResolver";
import { logger } from "./logger";
import { authenticationContextMiddleware } from "./middleware/authentication";
import { loggingContextMiddleware } from "./middleware/logging";

const createContext = ({ req }: {req : Request}) => {
  // Initialize an empty context object
  let context = {};

  // Apply authentication and logging middleware
  context = { ...context, ...authenticationContextMiddleware({ req }) };
  context = { ...context, ...loggingContextMiddleware({ req }) };

  return context;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

server.listen().then(({ url }) => {
  logger.info(`Server started at ${url}`);
});
