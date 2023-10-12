import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { getActorById, getCategoryById, getDirectorById, getMoviesById, getPlaylistById, getPlaylistsByUserId, getStudioById, getUserById, getUserByName } from '../../database';
import actor from './Actor';
import category from './Category';
import director from './Director';
import movie from './Movie';
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
                return getUserById(args.id)
            }
        },
        category: {
            type: category,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (obj, args, context) => {
                if (!context.user) {
                    return false
                }
                return getCategoryById(args.id)
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
            resolve: (obj, args) => getStudioById(args.id),
        },
        studios: {
            type: new GraphQLList(studio),
            resolve: async (obj, args, { database }) => {
                const { data } = await database.from('Studio').select('*');
                return data;
            }
        },
        movie: {
            type: movie,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (obj, args) => getMoviesById(args.id),
        },
        movies: {
            type: new GraphQLList(movie),
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
            resolve: (obj, args) => getActorById(args.id),
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
            resolve: (obj, args) => getDirectorById(args.id),
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
            resolve: (obj, args) => getPlaylistById(args.id),
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
            resolve: async (obj, args, { user }) => {
                if (user) {
                    return getPlaylistsByUserId(user.id);
                } else {
                    throw new Error(`Vous n'êtes pas autorisé`);
                }
            }

        },
        login: {
            type: userType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve: async (_, args, context) => {
                const { req } = context;

                const user = await getUserByName(args.username)

                if (!user) {
                    throw new Error(`Aucun utilisateur correspondant`);
                }
                if (user.password === args.password) {
                    req.session.user = user;
                    return user;
                }

                throw new Error(`Nom d'utilisateur ou mot de passe incorrect`);
            },
        },
        logout: {
            type: GraphQLString,
            resolve: async (_, args, context) => {
                const { req } = context;
                if (req.session.user) {
                    req.session.destroy();
                    return 'Déconnexion réussie';
                }
                throw new Error('Aucun utilisateur connecté');
            },
        },
    }
});
