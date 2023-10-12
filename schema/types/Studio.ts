import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import { getMoviesByStudioId } from '../../database';
import movieType from './Movie';

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
            type: new GraphQLList(movieType),
            resolve: (studio, args, context) => {
                return getMoviesByStudioId(studio.id);
            },
        },
    }),
});

export default StudioType