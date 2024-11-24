import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { FindMovieQuery } from './queries/findOne.query';
import { FindManyMoviesQuery } from './queries/findMany.query';
import { Movie, Comment } from 'src/global/schemas';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<Movie>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
    ) {}

    create(createMovieDto: CreateMovieDto) {
      return 'This action adds a new movie';
    }

    findAll() {
      return `This action returns all movies`;
    }

    async findOne(id: string, query: FindMovieQuery) {
        if (query.loadComments) {
            return await this.movieModel.aggregate([
                { $match: { _id: new Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "comments",
                        "localField": "_id",
                        "foreignField": "movie_id",
                        "as": "comments"
                    }
                }
            ]);
        } else {
            return await this.movieModel.findById(new Types.ObjectId(id));
        }
    }
    
    async findMany(query: FindManyMoviesQuery) {
        const pipeline: PipelineStage[] = [];
        
        if (query.filterBy === 'bestRating') {
            pipeline.push(
                { $match: { 'imdb.rating': { $not: { $eq: "" } } } },
                { $sort: { 'imdb.rating': -1 } }
            );
        } else if (query.filterBy === 'new') {
            pipeline.push(
                { $match: { year: { $gt: 2000 } } },
                { $sort: { year: -1 } }
            );
        }
    
        if (query.preview) {
            pipeline.push({
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'movie_id',
                    as: 'comments',
                },
            });
            pipeline.push({
                $addFields: {
                    commentCount: { $size: '$comments' },
                },
            });
        }
    
        if (query.sortType) {
            const sortOrder = query.sortBy === 'DESC' ? -1 : 1;
            pipeline.push({ $sort: { [query.sortType]: sortOrder } });
        }
    
        if (query.skip) {
            pipeline.push({ $skip: Number(query.skip) || 0 });
        }
        if (query.limit) {
            pipeline.push({ $limit: Number(query.limit) || 0 });
        }
    
        if (query.preview) {
            pipeline.push({
                $project: {
                    comments: 0,
                },
            });
        }

        return this.movieModel.aggregate(pipeline).allowDiskUse(true).exec();
    }

    async remove(id: string) {
        await this.movieModel.deleteOne({ _id: new Types.ObjectId(id) });

        await this.commentModel.deleteMany({ movie_id: new Types.ObjectId(id) });
    }
}
