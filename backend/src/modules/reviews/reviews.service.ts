import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface ReviewDto {
  id?: string;
  authorName: string;
  authorRole?: string;
  rating: number;
  dateAgo?: string;
  category?: string;
  comment: string;
  sentiment?: string;
  avatar?: string;
  initials?: string;
  managementReply?: string;
  repliedAt?: string;
}

@Injectable()
export class ReviewsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const res = await this.db.query(
      `SELECT id, 
              author_name as "authorName", 
              author_role as "authorRole", 
              rating, 
              date_ago as "dateAgo", 
              category, comment, sentiment, avatar, initials, 
              management_reply as "managementReply", 
              replied_at as "repliedAt" 
       FROM reviews 
       ORDER BY created_at DESC`
    );
    return res.rows;
  }

  async create(dto: ReviewDto) {
    const id = dto.id || `rev-${Date.now()}`;
    const sentiment = dto.rating >= 4 ? 'EXCEPTIONAL' : dto.rating >= 3 ? 'SATISFACTORY' : 'NEEDS_ATTENTION';
    const res = await this.db.query(
      `INSERT INTO reviews (
        id, author_name, author_role, rating, date_ago, category,
        comment, sentiment, avatar, initials, management_reply, replied_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, 
                author_name as "authorName", 
                author_role as "authorRole", 
                rating, 
                date_ago as "dateAgo", 
                category, comment, sentiment, avatar, initials, 
                management_reply as "managementReply", 
                replied_at as "repliedAt"`,
      [
        id,
        dto.authorName,
        dto.authorRole || 'Club Member',
        dto.rating,
        dto.dateAgo || 'Just now',
        dto.category || 'Dining',
        dto.comment,
        dto.sentiment || sentiment,
        dto.avatar || null,
        dto.initials || null,
        dto.managementReply || null,
        dto.repliedAt || null,
      ]
    );
    return res.rows[0];
  }

  async reply(id: string, replyText: string) {
    const res = await this.db.query(
      `UPDATE reviews 
       SET management_reply = $2, replied_at = NOW() 
       WHERE id = $1 
       RETURNING id, 
                 author_name as "authorName", 
                 author_role as "authorRole", 
                 rating, 
                 date_ago as "dateAgo", 
                 category, comment, sentiment, avatar, initials, 
                 management_reply as "managementReply", 
                 replied_at as "repliedAt"`,
      [id, replyText]
    );
    if (!res.rows[0]) throw new NotFoundException(`Review ${id} not found`);
    return res.rows[0];
  }

  async delete(id: string) {
    await this.db.query('DELETE FROM reviews WHERE id = $1', [id]);
    return { success: true };
  }
}
