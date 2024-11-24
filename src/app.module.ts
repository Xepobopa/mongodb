import { Module } from '@nestjs/common';
import { AppController } from './app.controller';;
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongoConfigAsync } from './global/config/mongodb.config';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync(MongoConfigAsync),
        MoviesModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [],
})

export class AppModule {}