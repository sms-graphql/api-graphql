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

export const findUserById = async (id: number) => {
    const { data, error } = await database
        .from('User')
        .select('*')
        .filter('id', 'eq', id)
        .single();
    if (error) {
        throw error;
    }
    return data;
};

export const findUserByName = async (userName: string) => {
    try {
        const { data, error } = await database
            .from('User')
            .select('*')
            .filter('email', 'eq', userName)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur :", error);
        throw error;
    }
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

export const getStudioByFilmId = async (id: number) => {
    try {
        const { data, error } = await database
            .from('Studio')
            .select('*')
            .filter('id', 'eq', id);

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

export const getPlaylistByUserId = async (id: number) => {
    try {
        const { data, error } = await database
            .from('Playlist')
            .select('*')
            .filter('id_user', 'eq', id);

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

export const findPlaylistById = async (id: number) => {
    const { data, error } = await database
        .from('Playlist')
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

export const getActorsByMovieId = async (movieId: number) => {

    const { data: actorMovies, error } = await database
        .from('Actor_Movie')
        .select('id_actor')
        .filter('id_movie', 'eq', movieId);
    if (error) {
        throw error;
    }

    const actorIds = actorMovies.map((relation) => relation.id_actor);

    const { data: actors, error: actorsError } = await database
        .from('Actor')
        .select('*')
        .in('id', actorIds);

    if (actorsError) {
        throw actorsError;
    }

    return actors;
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

export const getDirectorsByMovieId = async (movieId: number) => {

    const { data: directorMovies, error } = await database
        .from('Director_Movie')
        .select('id_director')
        .filter('id_movie', 'eq', movieId);
    if (error) {
        throw error;
    }
    const directorIds = directorMovies.map((relation) => relation.id_director);

    const { data: directors, error: directorsError } = await database
        .from('Director')
        .select('*')
        .in('id', directorIds);

    if (directorsError) {
        throw directorsError;
    }

    return directors;
};

export const getMoviesByPlaylistId = async (playlistId: number) => {

    const { data: playlistMovies, error } = await database
        .from('Playlist_Movie')
        .select('id_movie')
        .filter('id_playlist', 'eq', playlistId);
    if (error) {
        throw error;
    }

    const movieIds = playlistMovies.map((relation) => relation.id_movie);

    const { data: movies, error: moviesError } = await database
        .from('Movie')
        .select('*')
        .in('id', movieIds);

    if (moviesError) {
        throw moviesError;
    }

    return movies;
};

export const findPlaylistsByUserId = async (userId: number) => {

    const { data: playlists, error } = await database
        .from('Playlist')
        .select('*')
        .filter('id_user', 'eq', userId);
    if (error) {
        throw error;
    }
    return playlists;
};

export const getCategoryNameById = async (idCategory: number) => {

    const { data: category, error } = await database
        .from('Category')
        .select('*')
        .filter('id', 'eq', idCategory)
        .single();
    if (error) {
        throw error;
    }
    return category;
};

export const getStudioNameById = async (idStudio: number) => {

    const { data: studio, error } = await database
        .from('Studio')
        .select('*')
        .filter('id', 'eq', idStudio)
        .single();
    if (error) {
        throw error;
    }
    return studio;
};


export default database;
