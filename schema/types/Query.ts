import { GraphQLObjectType, GraphQLList, GraphQLInt } from 'graphql';
import category from './Category';
import studio from './Studio';
import film from './Film';
import viewerType from './Viewer';
import { findCategoryById, findStudioById } from '../../database';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        viewer: {
            type: viewerType,
            resolve: (obj, args, { viewer }) => {
                return viewer;
            }
        },
        category: {
            type: category,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (obj, args) => findCategoryById(args.id),
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
    }
});
