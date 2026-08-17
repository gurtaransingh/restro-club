import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface BookingDto {
  id?: string;
  bookingRef?: string;
  locationId?: string;
  type: string;
  title: string;
  targetId?: string;
  guestName: string;
  guestEmail: string;
  date: string;
  timeSlot?: string;
  guestsCount?: number;
  totalAmount?: number;
  paymentStatus?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
}

@Injectable()
export class BookingsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(locationId?: string) {
    let sql = `
      SELECT id, 
             booking_ref as "bookingRef", 
             location_id as "locationId", 
             type, title, 
             target_id as "targetId", 
             guest_name as "guestName", 
             guest_email as "guestEmail", 
             date, 
             time_slot as "timeSlot", 
             guests_count as "guestsCount", 
             total_amount as "totalAmount", 
             payment_status as "paymentStatus", 
             status, notes, 
             created_at as "createdAt"
      FROM bookings
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
              booking_ref as "bookingRef", 
              location_id as "locationId", 
              type, title, 
              target_id as "targetId", 
              guest_name as "guestName", 
              guest_email as "guestEmail", 
              date, 
              time_slot as "timeSlot", 
              guests_count as "guestsCount", 
              total_amount as "totalAmount", 
              payment_status as "paymentStatus", 
              status, notes, 
              created_at as "createdAt"
       FROM bookings 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Booking ${id} not found`);
    return res.rows[0];
  }

  async create(dto: BookingDto) {
    const id = dto.id || `bk-${Date.now()}`;
    const bookingRef = dto.bookingRef || `RC-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const res = await this.db.query(
      `INSERT INTO bookings (
        id, booking_ref, location_id, type, title, target_id,
        guest_name, guest_email, date, time_slot, guests_count,
        total_amount, payment_status, status, notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, 
                booking_ref as "bookingRef", 
                location_id as "locationId", 
                type, title, 
                target_id as "targetId", 
                guest_name as "guestName", 
                guest_email as "guestEmail", 
                date, 
                time_slot as "timeSlot", 
                guests_count as "guestsCount", 
                total_amount as "totalAmount", 
                payment_status as "paymentStatus", 
                status, notes, 
                created_at as "createdAt"`,
      [
        id,
        bookingRef,
        dto.locationId || 'loc-1',
        dto.type || 'SPORTS',
        dto.title || 'Reservation',
        dto.targetId || null,
        dto.guestName || 'Member',
        dto.guestEmail || 'member@restroclub.com',
        dto.date || new Date().toISOString().split('T')[0],
        dto.timeSlot || '09:00 AM',
        dto.guestsCount || 1,
        dto.totalAmount || 0,
        dto.paymentStatus || 'PAID',
        dto.status || 'CONFIRMED',
        dto.notes || null,
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<BookingDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE bookings 
       SET booking_ref = $2, location_id = $3, type = $4, title = $5,
           target_id = $6, guest_name = $7, guest_email = $8, date = $9,
           time_slot = $10, guests_count = $11, total_amount = $12,
           payment_status = $13, status = $14, notes = $15
       WHERE id = $1
       RETURNING id, 
                 booking_ref as "bookingRef", 
                 location_id as "locationId", 
                 type, title, 
                target_id as "targetId", 
                 guest_name as "guestName", 
                 guest_email as "guestEmail", 
                 date, 
                 time_slot as "timeSlot", 
                 guests_count as "guestsCount", 
                 total_amount as "totalAmount", 
                 payment_status as "paymentStatus", 
                 status, notes, 
                 created_at as "createdAt"`,
      [
        id,
        updated.bookingRef,
        updated.locationId,
        updated.type,
        updated.title,
        updated.targetId,
        updated.guestName,
        updated.guestEmail,
        updated.date,
        updated.timeSlot,
        updated.guestsCount,
        updated.totalAmount,
        updated.paymentStatus,
        updated.status,
        updated.notes,
      ]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM bookings WHERE id = $1', [id]);
    return { success: true, message: `Booking ${id} deleted successfully` };
  }
}
