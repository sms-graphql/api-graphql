import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        phone_number: {
            type: GraphQLString
        },
        date_of_birth: {
            type: GraphQLString
        },
    },
});
