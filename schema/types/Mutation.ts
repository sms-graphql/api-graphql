import { GraphQLObjectType } from 'graphql';
import createPlaylistMutation from '../mutations/createPlaylistMutation';
import createUserMutation from '../mutations/createUserMutation';
import addFilmToPlaylistMutation from '../mutations/addFilmToPlaylistMutation';
import removeFilmFromPlaylistMutation from '../mutations/removeFilmFromPlaylistMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlaylist: createPlaylistMutation,
    createUser: createUserMutation,
    addFilmToPlaylist: addFilmToPlaylistMutation,
    removeFilmFromPlaylist: removeFilmFromPlaylistMutation
  },
});
