import { GraphQLObjectType } from 'graphql';
import createPlaylistMutation from '../mutations/createPlaylistMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlaylist: createPlaylistMutation,
  },
});
