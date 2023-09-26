import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { getMoviesByDirectorId } from '../../database';
import filmType from './Film';



export default new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {
            type: GraphQLInt
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

