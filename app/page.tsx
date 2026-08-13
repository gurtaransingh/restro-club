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

      <section id="booking" className="quickActions sectionWrap">
        <div className="sectionIntro">
          <p className="eyebrow">Customer journeys</p>
          <h2>Major actions in a few taps.</h2>
        </div>
        <div className="actionGrid">
          {quickActions.map((action) => (
            <a className="actionCard" href="#platform" key={action.label}>
              <strong>{action.label}</strong>
              <span>{action.detail}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="restaurant" className="sectionWrap splitShowcase">
        <div>
          <p className="eyebrow">Restaurant, café and QR ordering</p>
          <h2>From table scan to kitchen display.</h2>
          <p>
            Guests can browse menus, filter categories, customize dishes, add special instructions, pay online,
            receive invoices and follow live statuses from received to served.
          </p>
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

      <section id="club" className="sectionWrap experiences">
        <div className="sectionIntro wide">
          <p className="eyebrow">Hospitality + recreation ecosystem</p>
          <h2>Every physical experience gets a digital workflow.</h2>
        </div>
        <div className="experienceGrid">
          {experiences.map((experience) => (
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

      <section id="platform" className="sectionBleed commandCenter">
        <div className="sectionIntro wide">
          <p className="eyebrow">Super admin command center</p>
          <h2>Operate revenue, staff, facilities and customer intelligence from one place.</h2>
        </div>
        <div className="dashboardGrid">
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
          {roadmap.map((item) => (
            <li key={item.phase}>
              <span>{item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
