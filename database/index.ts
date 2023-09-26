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

export const findFilmsById = async (id: number) => {
    const { data, error } = await database
        .from('Movie')
        .select('*')
        .filter('id', 'eq', id)
        .single();
    if (error) {
        throw error;
    }
    return data;
};

export const findActorById = async (id: number) => {
    const { data, error } = await database
        .from('Actor')
        .select('*')
        .filter('id', 'eq', id)
        .single();
    if (error) {
        throw error;
    }
    return data;
};

export const findDirectorById = async (id: number) => {
    const { data, error } = await database
        .from('Director')
        .select('*')
        .filter('id', 'eq', id)
        .single();
    if (error) {
        throw error;
    }
    return data;
};


export const getMoviesByActorId = async (actorId: number) => {

    const { data: actorMovies, error } = await database
        .from('Actor_Movie')
        .select('id_movie')
        .filter('id_actor', 'eq', actorId);
    if (error) {
        throw error;
    }

    const movieIds = actorMovies.map((relation) => relation.id_movie);

    const { data: movies, error: moviesError } = await database
        .from('Movie')
        .select('*')
        .in('id', movieIds);

    if (moviesError) {
        throw moviesError;
    }

    return movies;
};

export const getMoviesByDirectorId = async (directorId: number) => {

    const { data: directorMovies, error } = await database
        .from('Director_Movie')
        .select('id_movie')
        .filter('id_director', 'eq', directorId);
    if (error) {
        throw error;
    }

    const movieIds = directorMovies.map((relation) => relation.id_movie);

    const { data: movies, error: moviesError } = await database
        .from('Movie')
        .select('*')
        .in('id', movieIds);

    if (moviesError) {
        throw moviesError;
    }

    return movies;
};


export default database;
