import { ApolloServer } from 'apollo-server';
import { Request } from 'express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/mainResolver';
import { logger } from './logger';
import { authenticationContextMiddleware } from './middleware/authentication';
import { loggingContextMiddleware } from './middleware/logging';
import { BooksDataSource } from './dataSources/booksDataSource';
import { CustomersDataSource } from './dataSources/customersDataSource';

const booksDataSource = new BooksDataSource();
const customersDataSource = new CustomersDataSource();

const createContext = ({ req }: { req: Request }) => {
  // Initialize an empty context object
  let context = {};

  // Apply authentication and logging middleware
  context = { ...context, ...authenticationContextMiddleware({ req }) };
  context = { ...context, ...loggingContextMiddleware({ req }) };

  context = { ...context, booksDataSource, customersDataSource };

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
