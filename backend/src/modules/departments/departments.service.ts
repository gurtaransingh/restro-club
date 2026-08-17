import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface DepartmentDto {
  id?: string;
  name: string;
  description?: string;
  locationId?: string;
}

@Injectable()
export class DepartmentsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(locationId?: string) {
    let sql = `SELECT id, name, description, location_id as "locationId" FROM departments`;
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
      `SELECT id, name, description, location_id as "locationId" FROM departments WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Department ${id} not found`);
    return res.rows[0];
  }

  async create(dto: DepartmentDto) {
    const id = dto.id || `dept-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO departments (id, name, description, location_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, description, location_id as "locationId"`,
      [id, dto.name, dto.description || '', dto.locationId || 'loc-1']
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<DepartmentDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE departments 
       SET name = $2, description = $3, location_id = $4
       WHERE id = $1
       RETURNING id, name, description, location_id as "locationId"`,
      [id, updated.name, updated.description, updated.locationId]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM departments WHERE id = $1', [id]);
    return { success: true, message: `Department ${id} deleted successfully` };
  }
}
