import { ApolloServer, AuthenticationError } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { logger } from "./logger";
import { authenticationContextMiddleware } from "./middleware/authentication";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authenticationContextMiddleware,
});

server.listen().then(({ url }) => {
  logger.info(`Server started at ${url}`);
  console.log(`Server started at ${url}`);
});
