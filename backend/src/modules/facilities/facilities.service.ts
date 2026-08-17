import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface FacilityDto {
  id?: string;
  name: string;
  category: string;
  locationId?: string;
  courtDetails?: string;
  slotDurationMinutes?: number;
  capacity?: number;
  memberPrice?: number;
  guestPrice?: number;
  peakPrice?: number;
  status?: string;
  rules?: string;
  image?: string;
}

@Injectable()
export class FacilitiesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(locationId?: string) {
    let sql = `
      SELECT id, name, category, 
             location_id as "locationId", 
             court_details as "courtDetails", 
             slot_duration_minutes as "slotDurationMinutes", 
             capacity, 
             member_price as "memberPrice", 
             guest_price as "guestPrice", 
             peak_price as "peakPrice", 
             status, rules, image 
      FROM facilities
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
      `SELECT id, name, category, 
              location_id as "locationId", 
              court_details as "courtDetails", 
              slot_duration_minutes as "slotDurationMinutes", 
              capacity, 
              member_price as "memberPrice", 
              guest_price as "guestPrice", 
              peak_price as "peakPrice", 
              status, rules, image 
       FROM facilities 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Facility ${id} not found`);
    return res.rows[0];
  }

  async create(dto: FacilityDto) {
    const id = dto.id || `fac-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO facilities (
        id, name, category, location_id, court_details, 
        slot_duration_minutes, capacity, member_price, 
        guest_price, peak_price, status, rules, image
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, name, category, 
                location_id as "locationId", 
                court_details as "courtDetails", 
                slot_duration_minutes as "slotDurationMinutes", 
                capacity, 
                member_price as "memberPrice", 
                guest_price as "guestPrice", 
                peak_price as "peakPrice", 
                status, rules, image`,
      [
        id,
        dto.name,
        dto.category,
        dto.locationId || 'loc-1',
        dto.courtDetails || '',
        dto.slotDurationMinutes || 60,
        dto.capacity || 4,
        dto.memberPrice || 0,
        dto.guestPrice || 500,
        dto.peakPrice || 800,
        dto.status || 'AVAILABLE',
        dto.rules || '',
        dto.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<FacilityDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE facilities 
       SET name = $2, category = $3, location_id = $4, court_details = $5,
           slot_duration_minutes = $6, capacity = $7, member_price = $8,
           guest_price = $9, peak_price = $10, status = $11, rules = $12, image = $13
       WHERE id = $1
       RETURNING id, name, category, 
                 location_id as "locationId", 
                 court_details as "courtDetails", 
                 slot_duration_minutes as "slotDurationMinutes", 
                 capacity, 
                 member_price as "memberPrice", 
                 guest_price as "guestPrice", 
                 peak_price as "peakPrice", 
                 status, rules, image`,
      [
        id,
        updated.name,
        updated.category,
        updated.locationId,
        updated.courtDetails,
        updated.slotDurationMinutes,
        updated.capacity,
        updated.memberPrice,
        updated.guestPrice,
        updated.peakPrice,
        updated.status,
        updated.rules,
        updated.image,
      ]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM facilities WHERE id = $1', [id]);
    return { success: true, message: `Facility ${id} deleted successfully` };
  }
}
