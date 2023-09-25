import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLList
} from 'graphql';
import filmType from './Film';
import { getFilmsByCategoryId } from '../../database';

export default new GraphQLObjectType({
    name: 'Category',
    fields: {
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
    }
});
