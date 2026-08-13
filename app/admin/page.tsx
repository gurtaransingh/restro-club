import { auditEvents, eventEnquiries, inventoryItems, notificationTemplates, paymentRecords } from "@/lib/operations-data";
import { adminMetrics, roles } from "@/lib/platform-data";
import { loyaltyTiers, roomStatuses, sportsSchedule } from "@/lib/portal-data";

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

      <section className="sectionWrap flushTop twoColumn">
        <div>
          <p className="eyebrow">Inventory alerts</p>
          <h2>Kitchen procurement and stock risk.</h2>
          <div className="activityList compact">
            {inventoryItems.map((item) => (
              <article className="activityCard" key={item.sku}>
                <span>{item.status}</span>
                <h2>{item.name}</h2>
                <p>{item.category} • Stock {item.stock} • Minimum {item.threshold}</p>
                <strong>{item.supplier}</strong>
              </article>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Payments and events CRM</p>
          <h2>Money movement and enquiries are visible together.</h2>
          <div className="activityList compact">
            {paymentRecords.map((payment) => (
              <article className="activityCard" key={payment.reference}>
                <span>{payment.status}</span>
                <h2>{payment.reference}</h2>
                <p>{payment.module} • {payment.customer}</p>
                <strong>{payment.amount}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionWrap flushTop threeColumnOps">
        <div>
          <p className="eyebrow">Stay operations</p>
          <h2>Rooms move through ready, occupied, cleaning and blocked states.</h2>
          <div className="activityList compact">
            {roomStatuses.map((room) => <article className="activityCard" key={room.room}><span>{room.status}</span><h2>{room.room}</h2><p>{room.category} • {room.guest}</p><strong>{room.action}</strong></article>)}
          </div>
        </div>
        <div>
          <p className="eyebrow">Sports utilization</p>
          <h2>Facility owners can watch coaching and slot demand.</h2>
          <div className="activityList compact">
            {sportsSchedule.map((slot) => <article className="activityCard" key={slot.court}><span>{slot.utilization}</span><h2>{slot.sport}</h2><p>{slot.court} • Next {slot.nextSlot}</p><strong>{slot.coach}</strong></article>)}
          </div>
        </div>
        <div>
          <p className="eyebrow">Loyalty health</p>
          <h2>Membership tiers are visible to CRM and finance.</h2>
          <div className="activityList compact">
            {loyaltyTiers.map((tier) => <article className="activityCard" key={tier.name}><span>{tier.members}</span><h2>{tier.name}</h2><p>{tier.benefit}</p><strong>{tier.nextAction}</strong></article>)}
          </div>
        </div>
      </section>

      <section className="sectionWrap flushTop twoColumn">
        <div>
          <p className="eyebrow">Event pipeline</p>
          <h2>Enquiries can become quotes and confirmed bookings.</h2>
          <div className="activityList compact">
            {eventEnquiries.map((event) => (
              <article className="activityCard" key={event.id}>
                <span>{event.stage}</span>
                <h2>{event.type}</h2>
                <p>{event.date} • {event.guests} guests</p>
                <strong>{event.requirements}</strong>
              </article>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Notifications and audit</p>
          <h2>Customer messaging and sensitive actions stay traceable.</h2>
          <div className="activityList compact">
            {notificationTemplates.map((template) => (
              <article className="activityCard" key={`${template.channel}-${template.trigger}`}>
                <span>{template.channel}</span>
                <h2>{template.trigger}</h2>
                <p>Owner: {template.owner}</p>
              </article>
            ))}
            {auditEvents.map((event) => <article className="activityCard" key={event}><p>{event}</p></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
