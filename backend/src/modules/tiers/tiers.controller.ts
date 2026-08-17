import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TiersService, TierDto } from './tiers.service';

@Controller('api/tiers')
export class TiersController {
  constructor(private readonly tiersService: TiersService) {}

  @Get()
  findAll() {
    return this.tiersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tiersService.findById(id);
  }

  @Post()
  create(@Body() dto: TierDto) {
    return this.tiersService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<TierDto>) {
    return this.tiersService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tiersService.delete(id);
  }
}
