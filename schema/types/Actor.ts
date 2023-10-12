import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';
import movieType from './Movie';
import personInterface, { personFields } from '../interfaces/PersonInterface';
import { getMoviesByActorId } from '../../database';

export default new GraphQLObjectType({
    name: 'Actor',
    interfaces: [personInterface],
    fields: () => ({
        ...personFields,
        movies: {
            type: new GraphQLList(movieType),
            resolve: (actor, args) => {
                return getMoviesByActorId(actor.id);
            },
        },
    }),
});
