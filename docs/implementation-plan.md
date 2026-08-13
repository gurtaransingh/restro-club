# Restro Club Implementation Plan

This plan translates the product vision into a professional delivery sequence.

## Milestone 1 — Engineering foundation

- Add authentication and customer/staff account models.
- Connect PostgreSQL and generate migrations from `prisma/schema.prisma`.
- Add validation schemas for menu items, bookings, orders, payments, employees and roles.
- Configure linting, formatting, test runner, CI and preview deployments.

## Milestone 2 — Public and customer MVP

- Replace static content with CMS-managed homepage, gallery, testimonials, offers and SEO metadata.
- Implement menu browsing, item detail, cart, QR table sessions and order placement.
- Implement unified booking for sports, pool, restaurant reservations, stays and events.
- Add customer account dashboard with bookings, orders, invoices, notifications and loyalty ledger.

## Milestone 3 — Staff operations

- Build kitchen dashboard with live status updates.
- Build facility calendars with conflict prevention and maintenance blocks.
- Build inventory, recipe costing, waste tracking and low-stock alerts.
- Build housekeeping, room status and check-in/check-out workflows.

## Milestone 4 — Management and finance

- Add RBAC administration and audit-log review.
- Add payments, refunds, coupons, tax, invoice and settlement records.
- Add HR, attendance, leave, salary history and payroll runs.
- Add management dashboards with drill-down revenue and utilization analytics.

## Milestone 5 — Scale and mobile

- Add PWA installability, offline-friendly staff views and push notifications.
- Extract high-load modules into services only after measured need.
- Add native customer, staff, manager and super-admin apps consuming the same APIs.
- Add multi-location onboarding workflows and cross-location reporting.
