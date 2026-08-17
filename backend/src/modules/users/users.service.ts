import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export function calculatePayscaleSalary(level: number): number {
  const safeLevel = Math.max(0, Math.min(50, Math.floor(level || 0)));
  return 10000 + safeLevel * 2000;
}

export interface UserDto {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  username?: string;
  password?: string;
  roleId?: string;
  category?: string;
  locationId?: string;
  membershipTierId?: string;
  status?: string;
  avatar?: string;
  loyaltyPoints?: number;
  memberSinceYear?: number;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  aadharImage?: string;
  panImage?: string;
  payscaleLevel?: number;
}

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(locationId?: string) {
    let sql = `
      SELECT id, name, email, phone, 
             role_id as "roleId", 
             location_id as "locationId", 
             membership_tier_id as "membershipTierId", 
             status, avatar, 
             loyalty_points as "loyaltyPoints", 
             member_since_year as "memberSinceYear",
             username, password_hash as password, 
             category, address, city, state, pincode, 
             aadhar_image as "aadharImage", 
             pan_image as "panImage", 
             payscale_level as "payscaleLevel"
      FROM users
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
      `SELECT id, name, email, phone, 
              role_id as "roleId", 
              location_id as "locationId", 
              membership_tier_id as "membershipTierId", 
              status, avatar, 
              loyalty_points as "loyaltyPoints", 
              member_since_year as "memberSinceYear",
              username, password_hash as password, 
              category, address, city, state, pincode, 
              aadhar_image as "aadharImage", 
              pan_image as "panImage", 
              payscale_level as "payscaleLevel"
       FROM users 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`User with id ${id} not found`);
    return res.rows[0];
  }

  async findByUsernameOrEmail(identifier: string) {
    const clean = identifier.trim().toLowerCase();
    const res = await this.db.query(
      `SELECT id, name, email, phone, 
              role_id as "roleId", 
              location_id as "locationId", 
              membership_tier_id as "membershipTierId", 
              status, avatar, 
              loyalty_points as "loyaltyPoints", 
              member_since_year as "memberSinceYear",
              username, password_hash as password, 
              category, address, city, state, pincode, 
              aadhar_image as "aadharImage", 
              pan_image as "panImage", 
              payscale_level as "payscaleLevel"
       FROM users 
       WHERE LOWER(username) = $1 OR LOWER(email) = $1 OR LOWER(id) = $1
       LIMIT 1`,
      [clean]
    );
    return res.rows[0] || null;
  }

  async create(dto: UserDto) {
    const id = dto.id || `usr-${Date.now()}`;
    const username = dto.username || dto.email?.split('@')[0] || `user${Date.now().toString().slice(-4)}`;
    const password = dto.password || 'password';
    const roleId = dto.roleId || 'role-customer';
    const tierId = dto.membershipTierId || 'tier-club';
    const locationId = dto.locationId || 'loc-1';
    const level = dto.payscaleLevel ?? 0;

    const res = await this.db.query(
      `INSERT INTO users (
        id, name, email, phone, role_id, location_id, membership_tier_id,
        status, avatar, loyalty_points, member_since_year,
        username, password_hash, category, address, city, state, pincode,
        aadhar_image, pan_image, payscale_level
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING id, name, email, phone, 
                role_id as "roleId", 
                location_id as "locationId", 
                membership_tier_id as "membershipTierId", 
                status, avatar, 
                loyalty_points as "loyaltyPoints", 
                member_since_year as "memberSinceYear",
                username, password_hash as password, 
                category, address, city, state, pincode, 
                aadhar_image as "aadharImage", 
                pan_image as "panImage", 
                payscale_level as "payscaleLevel"`,
      [
        id,
        dto.name,
        dto.email,
        dto.phone || '+91 98000 00000',
        roleId,
        locationId,
        tierId,
        dto.status || 'ACTIVE',
        dto.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        dto.loyaltyPoints ?? 1000,
        dto.memberSinceYear ?? new Date().getFullYear(),
        username,
        password,
        dto.category || 'MEMBER',
        dto.address || '',
        dto.city || 'Mohali',
        dto.state || 'Punjab',
        dto.pincode || '140601',
        dto.aadharImage || null,
        dto.panImage || null,
        level,
      ]
    );

    return res.rows[0];
  }

  async update(id: string, dto: Partial<UserDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };

    const res = await this.db.query(
      `UPDATE users 
       SET name = $2, email = $3, phone = $4, role_id = $5, location_id = $6, 
           membership_tier_id = $7, status = $8, avatar = $9, loyalty_points = $10,
           username = $11, password_hash = $12, category = $13, address = $14,
           city = $15, state = $16, pincode = $17, aadhar_image = $18, 
           pan_image = $19, payscale_level = $20
       WHERE id = $1
       RETURNING id, name, email, phone, 
                 role_id as "roleId", 
                 location_id as "locationId", 
                 membership_tier_id as "membershipTierId", 
                 status, avatar, 
                 loyalty_points as "loyaltyPoints", 
                 member_since_year as "memberSinceYear",
                 username, password_hash as password, 
                 category, address, city, state, pincode, 
                 aadhar_image as "aadharImage", 
                 pan_image as "panImage", 
                 payscale_level as "payscaleLevel"`,
      [
        id,
        updated.name,
        updated.email,
        updated.phone,
        updated.roleId,
        updated.locationId,
        updated.membershipTierId,
        updated.status,
        updated.avatar,
        updated.loyaltyPoints,
        updated.username,
        updated.password,
        updated.category,
        updated.address,
        updated.city,
        updated.state,
        updated.pincode,
        updated.aadharImage,
        updated.panImage,
        updated.payscaleLevel,
      ]
    );

    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM users WHERE id = $1', [id]);
    return { success: true, message: `User ${id} deleted successfully` };
  }
}
