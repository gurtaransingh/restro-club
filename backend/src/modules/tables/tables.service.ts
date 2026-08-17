import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface TableDto {
  id?: string;
  tableNumber: string;
  areaZone?: string;
  capacity?: number;
  qrCodeToken?: string;
  status?: string;
  locationId?: string;
}

@Injectable()
export class TablesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(locationId?: string) {
    let sql = `
      SELECT id, 
             table_number as "tableNumber", 
             area_zone as "areaZone", 
             capacity, 
             qr_code_token as "qrCodeToken", 
             status, 
             location_id as "locationId" 
      FROM dining_tables
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
              table_number as "tableNumber", 
              area_zone as "areaZone", 
              capacity, 
              qr_code_token as "qrCodeToken", 
              status, 
              location_id as "locationId" 
       FROM dining_tables 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Table ${id} not found`);
    return res.rows[0];
  }

  async create(dto: TableDto) {
    const id = dto.id || `tbl-${Date.now()}`;
    const token = dto.qrCodeToken || `RC-TBL-${dto.tableNumber.toUpperCase().replace(/\s+/g, '')}`;
    const res = await this.db.query(
      `INSERT INTO dining_tables (id, table_number, area_zone, capacity, qr_code_token, status, location_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, 
                 table_number as "tableNumber", 
                 area_zone as "areaZone", 
                 capacity, 
                 qr_code_token as "qrCodeToken", 
                 status, 
                 location_id as "locationId"`,
      [
        id,
        dto.tableNumber,
        dto.areaZone || 'Main Dining',
        dto.capacity || 4,
        token,
        dto.status || 'VACANT',
        dto.locationId || 'loc-1',
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<TableDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE dining_tables 
       SET table_number = $2, area_zone = $3, capacity = $4, qr_code_token = $5, status = $6, location_id = $7
       WHERE id = $1
       RETURNING id, 
                 table_number as "tableNumber", 
                 area_zone as "areaZone", 
                 capacity, 
                 qr_code_token as "qrCodeToken", 
                 status, 
                 location_id as "locationId"`,
      [
        id,
        updated.tableNumber,
        updated.areaZone,
        updated.capacity,
        updated.qrCodeToken,
        updated.status,
        updated.locationId,
      ]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM dining_tables WHERE id = $1', [id]);
    return { success: true, message: `Table ${id} deleted successfully` };
  }
}
