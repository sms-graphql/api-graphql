import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';
import playlistType from './Playlist';
import { getPlaylistByUserId } from '../../database';

export default new GraphQLObjectType({
    name: 'Viewer',
    fields: {
        name: {
            type: GraphQLString
        },
        date_of_birth: {
            type: GraphQLString
        },
        playlist: {
            type: new GraphQLList(playlistType),
            resolve: (user, args, context) => {
                return getPlaylistByUserId(user.id);
            },
        },
    }
});
