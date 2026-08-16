# Restro Club — Enterprise Multi-Location Luxury & Hospitality Platform

> **Restro Club** is an enterprise-grade digital platform and operations hub for multi-location luxury destinations, combining Michelin-inspired fine dining, QR table ordering, indoor recreation, sports courts (Pickleball, Box Cricket, Badminton), swimming pool deck, boutique resort stays (1BHK, 2BHK, Luxury Suites, Penthouses), and a live Kitchen Display System (KDS).

---

## 🏛️ Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Node.js, Express REST API (`server.ts`)
- **Database**: PostgreSQL 18 with 3NF normalization, foreign key cascading, JSONB indexing, and triggers (`database/schema.sql`)
- **ORM & Connection Pooling**: `pg.Pool` with typed SQL queries (`src/db/index.ts`)
- **Security & RBAC**: Role-Based Access Control guards protecting `/admin` and `/kitchen`

---

## 🔑 Role Accounts & Test Logins

| Persona | Login ID | Password | Role / Scope | Dashboard Route |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `admin` | Full Master Tables CRUD, Locations, Finance, HR | [`/admin`](http://localhost:3001/admin) |
| **Executive Chef** | `c1` | `c1` | Live Kitchen Display System (KDS), Menu Toggles | [`/kitchen`](http://localhost:3001/kitchen) |
| **General Manager** | `m1` | `m1` | Operations, Staff Rosters, Analytics | [`/admin`](http://localhost:3001/admin) |
| **Event Head** | `e1` | `e1` | Banquet Inquiries & Quotation Pipeline | [`/admin/masters`](http://localhost:3001/admin/masters) |
| **Sports Coach** | `s1` | `s1` | Arena Schedules, Pickleball & Box Cricket | [`/sports`](http://localhost:3001/sports) |
| **Stays Supervisor**| `st1`| `st1`| Suite Check-ins & Resort Room Tariffs | [`/stays`](http://localhost:3001/stays) |
| **Club Member** | `u1` | `u1` | Dining & Court Bookings, Loyalty Ledger | [`/profile`](http://localhost:3001/profile) |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v20+ / v22+
- **PostgreSQL**: v14+ / v18+ running on `localhost:5432`

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:2366@localhost:5432/restro_club_db"
PGUSER="postgres"
PGPASSWORD="2366"
PGHOST="localhost"
PGPORT="5432"
PGDATABASE="restro_club_db"
```

### 3. Database Migration
```bash
PGPASSWORD=2366 psql -U postgres -h localhost -c "CREATE DATABASE restro_club_db;"
PGPASSWORD=2366 psql -U postgres -h localhost -d restro_club_db -f database/schema.sql
PGPASSWORD=2366 psql -U postgres -h localhost -d restro_club_db -f database/seed.sql
```

### 4. Install & Run Locally
```bash
# Install dependencies
npm install

# Start unified Full-Stack Dev Server (Express API + Vite SPA)
npm run dev
```

The portal will be live at: **[http://localhost:3001](http://localhost:3001)**

---

## 📊 Database Schema Overview

```
                  ┌───────────────┐
                  │   LOCATIONS   │ (id, code, name, region, address...)
                  └──────┬────────┘
                         │ 1:N
        ┌────────────────┼────────────────┬────────────────┐
        ▼                ▼                ▼                ▼
 ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
 │ DEPARTMENTS │  │ FACILITIES  │  │DINING_TABLES│  │  EMPLOYEES  │
 └──────┬──────┘  └─────────────┘  └──────┬──────┘  └─────────────┘
        │                                 │
        ▼                                 ▼
 ┌─────────────┐                   ┌─────────────┐
 │  EMPLOYEES  │                   │   ORDERS    │
 └─────────────┘                   └─────────────┘
```

1. **`locations`**: Multi-location property network.
2. **`departments`**: Divisions linked to locations.
3. **`roles`**: RBAC permissions stored in GIN-indexed JSONB.
4. **`membership_tiers`**: Tiers, annual fees, discount rates, and perks.
5. **`users`**: Login credentials, Payscale Levels 0–50, KYC documents (Aadhar/PAN), and addresses.
6. **`facilities`**: Courts, arenas, pools, slot durations, and member/guest tariffs.
7. **`menu_categories`** & **`menu_items`**: Recipes, dietary flags, and gross margins.
8. **`dining_tables`**: Zones, seating capacities, and QR tokens with live printable stand generator.
9. **`accommodation_rooms`**: Suites, 1BHK/2BHK units, and tariffs.
10. **`employees`**: Staff codes, departments, designations, and salaries.
11. **`inventory`**: Raw ingredients, spirits, and minimum threshold alert triggers.
12. **`orders`** & **`bookings`**: Real-time kitchen tickets and reservation ledger.
13. **`event_enquiries`**: CRM banquet pipeline.
14. **`reviews`**: Feedback ratings and management reply threads.

---

## 📄 License
All rights reserved © Restro Club Hospitality Operations Ltd.