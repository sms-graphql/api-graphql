import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import { getFilmsByCategoryId } from '../../database';
import filmType from './Film';

export const CategoryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        films: {
            type: new GraphQLList(filmType),
            resolve: (category, args, context) => {
                return getFilmsByCategoryId(category.id);
            },
        },
    }),
});

export default CategoryType
