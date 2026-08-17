import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface MenuCategoryDto {
  id?: string;
  name: string;
  displayOrder?: number;
  description?: string;
}

export interface MenuItemDto {
  id?: string;
  name: string;
  categoryId: string;
  price: number;
  makingCost?: number;
  description?: string;
  image?: string;
  prepTimeMinutes?: number;
  calories?: number;
  allergens?: string[];
  dietaryType?: string;
  isSignature?: boolean;
  inStock?: boolean;
  stockCount?: number;
}

@Injectable()
export class MenuService {
  constructor(private readonly db: DatabaseService) {}

  // Categories
  async findAllCategories() {
    const res = await this.db.query(
      `SELECT id, name, display_order as "displayOrder", description 
       FROM menu_categories 
       ORDER BY display_order ASC`
    );
    return res.rows;
  }

  async createCategory(dto: MenuCategoryDto) {
    const id = dto.id || `cat-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO menu_categories (id, name, display_order, description)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, display_order as "displayOrder", description`,
      [id, dto.name, dto.displayOrder || 1, dto.description || '']
    );
    return res.rows[0];
  }

  async updateCategory(id: string, dto: Partial<MenuCategoryDto>) {
    const res = await this.db.query(
      `UPDATE menu_categories 
       SET name = COALESCE($2, name), display_order = COALESCE($3, display_order), description = COALESCE($4, description)
       WHERE id = $1
       RETURNING id, name, display_order as "displayOrder", description`,
      [id, dto.name, dto.displayOrder, dto.description]
    );
    if (!res.rows[0]) throw new NotFoundException(`Category ${id} not found`);
    return res.rows[0];
  }

  async deleteCategory(id: string) {
    await this.db.query('DELETE FROM menu_categories WHERE id = $1', [id]);
    return { success: true };
  }

  // Items
  async findAllItems(categoryId?: string) {
    let sql = `
      SELECT id, name, 
             category_id as "categoryId", 
             price, 
             making_cost as "makingCost", 
             description, image, 
             prep_time_minutes as "prepTimeMinutes", 
             calories, allergens, 
             dietary_type as "dietaryType", 
             is_signature as "isSignature", 
             in_stock as "inStock", 
             stock_count as "stockCount"
      FROM menu_items
    `;
    const params: any[] = [];
    if (categoryId) {
      sql += ` WHERE category_id = $1`;
      params.push(categoryId);
    }
    sql += ` ORDER BY created_at ASC`;
    const res = await this.db.query(sql, params);
    return res.rows;
  }

  async findItemById(id: string) {
    const res = await this.db.query(
      `SELECT id, name, 
              category_id as "categoryId", 
              price, 
              making_cost as "makingCost", 
              description, image, 
              prep_time_minutes as "prepTimeMinutes", 
              calories, allergens, 
              dietary_type as "dietaryType", 
              is_signature as "isSignature", 
              in_stock as "inStock", 
              stock_count as "stockCount"
       FROM menu_items 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Item ${id} not found`);
    return res.rows[0];
  }

  async createItem(dto: MenuItemDto) {
    const id = dto.id || `item-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO menu_items (
        id, name, category_id, price, making_cost, description,
        image, prep_time_minutes, calories, allergens, dietary_type,
        is_signature, in_stock, stock_count
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id, name, 
                category_id as "categoryId", 
                price, 
                making_cost as "makingCost", 
                description, image, 
                prep_time_minutes as "prepTimeMinutes", 
                calories, allergens, 
                dietary_type as "dietaryType", 
                is_signature as "isSignature", 
                in_stock as "inStock", 
                stock_count as "stockCount"`,
      [
        id,
        dto.name,
        dto.categoryId,
        dto.price,
        dto.makingCost ?? Math.round(dto.price * 0.3),
        dto.description || '',
        dto.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        dto.prepTimeMinutes || 15,
        dto.calories || 450,
        JSON.stringify(dto.allergens || []),
        dto.dietaryType || 'NON_VEGETARIAN',
        dto.isSignature ?? false,
        dto.inStock ?? true,
        dto.stockCount ?? 50,
      ]
    );
    return res.rows[0];
  }

  async updateItem(id: string, dto: Partial<MenuItemDto>) {
    const existing = await this.findItemById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE menu_items 
       SET name = $2, category_id = $3, price = $4, making_cost = $5,
           description = $6, image = $7, prep_time_minutes = $8, calories = $9,
           allergens = $10, dietary_type = $11, is_signature = $12, in_stock = $13, stock_count = $14
       WHERE id = $1
       RETURNING id, name, 
                 category_id as "categoryId", 
                 price, 
                 making_cost as "makingCost", 
                 description, image, 
                 prep_time_minutes as "prepTimeMinutes", 
                 calories, allergens, 
                 dietary_type as "dietaryType", 
                 is_signature as "isSignature", 
                 in_stock as "inStock", 
                 stock_count as "stockCount"`,
      [
        id,
        updated.name,
        updated.categoryId,
        updated.price,
        updated.makingCost,
        updated.description,
        updated.image,
        updated.prepTimeMinutes,
        updated.calories,
        JSON.stringify(updated.allergens),
        updated.dietaryType,
        updated.isSignature,
        updated.inStock,
        updated.stockCount,
      ]
    );
    return res.rows[0];
  }

  async deleteItem(id: string) {
    await this.findItemById(id);
    await this.db.query('DELETE FROM menu_items WHERE id = $1', [id]);
    return { success: true, message: `Menu item ${id} deleted successfully` };
  }
}
