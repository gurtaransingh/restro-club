export type FacilityType = "restaurant" | "indoor" | "outdoor" | "pool" | "stay" | "event";

export type Experience = {
  id: string;
  type: FacilityType;
  title: string;
  description: string;
  highlights: string[];
  priceHint: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  prepMinutes: number;
  calories: number;
  dietary: "Vegetarian" | "Non-vegetarian";
  allergens: string[];
  description: string;
  marginPercent: number;
};

export type BookingStep = {
  title: string;
  description: string;
};

export type AdminMetric = {
  label: string;
  value: string;
  trend: string;
  module: string;
};

export const experiences: Experience[] = [
  {
    id: "restaurant",
    type: "restaurant",
    title: "Restaurant & Café",
    description: "Premium dining, café service, QR table ordering, live kitchen status and digital invoices.",
    highlights: ["Signature dishes", "Table sessions", "Split bills", "Food costing"],
    priceHint: "À la carte and event menus",
  },
  {
    id: "indoor-club",
    type: "indoor",
    title: "Indoor Recreation Club",
    description: "Configurable recreation facilities for table tennis, pool, chess, carrom and future games.",
    highlights: ["Slot booking", "Rules", "Capacity", "Maintenance blocks"],
    priceHint: "Hourly and membership access",
  },
  {
    id: "outdoor-sports",
    type: "outdoor",
    title: "Outdoor Sports",
    description: "Outdoor sports calendars for pickleball, box cricket, badminton, tennis and future facilities.",
    highlights: ["Peak pricing", "Recurring slots", "Coaching", "Tournaments"],
    priceHint: "Per slot, player or package",
  },
  {
    id: "pool",
    type: "pool",
    title: "Swimming Pool",
    description: "General access, family packages, private sessions and premium pool-party bookings.",
    highlights: ["Capacity limits", "Guest lists", "Closures", "Private events"],
    priceHint: "Sessions, parties and passes",
  },
  {
    id: "stay",
    type: "stay",
    title: "Boutique Stays",
    description: "1 BHK, 2 BHK and future accommodation categories with check-in and housekeeping workflows.",
    highlights: ["Room status", "Guest records", "Seasonal pricing", "Extensions"],
    priceHint: "Nightly and package pricing",
  },
  {
    id: "events",
    type: "event",
    title: "Events & Private Functions",
    description: "Birthday parties, corporate events, pool parties, tournaments, dinners and celebrations.",
    highlights: ["Enquiries", "Quotations", "Food add-ons", "Stay bundles"],
    priceHint: "Custom quotations",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "truffle-paneer-tikka",
    name: "Truffle Paneer Tikka",
    category: "Signature Starters",
    price: 520,
    prepMinutes: 18,
    calories: 410,
    dietary: "Vegetarian",
    allergens: ["Dairy", "Nuts"],
    description: "Charred paneer, saffron yoghurt, truffle oil and smoked almond crumble.",
    marginPercent: 62,
  },
  {
    id: "nh44-butter-chicken",
    name: "NH44 Butter Chicken",
    category: "North Indian Classics",
    price: 640,
    prepMinutes: 24,
    calories: 680,
    dietary: "Non-vegetarian",
    allergens: ["Dairy"],
    description: "Slow-cooked tomato gravy, tandoori chicken, fenugreek and cultured butter.",
    marginPercent: 58,
  },
  {
    id: "clubhouse-quinoa-bowl",
    name: "Clubhouse Quinoa Bowl",
    category: "Café & Wellness",
    price: 460,
    prepMinutes: 14,
    calories: 360,
    dietary: "Vegetarian",
    allergens: ["Sesame"],
    description: "Quinoa, grilled vegetables, avocado, seeds and citrus tahini dressing.",
    marginPercent: 55,
  },
  {
    id: "poolside-mocktail-flight",
    name: "Poolside Mocktail Flight",
    category: "Beverages",
    price: 390,
    prepMinutes: 8,
    calories: 220,
    dietary: "Vegetarian",
    allergens: [],
    description: "Three seasonal zero-proof drinks curated for pool and event service.",
    marginPercent: 71,
  },
];

export const bookingSteps: BookingStep[] = [
  { title: "Explore", description: "Choose dining, sports, pool, stay, event or membership from a mobile-first journey." },
  { title: "Select", description: "Pick the facility, table, date, slot, room, guests, players or package details." },
  { title: "Pay", description: "Apply coupons or membership benefits, pay securely and generate a transaction reference." },
  { title: "Confirm", description: "Receive booking confirmation, reminders, invoices and live operational updates." },
];

export const adminMetrics: AdminMetric[] = [
  { label: "Today's Revenue", value: "₹2.8L", trend: "+18% vs last Thursday", module: "Finance" },
  { label: "Restaurant Sales", value: "₹94K", trend: "142 orders", module: "Restaurant" },
  { label: "Sports Utilization", value: "86%", trend: "Peak slots filling", module: "Sports" },
  { label: "Stay Occupancy", value: "72%", trend: "6 check-ins today", module: "Stay" },
  { label: "Pool Capacity", value: "64%", trend: "2 private enquiries", module: "Pool" },
  { label: "Inventory Alerts", value: "14", trend: "5 critical stock items", module: "Inventory" },
  { label: "Employee Attendance", value: "91%", trend: "7 late punches", module: "HR" },
  { label: "Memberships", value: "328", trend: "21 renewals due", module: "CRM" },
];

export const roles = [
  "Super Admin",
  "General Manager",
  "Restaurant Manager",
  "Chef",
  "Super Chef",
  "Indoor Club Manager",
  "Outdoor Club Manager",
  "Pool Manager",
  "Stay Manager",
  "Housekeeping",
  "HR Manager",
  "Finance Manager",
  "Marketing Manager",
  "Customer",
];
