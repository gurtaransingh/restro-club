import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface EventEnquiryDto {
  id?: string;
  eventType: string;
  estimatedGuests?: number;
  preferredDate?: string;
  contactName: string;
  specialRequirements?: string;
  status?: string;
  createdAt?: string;
}

@Injectable()
export class EventsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const res = await this.db.query(
      `SELECT id, 
              event_type as "eventType", 
              estimated_guests as "estimatedGuests", 
              preferred_date as "preferredDate", 
              contact_name as "contactName", 
              special_requirements as "specialRequirements", 
              status, 
              created_at as "createdAt" 
       FROM event_enquiries 
       ORDER BY created_at DESC`
    );
    return res.rows;
  }

  async findById(id: string) {
    const res = await this.db.query(
      `SELECT id, 
              event_type as "eventType", 
              estimated_guests as "estimatedGuests", 
              preferred_date as "preferredDate", 
              contact_name as "contactName", 
              special_requirements as "specialRequirements", 
              status, 
              created_at as "createdAt" 
       FROM event_enquiries 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Event enquiry ${id} not found`);
    return res.rows[0];
  }

  async create(dto: EventEnquiryDto) {
    const id = dto.id || `enq-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO event_enquiries (
        id, event_type, estimated_guests, preferred_date, contact_name, special_requirements, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, 
                event_type as "eventType", 
                estimated_guests as "estimatedGuests", 
                preferred_date as "preferredDate", 
                contact_name as "contactName", 
                special_requirements as "specialRequirements", 
                status, 
                created_at as "createdAt"`,
      [
        id,
        dto.eventType,
        dto.estimatedGuests || 50,
        dto.preferredDate || new Date().toISOString().split('T')[0],
        dto.contactName,
        dto.specialRequirements || '',
        dto.status || 'PENDING',
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<EventEnquiryDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE event_enquiries 
       SET event_type = $2, estimated_guests = $3, preferred_date = $4,
           contact_name = $5, special_requirements = $6, status = $7
       WHERE id = $1
       RETURNING id, 
                 event_type as "eventType", 
                 estimated_guests as "estimatedGuests", 
                 preferred_date as "preferredDate", 
                 contact_name as "contactName", 
                 special_requirements as "specialRequirements", 
                 status, 
                 created_at as "createdAt"`,
      [
        id,
        updated.eventType,
        updated.estimatedGuests,
        updated.preferredDate,
        updated.contactName,
        updated.specialRequirements,
        updated.status,
      ]
    );
    return res.rows[0];
  }

  async delete(id: string) {
    await this.findById(id);
    await this.db.query('DELETE FROM event_enquiries WHERE id = $1', [id]);
    return { success: true, message: `Event enquiry ${id} deleted successfully` };
  }
}
