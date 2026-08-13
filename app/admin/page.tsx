import { adminMetrics, roles } from "@/lib/platform-data";

const adminModules = [
  "CMS and gallery",
  "Menu and recipes",
  "QR tables and kitchen",
  "Sports calendars",
  "Pool capacity",
  "Stay inventory",
  "Events CRM",
  "Memberships and loyalty",
  "Employees and attendance",
  "Payroll records",
  "Payments and refunds",
  "Audit logs",
];

export default function AdminPage() {
  return (
    <main className="innerPage adminPage">
      <a className="backLink" href="/">← Restro Club</a>
      <section className="pageHero compactHero">
        <p className="eyebrow">Management command center</p>
        <h1>Operational dashboards for revenue, bookings, customers, employees, inventory and facilities.</h1>
        <p>
          This scaffold defines the dashboard information architecture for granular RBAC, drill-down analytics,
          immutable audit history and future multi-location operations.
        </p>
      </section>

      <section className="sectionWrap flushTop">
        <div className="dashboardGrid expanded">
          {adminMetrics.map((metric) => (
            <article className="metricCard" key={metric.label}>
              <small>{metric.module}</small>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.trend}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionWrap flushTop twoColumn">
        <div>
          <p className="eyebrow">Role-based access</p>
          <h2>Not one generic admin.</h2>
          <div className="moduleList">{roles.map((role) => <span key={role}>{role}</span>)}</div>
        </div>
        <div>
          <p className="eyebrow">Operational modules</p>
          <h2>Every workflow can be governed and audited.</h2>
          <div className="moduleList">{adminModules.map((module) => <span key={module}>{module}</span>)}</div>
        </div>
      </section>
    </main>
  );
}
