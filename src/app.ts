import { ApolloServer, gql } from "apollo-server";
import { BooksDataSource } from './data/booksDataSource';
import { CustomersDataSource } from './data/customersDataSource';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const booksDataSource = new BooksDataSource();
const customersDataSource = new CustomersDataSource();

const resolvers = {
    Query: {
        hello: () => "Apollo server started"
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`);
  });
  