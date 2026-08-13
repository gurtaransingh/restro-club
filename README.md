# Restro Club

Restro Club is a premium, technology-driven hospitality and recreation destination platform for a luxury restaurant/café, indoor recreation club, outdoor sports facilities, swimming/pool experiences, accommodation, events and business operations.

The physical destination is planned for a highly visible National Highway site near the Banur/Mohali region. The digital product is therefore designed as a long-term enterprise platform, not a simple promotional website.

## Complete Website, Mobile Experience & Business Operations Platform

This README captures the senior product, engineering and system-design direction for Restro Club: build a premium customer-facing website and mobile-first experience backed by a scalable operational platform for food, sports, pool, stays, events, memberships, staff and business intelligence.

## Product Vision

Restro Club should operate as a premium food, sports, recreation, stay and social destination rather than a conventional restaurant or sports facility. The platform must be multi-location-ready from day one, even if the first physical location is the only operational site.

The platform should support:

- Restaurant and café operations
- Online food ordering
- QR/table-based ordering
- Indoor sports bookings
- Outdoor sports bookings
- Swimming/pool bookings and events
- Guest accommodation/stays
- Memberships
- Events and private functions
- Customer accounts
- Employee management
- Attendance
- Payroll/pay-scale records
- Inventory
- Kitchen operations
- Management dashboards
- Finance and revenue analytics
- Marketing and CRM
- Notifications
- Reviews and customer feedback
- Multi-role administration
- Future mobile applications
- Future expansion to additional Restro Club locations

## Product Philosophy

### Premium

The public website must immediately communicate luxury, exclusivity and quality through cinematic imagery/video, refined typography, polished animations, smooth transitions, strong visual hierarchy and carefully designed interactions.

### Extremely Easy

Customers should not feel the operational complexity underneath. The main journey should stay simple:

```text
Explore → Select → Book/Order → Pay → Receive confirmation
```

### Enterprise-grade

The backend must be capable of handling thousands of customers, employees, orders, reservations, transactions and operational events. The architecture should support significant expansion beyond the first year.

## Technology Foundation

### Frontend

- Next.js
- React
- TypeScript
- Next.js App Router
- Responsive/mobile-first architecture
- PWA capabilities
- Modern component architecture
- Server Components where appropriate
- Client Components only where interactivity requires them

### Backend

The backend should use the Next.js ecosystem wherever practical while keeping module boundaries clean enough for high-load components to be extracted later.

Potential backend components include:

- REST/typed APIs
- Authentication service
- Booking engine
- Order management engine
- Payment service
- Notification service
- Inventory service
- HR service
- Analytics service
- Media management service
- Background job processing
- Audit logging

### Database

PostgreSQL should be the primary relational database. The architecture should use:

- Proper normalization
- Foreign keys
- Transactions
- Indexing
- Partitioning where required
- JSONB where flexible structured data is genuinely useful
- Full-text search where appropriate
- Row-level security where appropriate
- Database-level constraints
- Audit tables
- Soft deletion
- Historical records

Prisma or Drizzle can be evaluated for TypeScript database access, with the final choice based on performance, migrations, type safety and team expertise.

## Public Website

The public website should contain a premium homepage with:

- Luxury hero section
- Introduction to Restro Club
- Restaurant/café showcase
- Signature dishes
- Indoor club
- Outdoor sports
- Swimming/pool experience
- Accommodation
- Events and celebrations
- Gallery
- Membership
- Customer reviews
- Location/map
- Contact
- Social media
- Final booking CTA

Primary navigation can include:

- Explore
- Restaurant
- Club
- Sports
- Pool
- Stay
- Events
- Gallery
- Membership
- Offers
- Contact
- Book Now

The homepage should immediately expose major actions:

```text
Reserve a Table | Order Food | Book Sports | Book a Stay | Explore Club | Events
```

Images and videos should be manageable through the admin dashboard rather than hardcoded into the website.

## Core Product Modules

### Restaurant & Café Platform

Customers should be able to browse the complete menu, search food, filter by category, view prices, ingredients, allergens, calories/nutrition, preparation time, estimated delivery time and availability, customize items, add special instructions, place orders, track order status, pay online, receive digital invoices and rate orders.

### QR Table Ordering

Every restaurant table should have a unique QR code identifying location, restaurant, table number, session and optional seating/area identifier.

Customer journey:

```text
Table 24 → Menu → Cart → Order → Payment → Live Status
```

The QR system should support QR creation, regeneration, table activation/deactivation, reassignment, temporary sessions, order history, table status, open bills, multiple orders per table, split bills, merged bills and staff-assisted orders.

### Kitchen Management System

Kitchen users should have a real-time dashboard for chefs, senior/super chefs, kitchen managers and restaurant managers.

Order statuses can include:

```text
Received → Accepted → Preparing → Ready → Picked Up/Served → Completed
```

Kitchen users should see order ID, table, customer, items, quantity, modifications, special instructions, preparation time, priority, timestamp and current status. Customers should receive matching live updates.

### Food/Menu Management

Authorized kitchen and management users should manage menu items with name, description, images, category, subcategory, selling price, tax, preparation time, ingredients, ingredient quantities, nutrition, allergens, portion size, making cost, profit margin, availability, stock dependency, vegetarian/non-vegetarian classification, customizations, add-ons and seasonal availability.

The system should calculate estimated food cost and gross margin. Example:

```text
Selling Price ₹500
Estimated Making Cost ₹170
Gross Contribution ₹330
```

### Inventory & Kitchen Procurement

Inventory should track raw materials, vegetables, fruits, meat, dairy, beverages, spices, packaging, cleaning supplies and kitchen consumables.

Each inventory item can include unit, purchase price, supplier, current stock, minimum stock, maximum stock, expiry date, batch number and storage location. The system should generate low-stock alerts and maintain the flow:

```text
Purchase → Inventory → Consumption → Waste → Cost → Profitability
```

### Sports Club Management

Indoor and outdoor facilities should be configurable rather than hardcoded. Possible facilities include pickleball, box cricket, table tennis, pool/billiards, chess, carrom, badminton, tennis, basketball, paddle and future sports.

Each facility should support profiles, photos, rules, capacity, pricing, opening hours, slot duration, peak/off-peak pricing, availability calendars, maintenance blocks and coaching availability.

### Sports Booking Engine

Customer journey:

```text
Sport → Facility → Date → Time → Duration → Players → Payment
```

The booking engine must prevent double booking and support single bookings, recurring bookings, group bookings, membership discounts, peak/off-peak pricing, cancellation, rescheduling, refunds, maintenance blocking, coaching bookings and tournament bookings.

### Swimming Pool / Pool Experience

The pool should be treated as its own bookable facility. Booking types can include general access, pool session, private booking, pool party, event, family package and membership access.

The system should manage capacity, slots, entry limits, closures, maintenance, event reservations, pricing and guest lists.

### Accommodation / Stays

The stay module should work like a boutique hotel/resort booking system for room types such as 1 BHK, 2 BHK and future categories.

Customer journey:

```text
Select room → Select dates → Select guests → Add services → Pay → Receive confirmation
```

The system should manage reservations, check-in, check-out, housekeeping, room status, maintenance, extensions, cancellations, refunds and guest records.

### Events & Private Functions

Restro Club should support event bookings for birthday parties, corporate events, pool parties, sports tournaments, family gatherings, private dinners, celebrations, wedding-related functions and club events.

Customers should submit enquiries with date, expected guests, event type, budget, food requirements, sports requirements, stay requirements, decoration requirements and additional services. CRM workflows should convert enquiries into quotations and confirmed bookings.

### Customer Account

Customers should have one Restro Club account for everything:

- Profile
- Orders
- Restaurant reservations
- Sports bookings
- Pool bookings
- Stay bookings
- Event bookings
- Membership
- Payments
- Coupons
- Rewards
- Loyalty points
- Reviews
- Invoices
- Notifications

### Membership System

Memberships should be configurable and can provide sports discounts, restaurant discounts, priority booking, pool access, guest passes, loyalty points, exclusive events and stay discounts. The system should support validity, renewals, upgrades, downgrades and benefits.

### Loyalty & Rewards

Customers should earn points based on configurable rules for food orders, sports bookings, stays, memberships and referrals. Points can be redeemed against eligible products/services, backed by a complete loyalty ledger.

## Operations Platform

### Employee Management

Super Admin should manage employee profiles with employee ID, name, department, designation, joining date, salary/pay scale, contact information, employment status, assigned location, manager, documents, attendance history, leave records and performance records.

Departments can include restaurant, kitchen, indoor club, outdoor club, pool, housekeeping, stay/accommodation, security, administration, finance, marketing and maintenance.

### Attendance Management

Attendance statuses can include present, absent, late, half day, leave, holiday and work from another location. The architecture should allow future integrations with biometric devices, RFID, QR attendance, mobile attendance and geofencing.

### Salary & Payroll Records

Authorized HR users should maintain salary, basic pay, allowances, incentives, overtime, deductions, bonuses, advances, attendance-linked deductions, monthly payroll and salary history. Historical salary records must not be overwritten.

### Role-Based Access Control

The platform should use granular RBAC, not one generic admin account.

Initial roles can include:

- Super Admin
- General Manager
- Restaurant Manager
- Chef
- Super Chef
- Indoor Club Manager
- Outdoor Club Manager
- Pool Manager
- Stay Manager
- Housekeeping
- HR Manager
- Finance Manager
- Marketing Manager
- Customer

Permissions should work at module/action level:

```text
View / Create / Update / Delete / Approve / Export / Refund / Manage
```

### Super Admin Dashboard

The Super Admin dashboard should become the command center, showing today's revenue, restaurant sales, sports revenue, stay revenue, pool revenue, event revenue, active orders, pending orders, today's bookings, occupancy, sports utilization, customer count, new customers, memberships, employee attendance, inventory alerts, outstanding payments, refunds and profitability indicators.

Management should be able to drill down from each KPI into the underlying transactions.

## Business Intelligence

The system should eventually provide advanced analytics for:

- Restaurant: best-selling dishes, worst-selling dishes, revenue by item, food cost percentage, profit per item and peak ordering time.
- Sports: most popular sport, court utilization, peak hours, revenue per facility and membership utilization.
- Stay: occupancy, average booking value, revenue per room, cancellation rate and average stay duration.
- Customers: repeat customers, customer lifetime value, average order value, booking frequency, membership conversion and churn.

## CMS & Gallery

Non-technical administrators should manage homepage sections, images, videos, gallery, menu, offers, events, facilities, rooms, sports, blog/articles, FAQs, testimonials, SEO metadata, banners and promotional campaigns.

Gallery categories can include restaurant, café, indoor club, outdoor sports, pool, stay, events, food and lifestyle. Admins should upload, organize, reorder, tag and publish media, and images should be optimized automatically for different device sizes.

## Notifications

The platform should support email, SMS, push notifications and WhatsApp integration where appropriate.

Notifications can include booking confirmation, order confirmation, order ready, payment confirmation, cancellation, reminders, check-in reminder, membership expiry, offers and event updates. A centralized notification history should be maintained.

## Payments

The payment architecture should support online payments, restaurant payments, sports payments, stay payments, event payments, membership payments, deposits, refunds, partial payments, coupons, taxes and invoices.

Every financial transaction must have a unique transaction/reference ID and immutable audit history.

## Security & Audit

Security is a first-class architecture requirement because the system contains customer, employee, payment and business data.

Implement:

- Strong authentication
- MFA for privileged users
- RBAC
- Secure sessions
- Rate limiting
- Input validation
- Encryption
- Secure secrets management
- Audit logs
- Login history
- Suspicious activity monitoring
- Database backups
- Disaster recovery
- Access logging

Every sensitive administrative action should be auditable:

```text
Who → What → When → Before → After → IP/device/session
```

PostgreSQL row-level security can be evaluated for sensitive multi-role data access.

## Mobile-First Experience & Future Apps

The customer-facing product should be designed mobile-first and support PWA capabilities so users get an app-like experience before native apps are required.

Staff dashboards should also be optimized for tablets/mobile devices because chefs, managers, housekeeping and sports managers may not always work from desktops.

Future applications should share the same backend and identity system:

- Customer App: restaurant, sports, stays, membership and loyalty.
- Staff App: orders, attendance, tasks and notifications.
- Manager App: operations, bookings, analytics and approvals.
- Super Admin App: business intelligence, alerts, approvals and financial monitoring.

## Advanced Operational Features

As the product matures, it should support:

- Automated booking conflict detection
- Automated reminders
- Waitlists
- Dynamic pricing
- Customer segmentation
- Promotional campaigns
- Referral system
- Coupon engine
- Gift cards
- Digital receipts
- Digital invoices
- Feedback workflows
- Complaint management
- Maintenance scheduling
- Housekeeping task allocation
- Kitchen workload monitoring
- Facility maintenance
- Supplier management
- Purchase orders
- Stock reconciliation
- Waste tracking
- Financial reconciliation

## Architecture & Scalability

The system should initially be built as a well-structured modular platform rather than prematurely splitting everything into microservices. Individual modules must have clean boundaries so high-load components can later be extracted.

Potential future services:

- Identity
- Booking
- Orders
- Payments
- Notifications
- Inventory
- HR
- Analytics
- Media
- CRM

Use background workers/queues for operations that should not block customer requests, including notifications, report generation, image processing, invoice generation, scheduled reminders and analytics aggregation.

## Multi-Location Future

The database should support this hierarchy:

```text
Organization → Location → Department → Facility → Resource
```

This allows future Restro Club properties to be added from the Super Admin panel without rebuilding the platform.

## Development Approach

This is a long-term product with multiple phases rather than a single website project.

### Phase 1 — Foundation

Branding, architecture, authentication, customer accounts, CMS, homepage, restaurant, QR ordering and basic administration.

### Phase 2 — Operations

Kitchen management, inventory, sports booking, pool booking, payments, notifications and staff dashboards.

### Phase 3 — Hospitality

Stay booking, housekeeping, events, memberships and loyalty.

### Phase 4 — Enterprise

HR, attendance, payroll, advanced analytics, CRM, financial reporting and sophisticated business intelligence.

### Phase 5 — Scale

Native mobile applications, automation, AI-assisted analytics, multi-location architecture and advanced integrations.

## Design Direction

The design should feel closer to a luxury hospitality brand combined with a premium sports club than a typical restaurant website.

Priorities:

- Cinematic imagery
- Large typography
- Premium whitespace
- Smooth transitions
- Subtle animations
- Elegant cards
- Strong visual hierarchy
- Excellent photography
- Fast loading
- Mobile-first navigation
- Minimal unnecessary UI
- Extremely clear CTAs

The technology should be invisible to the customer. The customer should simply feel:

> This is premium, easy and exceptionally well designed.

## Final Product Definition

Restro Club should become a unified digital ecosystem connecting the customer, operations, management and super-admin layers.

```text
CUSTOMER
↓
Restaurant | Food Ordering | Sports | Pool | Stay | Events | Membership | Rewards
↓
OPERATIONS
↓
Kitchen | Inventory | Bookings | Housekeeping | Sports Management | Pool Management | Staff | Attendance
↓
MANAGEMENT
↓
Revenue | Costs | Profitability | Customers | Employees | Inventory | Facilities | Marketing | Analytics
↓
SUPER ADMIN
↓
Complete business control
```

The objective is to create a platform where almost every major physical operation of Restro Club has a corresponding digital workflow. Customers should discover Restro Club, explore facilities, order food, book sports, reserve rooms, purchase memberships, attend events, make payments and manage everything from one account.

Management should see the entire business from one centralized dashboard. This should be treated as a five-year technology product roadmap, with a first version focused on the highest-value modules and an architecture strong enough to support the full ecosystem as Restro Club expands.

## Commands

```bash
npm install
npm run dev
npm run build
```

## What is included

- Next.js App Router project structure with public, customer, staff, kitchen, booking, menu and admin surfaces.
- Luxury mobile-first landing page for the Restro Club brand.
- Customer CTAs for table reservations, food ordering, sports, stays, events and membership.
- Operational platform positioning for kitchen, inventory, bookings, HR, payroll, payments, notifications, analytics and super-admin workflows.
- Product roadmap, data-model, security and implementation planning docs.

## Product documentation

- [`docs/product-roadmap.md`](docs/product-roadmap.md) — phases, launch modules, architecture principles and security expectations.
- [`docs/architecture/data-model.md`](docs/architecture/data-model.md) — PostgreSQL-oriented data model blueprint for multi-location operations.
- [`docs/architecture/module-boundaries.md`](docs/architecture/module-boundaries.md) — modular application boundaries and future service extraction plan.
- [`docs/architecture/security.md`](docs/architecture/security.md) — security, RBAC, audit and operational-control plan.
- [`docs/implementation-plan.md`](docs/implementation-plan.md) — milestone plan for building the production platform.
