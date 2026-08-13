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
