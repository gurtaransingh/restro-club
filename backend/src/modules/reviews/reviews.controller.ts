import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewsService, ReviewDto } from './reviews.service';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Post()
  create(@Body() dto: ReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Put(':id/reply')
  reply(@Param('id') id: string, @Body('reply') reply: string) {
    return this.reviewsService.reply(id, reply);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
