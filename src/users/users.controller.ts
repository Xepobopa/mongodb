import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { FindOneQuery } from './query/findOne.query';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: UserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get('findOne/:id')
    findOne(@Param('id') id: string, @Query() query: FindOneQuery) {
        return this.usersService.findOne(id, query);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
