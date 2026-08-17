import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService, UserDto } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string) {
    return this.usersService.findAll(locationId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() dto: UserDto) {
    return this.usersService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<UserDto>) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
