import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { getActorsByMovieId, getCategoryNameById, getDirectorsByMovieId, getStudioNameById } from '../../database';
import actorType from './Actor';
import categoryType from './Category';
import directorType from './Director';
import studioType from './Studio';


export const MovieType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Movie',
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
        },
        category: {
            type: categoryType,
            resolve: (movie, args) => getCategoryNameById(movie.id_category)
        },
        studio: {
            type: studioType,
            resolve: (movie, args) => getStudioNameById(movie.id_studio)
        },
        actors: {
            type: new GraphQLList(actorType),
            resolve: (movie, args) => {
                return getActorsByMovieId(movie.id);
            },
        },
        directors: {
            type: new GraphQLList(directorType),
            resolve: (movie, args) => {
                return getDirectorsByMovieId(movie.id)
            }
        }
    }),
});

export default MovieType
