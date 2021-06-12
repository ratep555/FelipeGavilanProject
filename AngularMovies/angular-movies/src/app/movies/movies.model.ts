export interface MovieCreationDTO {
    title: string;
    summary: string;
    poster: File;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
    genresIds: number[];
    movieTheatersIds: number[];
}

export interface MovieDTO {
    title: string;
    summary: string;
    poster: string;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
}
