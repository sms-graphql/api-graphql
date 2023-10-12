import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
    name: 'MovieOrderField',
    description: 'The possible field for ordering movies.',
    values: {
        ID: {
            value: 'id'
        },
        TITLE: {
            value: 'title'
        }
    }
});
