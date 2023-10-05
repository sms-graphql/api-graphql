import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import personInterface from '../interfaces/PersonInterface';
import { getMoviesByDirectorId } from '../../database';
import filmType from './Film';

export default new GraphQLObjectType({
    name: 'Director',
    interfaces: [personInterface],
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: (director) => director.id,
        },
        last_name: {
            type: GraphQLString
        },
        first_name: {
            type: GraphQLString
        },
        date_of_birth: {
            type: GraphQLString
        },
        movies: {
            type: new GraphQLList(filmType),
            resolve: (director, args) => {
                return getMoviesByDirectorId(director.id);
            },
        },
    }),
});

