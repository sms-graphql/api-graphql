import { GraphQLSchema } from 'graphql';
import mutationType from './types/Mutation';
import queryType from './types/Query';

export default new GraphQLSchema({ query: queryType, mutation: mutationType });
