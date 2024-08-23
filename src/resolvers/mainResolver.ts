import { mergeResolvers } from '@graphql-tools/merge';
import { bookResolvers } from './bookResolver';
import { customerResolvers } from './customerResolver';
import { lendingRecordResolvers } from './lendingRecordResolver';

export const resolvers = mergeResolvers([
  bookResolvers,
  customerResolvers,
  lendingRecordResolvers,
]);
