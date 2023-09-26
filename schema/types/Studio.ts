import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLList
} from 'graphql';
import filmType from './Film';
import { getFilmsByStudioId } from '../../database';

export default new GraphQLObjectType({
    name: 'Studio',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        hasProduced: {
            type: new GraphQLList(filmType),
            resolve: (studio, args, context) => {
                return getFilmsByStudioId(studio.id);
            },
        },
    }
});
