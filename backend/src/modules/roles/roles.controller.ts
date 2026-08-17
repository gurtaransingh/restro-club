import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RolesService, RoleDto } from './roles.service';

@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.rolesService.findById(id);
  }

  @Post()
  create(@Body() dto: RoleDto) {
    return this.rolesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<RoleDto>) {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rolesService.delete(id);
  }
}
