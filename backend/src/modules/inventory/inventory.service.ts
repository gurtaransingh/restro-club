import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface InventoryDto {
  id?: string;
  itemCode: string;
  name: string;
  category?: string;
  unit?: string;
  currentStock: number;
  minStockThreshold: number;
  unitCost: number;
  expiryDate?: string;
  supplierName?: string;
  locationId?: string;
}

@Injectable()
export class InventoryService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(locationId?: string) {
    let sql = `
      SELECT id, 
             item_code as "itemCode", 
             name, category, unit, 
             current_stock as "currentStock", 
             min_stock_threshold as "minStockThreshold", 
             unit_cost as "unitCost", 
             expiry_date as "expiryDate", 
             supplier_name as "supplierName", 
             location_id as "locationId" 
      FROM inventory
    `;
    const params: any[] = [];
    if (locationId) {
      sql += ` WHERE location_id = $1`;
      params.push(locationId);
    }
    sql += ` ORDER BY created_at ASC`;
    const res = await this.db.query(sql, params);
    return res.rows;
  }

  async findById(id: string) {
    const res = await this.db.query(
      `SELECT id, 
              item_code as "itemCode", 
              name, category, unit, 
              current_stock as "currentStock", 
              min_stock_threshold as "minStockThreshold", 
              unit_cost as "unitCost", 
              expiry_date as "expiryDate", 
              supplier_name as "supplierName", 
              location_id as "locationId" 
       FROM inventory 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Inventory item ${id} not found`);
    return res.rows[0];
  }

  async create(dto: InventoryDto) {
    const id = dto.id || `inv-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO inventory (
        id, item_code, name, category, unit, current_stock,
        min_stock_threshold, unit_cost, expiry_date, supplier_name, location_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, 
                item_code as "itemCode", 
                name, category, unit, 
                current_stock as "currentStock", 
                min_stock_threshold as "minStockThreshold", 
                unit_cost as "unitCost", 
                expiry_date as "expiryDate", 
                supplier_name as "supplierName", 
                location_id as "locationId"`,
      [
        id,
        dto.itemCode || `INV-${Date.now().toString().slice(-4)}`,
        dto.name,
        dto.category || 'Raw Ingredients',
        dto.unit || 'units',
        dto.currentStock || 0,
        dto.minStockThreshold || 10,
        dto.unitCost || 100,
        dto.expiryDate || null,
        dto.supplierName || '',
        dto.locationId || 'loc-1',
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<InventoryDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE inventory 
       SET item_code = $2, name = $3, category = $4, unit = $5,
           current_stock = $6, min_stock_threshold = $7, unit_cost = $8,
           expiry_date = $9, supplier_name = $10, location_id = $11
       WHERE id = $1
       RETURNING id, 
                 item_code as "itemCode", 
                 name, category, unit, 
                 current_stock as "currentStock", 
                 min_stock_threshold as "minStockThreshold", 
                 unit_cost as "unitCost", 
                 expiry_date as "expiryDate", 
                 supplier_name as "supplierName", 
                 location_id as "locationId"`,
      [
        id,
        updated.itemCode,
        updated.name,
        updated.category,
        updated.unit,
        updated.currentStock,
        updated.minStockThreshold,
        updated.unitCost,
        updated.expiryDate,
        updated.supplierName,
        updated.locationId,
      ]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM inventory WHERE id = $1', [id]);
    return { success: true, message: `Inventory item ${id} deleted successfully` };
  }
}
