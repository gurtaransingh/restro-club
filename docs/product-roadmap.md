# Restro Club Product Roadmap

Restro Club should be treated as a premium hospitality, sports, recreation, accommodation, restaurant, pool and events platform rather than a conventional restaurant website.

## Core principles

- **Premium:** cinematic brand experience, luxury typography, visual storytelling, elegant cards, smooth transitions and clear calls to action.
- **Extremely easy:** customer journeys should follow `Explore → Select → Book/Order → Pay → Confirmation`.
- **Enterprise-grade:** modular architecture, PostgreSQL-backed operations, auditability, granular RBAC, analytics and multi-location readiness.

## Initial platform architecture

- **Frontend:** Next.js App Router, React, TypeScript, mobile-first layouts, server components by default and PWA-ready structure.
- **Backend:** Next.js APIs first, with clean module boundaries for eventual dedicated services.
- **Database:** PostgreSQL with normalized relational modeling, constraints, transactions, indexes, audit tables, soft deletion, historical records and selective JSONB.
- **Growth model:** `Organization → Location → Department → Facility → Resource`.
- **Async work:** background workers for notifications, reports, invoice generation, media processing, reminders and analytics aggregation.

## First launch modules

1. Premium homepage and content-managed marketing sections.
2. Customer account foundation shared by restaurant, bookings, stays, events, membership and loyalty.
3. Restaurant menu browsing, item details, cart, QR table context and order status foundation.
4. Kitchen display board with role-specific permissions and status transitions.
5. Admin foundation for CMS, media, facilities, tables, roles and operational settings.
6. Payment, invoice and immutable audit-log design.

## Product phases

### Phase 1 — Foundation

Branding, homepage, CMS, authentication, customer accounts, restaurant, QR table ordering and basic administration.

### Phase 2 — Operations

Kitchen management, inventory, sports booking, pool booking, payments, notifications and staff dashboards.

### Phase 3 — Hospitality

Accommodation booking, housekeeping, event enquiries, quotations, memberships and loyalty.

### Phase 4 — Enterprise

HR, attendance, payroll, advanced analytics, CRM, financial reporting and business intelligence.

### Phase 5 — Scale

Native customer/staff/manager apps, automation, AI-assisted analytics, integrations and additional Restro Club locations.

## Security expectations

- MFA for privileged users.
- Strong session handling and rate limiting.
- Module/action-level permissions.
- Audit logs for sensitive actions: `who → what → when → before → after → IP/device/session`.
- Backup, disaster recovery and secure secrets management planning.
