import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LocationsService, LocationDto } from './locations.service';

@Controller('api/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.locationsService.findById(id);
  }

  @Post()
  create(@Body() dto: LocationDto) {
    return this.locationsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<LocationDto>) {
    return this.locationsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.locationsService.delete(id);
  }
}
