import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';
import filmType from './Film';
import personInterface from '../interfaces/PersonInterface';
import { getMoviesByActorId } from '../../database';

export default new GraphQLObjectType({
    name: 'Actor',
    interfaces: [personInterface],
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: (actor) => actor.id,
        },
        last_name: {
            type: GraphQLString,
        },
        first_name: {
            type: GraphQLString,
        },
        date_of_birth: {
            type: GraphQLString,
        },
        movies: {
            type: new GraphQLList(filmType),
            resolve: (actor, args) => {
                return getMoviesByActorId(actor.id);
            },
        },
    }),
});
