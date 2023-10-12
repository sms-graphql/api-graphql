import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Playlist from '../types/Playlist';

const removeFilmFromPlaylistMutation: GraphQLFieldConfig<any, { database: SupabaseClient }> = mutationWithClientMutationId({
    name: 'RemoveFilmFromPlaylist',
    description: 'Remove a film from a playlist',
    inputFields: {
        filmId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        playlistId: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    outputFields: {
        playlist: {
            type: Playlist,
        },
    },
    mutateAndGetPayload: async ({ filmId, playlistId }, { database, user }) => {
        if (user) {
            const { error } = await database
                .from('Playlist_Movie')
                .delete()
                .eq('id_movie', filmId)
                .eq('id_playlist', playlistId);

            const { data: playlistData, error: playlistError } = await database.from('Playlist').select('*').filter('id', 'eq', playlistId);

            if (error) {
                throw new Error(`Erreur lors de l'ajout du film à la playlist : ${error.message}`);
            }
            if (playlistError) {
                throw new Error(`Erreur lors de la récupération de la playlist : ${playlistError.message}`);
            }

            return {
                playlist: playlistData[0],
            };
        } else {
            throw new Error(`Vous n'êtes pas autorisé à retirer des films`);
        }
    },
});

export default removeFilmFromPlaylistMutation;
