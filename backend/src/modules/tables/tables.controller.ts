import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TablesService, TableDto } from './tables.service';

@Controller('api/tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string) {
    return this.tablesService.findAll(locationId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tablesService.findById(id);
  }

  @Post()
  create(@Body() dto: TableDto) {
    return this.tablesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<TableDto>) {
    return this.tablesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tablesService.delete(id);
  }
}
