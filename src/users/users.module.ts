import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, Comment, CommentSchema } from 'src/global/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([ 
            { name: User.name, schema: UserSchema },
            { name: Comment.name, schema: CommentSchema },
        ])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
