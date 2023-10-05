import {
    GraphQLInt,
    GraphQLString,
    GraphQLInterfaceType,
} from 'graphql';

const PersonInterface = new GraphQLInterfaceType({
    name: 'Person',
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        last_name: {
            type: GraphQLString,
        },
        first_name: {
            type: GraphQLString,
        },
        date_of_birth: {
            type: GraphQLString,
        },
    }),
});

export default PersonInterface;
