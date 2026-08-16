export type UserCategory =
  | 'SUPER_ADMIN'
  | 'CHEF'
  | 'MANAGER'
  | 'EVENT_MANAGER'
  | 'SPORTS_COACH'
  | 'STAYS_DESK'
  | 'FLOOR_STAFF'
  | 'MEMBER';

export const calculatePayscaleSalary = (level: number): number => {
  const safeLevel = Math.max(0, Math.min(50, Math.floor(level || 0)));
  return 10000 + safeLevel * 2000;
};

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

export interface FacilityMaster {
  id: string;
  name: string;
  category: 'Racket Sports' | 'Water Sports' | 'Indoor Games' | 'Outdoor Sports' | 'Fitness & Spa';
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
  dietaryType: 'VEGETARIAN' | 'VEGAN' | 'NON_VEGETARIAN' | 'GLUTEN_FREE';
  isSignature: boolean;
  inStock: boolean;
  stockCount?: number;
}

export interface TableMaster {
  id: string;
  tableNumber: string;
  areaZone: 'Main Dining' | 'VIP Lounge' | 'Outdoor Terrace' | 'Bar Area' | 'Poolside Cabana';
  capacity: number;
  qrCodeToken: string;
  status: 'VACANT' | 'OCCUPIED' | 'RESERVED' | 'CLEANING';
  locationId: string;
}

export interface AccommodationRoomMaster {
  id: string;
  roomNumber: string;
  name: string;
  category: 'Boutique 1BHK' | 'Boutique 2BHK' | 'The Luxury Suite' | 'Penthouse Suite';
  pricePerNight: number;
  amenities: string[];
  floor: string;
  capacity: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';
  image: string;
  description: string;
}

export interface MembershipTierMaster {
  id: string;
  name: string;
  annualFee: number;
  perks: string[];
  discountPercentage: number;
  priorityAccess: boolean;
  colorBadge: string;
}

export interface UserRoleMaster {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface UserMaster {
  id: string;
  username?: string;
  password?: string;
  category?: UserCategory;
  name: string;
  email: string;
  phone: string;
  roleId: string;
  locationId: string;
  membershipTierId: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  avatar: string;
  loyaltyPoints: number;
  memberSinceYear: number;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  aadharImage?: string;
  panImage?: string;
  payscaleLevel?: number;
}

export interface EmployeeMaster {
  id: string;
  employeeCode: string;
  username?: string;
  password?: string;
  category?: UserCategory;
  name: string;
  departmentId: string;
  designation: string;
  salaryMonthly: number;
  payscaleLevel?: number;
  joiningDate: string;
  phone: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
  locationId: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  aadharImage?: string;
  panImage?: string;
}

export interface InventoryMaster {
  id: string;
  itemCode: string;
  name: string;
  category: 'Raw Ingredients' | 'Spirits & Beverages' | 'Sports Equipment' | 'Linen & Housekeeping' | 'Consumables';
  unit: 'kg' | 'liters' | 'bottles' | 'pieces' | 'packs';
  currentStock: number;
  minStockThreshold: number;
  unitCost: number;
  expiryDate?: string;
  supplierName: string;
  locationId: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'HALF_DAY';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  monthYear: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'PAID' | 'PENDING' | 'PROCESSING';
}

export interface KitchenOrderItem {
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
  items: KitchenOrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'RECEIVED' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'SERVED' | 'COMPLETED' | 'CANCELLED';
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
  targetId: string; // facilityId, roomId, tableId
  guestName: string;
  guestEmail: string;
  date: string;
  timeSlot?: string;
  guestsCount: number;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PAY_AT_CLUB' | 'PENDING';
  status: 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  notes?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorRole: string;
  rating: number;
  dateAgo: string;
  category: 'Dining' | 'Sports Club' | 'Resort Stay' | 'Pool';
  comment: string;
  sentiment: 'EXCEPTIONAL' | 'CONSTRUCTIVE' | 'NEEDS_ATTENTION';
  avatar?: string;
  initials?: string;
  managementReply?: string;
  repliedAt?: string;
}

export interface EventEnquiry {
  id: string;
  eventType: string;
  estimatedGuests: string;
  preferredDate: string;
  contactName: string;
  specialRequirements: string;
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'CONFIRMED';
  createdAt: string;
}

export interface CartItem {
  menuItem: MenuItemMaster;
  quantity: number;
  specialNotes?: string;
}

export interface AuthSession {
  user: UserMaster | null;
  isAuthenticated: boolean;
  roleId: string | null;
}
