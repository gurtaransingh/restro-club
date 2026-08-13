export type AvailabilitySlot = {
  id: string;
  module: "Restaurant" | "Sports" | "Pool" | "Stay" | "Event";
  resource: string;
  time: string;
  capacity: string;
  price: string;
  status: "Available" | "Fast filling" | "Waitlist";
};

export type CartLine = {
  item: string;
  quantity: number;
  note: string;
  amount: string;
};

export type LoyaltyTier = {
  name: string;
  members: string;
  benefit: string;
  nextAction: string;
};

export type RoomStatus = {
  room: string;
  category: "1 BHK" | "2 BHK" | "Suite";
  status: "Ready" | "Occupied" | "Cleaning" | "Maintenance";
  guest: string;
  action: string;
};

export type SportsSchedule = {
  court: string;
  sport: string;
  nextSlot: string;
  coach: string;
  utilization: string;
};

export type Testimonial = {
  quote: string;
  guest: string;
  context: string;
};

export type AccountSummary = {
  guest: string;
  tier: string;
  memberSince: string;
  homeLocation: string;
  relationshipManager: string;
  walletBalance: string;
  loyaltyPoints: string;
  nextReward: string;
};

export type PortalAgendaItem = {
  time: string;
  module: "Dining" | "Sports" | "Stay" | "Pool" | "Event";
  title: string;
  status: string;
  action: string;
};

export type PortalPreference = {
  label: string;
  value: string;
  owner: "Kitchen" | "Sports" | "Stay" | "CRM";
};

export type PortalRequest = {
  id: string;
  topic: string;
  status: "Open" | "In review" | "Resolved";
  nextStep: string;
};

export const availabilitySlots: AvailabilitySlot[] = [
  { id: "AVL-101", module: "Restaurant", resource: "Garden Deck Table", time: "Today 8:30 PM", capacity: "4 guests", price: "₹500 booking credit", status: "Fast filling" },
  { id: "AVL-102", module: "Sports", resource: "Pickleball Court 1", time: "Tomorrow 7:00 AM", capacity: "4 players", price: "₹900 / slot", status: "Available" },
  { id: "AVL-103", module: "Pool", resource: "Family Pool Cabana", time: "Saturday 4:00 PM", capacity: "8 guests", price: "₹3,500 package", status: "Waitlist" },
  { id: "AVL-104", module: "Stay", resource: "2 BHK Club Suite", time: "Aug 22–24", capacity: "6 guests", price: "₹8,000 deposit", status: "Available" },
];

export const cartPreview: CartLine[] = [
  { item: "Truffle Paneer Tikka", quantity: 2, note: "No onion in one portion", amount: "₹1,040" },
  { item: "Poolside Mocktail Flight", quantity: 1, note: "Serve before starters", amount: "₹390" },
  { item: "Clubhouse Quinoa Bowl", quantity: 1, note: "Extra citrus tahini", amount: "₹460" },
];

export const loyaltyTiers: LoyaltyTier[] = [
  { name: "Silver", members: "184 active", benefit: "5% weekday sports discount", nextAction: "Invite to café combo offers" },
  { name: "Gold", members: "112 active", benefit: "Priority booking and 10% dining rewards", nextAction: "Renewals due this month" },
  { name: "Platinum", members: "32 active", benefit: "Concierge events and stay upgrades", nextAction: "Assign relationship manager" },
];

export const roomStatuses: RoomStatus[] = [
  { room: "Villa 101", category: "1 BHK", status: "Ready", guest: "Walk-in eligible", action: "Open for same-day booking" },
  { room: "Suite 204", category: "2 BHK", status: "Occupied", guest: "Kaur Family", action: "Checkout tomorrow 11:00 AM" },
  { room: "Suite 205", category: "2 BHK", status: "Cleaning", guest: "Event add-on", action: "Housekeeping ETA 35 min" },
  { room: "Villa 108", category: "Suite", status: "Maintenance", guest: "Blocked", action: "AC inspection scheduled" },
];

export const sportsSchedule: SportsSchedule[] = [
  { court: "Court 1", sport: "Pickleball", nextSlot: "7:00 AM", coach: "Rohan", utilization: "92%" },
  { court: "Turf A", sport: "Box Cricket", nextSlot: "6:30 PM", coach: "Tournament desk", utilization: "88%" },
  { court: "Indoor 3", sport: "Table Tennis", nextSlot: "5:00 PM", coach: "Self play", utilization: "64%" },
];

export const testimonials: Testimonial[] = [
  { quote: "Dinner, pool access and the stay booking felt like one coordinated luxury experience.", guest: "Mehta Family", context: "Weekend stay package" },
  { quote: "The QR ordering flow kept our birthday cabana service fast without disturbing the party.", guest: "Anika S.", context: "Private pool event" },
  { quote: "Sports slots, invoices and rewards are easy to track from the same account.", guest: "Gold Member", context: "Monthly club user" },
];

export const accountSummary: AccountSummary = {
  guest: "Aarav Mehta",
  tier: "Gold Club Member",
  memberSince: "Member since April 2026",
  homeLocation: "Banur / Mohali flagship",
  relationshipManager: "Mehak Arora",
  walletBalance: "₹4,250",
  loyaltyPoints: "2,840 pts",
  nextReward: "₹750 dining credit unlocks at 3,000 pts",
};

export const portalAgenda: PortalAgendaItem[] = [
  { time: "Today 8:20 PM", module: "Dining", title: "Dinner order at Table 24", status: "Preparing", action: "Track kitchen status" },
  { time: "Tomorrow 7:00 AM", module: "Sports", title: "Pickleball Court 1", status: "Confirmed", action: "Add player names" },
  { time: "Aug 22, 2:00 PM", module: "Stay", title: "2 BHK Club Suite check-in", status: "Deposit paid", action: "Upload guest IDs" },
  { time: "Aug 28, 4:00 PM", module: "Pool", title: "Birthday cabana enquiry", status: "Quote shared", action: "Approve package" },
];

export const portalPreferences: PortalPreference[] = [
  { label: "Dietary notes", value: "No raw onion, medium spice, prefers Jain options for family events", owner: "Kitchen" },
  { label: "Sports default", value: "Pickleball mornings, needs one rental paddle", owner: "Sports" },
  { label: "Stay setup", value: "Quiet room, extra pillows, late checkout when available", owner: "Stay" },
  { label: "Communication", value: "WhatsApp confirmations, email invoices, no promotional SMS after 9 PM", owner: "CRM" },
];

export const portalRequests: PortalRequest[] = [
  { id: "REQ-1180", topic: "Apply Gold discount to pool cabana quote", status: "In review", nextStep: "CRM approval due today" },
  { id: "REQ-1172", topic: "Invoice GST details for sports booking", status: "Resolved", nextStep: "Invoice emailed to account" },
  { id: "REQ-1164", topic: "Add birthday dessert note to dinner reservation", status: "Open", nextStep: "Restaurant manager to confirm" },
];
