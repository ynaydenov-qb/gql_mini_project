import { bookResolvers } from "./bookResolver";
import { customerResolvers } from "./customerResolver";
import { lendingRecordResolvers } from "./lendingRecordResolver";
import { mergeResolvers } from "@graphql-tools/merge";

export const resolvers = mergeResolvers([
  bookResolvers,
  customerResolvers,
  lendingRecordResolvers,
]);
