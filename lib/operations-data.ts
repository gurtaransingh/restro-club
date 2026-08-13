export type OrderStatus = "Received" | "Accepted" | "Preparing" | "Ready" | "Served" | "Completed";

export type KitchenOrder = {
  id: string;
  table: string;
  customer: string;
  items: string[];
  priority: "Normal" | "High";
  prepTarget: string;
  status: OrderStatus;
  notes: string;
};

export type CustomerActivity = {
  id: string;
  type: "Food" | "Sports" | "Pool" | "Stay" | "Event" | "Membership";
  title: string;
  date: string;
  status: string;
  amount: string;
};

export type StaffRecord = {
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  attendance: "Present" | "Late" | "Leave" | "Absent";
  payScale: string;
};

export const kitchenOrders: KitchenOrder[] = [
  {
    id: "RC-KOT-1042",
    table: "Table 24",
    customer: "QR Guest",
    items: ["Truffle Paneer Tikka x2", "Poolside Mocktail Flight x1", "Clubhouse Quinoa Bowl x1"],
    priority: "High",
    prepTarget: "18 min",
    status: "Preparing",
    notes: "No onion in one tikka. Serve mocktails first.",
  },
  {
    id: "RC-KOT-1043",
    table: "Table 08",
    customer: "Aarav Mehta",
    items: ["NH44 Butter Chicken x1", "Garlic Naan x3"],
    priority: "Normal",
    prepTarget: "24 min",
    status: "Accepted",
    notes: "Medium spice.",
  },
  {
    id: "RC-KOT-1044",
    table: "Pool Cabana 02",
    customer: "Event Service",
    items: ["Poolside Mocktail Flight x6", "Club fries x4"],
    priority: "High",
    prepTarget: "12 min",
    status: "Ready",
    notes: "Pool party package service.",
  },
];

export const customerActivities: CustomerActivity[] = [
  { id: "ORD-8841", type: "Food", title: "Dinner order", date: "Today, 8:20 PM", status: "Preparing", amount: "₹1,370" },
  { id: "SPT-2110", type: "Sports", title: "Pickleball Court 1", date: "Tomorrow, 7:00 AM", status: "Confirmed", amount: "₹900" },
  { id: "STY-102", type: "Stay", title: "2 BHK Suite", date: "Aug 22–24", status: "Deposit paid", amount: "₹8,000" },
  { id: "MBR-328", type: "Membership", title: "Gold Club Membership", date: "Valid until Dec 31", status: "Active", amount: "Rewards: 2,840 pts" },
];

export const staffRecords: StaffRecord[] = [
  { employeeId: "RC-EMP-001", name: "Simran Kaur", department: "Kitchen", designation: "Super Chef", attendance: "Present", payScale: "₹72,000 / month" },
  { employeeId: "RC-EMP-014", name: "Rohan Sharma", department: "Outdoor Club", designation: "Sports Manager", attendance: "Late", payScale: "₹48,000 / month" },
  { employeeId: "RC-EMP-027", name: "Mehak Arora", department: "Housekeeping", designation: "Floor Lead", attendance: "Present", payScale: "₹34,000 / month" },
  { employeeId: "RC-EMP-039", name: "Kabir Singh", department: "Finance", designation: "Accounts Executive", attendance: "Leave", payScale: "₹42,000 / month" },
];

export const auditEvents = [
  "Finance Manager approved refund RC-PAY-8821 for ₹1,200",
  "Super Chef changed Truffle Paneer Tikka availability to limited",
  "HR Manager updated attendance for RC-EMP-014 with late reason",
  "Pool Manager blocked 4:00 PM slot for maintenance",
];

export type InventoryItem = {
  sku: string;
  name: string;
  category: string;
  stock: string;
  threshold: string;
  supplier: string;
  status: "Healthy" | "Low" | "Critical";
};

export type PaymentRecord = {
  reference: string;
  module: "Restaurant" | "Sports" | "Stay" | "Pool" | "Event" | "Membership";
  customer: string;
  amount: string;
  status: "Paid" | "Deposit" | "Refund Pending" | "Failed";
};

export type EventEnquiry = {
  id: string;
  type: string;
  date: string;
  guests: number;
  requirements: string;
  stage: "New" | "Qualified" | "Quoted" | "Confirmed";
};

export type NotificationTemplate = {
  channel: "Email" | "SMS" | "Push" | "WhatsApp";
  trigger: string;
  owner: string;
};

export const inventoryItems: InventoryItem[] = [
  { sku: "INV-VEG-014", name: "Hydroponic lettuce", category: "Vegetables", stock: "8 kg", threshold: "12 kg", supplier: "Green Valley Farms", status: "Low" },
  { sku: "INV-DAI-006", name: "Paneer blocks", category: "Dairy", stock: "4 kg", threshold: "10 kg", supplier: "Punjab Dairy Co.", status: "Critical" },
  { sku: "INV-BEV-022", name: "Cold brew concentrate", category: "Beverages", stock: "18 L", threshold: "10 L", supplier: "Roastery Partner", status: "Healthy" },
  { sku: "INV-PKG-003", name: "Premium takeaway boxes", category: "Packaging", stock: "140 pcs", threshold: "250 pcs", supplier: "Eco Pack Works", status: "Low" },
];

export const paymentRecords: PaymentRecord[] = [
  { reference: "RC-PAY-9101", module: "Restaurant", customer: "QR Table 24", amount: "₹1,370", status: "Paid" },
  { reference: "RC-PAY-9102", module: "Sports", customer: "Aarav Mehta", amount: "₹900", status: "Paid" },
  { reference: "RC-PAY-9103", module: "Stay", customer: "Kaur Family", amount: "₹8,000", status: "Deposit" },
  { reference: "RC-PAY-8821", module: "Pool", customer: "Corporate Pool Party", amount: "₹1,200", status: "Refund Pending" },
];

export const eventEnquiries: EventEnquiry[] = [
  { id: "EVT-204", type: "Birthday pool party", date: "Aug 28", guests: 45, requirements: "Pool access, snacks, mocktails, decor", stage: "Quoted" },
  { id: "EVT-205", type: "Corporate sports day", date: "Sep 04", guests: 80, requirements: "Box cricket, pickleball, lunch buffet", stage: "Qualified" },
  { id: "EVT-206", type: "Private dinner", date: "Sep 12", guests: 22, requirements: "Chef menu, stay add-on, music", stage: "New" },
];

export const notificationTemplates: NotificationTemplate[] = [
  { channel: "WhatsApp", trigger: "Booking confirmation", owner: "CRM" },
  { channel: "SMS", trigger: "Order ready", owner: "Kitchen" },
  { channel: "Email", trigger: "Invoice generated", owner: "Finance" },
  { channel: "Push", trigger: "Membership expiry reminder", owner: "Marketing" },
];
