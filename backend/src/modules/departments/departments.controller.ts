import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DepartmentsService, DepartmentDto } from './departments.service';

@Controller('api/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string) {
    return this.departmentsService.findAll(locationId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.departmentsService.findById(id);
  }

  @Post()
  create(@Body() dto: DepartmentDto) {
    return this.departmentsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<DepartmentDto>) {
    return this.departmentsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.departmentsService.delete(id);
  }
}
