import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Playlist from '../types/Playlist';

const addFilmToPlaylistMutation: GraphQLFieldConfig<any, { database: SupabaseClient }> = mutationWithClientMutationId({
    name: 'AddFilmToPlaylist',
    description: 'Add a film to a playlist',
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
    mutateAndGetPayload: async (input, { database, user }) => {
        const { filmId, playlistId } = input;
        if (user) {
            const { data, error } = await database
                .from('Playlist_Movie')
                .insert({ id_movie: filmId, id_playlist: playlistId })

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
            throw new Error(`Vous n'êtes pas autorisé à ajouter des films`);
        }

    },

});

export default addFilmToPlaylistMutation;
