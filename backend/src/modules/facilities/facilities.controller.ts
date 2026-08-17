import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { FacilitiesService, FacilityDto } from './facilities.service';

@Controller('api/facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string) {
    return this.facilitiesService.findAll(locationId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.facilitiesService.findById(id);
  }

  @Post()
  create(@Body() dto: FacilityDto) {
    return this.facilitiesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<FacilityDto>) {
    return this.facilitiesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.facilitiesService.delete(id);
  }
}
