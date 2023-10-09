import { GraphQLObjectType } from 'graphql';
import createPlaylistMutation from '../mutations/createPlaylistMutation';
import createUserMutation from '../mutations/createUserMutation';
import addFilmToPlaylistMutation from '../mutations/addFilmToPlaylistMutation';
import removeFilmFromPlaylistMutation from '../mutations/removeFilmFromPlaylistMutation';
import updatePlaylistNameMutation from '../mutations/updatePlaylistNameMutation';
import removePlaylistMutation from '../mutations/removePlaylistMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlaylist: createPlaylistMutation,
    createUser: createUserMutation,
    addFilmToPlaylist: addFilmToPlaylistMutation,
    removeFilmFromPlaylist: removeFilmFromPlaylistMutation,
    updatePlaylistName: updatePlaylistNameMutation,
    removePlaylist: removePlaylistMutation
  },
});
