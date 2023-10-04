import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { getActorsByMovieId, getCategoryNameById, getDirectorsByMovieId, getStudioNameById } from '../../database';
import actorType from './Actor';
import directorType from './Director';

export const FilmType: GraphQLObjectType = new GraphQLObjectType({
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
        },
        category_name: {
            type: GraphQLString,
            resolve: (movie, args) => getCategoryNameById(movie.id_category)
        },
        studio_name: {
            type: GraphQLString,
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

export default FilmType
