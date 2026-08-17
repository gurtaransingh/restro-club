import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EventsService, EventEnquiryDto } from './events.service';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('enquiries')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('enquiries/:id')
  findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Post('enquiries')
  create(@Body() dto: EventEnquiryDto) {
    return this.eventsService.create(dto);
  }

  @Put('enquiries/:id')
  update(@Param('id') id: string, @Body() dto: Partial<EventEnquiryDto>) {
    return this.eventsService.update(id, dto);
  }

  @Delete('enquiries/:id')
  delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
