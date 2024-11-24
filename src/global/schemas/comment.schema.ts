import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ collection: 'comments' })
export class Comment extends Document {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({ ref: "Movie", type: Types.ObjectId, required: true })
    movie_id: string; 

    @Prop()
    password: string;

    @Prop({ isRequired: true })
    text: string;

    @Prop({ type: Date, default: new Date() })
    date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.index({ movie_id: 1, email: 1 })