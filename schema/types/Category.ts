import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import { getMoviesByCategoryId } from '../../database';
import movieType from './Movie';

export const CategoryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        movies: {
            type: new GraphQLList(movieType),
            resolve: (category, args, context) => {
                return getMoviesByCategoryId(category.id);
            },
        },
    }),
});

export default CategoryType
