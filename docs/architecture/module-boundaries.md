# Restro Club Module Boundaries

The platform should begin as a modular Next.js application, not premature microservices. Each domain below should keep its data access, validation, permissions and background jobs isolated so the module can later be extracted if traffic or team ownership requires it.

## Customer surface

- Public website and CMS-rendered pages.
- Restaurant menu, cart, QR table session and order tracking.
- Booking flow for restaurant reservations, sports, pool, stays and events.
- Account dashboard for profile, orders, bookings, payments, invoices, coupons, rewards and notifications.

## Operations surface

- Kitchen display board and order status transitions.
- Inventory, recipes, stock movement, waste and supplier workflows.
- Facility calendars, maintenance blocks and resource capacity.
- Housekeeping, room status and stay check-in/check-out.
- Employee records, attendance, leave and payroll history.

## Management surface

- Super admin dashboard and drill-down analytics.
- Finance reporting, settlements, refunds, taxes and invoices.
- Marketing campaigns, offers, testimonials, gallery and SEO metadata.
- CRM for event enquiries, quotations, follow-ups and conversions.
- RBAC, audit logs, login history and suspicious activity review.

## Extraction-ready services

When scale requires it, the following modules can become dedicated services without changing the customer contract:

1. Identity and RBAC.
2. Booking and availability.
3. Restaurant orders and kitchen operations.
4. Payments, invoices and refunds.
5. Notifications and campaigns.
6. Inventory and procurement.
7. HR, attendance and payroll.
8. Analytics and reporting.
9. Media optimization and CMS assets.
