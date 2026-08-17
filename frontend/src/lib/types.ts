export type UserCategory =
  | 'SUPER_ADMIN'
  | 'CHEF'
  | 'MANAGER'
  | 'EVENT_MANAGER'
  | 'SPORTS_COACH'
  | 'STAYS_DESK'
  | 'FLOOR_STAFF'
  | 'MEMBER';

export function calculatePayscaleSalary(level: number): number {
  const safeLevel = Math.max(0, Math.min(50, Math.floor(level || 0)));
  return 10000 + safeLevel * 2000;
}

export interface LocationMaster {
  id: string;
  code: string;
  name: string;
  region: string;
  address: string;
  hours: string;
  contactEmail: string;
  contactPhone: string;
  isActive: boolean;
}

export interface DepartmentMaster {
  id: string;
  name: string;
  description: string;
  locationId: string;
}

export interface RoleMaster {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface MembershipTierMaster {
  id: string;
  name: string;
  annualFee: number;
  discountPercentage: number;
  perks: string[];
  priorityAccess: boolean;
  colorBadge: string;
}

export interface UserMaster {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleId: string;
  category?: UserCategory | string;
  locationId?: string;
  membershipTierId: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  avatar: string;
  loyaltyPoints: number;
  memberSinceYear: number;
  username?: string;
  password?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  aadharImage?: string | null;
  panImage?: string | null;
  payscaleLevel?: number;
}

export interface FacilityMaster {
  id: string;
  name: string;
  category: 'Racket Sports' | 'Indoor Games' | 'Water Sports' | 'Fitness';
  locationId: string;
  courtDetails: string;
  slotDurationMinutes: number;
  capacity: number;
  memberPrice: number;
  guestPrice: number;
  peakPrice: number;
  status: 'AVAILABLE' | 'BUSY' | 'MAINTENANCE' | 'OPEN';
  rules: string;
  image: string;
}

export interface MenuCategoryMaster {
  id: string;
  name: string;
  displayOrder: number;
  description: string;
}

export interface MenuItemMaster {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  makingCost: number;
  description: string;
  image: string;
  prepTimeMinutes: number;
  calories: number;
  allergens: string[];
  dietaryType: 'VEGETARIAN' | 'NON_VEGETARIAN' | 'VEGAN' | 'EGGETARIAN';
  isSignature: boolean;
  inStock: boolean;
  stockCount: number;
}

export interface DiningTableMaster {
  id: string;
  tableNumber: string;
  areaZone: 'Main Dining' | 'VIP Lounge' | 'Poolside Cabana' | 'Bar Area' | 'Terrace Deck';
  capacity: number;
  qrCodeToken: string;
  status: 'VACANT' | 'OCCUPIED' | 'RESERVED' | 'BILL_REQUESTED';
  locationId: string;
}

export interface AccommodationRoomMaster {
  id: string;
  roomNumber: string;
  name: string;
  category: string;
  pricePerNight: number;
  amenities: string[];
  floor: string;
  capacity: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED';
  image: string;
  description: string;
}

export interface OrderItem {
  itemId: string;
  itemName: string;
  quantity: number;
  notes?: string;
  allergyNotice?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  locationId: string;
  tableId?: string;
  tableName?: string;
  guestName: string;
  guestCount: number;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'RECEIVED' | 'PREPARING' | 'READY' | 'SERVED' | 'COMPLETED';
  isVIP: boolean;
  hasAllergy: boolean;
  allergyNotes?: string;
  waitMinutes: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  locationId: string;
  type: 'DINING' | 'SPORTS' | 'STAY' | 'EVENT' | 'POOL';
  title: string;
  targetId?: string;
  guestName: string;
  guestEmail: string;
  date: string;
  timeSlot?: string;
  guestsCount: number;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING' | 'COMPLIMENTARY';
  status: 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
}

export interface ReviewMaster {
  id: string;
  authorName: string;
  authorRole: string;
  rating: number;
  dateAgo: string;
  category: 'Dining' | 'Sports Club' | 'Stays & Suites' | 'Pool & Lounge';
  comment: string;
  sentiment: 'EXCEPTIONAL' | 'SATISFACTORY' | 'NEEDS_ATTENTION';
  avatar?: string;
  initials?: string;
  managementReply?: string;
  repliedAt?: string;
}

export interface EmployeeMaster {
  id: string;
  employeeCode: string;
  name: string;
  departmentId: string;
  designation: string;
  salaryMonthly: number;
  joiningDate: string;
  phone: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
  locationId: string;
  username?: string;
  password?: string;
  category?: UserCategory | string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  aadharImage?: string | null;
  panImage?: string | null;
  payscaleLevel?: number;
}

export interface InventoryMaster {
  id: string;
  itemCode: string;
  name: string;
  category: 'Spirits & Beverages' | 'Raw Ingredients' | 'Sports Equipment' | 'Linen & Housekeeping';
  unit: string;
  currentStock: number;
  minStockThreshold: number;
  unitCost: number;
  expiryDate?: string;
  supplierName: string;
  locationId: string;
}

export interface EventEnquiryMaster {
  id: string;
  eventType: string;
  estimatedGuests: number;
  preferredDate: string;
  contactName: string;
  specialRequirements: string;
  status: 'PENDING' | 'QUOTED' | 'CONFIRMED' | 'REJECTED';
  createdAt: string;
}
