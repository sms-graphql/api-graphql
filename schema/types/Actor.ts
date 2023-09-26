import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import filmType from './Film';
import { getMoviesByActorId } from '../../database';



export default new GraphQLObjectType({
    name: 'Actor',
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
            resolve: (actor, args) => {
                return getMoviesByActorId(actor.id);
            },
        },
    }),
});

