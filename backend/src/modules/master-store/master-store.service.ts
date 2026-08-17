import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class MasterStoreService {
  constructor(private readonly db: DatabaseService) {}

  async getMasterStore() {
    const [
      locRes,
      deptRes,
      roleRes,
      tierRes,
      userRes,
      facRes,
      catRes,
      itemRes,
      tblRes,
      roomRes,
      ordRes,
      bkRes,
      revRes,
      empRes,
      invRes,
      enqRes,
    ] = await Promise.all([
      this.db.query('SELECT id, code, name, region, address, hours, contact_email as "contactEmail", contact_phone as "contactPhone", is_active as "isActive" FROM locations ORDER BY created_at ASC'),
      this.db.query('SELECT id, name, description, location_id as "locationId" FROM departments ORDER BY created_at ASC'),
      this.db.query('SELECT id, name, permissions, description FROM roles ORDER BY created_at ASC'),
      this.db.query('SELECT id, name, annual_fee as "annualFee", discount_percentage as "discountPercentage", perks, priority_access as "priorityAccess", color_badge as "colorBadge" FROM membership_tiers ORDER BY created_at ASC'),
      this.db.query('SELECT id, name, email, phone, role_id as "roleId", location_id as "locationId", membership_tier_id as "membershipTierId", status, avatar, loyalty_points as "loyaltyPoints", member_since_year as "memberSinceYear", username, password_hash as password, category, address, city, state, pincode, aadhar_image as "aadharImage", pan_image as "panImage", payscale_level as "payscaleLevel" FROM users ORDER BY created_at ASC'),
      this.db.query('SELECT id, name, category, location_id as "locationId", court_details as "courtDetails", slot_duration_minutes as "slotDurationMinutes", capacity, member_price as "memberPrice", guest_price as "guestPrice", peak_price as "peakPrice", status, rules, image FROM facilities ORDER BY created_at ASC'),
      this.db.query('SELECT id, name, display_order as "displayOrder", description FROM menu_categories ORDER BY display_order ASC'),
      this.db.query('SELECT id, name, category_id as "categoryId", price, making_cost as "makingCost", description, image, prep_time_minutes as "prepTimeMinutes", calories, allergens, dietary_type as "dietaryType", is_signature as "isSignature", in_stock as "inStock", stock_count as "stockCount" FROM menu_items ORDER BY created_at ASC'),
      this.db.query('SELECT id, table_number as "tableNumber", area_zone as "areaZone", capacity, qr_code_token as "qrCodeToken", status, location_id as "locationId" FROM dining_tables ORDER BY created_at ASC'),
      this.db.query('SELECT id, room_number as "roomNumber", name, category, price_per_night as "pricePerNight", amenities, floor, capacity, status, image, description FROM accommodation_rooms ORDER BY created_at ASC'),
      this.db.query('SELECT id, order_number as "orderNumber", location_id as "locationId", table_id as "tableId", table_name as "tableName", guest_name as "guestName", guest_count as "guestCount", items, subtotal, tax, discount, total, status, is_vip as "isVIP", has_allergy as "hasAllergy", allergy_notes as "allergyNotes", wait_minutes as "waitMinutes", created_at as "createdAt" FROM orders ORDER BY created_at DESC'),
      this.db.query('SELECT id, booking_ref as "bookingRef", location_id as "locationId", type, title, target_id as "targetId", guest_name as "guestName", guest_email as "guestEmail", date, time_slot as "timeSlot", guests_count as "guestsCount", total_amount as "totalAmount", payment_status as "paymentStatus", status, notes, created_at as "createdAt" FROM bookings ORDER BY created_at DESC'),
      this.db.query('SELECT id, author_name as "authorName", author_role as "authorRole", rating, date_ago as "dateAgo", category, comment, sentiment, avatar, initials, management_reply as "managementReply", replied_at as "repliedAt" FROM reviews ORDER BY created_at DESC'),
      this.db.query('SELECT id, employee_code as "employeeCode", name, department_id as "departmentId", designation, salary_monthly as "salaryMonthly", joining_date as "joiningDate", phone, status, location_id as "locationId", username, password_hash as password, category, address, city, state, pincode, aadhar_image as "aadharImage", pan_image as "panImage", payscale_level as "payscaleLevel" FROM employees ORDER BY created_at ASC'),
      this.db.query('SELECT id, item_code as "itemCode", name, category, unit, current_stock as "currentStock", min_stock_threshold as "minStockThreshold", unit_cost as "unitCost", expiry_date as "expiryDate", supplier_name as "supplierName", location_id as "locationId" FROM inventory ORDER BY created_at ASC'),
      this.db.query('SELECT id, event_type as "eventType", estimated_guests as "estimatedGuests", preferred_date as "preferredDate", contact_name as "contactName", special_requirements as "specialRequirements", status, created_at as "createdAt" FROM event_enquiries ORDER BY created_at DESC'),
    ]);

    return {
      locations: locRes.rows,
      departments: deptRes.rows,
      roles: roleRes.rows,
      membershipTiers: tierRes.rows,
      users: userRes.rows,
      facilities: facRes.rows,
      menuCategories: catRes.rows,
      menuItems: itemRes.rows,
      tables: tblRes.rows,
      rooms: roomRes.rows,
      orders: ordRes.rows,
      bookings: bkRes.rows,
      reviews: revRes.rows,
      employees: empRes.rows,
      inventory: invRes.rows,
      eventEnquiries: enqRes.rows,
    };
  }
}
