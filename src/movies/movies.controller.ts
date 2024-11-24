import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FindMovieQuery } from './queries/findOne.query';
import { FindManyMoviesQuery } from './queries/findMany.query';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    @Get('findOne/:id')
    async findOne(@Param('id') id: string, @Query() query: FindMovieQuery) {
        return await this.moviesService.findOne(id, query);
    }

    @Get('findMany')
    async findMany(@Query() query: FindManyMoviesQuery) {
        return await this.moviesService.findMany(query);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moviesService.remove(id);
    }
}
