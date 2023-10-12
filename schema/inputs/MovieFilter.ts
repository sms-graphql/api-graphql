import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
    name: 'MovieFilterInput',
    fields: {
        title: { type: GraphQLString },
    },
});
