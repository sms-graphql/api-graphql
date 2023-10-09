import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLList } from 'graphql'; // Importez GraphQLList pour renvoyer la liste de playlists

import Playlist from '../types/Playlist';

const removePlaylistMutation: GraphQLFieldConfig<any, { database: SupabaseClient }> = mutationWithClientMutationId({
    name: 'RemovePlaylist',
    description: 'Remove a playlist',
    inputFields: {
        playlistId: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    outputFields: {
        playlists: {
            type: new GraphQLList(Playlist)
        },
    },
    mutateAndGetPayload: async ({ playlistId }, { database }) => {
        const { error } = await database
            .from('Playlist_Movie')
            .delete()
            .eq('id_playlist', playlistId);

        if (error) {
            throw new Error(`Erreur lors de la suppression des dependances : ${error.message}`);
        }

        const { data: existingPlaylist } = await database
            .from('Playlist')
            .select('id')
            .eq('id', playlistId)
            .single();

        if (!existingPlaylist) {
            throw new Error(`La playlist avec l'ID ${playlistId} n'existe pas.`);
        }


        const { playlistError } = await database
            .from('Playlist')
            .delete()
            .eq('id', playlistId);

        if (playlistError) {
            throw new Error(`Erreur lors de la suppression de la playlist : ${playlistError.message}`);
        }

        return {};
    },
});

export default removePlaylistMutation;
