import { GraphQLObjectType } from 'graphql';
import createPlaylistMutation from '../mutations/createPlaylistMutation';
import createUserMutation from '../mutations/createUserMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlaylist: createPlaylistMutation,
    createUser: createUserMutation
  },
});
