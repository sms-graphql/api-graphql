import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Playlist from '../types/Playlist';

const createPlaylistMutation: GraphQLFieldConfig<any, { database: SupabaseClient}> = mutationWithClientMutationId({
  name: 'CreatePlaylist',
  description: 'Add a playlist',
  inputFields: {
    playlistName: {
        type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    playlist: {
      type: Playlist,
    },
  },
  mutateAndGetPayload: async (input, { database, user }) => {
    const { playlistName } = input;

    if (user) {
        const { data, error } = await database
            .from('Playlist')
            .insert({id_user: user.id, name: playlistName})

        if (error) {
            throw new Error(`Erreur lors de la création de la playlist : ${error.message}`);
        }

        return {
            playlist: data[0],
        };
    } else {
        throw new Error(`Vous n'êtes pas connecté pour ajouter une playlist`);
    }
  },
});

export default createPlaylistMutation;