import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Film',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        id_studio: {
            type: GraphQLString
        },
        id_category: {
            type: GraphQLString
        }
    }),
});
