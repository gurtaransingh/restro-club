import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MenuService, MenuCategoryDto, MenuItemDto } from './menu.service';

@Controller('api')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Categories
  @Get('menu/categories')
  findAllCategories() {
    return this.menuService.findAllCategories();
  }

  @Post('menu/categories')
  createCategory(@Body() dto: MenuCategoryDto) {
    return this.menuService.createCategory(dto);
  }

  @Put('menu/categories/:id')
  updateCategory(@Param('id') id: string, @Body() dto: Partial<MenuCategoryDto>) {
    return this.menuService.updateCategory(id, dto);
  }

  @Delete('menu/categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.menuService.deleteCategory(id);
  }

  // Items
  @Get('menu/items')
  findAllItems(@Query('categoryId') categoryId?: string) {
    return this.menuService.findAllItems(categoryId);
  }

  @Get('menu/items/:id')
  findItemById(@Param('id') id: string) {
    return this.menuService.findItemById(id);
  }

  @Post('menu/items')
  createItem(@Body() dto: MenuItemDto) {
    return this.menuService.createItem(dto);
  }

  @Put('menu/items/:id')
  updateItem(@Param('id') id: string, @Body() dto: Partial<MenuItemDto>) {
    return this.menuService.updateItem(id, dto);
  }

  @Delete('menu/items/:id')
  deleteItem(@Param('id') id: string) {
    return this.menuService.deleteItem(id);
  }
}
