import {
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLObjectType,
} from 'graphql';
import { getMoviesByPlaylistId } from '../../database';
import movieType from './Movie';

const playlistType = new GraphQLObjectType({
    name: 'Playlist',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        id_user: {
            type: GraphQLString
        },
        movies: {
            type: new GraphQLList(movieType),
            resolve: (playlist, args) => {
                return getMoviesByPlaylistId(playlist.id);
            },
        },
    }
});

export default playlistType;

