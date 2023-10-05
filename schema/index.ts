import { GraphQLSchema } from 'graphql';
import categoryType from './types/Category';
import mutationType from './types/Mutation';
import queryType from './types/Query';
import studioType from './types/Studio';

export default new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    types: [categoryType, studioType]
});
