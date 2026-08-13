# Restro Club Product Roadmap

Restro Club should be treated as a premium hospitality, sports, recreation, accommodation and events platform rather than a conventional restaurant website.

## Core principles

- **Premium:** cinematic brand experience, luxury typography, visual storytelling and elegant calls to action.
- **Extremely easy:** customer journeys should follow `Explore → Select → Book/Order → Pay → Confirmation`.
- **Enterprise-grade:** modular architecture, PostgreSQL-backed operations, auditability, RBAC, analytics and multi-location readiness.

## Initial platform architecture

- **Frontend:** Next.js App Router, React, TypeScript, mobile-first layouts and PWA-ready structure.
- **Backend:** Next.js APIs first, with clean module boundaries for eventual dedicated services.
- **Database:** PostgreSQL with normalized relational modeling, constraints, transactions, indexes, audit tables, soft deletion and selective JSONB.
- **Growth model:** `Organization → Location → Department → Facility → Resource`.

## Product phases

1. **Foundation:** branding, homepage, CMS, authentication, customer accounts, restaurant, QR table ordering and basic administration.
2. **Operations:** kitchen management, inventory, sports booking, pool booking, payments, notifications and staff dashboards.
3. **Hospitality:** accommodation, housekeeping, events, memberships and loyalty.
4. **Enterprise:** HR, attendance, payroll, CRM, finance, advanced analytics and business intelligence.
5. **Scale:** native apps, automation, AI-assisted analytics, integrations and additional locations.

## First launch modules

- Premium public homepage with major actions surfaced immediately.
- Restaurant and café menu browsing with cart/order foundations.
- QR table ordering flow connected to kitchen status updates.
- CMS-managed content and media model.
- Customer account identity shared across all future modules.
- Admin foundation with granular RBAC.
