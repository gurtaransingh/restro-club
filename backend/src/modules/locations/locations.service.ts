import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface LocationDto {
  id?: string;
  code: string;
  name: string;
  region: string;
  address: string;
  hours: string;
  contactEmail: string;
  contactPhone: string;
  isActive?: boolean;
}

@Injectable()
export class LocationsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const res = await this.db.query(
      `SELECT id, code, name, region, address, hours, 
              contact_email as "contactEmail", 
              contact_phone as "contactPhone", 
              is_active as "isActive" 
       FROM locations 
       ORDER BY created_at ASC`
    );
    return res.rows;
  }

  async findById(id: string) {
    const res = await this.db.query(
      `SELECT id, code, name, region, address, hours, 
              contact_email as "contactEmail", 
              contact_phone as "contactPhone", 
              is_active as "isActive" 
       FROM locations 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Location with id ${id} not found`);
    return res.rows[0];
  }

  async create(dto: LocationDto) {
    const id = dto.id || `loc-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO locations (id, code, name, region, address, hours, contact_email, contact_phone, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, code, name, region, address, hours, 
                 contact_email as "contactEmail", 
                 contact_phone as "contactPhone", 
                 is_active as "isActive"`,
      [
        id,
        dto.code,
        dto.name,
        dto.region,
        dto.address,
        dto.hours,
        dto.contactEmail,
        dto.contactPhone,
        dto.isActive ?? true,
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<LocationDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE locations 
       SET code = $2, name = $3, region = $4, address = $5, hours = $6, 
           contact_email = $7, contact_phone = $8, is_active = $9
       WHERE id = $1
       RETURNING id, code, name, region, address, hours, 
                 contact_email as "contactEmail", 
                 contact_phone as "contactPhone", 
                 is_active as "isActive"`,
      [
        id,
        updated.code,
        updated.name,
        updated.region,
        updated.address,
        updated.hours,
        updated.contactEmail,
        updated.contactPhone,
        updated.isActive,
      ]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM locations WHERE id = $1', [id]);
    return { success: true, message: `Location ${id} deleted successfully` };
  }
}
