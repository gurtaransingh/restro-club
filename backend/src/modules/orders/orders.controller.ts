import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { OrdersService, OrderDto } from './orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string) {
    return this.ordersService.findAll(locationId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Post()
  create(@Body() dto: OrderDto) {
    return this.ordersService.create(dto);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
