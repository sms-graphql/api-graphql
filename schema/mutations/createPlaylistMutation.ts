import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Playlist from '../types/Playlist';

const createPlaylistMutation: GraphQLFieldConfig<any, { database: SupabaseClient}> = mutationWithClientMutationId({
  name: 'CreatePlaylist',
  description: 'Add a playlist',
  inputFields: {
    userId: {
        type: new GraphQLNonNull(GraphQLID),
    },
    playlistName: {
        type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    playlist: {
      type: Playlist,
    },
  },
  mutateAndGetPayload: async (input, { database }) => {
    const { userId, playlistName } = input;

    const { data, error } = await database
        .from('Playlist')
        .insert({id_user: userId, name: playlistName})

    if (error) {
        throw new Error(`Erreur lors de la création de la playlist : ${error.message}`);
    }

    return {
        playlist: data[0],
    };
  },
});

export default createPlaylistMutation;