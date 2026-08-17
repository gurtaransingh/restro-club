import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface RoomDto {
  id?: string;
  roomNumber: string;
  name: string;
  category?: string;
  pricePerNight?: number;
  amenities?: string[];
  floor?: string;
  capacity?: number;
  status?: string;
  image?: string;
  description?: string;
}

@Injectable()
export class RoomsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const res = await this.db.query(
      `SELECT id, 
              room_number as "roomNumber", 
              name, category, 
              price_per_night as "pricePerNight", 
              amenities, floor, capacity, status, image, description 
       FROM accommodation_rooms 
       ORDER BY created_at ASC`
    );
    return res.rows;
  }

  async findById(id: string) {
    const res = await this.db.query(
      `SELECT id, 
              room_number as "roomNumber", 
              name, category, 
              price_per_night as "pricePerNight", 
              amenities, floor, capacity, status, image, description 
       FROM accommodation_rooms 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Room ${id} not found`);
    return res.rows[0];
  }

  async create(dto: RoomDto) {
    const id = dto.id || `room-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO accommodation_rooms (
        id, room_number, name, category, price_per_night,
        amenities, floor, capacity, status, image, description
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, 
                room_number as "roomNumber", 
                name, category, 
                price_per_night as "pricePerNight", 
                amenities, floor, capacity, status, image, description`,
      [
        id,
        dto.roomNumber,
        dto.name,
        dto.category || 'Luxury Suite',
        dto.pricePerNight || 25000,
        JSON.stringify(dto.amenities || ['WiFi', 'Climate Control', '24/7 Dining']),
        dto.floor || '1st Floor',
        dto.capacity || 2,
        dto.status || 'AVAILABLE',
        dto.image || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
        dto.description || '',
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<RoomDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE accommodation_rooms 
       SET room_number = $2, name = $3, category = $4, price_per_night = $5,
           amenities = $6, floor = $7, capacity = $8, status = $9, image = $10, description = $11
       WHERE id = $1
       RETURNING id, 
                 room_number as "roomNumber", 
                 name, category, 
                 price_per_night as "pricePerNight", 
                 amenities, floor, capacity, status, image, description`,
      [
        id,
        updated.roomNumber,
        updated.name,
        updated.category,
        updated.pricePerNight,
        JSON.stringify(updated.amenities),
        updated.floor,
        updated.capacity,
        updated.status,
        updated.image,
        updated.description,
      ]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM accommodation_rooms WHERE id = $1', [id]);
    return { success: true, message: `Room ${id} deleted successfully` };
  }
}
