import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import personInterface, { personFields } from '../interfaces/PersonInterface';
import { getMoviesByDirectorId } from '../../database';
import movieType from './Movie';

export default new GraphQLObjectType({
    name: 'Director',
    interfaces: [personInterface],
    fields: () => ({
        ...personFields,
        movies: {
            type: new GraphQLList(movieType),
            resolve: (director, args) => {
                return getMoviesByDirectorId(director.id);
            },
        },
    }),
});

