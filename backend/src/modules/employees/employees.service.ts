import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface EmployeeDto {
  id?: string;
  employeeCode: string;
  name: string;
  departmentId?: string;
  designation: string;
  salaryMonthly: number;
  joiningDate?: string;
  phone?: string;
  status?: string;
  locationId?: string;
  username?: string;
  password?: string;
  category?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  aadharImage?: string;
  panImage?: string;
  payscaleLevel?: number;
}

@Injectable()
export class EmployeesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(locationId?: string) {
    let sql = `
      SELECT id, 
             employee_code as "employeeCode", 
             name, 
             department_id as "departmentId", 
             designation, 
             salary_monthly as "salaryMonthly", 
             joining_date as "joiningDate", 
             phone, status, 
             location_id as "locationId",
             username, password_hash as password, 
             category, address, city, state, pincode, 
             aadhar_image as "aadharImage", 
             pan_image as "panImage", 
             payscale_level as "payscaleLevel"
      FROM employees
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
      `SELECT id, 
              employee_code as "employeeCode", 
              name, 
              department_id as "departmentId", 
              designation, 
              salary_monthly as "salaryMonthly", 
              joining_date as "joiningDate", 
              phone, status, 
              location_id as "locationId",
              username, password_hash as password, 
              category, address, city, state, pincode, 
              aadhar_image as "aadharImage", 
              pan_image as "panImage", 
              payscale_level as "payscaleLevel"
       FROM employees 
       WHERE id = $1`,
      [id]
    );
    if (!res.rows[0]) throw new NotFoundException(`Employee ${id} not found`);
    return res.rows[0];
  }

  async create(dto: EmployeeDto) {
    const id = dto.id || `emp-${Date.now()}`;
    const res = await this.db.query(
      `INSERT INTO employees (
        id, employee_code, name, department_id, designation,
        salary_monthly, joining_date, phone, status, location_id,
        username, password_hash, category, address, city, state, pincode,
        aadhar_image, pan_image, payscale_level
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING id, 
                employee_code as "employeeCode", 
                name, 
                department_id as "departmentId", 
                designation, 
                salary_monthly as "salaryMonthly", 
                joining_date as "joiningDate", 
                phone, status, 
                location_id as "locationId",
                username, password_hash as password, 
                category, address, city, state, pincode, 
                aadhar_image as "aadharImage", 
                pan_image as "panImage", 
                payscale_level as "payscaleLevel"`,
      [
        id,
        dto.employeeCode || `EMP-${Date.now().toString().slice(-3)}`,
        dto.name,
        dto.departmentId || 'dept-1',
        dto.designation || 'Staff Member',
        dto.salaryMonthly || 25000,
        dto.joiningDate || new Date().toISOString(),
        dto.phone || '+91 98000 00000',
        dto.status || 'ACTIVE',
        dto.locationId || 'loc-1',
        dto.username || null,
        dto.password || null,
        dto.category || 'STAFF',
        dto.address || '',
        dto.city || 'Mohali',
        dto.state || 'Punjab',
        dto.pincode || '140601',
        dto.aadharImage || null,
        dto.panImage || null,
        dto.payscaleLevel ?? 0,
      ]
    );
    return res.rows[0];
  }

  async update(id: string, dto: Partial<EmployeeDto>) {
    const existing = await this.findById(id);
    const updated = { ...existing, ...dto };
    const res = await this.db.query(
      `UPDATE employees 
       SET employee_code = $2, name = $3, department_id = $4, designation = $5,
           salary_monthly = $6, phone = $7, status = $8, location_id = $9,
           username = $10, password_hash = $11, category = $12, address = $13,
           city = $14, state = $15, pincode = $16, aadhar_image = $17, 
           pan_image = $18, payscale_level = $19
       WHERE id = $1
       RETURNING id, 
                 employee_code as "employeeCode", 
                 name, 
                 department_id as "departmentId", 
                 designation, 
                 salary_monthly as "salaryMonthly", 
                 joining_date as "joiningDate", 
                 phone, status, 
                 location_id as "locationId",
                 username, password_hash as password, 
                 category, address, city, state, pincode, 
                 aadhar_image as "aadharImage", 
                 pan_image as "panImage", 
                 payscale_level as "payscaleLevel"`,
      [
        id,
        updated.employeeCode,
        updated.name,
        updated.departmentId,
        updated.designation,
        updated.salaryMonthly,
        updated.phone,
        updated.status,
        updated.locationId,
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
    await this.db.query('DELETE FROM employees WHERE id = $1', [id]);
    return { success: true, message: `Employee ${id} deleted successfully` };
  }
}
