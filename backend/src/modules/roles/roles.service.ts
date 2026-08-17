import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface RoleDto {
  id?: string;
  name: string;
  permissions?: string[];
  description?: string;
}

@Injectable()
export class RolesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const res = await this.db.query(
      `SELECT id, name, permissions, description FROM roles ORDER BY created_at ASC`
    );
    return res.rows;
  }

  async findById(id: string) {
    const res = await this.db.query(
      `SELECT id, name, permissions, description FROM roles WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Role ${id} not found`);
    return res.rows[0];
  }

  async create(dto: RoleDto) {
    const id = dto.id || `role-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO roles (id, name, permissions, description)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, permissions, description`,
      [id, dto.name, JSON.stringify(dto.permissions || []), dto.description || '']
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<RoleDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE roles 
       SET name = $2, permissions = $3, description = $4
       WHERE id = $1
       RETURNING id, name, permissions, description`,
      [id, updated.name, JSON.stringify(updated.permissions), updated.description]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM roles WHERE id = $1', [id]);
    return { success: true, message: `Role ${id} deleted successfully` };
  }
}
