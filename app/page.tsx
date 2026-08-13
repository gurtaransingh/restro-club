import { adminMetrics, bookingSteps, experiences, menuItems, roles } from "@/lib/platform-data";

const navigation = [
  { label: "Restaurant", href: "/menu" },
  { label: "Bookings", href: "/book" },
  { label: "Admin", href: "/admin" },
  { label: "Roadmap", href: "#roadmap" },
];

const quickActions = [
  { label: "Reserve a Table", detail: "Fine dining and café seating", href: "/book?type=table" },
  { label: "Order Food", detail: "Delivery, pickup and QR table orders", href: "/menu" },
  { label: "Book Sports", detail: "Indoor and outdoor facilities", href: "/book?type=sports" },
  { label: "Book a Stay", detail: "1 BHK, 2 BHK and future suites", href: "/book?type=stay" },
  { label: "Plan an Event", detail: "Parties, tournaments and private functions", href: "/book?type=event" },
  { label: "Join Membership", detail: "Priority access, rewards and benefits", href: "#membership" },
];

const roadmap = [
  ["Phase 1", "Foundation", "Brand, CMS, authentication, customer accounts, homepage, restaurant, QR ordering and basic administration."],
  ["Phase 2", "Operations", "Kitchen management, inventory, sports booking, pool booking, payments, notifications and staff dashboards."],
  ["Phase 3", "Hospitality", "Stay booking, housekeeping, event workflows, memberships, loyalty and customer dashboards."],
  ["Phase 4", "Enterprise", "HR, attendance, payroll, advanced analytics, CRM, finance and business intelligence."],
  ["Phase 5", "Scale", "Native apps, automation, AI-assisted analytics, multi-location growth and advanced integrations."],
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
const navigation = ["Restaurant", "Club", "Sports", "Pool", "Stay", "Events", "Membership"];

const quickActions = [
  { label: "Reserve a Table", detail: "Fine dining and café seating" },
  { label: "Order Food", detail: "Delivery, pickup and QR table orders" },
  { label: "Book Sports", detail: "Indoor and outdoor facilities" },
  { label: "Book a Stay", detail: "1 BHK, 2 BHK and future suites" },
  { label: "Plan an Event", detail: "Parties, tournaments and private functions" },
  { label: "Join Membership", detail: "Priority access, rewards and benefits" },
];

const experiences = [
  {
    id: "restaurant-experience",
    title: "Restaurant & Café",
    copy: "Premium dining, signature dishes, QR table ordering, live kitchen statuses and digital invoices.",
  },
  {
    id: "club-experience",
    title: "Indoor Recreation Club",
    copy: "Table tennis, pool, chess, carrom and future configurable recreation facilities.",
  },
  {
    id: "sports",
    title: "Outdoor Sports",
    copy: "Pickleball, box cricket, badminton, tennis, basketball and calendar-driven bookings.",
  },
  {
    id: "pool",
    title: "Pool Experiences",
    copy: "General access, private sessions, pool parties, capacity controls and maintenance blocks.",
  },
  {
    id: "stay",
    title: "Boutique Stays",
    copy: "Accommodation bookings with guest records, check-in, housekeeping and seasonal pricing.",
  },
  {
    id: "events",
    title: "Events & Celebrations",
    copy: "Enquiries, quotations, guest lists, food requirements, sports add-ons and stay packages.",
  },
];

const operationalModules = [
  "Kitchen display system",
  "Menu and food costing",
  "Inventory and procurement",
  "Sports booking engine",
  "Pool capacity management",
  "Accommodation and housekeeping",
  "Events CRM and quotations",
  "Memberships and loyalty ledger",
  "Employee, attendance and payroll records",
  "Payments, refunds, invoices and audits",
  "Notifications by email, SMS, push and WhatsApp",
  "Super admin analytics and dashboards",
];

const dashboards = [
  { metric: "₹2.8L", label: "Projected daily revenue view" },
  { metric: "86%", label: "Facility utilization tracking" },
  { metric: "42", label: "Active orders and bookings" },
  { metric: "14", label: "Inventory and staffing alerts" },
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation",
    detail: "Brand, CMS, authentication, customer accounts, homepage, restaurant, QR ordering and basic administration.",
  },
  {
    phase: "Phase 2",
    title: "Operations",
    detail: "Kitchen management, inventory, sports booking, pool booking, payments, notifications and staff dashboards.",
  },
  {
    phase: "Phase 3",
    title: "Hospitality",
    detail: "Stay booking, housekeeping, event workflows, memberships, loyalty and customer dashboards.",
  },
  {
    phase: "Phase 4",
    title: "Enterprise",
    detail: "HR, attendance, payroll, advanced analytics, CRM, finance and business intelligence.",
  },
  {
    phase: "Phase 5",
    title: "Scale",
    detail: "Native apps, automation, AI-assisted analytics, multi-location growth and advanced integrations.",
  },
const experiences = [
  "Restaurant & café",
  "QR table ordering",
  "Indoor club",
  "Outdoor sports",
  "Pool experiences",
  "Boutique stays",
  "Events",
  "Memberships",
];

const customerActions = [
  "Reserve a table",
  "Order food",
  "Book sports",
  "Book a stay",
  "Plan an event",
  "Explore membership",
];

const modules = [
  {
    title: "Customer Experience",
    copy: "A single mobile-first account for dining, bookings, stays, payments, loyalty, reviews and digital invoices.",
  },
  {
    title: "Operations Backbone",
    copy: "Kitchen displays, table sessions, inventory, facility calendars, housekeeping, attendance and staff workflows.",
  },
  {
    title: "Management Command Center",
    copy: "Revenue, utilization, profitability, customer growth, inventory alerts, employee attendance and drill-down analytics.",
  },
];

const roadmap = [
  "Foundation: brand, CMS, homepage, auth, restaurant, QR ordering and basic admin.",
  "Operations: kitchen, inventory, sports, pool, payments, notifications and staff dashboards.",
  "Hospitality: stays, housekeeping, events, memberships and loyalty.",
  "Enterprise: HR, attendance, payroll, CRM, finance and business intelligence.",
  "Scale: native apps, automation, AI-assisted analytics and multi-location expansion.",
];

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Restro Club home">
          <span>Restro</span> Club
        </a>
        <nav className="navLinks" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>{item}</a>
          ))}
        </nav>
        <a className="headerCta" href="#booking">Book Now</a>
      </header>

      <section id="top" className="hero sectionBleed">
        <div className="heroBackdrop" aria-hidden="true" />
        <div className="heroContent">
          <p className="eyebrow">Premium highway destination near Banur / Mohali</p>
          <h1>Restaurant, sports, pool, stays and events — unified by one luxury digital platform.</h1>
          <p className="heroText">
            Restro Club is planned as a complete customer experience and business operations system: explore,
            order, book, pay, receive confirmation and let management control every workflow from one command center.
          </p>
          <div className="heroButtons">
            <a className="primaryButton" href="/book">Start Booking</a>
            <a className="secondaryButton" href="/admin">View Operations</a>
            <a className="primaryButton" href="#booking">Start Booking</a>
            <a className="secondaryButton" href="#platform">Explore Platform</a>
          </div>
        </div>
        <aside className="heroPanel" aria-label="Key platform capabilities">
          <p>Digital backbone</p>
          <strong>Multi-location ready from day one</strong>
          <span>Organization → Location → Department → Facility → Resource</span>
        </aside>
      </section>

      <section className="quickActions sectionWrap">
      <section id="booking" className="quickActions sectionWrap">
        <div className="sectionIntro">
          <p className="eyebrow">Customer journeys</p>
          <h2>Major actions in a few taps.</h2>
        </div>
        <div className="actionGrid">
          {quickActions.map((action) => (
            <a className="actionCard" href={action.href} key={action.label}>
            <a className="actionCard" href="#platform" key={action.label}>
              <strong>{action.label}</strong>
              <span>{action.detail}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="sectionWrap splitShowcase">
      <section id="restaurant" className="sectionWrap splitShowcase">
        <div>
          <p className="eyebrow">Restaurant, café and QR ordering</p>
          <h2>From table scan to kitchen display.</h2>
          <p>
            Guests can browse menus, filter categories, customize dishes, add special instructions, pay online,
            receive invoices and follow live statuses from received to served.
          </p>
          <a className="textLink" href="/menu">Explore signature menu →</a>
        </div>
        <div className="statusBoard" aria-label="Kitchen order status board mockup">
          {["Received", "Accepted", "Preparing", "Ready", "Served"].map((status, index) => (
            <div className="statusRow" key={status}>
              <span>0{index + 1}</span>
              <strong>{status}</strong>
              <em>{index === 2 ? "Table 24 • 4 items" : "Live update"}</em>
        </div>
        <div className="statusBoard" aria-label="Kitchen order status board mockup">
          {['Received', 'Accepted', 'Preparing', 'Ready', 'Served'].map((status, index) => (
            <div className="statusRow" key={status}>
              <span>0{index + 1}</span>
              <strong>{status}</strong>
              <em>{index === 2 ? 'Table 24 • 4 items' : 'Live update'}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="sectionWrap experiences">
      <section id="club" className="sectionWrap experiences">
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
            <article className="experienceCard" id={experience.id} key={experience.title}>
              <h3>{experience.title}</h3>
              <p>{experience.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="membership" className="sectionWrap membershipBand">
        <div className="sectionIntro wide">
          <p className="eyebrow">Membership and loyalty</p>
          <h2>One account for benefits across dining, sports, pool, stays and exclusive events.</h2>
          <p>
            Configurable membership tiers can unlock priority booking, discounts, guest passes, loyalty points,
            referral rewards, exclusive events and renewal workflows as the club matures.
          </p>
        </div>
      </section>

      <section className="sectionBleed commandCenter">
      <section id="platform" className="sectionBleed commandCenter">
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
          {dashboards.map((item) => (
            <article className="metricCard" key={item.label}>
              <strong>{item.metric}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
        <div className="moduleList">
          {operationalModules.map((module) => <span key={module}>{module}</span>)}
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
          {roadmap.map((item) => (
            <li key={item.phase}>
              <span>{item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top">Restro Club</a>
        <div className="navLinks">
          <a href="#experience">Explore</a>
          <a href="#platform">Platform</a>
          <a href="#roadmap">Roadmap</a>
          <a className="navCta" href="#book">Book Now</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">Banur / Mohali National Highway destination</p>
          <h1>Luxury hospitality, sports, pool, stays and events in one premium club ecosystem.</h1>
          <p className="heroText">
            Restro Club is designed as a five-year digital backbone for restaurant operations, bookings,
            memberships, staff workflows, finance, analytics and future multi-location growth.
          </p>
          <div className="heroActions" id="book">
            {customerActions.map((action) => (
              <a href="#platform" key={action}>{action}</a>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section intro">
        <p className="eyebrow">Premium • Easy • Enterprise-grade</p>
        <h2>A destination customers can explore, book, order, pay for and manage from a phone.</h2>
        <div className="experienceGrid">
          {experiences.map((item) => <article key={item}>{item}</article>)}
        </div>
      </section>

      <section id="platform" className="section platform">
        <div>
          <p className="eyebrow">Unified operations platform</p>
          <h2>Built beyond a brochure website.</h2>
          <p>
            The architecture starts modular inside Next.js and PostgreSQL, with clean boundaries for future
            extraction of identity, bookings, orders, payments, notifications, inventory, HR, analytics and media services.
          </p>
        </div>
        <div className="moduleGrid">
          {modules.map((module) => (
            <article className="moduleCard" key={module.title}>
              <h3>{module.title}</h3>
              <p>{module.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="section roadmap">
        <p className="eyebrow">Product delivery plan</p>
        <h2>Phased for launch speed without sacrificing long-term scale.</h2>
        <ol>
          {roadmap.map((phase) => <li key={phase}>{phase}</li>)}
        </ol>
      </section>
    </main>
  );
}
