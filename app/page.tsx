import { adminMetrics, bookingSteps, experiences, menuItems, roles } from "@/lib/platform-data";

const navigation = [
  { label: "Restaurant", href: "/menu" },
  { label: "Bookings", href: "/book" },
  { label: "Admin", href: "/admin" },
  { label: "Kitchen", href: "/kitchen" },
  { label: "Account", href: "/account" },
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
