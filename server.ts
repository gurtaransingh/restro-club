import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { query, testConnection } from "./src/db/index.js";
import {
  INITIAL_LOCATIONS,
  INITIAL_DEPARTMENTS,
  INITIAL_ROLES,
  INITIAL_MEMBERSHIP_TIERS,
  INITIAL_USERS,
  INITIAL_FACILITIES,
  INITIAL_MENU_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_ROOMS,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_EMPLOYEES,
  INITIAL_INVENTORY,
} from "./src/data/initialData.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Test PostgreSQL connection
  const isDbConnected = await testConnection();

  // In-memory fallback stores
  let memLocations = [...INITIAL_LOCATIONS];
  let memDepartments = [...INITIAL_DEPARTMENTS];
  let memRoles = [...INITIAL_ROLES];
  let memMembershipTiers = [...INITIAL_MEMBERSHIP_TIERS];
  let memUsers = [...INITIAL_USERS];
  let memFacilities = [...INITIAL_FACILITIES];
  let memMenuCategories = [...INITIAL_MENU_CATEGORIES];
  let memMenuItems = [...INITIAL_MENU_ITEMS];
  let memTables = [...INITIAL_TABLES];
  let memRooms = [...INITIAL_ROOMS];
  let memOrders = [...INITIAL_ORDERS];
  let memBookings = [...INITIAL_BOOKINGS];
  let memReviews = [...INITIAL_REVIEWS];
  let memEmployees = [...INITIAL_EMPLOYEES];
  let memInventory = [...INITIAL_INVENTORY];
  let memEventEnquiries: any[] = [];

  // API Health Check & Database Ping
  app.get("/api/health", async (req, res) => {
    try {
      const dbCheck = await query("SELECT current_database(), count(*) as loc_count FROM locations;");
      res.json({
        status: "ok",
        database: "PostgreSQL 18 (Active)",
        connectedDb: dbCheck.rows[0].current_database,
        locationsInDb: Number(dbCheck.rows[0].loc_count),
        app: "Restro Club Enterprise Platform",
      });
    } catch (e: any) {
      res.json({
        status: "ok",
        database: "In-Memory Fallback",
        error: e?.message,
        app: "Restro Club Enterprise Platform",
      });
    }
  });

  // REST API Routes: Master Store (Complete Normalized Hydration)
  app.get("/api/master-store", async (req, res) => {
    try {
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
        query("SELECT id, code, name, region, address, hours, contact_email as \"contactEmail\", contact_phone as \"contactPhone\", is_active as \"isActive\" FROM locations ORDER BY created_at ASC"),
        query("SELECT id, name, description, location_id as \"locationId\" FROM departments ORDER BY created_at ASC"),
        query("SELECT id, name, permissions, description FROM roles ORDER BY created_at ASC"),
        query("SELECT id, name, annual_fee as \"annualFee\", discount_percentage as \"discountPercentage\", perks, priority_access as \"priorityAccess\", color_badge as \"colorBadge\" FROM membership_tiers ORDER BY created_at ASC"),
        query("SELECT id, name, email, phone, role_id as \"roleId\", location_id as \"locationId\", membership_tier_id as \"membershipTierId\", status, avatar, loyalty_points as \"loyaltyPoints\", member_since_year as \"memberSinceYear\", username, password_hash as password, category, address, city, state, pincode, aadhar_image as \"aadharImage\", pan_image as \"panImage\", payscale_level as \"payscaleLevel\" FROM users ORDER BY created_at ASC"),
        query("SELECT id, name, category, location_id as \"locationId\", court_details as \"courtDetails\", slot_duration_minutes as \"slotDurationMinutes\", capacity, member_price as \"memberPrice\", guest_price as \"guestPrice\", peak_price as \"peakPrice\", status, rules, image FROM facilities ORDER BY created_at ASC"),
        query("SELECT id, name, display_order as \"displayOrder\", description FROM menu_categories ORDER BY display_order ASC"),
        query("SELECT id, name, category_id as \"categoryId\", price, making_cost as \"makingCost\", description, image, prep_time_minutes as \"prepTimeMinutes\", calories, allergens, dietary_type as \"dietaryType\", is_signature as \"isSignature\", in_stock as \"inStock\", stock_count as \"stockCount\" FROM menu_items ORDER BY created_at ASC"),
        query("SELECT id, table_number as \"tableNumber\", area_zone as \"areaZone\", capacity, qr_code_token as \"qrCodeToken\", status, location_id as \"locationId\" FROM dining_tables ORDER BY created_at ASC"),
        query("SELECT id, room_number as \"roomNumber\", name, category, price_per_night as \"pricePerNight\", amenities, floor, capacity, status, image, description FROM accommodation_rooms ORDER BY created_at ASC"),
        query("SELECT id, order_number as \"orderNumber\", location_id as \"locationId\", table_id as \"tableId\", table_name as \"tableName\", guest_name as \"guestName\", guest_count as \"guestCount\", items, subtotal, tax, discount, total, status, is_vip as \"isVIP\", has_allergy as \"hasAllergy\", allergy_notes as \"allergyNotes\", wait_minutes as \"waitMinutes\", created_at as \"createdAt\" FROM orders ORDER BY created_at DESC"),
        query("SELECT id, booking_ref as \"bookingRef\", location_id as \"locationId\", type, title, target_id as \"targetId\", guest_name as \"guestName\", guest_email as \"guestEmail\", date, time_slot as \"timeSlot\", guests_count as \"guestsCount\", total_amount as \"totalAmount\", payment_status as \"paymentStatus\", status, notes, created_at as \"createdAt\" FROM bookings ORDER BY created_at DESC"),
        query("SELECT id, author_name as \"authorName\", author_role as \"authorRole\", rating, date_ago as \"dateAgo\", category, comment, sentiment, avatar, initials, management_reply as \"managementReply\", replied_at as \"repliedAt\" FROM reviews ORDER BY created_at DESC"),
        query("SELECT id, employee_code as \"employeeCode\", name, department_id as \"departmentId\", designation, salary_monthly as \"salaryMonthly\", joining_date as \"joiningDate\", phone, status, location_id as \"locationId\", username, password_hash as password, category, address, city, state, pincode, aadhar_image as \"aadharImage\", pan_image as \"panImage\", payscale_level as \"payscaleLevel\" FROM employees ORDER BY created_at ASC"),
        query("SELECT id, item_code as \"itemCode\", name, category, unit, current_stock as \"currentStock\", min_stock_threshold as \"minStockThreshold\", unit_cost as \"unitCost\", expiry_date as \"expiryDate\", supplier_name as \"supplierName\", location_id as \"locationId\" FROM inventory ORDER BY created_at ASC"),
        query("SELECT id, event_type as \"eventType\", estimated_guests as \"estimatedGuests\", preferred_date as \"preferredDate\", contact_name as \"contactName\", special_requirements as \"specialRequirements\", status, created_at as \"createdAt\" FROM event_enquiries ORDER BY created_at DESC"),
      ]);

      res.json({
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
      });
    } catch (err) {
      console.warn("Falling back to memory store:", err);
      res.json({
        locations: memLocations,
        departments: memDepartments,
        roles: memRoles,
        membershipTiers: memMembershipTiers,
        users: memUsers,
        facilities: memFacilities,
        menuCategories: memMenuCategories,
        menuItems: memMenuItems,
        tables: memTables,
        rooms: memRooms,
        orders: memOrders,
        bookings: memBookings,
        reviews: memReviews,
        employees: memEmployees,
        inventory: memInventory,
        eventEnquiries: memEventEnquiries,
      });
    }
  });

  // Master Table CRUD: Locations
  app.post("/api/locations", async (req, res) => {
    const id = req.body.id || `loc-${Date.now()}`;
    const { code, name, region, address, hours, contactEmail, contactPhone, isActive } = req.body;
    try {
      await query(
        `INSERT INTO locations (id, code, name, region, address, hours, contact_email, contact_phone, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE SET name = $3, region = $4, address = $5, hours = $6, contact_email = $7, contact_phone = $8, is_active = $9`,
        [id, code || 'RC-LOC', name || 'New Location', region || 'Punjab', address || 'Highway', hours || '8AM-11PM', contactEmail || 'info@restroclub.com', contactPhone || '+918000', isActive ?? true]
      );
      res.json({ id, ...req.body });
    } catch (e) {
      const newItem = { id, ...req.body };
      memLocations.push(newItem);
      res.json(newItem);
    }
  });

  app.put("/api/locations/:id", async (req, res) => {
    const { id } = req.params;
    const { code, name, region, address, hours, contactEmail, contactPhone, isActive } = req.body;
    try {
      await query(
        `UPDATE locations SET code = COALESCE($2, code), name = COALESCE($3, name), region = COALESCE($4, region), address = COALESCE($5, address), hours = COALESCE($6, hours), contact_email = COALESCE($7, contact_email), contact_phone = COALESCE($8, contact_phone), is_active = COALESCE($9, is_active) WHERE id = $1`,
        [id, code, name, region, address, hours, contactEmail, contactPhone, isActive]
      );
      res.json({ success: true });
    } catch (e) {
      memLocations = memLocations.map(item => item.id === id ? { ...item, ...req.body } : item);
      res.json({ success: true });
    }
  });

  app.delete("/api/locations/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await query("DELETE FROM locations WHERE id = $1", [id]);
      res.json({ success: true });
    } catch (e) {
      memLocations = memLocations.filter(item => item.id !== id);
      res.json({ success: true });
    }
  });

  // Master Table CRUD: Users & Logins
  app.post("/api/users", async (req, res) => {
    const id = req.body.id || `usr-${Date.now()}`;
    const { name, email, phone, roleId, locationId, membershipTierId, status, avatar, loyaltyPoints, memberSinceYear } = req.body;
    try {
      await query(
        `INSERT INTO users (id, name, email, phone, role_id, location_id, membership_tier_id, status, avatar, loyalty_points, member_since_year)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [id, name, email, phone, roleId || 'role-customer', locationId || 'loc-1', membershipTierId || 'tier-club', status || 'ACTIVE', avatar, loyaltyPoints || 0, memberSinceYear || new Date().getFullYear()]
      );
      res.json({ id, ...req.body });
    } catch (e) {
      const newUser = { id, ...req.body };
      memUsers.push(newUser);
      res.json(newUser);
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, roleId, locationId, membershipTierId, status, loyaltyPoints } = req.body;
    try {
      await query(
        `UPDATE users SET name = COALESCE($2, name), email = COALESCE($3, email), phone = COALESCE($4, phone), role_id = COALESCE($5, role_id), location_id = COALESCE($6, location_id), membership_tier_id = COALESCE($7, membership_tier_id), status = COALESCE($8, status), loyalty_points = COALESCE($9, loyalty_points) WHERE id = $1`,
        [id, name, email, phone, roleId, locationId, membershipTierId, status, loyaltyPoints]
      );
      res.json({ success: true });
    } catch (e) {
      memUsers = memUsers.map(u => u.id === id ? { ...u, ...req.body } : u);
      res.json({ success: true });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await query("DELETE FROM users WHERE id = $1", [id]);
      res.json({ success: true });
    } catch (e) {
      memUsers = memUsers.filter(u => u.id !== id);
      res.json({ success: true });
    }
  });

  // Orders & KDS
  app.post("/api/orders", async (req, res) => {
    const newOrder = {
      id: req.body.id || `ord-${Math.floor(100 + Math.random() * 900)}`,
      orderNumber: req.body.orderNumber || `${Math.floor(100 + Math.random() * 900)}`,
      locationId: req.body.locationId || 'loc-1',
      tableId: req.body.tableId,
      tableName: req.body.tableName,
      guestName: req.body.guestName || 'Guest',
      guestCount: req.body.guestCount || 2,
      items: req.body.items || [],
      subtotal: req.body.subtotal || 0,
      tax: req.body.tax || 0,
      discount: req.body.discount || 0,
      total: req.body.total || 0,
      status: req.body.status || 'RECEIVED',
      isVIP: req.body.isVIP || false,
      hasAllergy: req.body.hasAllergy || false,
      allergyNotes: req.body.allergyNotes,
      waitMinutes: req.body.waitMinutes || 1,
      createdAt: req.body.createdAt || new Date().toISOString(),
    };
    try {
      await query(
        `INSERT INTO orders (id, order_number, location_id, table_id, table_name, guest_name, guest_count, items, subtotal, tax, discount, total, status, is_vip, has_allergy, allergy_notes, wait_minutes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
        [newOrder.id, newOrder.orderNumber, newOrder.locationId, newOrder.tableId, newOrder.tableName, newOrder.guestName, newOrder.guestCount, JSON.stringify(newOrder.items), newOrder.subtotal, newOrder.tax, newOrder.discount, newOrder.total, newOrder.status, newOrder.isVIP, newOrder.hasAllergy, newOrder.allergyNotes, newOrder.waitMinutes]
      );
    } catch (e) {
      memOrders.unshift(newOrder);
    }
    res.json(newOrder);
  });

  app.put("/api/orders/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await query("UPDATE orders SET status = $2 WHERE id = $1", [id, status]);
    } catch (e) {
      memOrders = memOrders.map(o => o.id === id ? { ...o, status } : o);
    }
    res.json({ success: true });
  });

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    const newBk = {
      id: req.body.id || `bk-${Date.now()}`,
      bookingRef: req.body.bookingRef || `RC-BK-${Math.floor(1000 + Math.random() * 9000)}`,
      locationId: req.body.locationId || 'loc-1',
      type: req.body.type || 'SPORTS',
      title: req.body.title || 'Reservation',
      targetId: req.body.targetId,
      guestName: req.body.guestName || 'Member',
      guestEmail: req.body.guestEmail || 'guest@restroclub.com',
      date: req.body.date || new Date().toISOString().split('T')[0],
      timeSlot: req.body.timeSlot,
      guestsCount: req.body.guestsCount || 1,
      totalAmount: req.body.totalAmount || 0,
      paymentStatus: req.body.paymentStatus || 'PAID',
      status: req.body.status || 'CONFIRMED',
      notes: req.body.notes,
      createdAt: req.body.createdAt || new Date().toISOString(),
    };
    try {
      await query(
        `INSERT INTO bookings (id, booking_ref, location_id, type, title, target_id, guest_name, guest_email, date, time_slot, guests_count, total_amount, payment_status, status, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [newBk.id, newBk.bookingRef, newBk.locationId, newBk.type, newBk.title, newBk.targetId, newBk.guestName, newBk.guestEmail, newBk.date, newBk.timeSlot, newBk.guestsCount, newBk.totalAmount, newBk.paymentStatus, newBk.status, newBk.notes]
      );
    } catch (e) {
      memBookings.unshift(newBk);
    }
    res.json(newBk);
  });

  // Vite SPA Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Restro Club Server running on http://localhost:${PORT}`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      const fallbackPort = PORT + 1;
      console.log(`Port ${PORT} is in use, retrying on http://localhost:${fallbackPort}...`);
      app.listen(fallbackPort, "0.0.0.0", () => {
        console.log(`Restro Club Server running on http://localhost:${fallbackPort}`);
      });
    } else {
      console.error(err);
    }
  });
}

startServer();
