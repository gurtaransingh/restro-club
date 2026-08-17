import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { InventoryService, InventoryDto } from './inventory.service';

@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string) {
    return this.inventoryService.findAll(locationId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.inventoryService.findById(id);
  }

  @Post()
  create(@Body() dto: InventoryDto) {
    return this.inventoryService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<InventoryDto>) {
    return this.inventoryService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }
}
