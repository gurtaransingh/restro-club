-- ============================================================================
-- RESTRO CLUB - ENTERPRISE MULTI-LOCATION RELATIONAL DATABASE SCHEMA
-- Engine: PostgreSQL 14+ / 18+
-- Features: Strict 3NF Normalization, Foreign Key Cascades, Index Optimization,
--           JSONB Structured Attributes, Triggered Timestamps & Audit Compliance
-- ============================================================================

-- 0. EXTENSIONS & UTILITIES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================================================
-- 1. MASTER TABLE: LOCATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS locations (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    hours VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_locations_code ON locations(code);
CREATE INDEX IF NOT EXISTS idx_locations_is_active ON locations(is_active);

-- ============================================================================
-- 2. MASTER TABLE: DEPARTMENTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location_id VARCHAR(50) REFERENCES locations(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_departments_location_id ON departments(location_id);

-- ============================================================================
-- 3. MASTER TABLE: ROLES & RBAC PERMISSIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_roles_permissions_gin ON roles USING gin (permissions);

-- ============================================================================
-- 4. MASTER TABLE: MEMBERSHIP TIERS
-- ============================================================================
CREATE TABLE IF NOT EXISTS membership_tiers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    annual_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discount_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    perks JSONB NOT NULL DEFAULT '[]'::jsonb,
    priority_access BOOLEAN NOT NULL DEFAULT FALSE,
    color_badge VARCHAR(50) DEFAULT '#8C5A3C',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_membership_tiers_name ON membership_tiers(name);

-- ============================================================================
-- 5. MASTER TABLE: USERS & LOGIN ACCOUNTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    role_id VARCHAR(50) REFERENCES roles(id) ON DELETE RESTRICT,
    location_id VARCHAR(50) REFERENCES locations(id) ON DELETE SET NULL,
    membership_tier_id VARCHAR(50) REFERENCES membership_tiers(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'PENDING')),
    avatar TEXT,
    loyalty_points INTEGER NOT NULL DEFAULT 0,
    member_since_year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_location_id ON users(location_id);
CREATE INDEX IF NOT EXISTS idx_users_tier_id ON users(membership_tier_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- ============================================================================
-- 6. MASTER TABLE: SPORTS & RECREATION FACILITIES
-- ============================================================================
CREATE TABLE IF NOT EXISTS facilities (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('Racket Sports', 'Water Sports', 'Indoor Games', 'Outdoor Sports', 'Fitness & Spa')),
    location_id VARCHAR(50) NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    court_details VARCHAR(255),
    slot_duration_minutes INTEGER NOT NULL DEFAULT 60,
    capacity INTEGER NOT NULL DEFAULT 4,
    member_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    guest_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    peak_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'BUSY', 'MAINTENANCE', 'OPEN')),
    rules TEXT,
    image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_facilities_location_category ON facilities(location_id, category);
CREATE INDEX IF NOT EXISTS idx_facilities_status ON facilities(status);

-- ============================================================================
-- 7. MASTER TABLE: MENU CATEGORIES
-- ============================================================================
CREATE TABLE IF NOT EXISTS menu_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    display_order INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_menu_categories_order ON menu_categories(display_order);

-- ============================================================================
-- 8. MASTER TABLE: MENU ITEMS & RECIPES
-- ============================================================================
CREATE TABLE IF NOT EXISTS menu_items (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id VARCHAR(50) NOT NULL REFERENCES menu_categories(id) ON DELETE RESTRICT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    making_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    image TEXT,
    prep_time_minutes INTEGER NOT NULL DEFAULT 15,
    calories INTEGER NOT NULL DEFAULT 0,
    allergens JSONB NOT NULL DEFAULT '[]'::jsonb,
    dietary_type VARCHAR(50) NOT NULL DEFAULT 'VEGETARIAN' CHECK (dietary_type IN ('VEGETARIAN', 'VEGAN', 'NON_VEGETARIAN', 'GLUTEN_FREE')),
    is_signature BOOLEAN NOT NULL DEFAULT FALSE,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    stock_count INTEGER DEFAULT 50,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_signature ON menu_items(is_signature);
CREATE INDEX IF NOT EXISTS idx_menu_items_in_stock ON menu_items(in_stock);
CREATE INDEX IF NOT EXISTS idx_menu_items_allergens_gin ON menu_items USING gin (allergens);

-- ============================================================================
-- 9. MASTER TABLE: DINING TABLES & QR IDENTIFIERS
-- ============================================================================
CREATE TABLE IF NOT EXISTS dining_tables (
    id VARCHAR(50) PRIMARY KEY,
    table_number VARCHAR(50) NOT NULL,
    area_zone VARCHAR(100) NOT NULL CHECK (area_zone IN ('Main Dining', 'VIP Lounge', 'Outdoor Terrace', 'Bar Area', 'Poolside Cabana')),
    capacity INTEGER NOT NULL DEFAULT 4,
    qr_code_token VARCHAR(100) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'VACANT' CHECK (status IN ('VACANT', 'OCCUPIED', 'RESERVED', 'CLEANING')),
    location_id VARCHAR(50) NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_dining_tables_location_status ON dining_tables(location_id, status);
CREATE INDEX IF NOT EXISTS idx_dining_tables_qr_token ON dining_tables(qr_code_token);

-- ============================================================================
-- 10. MASTER TABLE: ACCOMMODATIONS & RESORT ROOMS
-- ============================================================================
CREATE TABLE IF NOT EXISTS accommodation_rooms (
    id VARCHAR(50) PRIMARY KEY,
    room_number VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('Boutique 1BHK', 'Boutique 2BHK', 'The Luxury Suite', 'Penthouse Suite')),
    price_per_night NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
    floor VARCHAR(50) NOT NULL DEFAULT '1st Floor',
    capacity INTEGER NOT NULL DEFAULT 2,
    status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE')),
    image TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_accommodation_rooms_status ON accommodation_rooms(status);
CREATE INDEX IF NOT EXISTS idx_accommodation_rooms_category ON accommodation_rooms(category);

-- ============================================================================
-- 11. MASTER TABLE: EMPLOYEES & HR
-- ============================================================================
CREATE TABLE IF NOT EXISTS employees (
    id VARCHAR(50) PRIMARY KEY,
    employee_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    department_id VARCHAR(50) NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    designation VARCHAR(150) NOT NULL,
    salary_monthly NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    joining_date DATE NOT NULL DEFAULT CURRENT_DATE,
    phone VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ON_LEAVE', 'TERMINATED')),
    location_id VARCHAR(50) NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department_id);
CREATE INDEX IF NOT EXISTS idx_employees_location ON employees(location_id);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);

-- ============================================================================
-- 12. MASTER TABLE: KITCHEN INVENTORY & RAW MATERIALS
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory (
    id VARCHAR(50) PRIMARY KEY,
    item_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('Raw Ingredients', 'Spirits & Beverages', 'Sports Equipment', 'Linen & Housekeeping', 'Consumables')),
    unit VARCHAR(50) NOT NULL CHECK (unit IN ('kg', 'liters', 'bottles', 'pieces', 'packs')),
    current_stock NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    min_stock_threshold NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    unit_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    expiry_date DATE,
    supplier_name VARCHAR(255) NOT NULL,
    location_id VARCHAR(50) NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inventory_location_category ON inventory(location_id, category);
CREATE INDEX IF NOT EXISTS idx_inventory_current_stock ON inventory(current_stock);

-- ============================================================================
-- 13. OPERATIONAL LEDGER: ORDERS & KITCHEN TICKETS
-- ============================================================================
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL,
    location_id VARCHAR(50) NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
    table_id VARCHAR(50) REFERENCES dining_tables(id) ON DELETE SET NULL,
    table_name VARCHAR(100),
    guest_name VARCHAR(255) NOT NULL,
    guest_count INTEGER NOT NULL DEFAULT 2,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    tax NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'RECEIVED' CHECK (status IN ('RECEIVED', 'ACCEPTED', 'PREPARING', 'READY', 'SERVED', 'COMPLETED', 'CANCELLED')),
    is_vip BOOLEAN NOT NULL DEFAULT FALSE,
    has_allergy BOOLEAN NOT NULL DEFAULT FALSE,
    allergy_notes TEXT,
    wait_minutes INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_location_status ON orders(location_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_table_id ON orders(table_id);

-- ============================================================================
-- 14. OPERATIONAL LEDGER: BOOKINGS & RESERVATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    booking_ref VARCHAR(100) NOT NULL UNIQUE,
    location_id VARCHAR(50) NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('DINING', 'SPORTS', 'STAY', 'EVENT', 'POOL')),
    title VARCHAR(255) NOT NULL,
    target_id VARCHAR(50),
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    date VARCHAR(100) NOT NULL,
    time_slot VARCHAR(100),
    guests_count INTEGER NOT NULL DEFAULT 1,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'PAID' CHECK (payment_status IN ('PAID', 'PAY_AT_CLUB', 'PENDING')),
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_location_type ON bookings(location_id, type);
CREATE INDEX IF NOT EXISTS idx_bookings_date_status ON bookings(date, status);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_ref);

-- ============================================================================
-- 15. OPERATIONAL LEDGER: EVENT CRM PIPELINE
-- ============================================================================
CREATE TABLE IF NOT EXISTS event_enquiries (
    id VARCHAR(50) PRIMARY KEY,
    event_type VARCHAR(150) NOT NULL,
    estimated_guests VARCHAR(100) NOT NULL,
    preferred_date VARCHAR(100) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    special_requirements TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_event_enquiries_status ON event_enquiries(status);

-- ============================================================================
-- 16. OPERATIONAL LEDGER: REVIEWS & GUEST FEEDBACK
-- ============================================================================
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(50) PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(100) DEFAULT 'Member',
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    date_ago VARCHAR(100) DEFAULT 'Just now',
    category VARCHAR(100) NOT NULL CHECK (category IN ('Dining', 'Sports Club', 'Resort Stay', 'Pool')),
    comment TEXT NOT NULL,
    sentiment VARCHAR(50) NOT NULL DEFAULT 'EXCEPTIONAL' CHECK (sentiment IN ('EXCEPTIONAL', 'CONSTRUCTIVE', 'NEEDS_ATTENTION')),
    avatar TEXT,
    initials VARCHAR(10),
    management_reply TEXT,
    replied_at VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_rating_category ON reviews(category, rating);

-- ============================================================================
-- 17. ATTACH TRIGGER FOR UPDATED_AT TO ALL TABLES
-- ============================================================================
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
    LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS trg_update_timestamp ON %I;
            CREATE TRIGGER trg_update_timestamp
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        ', t, t);
    END LOOP;
END;
$$;
