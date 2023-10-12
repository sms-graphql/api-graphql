import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserInput from '../inputs/UserInput';
import User from '../types/User';

const createUserMutation: GraphQLFieldConfig<any, { database: SupabaseClient}> = mutationWithClientMutationId({
  name: 'CreateUser',
  description: 'Add a user',
  inputFields: {
    user: {
        type: new GraphQLNonNull(UserInput),
    },
  },
  outputFields: {
    user: {
      type: User,
    },
  },
  mutateAndGetPayload: async (input, { database }) => {
    const { user } = input;
    const { data, error } = await database
        .from('User')
        .insert({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            address: user.address,
            password: user.password,
            phone_number: user.phone_number,
            date_of_birth: user.date_of_birth,
        })

    if (error) {
        throw new Error(`Erreur lors de la création du user : ${error.message}`);
    }

    return {
        user: data[0],
    };
  },
});

export default createUserMutation;