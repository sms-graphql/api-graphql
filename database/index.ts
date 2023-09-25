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

export const findStudioById = async (id: number) => {
    const { data, error } = await database
        .from('Studio')
        .select('*')
        .filter('id', 'eq', id)
        .single();
    if (error) {
        throw error;
    }
    return data;
};

export const getFilmsByStudioId = async (id: number) => {
    try {
        const { data, error } = await database
            .from('Movie')
            .select('*')
            .filter('id_studio', 'eq', id);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const getFilmsByCategoryId = async (id: number) => {
    try {
        const { data, error } = await database
            .from('Movie')
            .select('*')
            .filter('id_category', 'eq', id);

        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
}


export default database;
