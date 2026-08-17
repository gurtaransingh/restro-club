import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { BookingsService, BookingDto } from './bookings.service';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string) {
    return this.bookingsService.findAll(locationId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }

  @Post()
  create(@Body() dto: BookingDto) {
    return this.bookingsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<BookingDto>) {
    return this.bookingsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
