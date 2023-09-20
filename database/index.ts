import createClient from './createClient';

let database = createClient();

export const findCategoryById = async (id: number) => {
    const { data, error } = await database
        .from('Category')
        .select('*')
        .filter('id', 'eq', id)
        .single();
    if (error) {
        throw error;
    }
    return data;
};

export default database;
