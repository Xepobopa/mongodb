import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, Comment } from 'src/global/schemas';
import { FindOneQuery } from './query/findOne.query';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
    ) {}

    async create(createUserDto: UserDto) {
        return await this.userModel.create(createUserDto);
    }

    findAll() {
      return `This action returns all users`;
    }

    async findOne(id: string, query: FindOneQuery) {
        const user: any = await this.userModel.findById(new Types.ObjectId(id)).lean(); // lean - to get plain object

        if (!user) {
            throw new Error('User not found');
        }

        if (query.loadComments) {
            const comments = await this.commentModel.find({ email: user.email });
            user.comments = comments;
        }

        return user;
    }

    async remove(id: string) {
        const email = (await this.userModel.findById(new Types.ObjectId(id))).email;

        await this.userModel.deleteOne({ _id: new Types.ObjectId(id) })
        await this.commentModel.deleteMany({ email });
    }
}
