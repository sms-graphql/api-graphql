import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Category',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        }
    }
});
