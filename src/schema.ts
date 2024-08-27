import { mergeTypeDefs } from '@graphql-tools/merge';
import { customerTypeDefs } from './schemas/customerSchema';
import { lendingRecordTypeDefs } from './schemas/lendingRecordSchema';
import { bookTypeDefs } from './schemas/bookSchema';
import { queryAndMutationTypeDefs } from './schemas/queryAndMutationSchema';

// Merge all the type definitions into one
export const typeDefs = mergeTypeDefs([
  customerTypeDefs,
  lendingRecordTypeDefs,
  bookTypeDefs,
  queryAndMutationTypeDefs,
]);
