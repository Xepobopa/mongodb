import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Awards, IMDb, Tomatoes } from './types';

@Schema({ collection: "movies" })
export class Movie extends Document {
    @Prop({ type: String, required: true })
    plot: string;

    @Prop({ type: [String], required: true })
    genres: string[];

    @Prop({ type: Number })
    runtime: number;

    @Prop({ type: [String], required: true })
    cast: string[];

    @Prop({ type: Number })
    num_mflix_comments: number;

    @Prop({ type: String })
    poster: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String })
    fullplot: string;

    @Prop({ type: [String] })
    languages: string[];

    @Prop({ type: Date })
    released: Date;

    @Prop({ type: [String] })
    directors: string[];

    @Prop({ type: [String] })
    writers: string[];

    @Prop({
        type: {
            wins: { type: Number },
            nominations: { type: Number },
            text: { type: String },
        },
    })
    awards: Awards;

    @Prop({ type: String })
    lastupdated: string;

    @Prop({ type: Number })
    year: number;

    @Prop({
        type: {
            rating: { type: Number },
            votes: { type: Number },
            id: { type: Number },
        },
    })
    imdb: IMDb;

    @Prop({ type: [String] })
    countries: string[];

    @Prop({ type: String })
    type: string;

    @Prop({
        type: {
            viewer: {
                rating: { type: Number },
                numReviews: { type: Number },
                meter: { type: Number },
            },
            lastUpdated: { type: Date },
        },
    })
    tomatoes: Tomatoes;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
MovieSchema.index({ 'imdb.rating': 1, year: 1 })