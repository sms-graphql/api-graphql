import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Playlist from '../types/Playlist';

const updatePlaylistNameMutation: GraphQLFieldConfig<any, { database: SupabaseClient }> = mutationWithClientMutationId({
    name: 'UpdatePlaylistName',
    description: 'Update the name of a playlist',
    inputFields: {
        playlistId: { type: new GraphQLNonNull(GraphQLID) },
        newName: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        playlist: { type: Playlist },
    },
    mutateAndGetPayload: async ({ playlistId, newName }, { database, user }) => {
        if (user) {
            const { data, error } = await database
                .from('Playlist')
                .update({ name: newName })
                .eq('id', playlistId);

            if (error) {
                throw new Error(`Erreur lors de la mise à jour du nom de la playlist : ${error.message}`);
            }

            return {
                playlist: data[0],
            };
        } else {
            throw new Error(`Vous n'êtes pas autorisé à modifier cette playlist`);
        }
    },
});

export default updatePlaylistNameMutation;
