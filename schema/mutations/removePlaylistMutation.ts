import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

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
    mutateAndGetPayload: async ({ playlistId }, { database, user }) => {
        if (user) {
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
        } else {
            throw new Error(`Vous n'êtes pas autorisé à supprimer des playlists`);
        }
    },
});

export default removePlaylistMutation;
