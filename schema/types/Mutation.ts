import { GraphQLObjectType } from 'graphql';
import createPlaylistMutation from '../mutations/createPlaylistMutation';
import createUserMutation from '../mutations/createUserMutation';
import addMovieToPlaylistMutation from '../mutations/addMovieToPlaylistMutation';
import removeMovieFromPlaylistMutation from '../mutations/removeMovieFromPlaylistMutation';
import updatePlaylistNameMutation from '../mutations/updatePlaylistNameMutation';
import removePlaylistMutation from '../mutations/removePlaylistMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlaylist: createPlaylistMutation,
    createUser: createUserMutation,
    addMovieToPlaylist: addMovieToPlaylistMutation,
    removeMovieFromPlaylist: removeMovieFromPlaylistMutation,
    updatePlaylistName: updatePlaylistNameMutation,
    removePlaylist: removePlaylistMutation
  },
});
