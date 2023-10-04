import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { findActorById, findCategoryById, findDirectorById, findFilmsById, findPlaylistById, findPlaylistsByUserId, findStudioById, findUserById } from '../../database';
import actor from './Actor';
import category from './Category';
import director from './Director';
import film from './Film';
import playlist from './Playlist';
import studio from './Studio';
import userType from './User';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        usersession: {
            type: userType,
            resolve: (obj, args, context) => {
                return context.user
            },
        },
        user: {
            type: userType,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (obj, args, context) => {
                return findUserById(args.id)
            }
        },
        category: {
            type: category,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (obj, args, context) => {
                console.log("context :", context.req.session)
                if (!context.user) {
                    return false
                }
                return findCategoryById(args.id)
            }
        },
        categories: {
            type: new GraphQLList(category),
            resolve: async (obj, args, { database }) => {
                const { data } = await database.from('Category').select('*');
                return data;
            }
        },
        studio: {
            type: studio,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (obj, args) => findStudioById(args.id),
        },
        studios: {
            type: new GraphQLList(studio),
            resolve: async (obj, args, { database }) => {
                const { data } = await database.from('Studio').select('*');
                return data;
            }
        },
        movie: {
            type: film,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (obj, args) => findFilmsById(args.id),
        },
        movies: {
            type: new GraphQLList(film),
            resolve: async (obj, args, { database }) => {
                const { data } = await database.from('Movie').select('*');
                return data;
            }
        },
        actor: {
            type: actor,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (obj, args) => findActorById(args.id),
        },
        actors: {
            type: new GraphQLList(actor),
            resolve: async (obj, args, { database }) => {
                const { data } = await database.from('Actor').select('*');
                return data;
            }
        },
        director: {
            type: director,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (obj, args) => findDirectorById(args.id),
        },
        directors: {
            type: new GraphQLList(director),
            resolve: async (obj, args, { database }) => {
                const { data } = await database.from('Director').select('*');
                return data;
            }
        },
        playlist: {
            type: playlist,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (obj, args) => findPlaylistById(args.id),
        },
        playlists: {
            type: new GraphQLList(playlist),
            resolve: async (obj, args, { database }) => {
                const { data } = await database.from('Playlist').select('*');
                return data;
            }
        },
        userPlaylists: {
            type: new GraphQLList(playlist),
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (obj, args) => findPlaylistsByUserId(args.id)
            
        },
    }
});
