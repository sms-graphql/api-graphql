import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import { getPlaylistByUserId } from '../../database';
import playlistType from './Playlist';

export default new GraphQLObjectType({
    name: 'user',
    fields: {
        id: {
            type: GraphQLID
        },
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        phone_number: {
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
