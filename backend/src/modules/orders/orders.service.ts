import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface OrderDto {
  id?: string;
  orderNumber?: string;
  locationId?: string;
  tableId?: string;
  tableName?: string;
  guestName?: string;
  guestCount?: number;
  items?: any[];
  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
  status?: string;
  isVIP?: boolean;
  hasAllergy?: boolean;
  allergyNotes?: string;
  waitMinutes?: number;
  createdAt?: string;
}

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(locationId?: string) {
    let sql = `
      SELECT id, 
             order_number as "orderNumber", 
             location_id as "locationId", 
             table_id as "tableId", 
             table_name as "tableName", 
             guest_name as "guestName", 
             guest_count as "guestCount", 
             items, subtotal, tax, discount, total, status, 
             is_vip as "isVIP", 
             has_allergy as "hasAllergy", 
             allergy_notes as "allergyNotes", 
             wait_minutes as "waitMinutes", 
             created_at as "createdAt"
      FROM orders
    `;
    const params: any[] = [];
    if (locationId) {
      sql += ` WHERE location_id = $1`;
      params.push(locationId);
    }
    sql += ` ORDER BY created_at DESC`;
    const res = await this.db.query(sql, params);
    return res.rows;
  }

  async findById(id: string) {
    const res = await this.db.query(
      `SELECT id, 
              order_number as "orderNumber", 
              location_id as "locationId", 
              table_id as "tableId", 
              table_name as "tableName", 
              guest_name as "guestName", 
              guest_count as "guestCount", 
              items, subtotal, tax, discount, total, status, 
              is_vip as "isVIP", 
              has_allergy as "hasAllergy", 
              allergy_notes as "allergyNotes", 
              wait_minutes as "waitMinutes", 
              created_at as "createdAt"
       FROM orders 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Order ${id} not found`);
    return res.rows[0];
  }

  async create(dto: OrderDto) {
    const id = dto.id || `ord-${Math.floor(100 + Math.random() * 900)}`;
    const orderNumber = dto.orderNumber || `${Math.floor(100 + Math.random() * 900)}`;
    const res = await this.db.query(
      `INSERT INTO orders (
        id, order_number, location_id, table_id, table_name,
        guest_name, guest_count, items, subtotal, tax, discount,
        total, status, is_vip, has_allergy, allergy_notes, wait_minutes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING id, 
                order_number as "orderNumber", 
                location_id as "locationId", 
                table_id as "tableId", 
                table_name as "tableName", 
                guest_name as "guestName", 
                guest_count as "guestCount", 
                items, subtotal, tax, discount, total, status, 
                is_vip as "isVIP", 
                has_allergy as "hasAllergy", 
                allergy_notes as "allergyNotes", 
                wait_minutes as "waitMinutes", 
                created_at as "createdAt"`,
      [
        id,
        orderNumber,
        dto.locationId || 'loc-1',
        dto.tableId || null,
        dto.tableName || 'Table Service',
        dto.guestName || 'Guest',
        dto.guestCount || 2,
        JSON.stringify(dto.items || []),
        dto.subtotal || 0,
        dto.tax || 0,
        dto.discount || 0,
        dto.total || 0,
        dto.status || 'RECEIVED',
        dto.isVIP || false,
        dto.hasAllergy || false,
        dto.allergyNotes || null,
        dto.waitMinutes || 5,
      ]
    );
    return res.rows[0];
  }

  async updateStatus(id: string, status: string) {
    const res = await this.db.query(
      `UPDATE orders SET status = $2 WHERE id = $1 RETURNING *`,
      [id, status]
    );
    if (!res.rows[0]) throw new NotFoundException(`Order ${id} not found`);
    return { success: true, status };
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM orders WHERE id = $1', [id]);
    return { success: true, message: `Order ${id} deleted successfully` };
  }
}
