import { Movie } from "src/global/schemas/movie.schema";

export class FindManyMoviesQuery {
    sortType?: keyof Movie;
    sortBy?: 'ASC' | 'DESC';
    preview?: boolean; // preview means return movies with amount of comments (that by default uses to display movies in some list)
    limit?: number; // limit and skip for pagination
    skip?: number;  // ----------^^^^
    filterBy: "bestRating" | "new"
}