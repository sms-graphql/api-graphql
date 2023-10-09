import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';
import filmType from './Film';
import personInterface, { personFields } from '../interfaces/PersonInterface';
import { getMoviesByActorId } from '../../database';

export default new GraphQLObjectType({
    name: 'Actor',
    interfaces: [personInterface],
    fields: () => ({
        ...personFields,
        movies: {
            type: new GraphQLList(filmType),
            resolve: (actor, args) => {
                return getMoviesByActorId(actor.id);
            },
        },
    }),
});
