import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { getActorsByMovieId, getDirectorsByMovieId } from '../../database';
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
