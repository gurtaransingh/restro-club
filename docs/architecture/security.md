# Security, Compliance and Audit Plan

Restro Club will store customer, employee, payment and commercial data. Security must be designed into every module rather than added after launch.

## Authentication

- Use strong password hashing through a maintained authentication provider or audited auth library.
- Require MFA for privileged roles such as Super Admin, Finance Manager, HR Manager and General Manager.
- Track login history with IP, user agent, session ID and device fingerprint where legally appropriate.
- Apply session rotation after privilege changes and sensitive actions.

## Authorization

- Use role-based access control with module/action permissions.
- Scope staff access to the assigned organization/location unless explicitly granted cross-location access.
- Keep customer access limited to their own orders, bookings, invoices, notifications and loyalty ledger.
- Re-check authorization inside API handlers, background jobs and admin mutations.

## Data protection

- Keep secrets in environment-managed secret storage, never in source control.
- Encrypt sensitive documents and personally identifiable information where required.
- Tokenize or delegate payment-card handling to a compliant payment provider.
- Keep immutable transaction references and audit trails for payments, refunds and payroll changes.

## Audit events

Sensitive events should write to `audit_logs` with:

```text
actor → action → entity → before → after → IP/device/session → timestamp
```

Examples:

- Refund approval or rejection.
- Salary/pay-scale changes.
- Menu price changes.
- QR code regeneration.
- Booking cancellation and refund.
- Role or permission updates.
- Inventory waste reconciliation.

## Operational controls

- Rate-limit authentication, booking, ordering and payment endpoints.
- Validate all input with shared schemas before database writes.
- Back up PostgreSQL and periodically test restoration.
- Add alerting for failed payments, suspicious login patterns and high refund volume.
