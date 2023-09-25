import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
} from 'graphql';

const filmType = new GraphQLObjectType({
    name: 'Film',
    fields: {
        id: {
            type: GraphQLID
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
    }
});

export default filmType;

