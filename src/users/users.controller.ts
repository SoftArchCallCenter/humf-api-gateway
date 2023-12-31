import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as express from 'express';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Req() request: express.Request) {
    return this.usersService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: express.Request) {
    return this.usersService.findOne(+id, request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,  @Req() request: express.Request) {
    return this.usersService.update(+id, updateUserDto, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: express.Request) {
    return this.usersService.remove(+id, request);
  }
}
