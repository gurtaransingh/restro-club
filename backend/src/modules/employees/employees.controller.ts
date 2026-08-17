import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EmployeesService, EmployeeDto } from './employees.service';

@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string) {
    return this.employeesService.findAll(locationId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.employeesService.findById(id);
  }

  @Post()
  create(@Body() dto: EmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<EmployeeDto>) {
    return this.employeesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }
}
