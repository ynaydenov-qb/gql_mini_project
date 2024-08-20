import { ApolloServer, AuthenticationError } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import * as dotenv from "dotenv";

dotenv.config();

const authenticationContextMiddleware = ({ req }: { req: any }) => {
  const authHeaderUser: string = req.headers.authorization || "";
  const expectedHeader: string = process.env.AUTH_TOKEN!;

  if (authHeaderUser !== expectedHeader) {
    throw new AuthenticationError("Unauthorized");
  }

  return {};
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authenticationContextMiddleware,
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});
