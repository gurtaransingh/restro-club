import { adminMetrics, bookingSteps, experiences, menuItems, roles } from "@/lib/platform-data";
import { auditEvents, customerActivities, kitchenOrders, staffRecords } from "@/lib/operations-data";
import { availabilitySlots, loyaltyTiers, testimonials } from "@/lib/portal-data";

const navigation = [
  { label: "Restaurant", href: "/menu" },
  { label: "Book", href: "/book" },
  { label: "Kitchen", href: "/kitchen" },
  { label: "Staff", href: "/staff" },
  { label: "Portal", href: "/portal" },
  { label: "Account", href: "/account" },
  { label: "Admin", href: "/admin" },
];

const quickActions = [
  { label: "Reserve a Table", detail: "Fine dining and café seating", href: "/book?type=table" },
  { label: "Order Food", detail: "Menu, cart and QR table ordering", href: "/menu" },
  { label: "Book Sports", detail: "Indoor and outdoor facilities", href: "/book?type=sports" },
  { label: "Book a Stay", detail: "1 BHK, 2 BHK and future suites", href: "/book?type=stay" },
  { label: "Plan an Event", detail: "Parties, tournaments and private functions", href: "/book?type=event" },
  { label: "Open Portal", detail: "Account, invoices, rewards and support", href: "/portal" },
  { label: "Try Table QR", detail: "Demo table session workflow", href: "/qr/24" },
];

const roadmap = [
  ["Phase 1", "Foundation", "Branding, architecture, authentication, customer accounts, CMS, homepage, restaurant, QR ordering and basic administration."],
  ["Phase 2", "Operations", "Kitchen management, inventory, sports booking, pool booking, payments, notifications and staff dashboards."],
  ["Phase 3", "Hospitality", "Stay booking, housekeeping, events, memberships and loyalty."],
  ["Phase 4", "Enterprise", "HR, attendance, payroll, advanced analytics, CRM, financial reporting and business intelligence."],
  ["Phase 5", "Scale", "Native mobile applications, automation, AI-assisted analytics, multi-location architecture and integrations."],
];

export default function Home() {
  const signatureItems = menuItems.slice(0, 3);
  const headlineMetrics = adminMetrics.slice(0, 4);

  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Restro Club home"><span>Restro</span> Club</a>
        <nav className="navLinks" aria-label="Primary navigation">
          {navigation.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
        </nav>
        <a className="headerCta" href="/book">Book Now</a>
      </header>

      <section id="top" className="hero sectionBleed">
        <div className="heroBackdrop" aria-hidden="true" />
        <div className="heroContent">
          <p className="eyebrow">Premium highway destination near Banur / Mohali</p>
          <h1>Restaurant, sports, pool, stays and events — one luxury digital platform.</h1>
          <p className="heroText">
            Restro Club is implemented as a mobile-first customer portal and operations backbone for bookings,
            QR ordering, kitchen workflows, employees, payments, analytics and future multi-location growth.
          </p>
          <div className="heroButtons">
            <a className="primaryButton" href="/book">Start Booking</a>
            <a className="secondaryButton" href="/admin">View Command Center</a>
            <a className="secondaryButton" href="/qr/24">Try Table QR</a>
          </div>
        </div>
        <aside className="heroPanel" aria-label="Key platform capabilities">
          <p>Digital backbone</p>
          <strong>Multi-location ready from day one</strong>
          <span>Organization → Location → Department → Facility → Resource</span>
        </aside>
      </section>

      <section className="quickActions sectionWrap">
        <div className="sectionIntro">
          <p className="eyebrow">Customer journeys</p>
          <h2>Major actions in a few taps.</h2>
        </div>
        <div className="actionGrid">
          {quickActions.map((action) => (
            <a className="actionCard" href={action.href} key={action.label}>
              <strong>{action.label}</strong>
              <span>{action.detail}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="sectionWrap splitShowcase">
        <div>
          <p className="eyebrow">Restaurant, café and QR ordering</p>
          <h2>From table scan to kitchen display.</h2>
          <p>
            Guests can browse menus, customize dishes, add instructions, pay online, receive invoices and follow
            live kitchen statuses from received to served.
          </p>
          <a className="textLink" href="/menu">Explore signature menu →</a>
        </div>
        <div className="statusBoard" aria-label="Kitchen order status board mockup">
          {kitchenOrders.map((order) => (
            <div className="statusRow" key={order.id}>
              <span>{order.id}</span>
              <strong>{order.status}</strong>
              <em>{order.table} • {order.prepTarget}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="sectionWrap experiences">
        <div className="sectionIntro wide">
          <p className="eyebrow">Hospitality + recreation ecosystem</p>
          <h2>Every physical experience gets a digital workflow.</h2>
        </div>
        <div className="experienceGrid">
          {experiences.map((experience) => (
            <article className="experienceCard" id={experience.id} key={experience.id}>
              <span>{experience.priceHint}</span>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              <ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionWrap menuPreview">
        <div className="sectionIntro wide">
          <p className="eyebrow">Signature food showcase</p>
          <h2>Menu data is structured for nutrition, allergens, costing and profitability.</h2>
        </div>
        <div className="menuGrid">
          {signatureItems.map((item) => (
            <article className="menuCard" key={item.id}>
              <span>{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <strong>₹{item.price}</strong>
              <small>{item.prepMinutes} min • {item.calories} cal • {item.marginPercent}% margin</small>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionBleed commandCenter">
        <div className="sectionIntro wide">
          <p className="eyebrow">Super admin command center</p>
          <h2>Operate revenue, staff, facilities and customer intelligence from one place.</h2>
        </div>
        <div className="dashboardGrid">
          {headlineMetrics.map((item) => (
            <article className="metricCard" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <small>{item.trend}</small>
            </article>
          ))}
        </div>
        <div className="moduleList">{roles.map((role) => <span key={role}>{role}</span>)}</div>
      </section>

      <section className="sectionWrap bookingFlow">
        <div className="sectionIntro wide">
          <p className="eyebrow">Explore → Select → Pay → Confirm</p>
          <h2>The core journey stays simple even when the platform is enterprise-grade.</h2>
        </div>
        <div className="flowGrid">
          {bookingSteps.map((step, index) => (
            <article className="flowCard" key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionWrap liveBooking">
        <div className="sectionIntro wide">
          <p className="eyebrow">Live availability layer</p>
          <h2>Customers can see what is bookable before staff touch a calendar.</h2>
        </div>
        <div className="availabilityGrid">
          {availabilitySlots.map((slot) => (
            <article className="availabilityCard" key={slot.id}>
              <span>{slot.module}</span>
              <h3>{slot.resource}</h3>
              <p>{slot.time} • {slot.capacity}</p>
              <strong>{slot.price}</strong>
              <em>{slot.status}</em>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionWrap twoColumn">
        <div>
          <p className="eyebrow">Membership and loyalty</p>
          <h2>Retention is built into the operating model.</h2>
          <div className="activityList compact">
            {loyaltyTiers.map((tier) => (
              <article className="activityCard" key={tier.name}>
                <span>{tier.members}</span>
                <h3>{tier.name}</h3>
                <p>{tier.benefit}</p>
                <strong>{tier.nextAction}</strong>
              </article>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Guest confidence</p>
          <h2>Social proof for dining, events and stays.</h2>
          <div className="activityList compact">
            {testimonials.map((item) => (
              <article className="activityCard" key={item.guest}>
                <span>{item.context}</span>
                <p>“{item.quote}”</p>
                <strong>{item.guest}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionWrap splitShowcase">
        <div>
          <p className="eyebrow">Operational proof points</p>
          <h2>Customer, staff and audit workflows are modeled as portal surfaces.</h2>
          <p>{customerActivities.length} customer activities, {staffRecords.length} staff records and immutable audit examples are available in the portal data layer.</p>
        </div>
        <div className="activityList compact">
          {auditEvents.map((event) => <article className="activityCard" key={event}><p>{event}</p></article>)}
        </div>
      </section>

      <section id="roadmap" className="sectionWrap roadmap">
        <div className="sectionIntro wide">
          <p className="eyebrow">Five-year product roadmap</p>
          <h2>Launch the highest-value modules first, without blocking enterprise scale.</h2>
        </div>
        <ol>
          {roadmap.map(([phase, title, detail]) => (
            <li key={phase}>
              <span>{phase}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
