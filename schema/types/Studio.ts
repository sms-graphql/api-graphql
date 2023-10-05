import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import { getFilmsByStudioId } from '../../database';
import filmType from './Film';

export const StudioType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Studio',
    fields: () => ({
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
    }),
});

export default StudioType