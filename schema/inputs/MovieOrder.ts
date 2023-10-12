import { GraphQLInputObjectType } from 'graphql';
import OrderDirection from '../enums/OrderDirection';
import MovieOrderField from '../enums/MovieOrderField';

export default new GraphQLInputObjectType({
    name: 'MovieOrder',
    fields: {
        direction: {
            type: OrderDirection
        },
        field: {
            type: MovieOrderField
        }
    }
});
