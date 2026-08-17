import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RoomsService, RoomDto } from './rooms.service';

@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.roomsService.findById(id);
  }

  @Post()
  create(@Body() dto: RoomDto) {
    return this.roomsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<RoomDto>) {
    return this.roomsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomsService.delete(id);
  }
}
