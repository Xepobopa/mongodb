import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'users' })
export class User extends Document {
    @Prop({ unique: true })
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);