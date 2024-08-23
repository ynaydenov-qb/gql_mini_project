import { GraphQLScalarType, Kind } from 'graphql';

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom Date scalar type',
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new Error('DateScalar can only serialize Date objects');
  },
  parseValue(value: unknown): Date {
    if (typeof value !== 'string') {
      throw new Error(
        'DateScalar can only parse string values to Date objects',
      );
    }
    return new Date(value);
  },
  parseLiteral(ast): Date | null {
    if (ast.kind !== Kind.STRING) {
      return null;
    }
    return new Date(ast.value);
  },
});

export default DateScalar;
