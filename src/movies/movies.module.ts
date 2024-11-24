import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema, Movie, MovieSchema } from 'src/global/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([ 
            { name: Movie.name, schema: MovieSchema },
            { name: Comment.name, schema: CommentSchema }
        ])
    ],
    controllers: [MoviesController],
    providers: [MoviesService],
})
export class MoviesModule {}
