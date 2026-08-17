import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface TierDto {
  id?: string;
  name: string;
  annualFee: number;
  discountPercentage: number;
  perks?: string[];
  priorityAccess?: boolean;
  colorBadge?: string;
}

@Injectable()
export class TiersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const res = await this.db.query(
      `SELECT id, name, 
              annual_fee as "annualFee", 
              discount_percentage as "discountPercentage", 
              perks, 
              priority_access as "priorityAccess", 
              color_badge as "colorBadge" 
       FROM membership_tiers 
       ORDER BY created_at ASC`
    );
    return res.rows;
  }

  async findById(id: string) {
    const res = await this.db.query(
      `SELECT id, name, 
              annual_fee as "annualFee", 
              discount_percentage as "discountPercentage", 
              perks, 
              priority_access as "priorityAccess", 
              color_badge as "colorBadge" 
       FROM membership_tiers 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Tier ${id} not found`);
    return res.rows[0];
  }

  async create(dto: TierDto) {
    const id = dto.id || `tier-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO membership_tiers (id, name, annual_fee, discount_percentage, perks, priority_access, color_badge)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, annual_fee as "annualFee", discount_percentage as "discountPercentage", perks, priority_access as "priorityAccess", color_badge as "colorBadge"`,
      [
        id,
        dto.name,
        dto.annualFee,
        dto.discountPercentage,
        JSON.stringify(dto.perks || []),
        dto.priorityAccess ?? false,
        dto.colorBadge || '#8C5A3C',
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<TierDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE membership_tiers 
       SET name = $2, annual_fee = $3, discount_percentage = $4, perks = $5, priority_access = $6, color_badge = $7
       WHERE id = $1
       RETURNING id, name, annual_fee as "annualFee", discount_percentage as "discountPercentage", perks, priority_access as "priorityAccess", color_badge as "colorBadge"`,
      [
        id,
        updated.name,
        updated.annualFee,
        updated.discountPercentage,
        JSON.stringify(updated.perks),
        updated.priorityAccess,
        updated.colorBadge,
      ]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM membership_tiers WHERE id = $1', [id]);
    return { success: true, message: `Tier ${id} deleted successfully` };
  }
}
