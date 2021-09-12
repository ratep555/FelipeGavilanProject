// import { ActorsMovieDTO } from '../actors/actors.model';
import { ActorsMovieDTO } from '../actors/actors.model';
import { GenreDTO } from '../genres/genres.model';
import { MovieTheatersDTO } from '../movie-theaters/movie-theaters.model';

export interface MovieCreationDTO {
    title: string;
    summary: string;
    poster: File;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
    genresIds: number[];
    movieTheatersIds: number[];
    // we need this array which will allow us to send id and character
    actors: ActorsMovieDTO[];
}

export interface MovieDTO {
    id: number;
    title: string;
    summary: string;
    poster: string;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
    genres: GenreDTO[];
    movieTheaters: MovieTheatersDTO[];
    actors: ActorsMovieDTO[];
    averageVote: number;
    userVote: number;
}

export interface MoviePostGetDTO{
    genres: GenreDTO[];
    movieTheaters: MovieTheatersDTO[];
}

export interface MoviePutGetDTO {
    movie: MovieDTO;
    selectedGenres: GenreDTO[];
    nonSelectedGenres: GenreDTO[];
    selectedMovieTheaters: MovieTheatersDTO[];
    nonSelectedMovieTheaters: MovieTheatersDTO[];
    actors: ActorsMovieDTO[];
}


export interface HomeDTO {
    inTheaters: MovieDTO[];
    upcomingReleases: MovieDTO[];
}


