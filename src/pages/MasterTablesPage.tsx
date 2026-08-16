import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Database,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Search,
  Sparkles,
  MapPin,
  Users,
  Shield,
  Crown,
  Trophy,
  UtensilsCrossed,
  FolderPlus,
  Grid,
  BedDouble,
  Briefcase,
  Package,
  CalendarCheck,
  ClipboardList,
  MessageSquare,
  MessageCircle,
  Eye,
  QrCode,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Filter,
  FileText,
  DollarSign,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Layers,
} from 'lucide-react';
import {
  LocationMaster,
  DepartmentMaster,
  UserRoleMaster,
  MembershipTierMaster,
  UserMaster,
  FacilityMaster,
  MenuCategoryMaster,
  MenuItemMaster,
  TableMaster,
  AccommodationRoomMaster,
  EmployeeMaster,
  InventoryMaster,
  Booking,
  Order,
  EventEnquiry,
  ReviewItem,
  UserCategory,
  calculatePayscaleSalary,
} from '../types';

type CategoryGroup =
  | 'LOCATIONS'
  | 'FOOD'
  | 'SPORTS'
  | 'STAYS'
  | 'STAFF'
  | 'INVENTORY'
  | 'MEMBERSHIPS'
  | 'GALLERY';

export const MasterTablesPage: React.FC = () => {
  const {
    locations,
    addLocation,
    updateLocation,
    deleteLocation,
    activeLocation,
    setActiveLocation,

    departments,
    addDepartment,
    updateDepartment,
    deleteDepartment,

    roles,
    addRole,
    updateRole,
    deleteRole,

    membershipTiers,
    addMembershipTier,
    updateMembershipTier,
    deleteMembershipTier,

    allUsers,
    addUser,
    updateUser,
    deleteUser,

    facilities,
    addFacility,
    updateFacility,
    deleteFacility,

    menuCategories,
    addMenuCategory,
    updateMenuCategory,
    deleteMenuCategory,

    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,

    tables,
    addTable,
    updateTable,
    deleteTable,

    rooms,
    addRoom,
    updateRoom,
    deleteRoom,

    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,

    inventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,

    bookings,
    updateBookingStatus,
    deleteBooking,

    orders,
    updateOrderStatus,

    eventEnquiries,
    updateEnquiryStatus,
    deleteEnquiry,

    reviews,
    replyToReview,
    deleteReview,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<CategoryGroup>('STAFF');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [qrModalItem, setQrModalItem] = useState<TableMaster | null>(null);
  const [docModalUser, setDocModalUser] = useState<UserMaster | null>(null);

  // New User / Staff Comprehensive Form State
  const [newUser, setNewUser] = useState<Partial<UserMaster>>({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    category: 'MEMBER',
    roleId: 'role-customer',
    locationId: activeLocation?.id || 'loc-1',
    membershipTierId: 'tier-club',
    status: 'ACTIVE',
    loyaltyPoints: 1000,
    address: '',
    city: 'Mohali',
    state: 'Punjab',
    pincode: '140601',
    payscaleLevel: 0,
    aadharImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80',
    panImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
  });

  // New Menu Item Form State
  const [newItem, setNewItem] = useState<Partial<MenuItemMaster>>({
    name: '',
    categoryId: 'cat-sig',
    price: 1500,
    makingCost: 450,
    description: '',
    prepTimeMinutes: 15,
    calories: 450,
    allergens: ['Dairy'],
    dietaryType: 'VEGETARIAN',
    isSignature: false,
    inStock: true,
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  });

  // New Table Form State
  const [newTable, setNewTable] = useState<Partial<TableMaster>>({
    tableNumber: '',
    areaZone: 'Main Dining',
    capacity: 4,
    qrCodeToken: '',
    status: 'VACANT',
    locationId: activeLocation?.id || 'loc-1',
  });

  // New Facility Form State
  const [newFacility, setNewFacility] = useState<Partial<FacilityMaster>>({
    name: '',
    category: 'Racket Sports',
    locationId: activeLocation?.id || 'loc-1',
    courtDetails: 'Court 1',
    slotDurationMinutes: 60,
    capacity: 4,
    memberPrice: 0,
    guestPrice: 800,
    peakPrice: 1200,
    status: 'AVAILABLE',
    rules: 'Proper sports gear required',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
  });

  // Filter entities by active location
  const locationTables = tables.filter((t) => t.locationId === activeLocation?.id);
  const locationFacilities = facilities.filter((f) => f.locationId === activeLocation?.id);
  const locationUsers = allUsers.filter((u) => u.locationId === activeLocation?.id || !u.locationId);
  const locationEmployees = employees.filter((e) => e.locationId === activeLocation?.id);
  const locationOrders = orders.filter((o) => o.locationId === activeLocation?.id);
  const locationBookings = bookings.filter((b) => b.locationId === activeLocation?.id);
  const locationInventory = inventory.filter((i) => i.locationId === activeLocation?.id);

  // Auto-generate credentials based on category
  const handleCategoryChange = (cat: UserCategory) => {
    let role = 'role-customer';
    let prefix = 'u';
    let payscale = 0;

    if (cat === 'SUPER_ADMIN') {
      role = 'role-superadmin';
      prefix = 'admin';
      payscale = 50;
    } else if (cat === 'CHEF') {
      role = 'role-chef';
      prefix = 'c';
      payscale = 30;
    } else if (cat === 'MANAGER') {
      role = 'role-gm';
      prefix = 'm';
      payscale = 40;
    } else if (cat === 'EVENT_MANAGER') {
      role = 'role-staff';
      prefix = 'e';
      payscale = 25;
    } else if (cat === 'SPORTS_COACH') {
      role = 'role-staff';
      prefix = 's';
      payscale = 20;
    } else if (cat === 'STAYS_DESK') {
      role = 'role-staff';
      prefix = 'st';
      payscale = 18;
    } else if (cat === 'FLOOR_STAFF') {
      role = 'role-staff';
      prefix = 'fl';
      payscale = 10;
    }

    const autoId = `${prefix}${Math.floor(10 + Math.random() * 90)}`;
    setNewUser((prev) => ({
      ...prev,
      category: cat,
      roleId: role,
      username: autoId,
      password: autoId,
      payscaleLevel: payscale,
    }));
  };

  const handleStartEdit = (id: string, item: any) => {
    setEditingId(id);
    setEditForm({ ...item });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24">
      {/* Top Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-[#E5DEC9] bg-[#EDE6D8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Enterprise Master Tables Suite</span>
            </div>
            <h1 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1E241D]">
              Location-Centric Master Control
            </h1>
            <p className="text-xs text-[#5C554E] mt-1">
              Direct UI CRUD engine connecting PostgreSQL 18 with relational foreign keys.
            </p>
          </div>

          {/* Primary Location Anchor */}
          <div className="bg-white border border-[#E5DEC9] p-2.5 rounded-2xl shadow-sm flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#8C5A3C]" />
            <div>
              <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Active Operating Hub</span>
              <select
                value={activeLocation?.id}
                onChange={(e) => {
                  const loc = locations.find((l) => l.id === e.target.value);
                  if (loc) setActiveLocation(loc);
                }}
                className="font-bold text-xs bg-transparent border-none focus:outline-none text-[#1E241D] cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F2ECE1] border border-[#E5DEC9] rounded-2xl overflow-x-auto">
          {[
            { id: 'STAFF', label: 'Staff & Payscales', icon: Users, count: locationUsers.length },
            { id: 'FOOD', label: 'Food, Recipes & Tables', icon: UtensilsCrossed, count: menuItems.length },
            { id: 'SPORTS', label: 'Sports & Arenas', icon: Trophy, count: locationFacilities.length },
            { id: 'STAYS', label: 'Stays & Suites', icon: BedDouble, count: rooms.length },
            { id: 'INVENTORY', label: 'Kitchen Inventory', icon: Package, count: locationInventory.length },
            { id: 'MEMBERSHIPS', label: 'Memberships & CRM', icon: Crown, count: membershipTiers.length },
            { id: 'LOCATIONS', label: 'Hubs & Departments', icon: MapPin, count: locations.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as CategoryGroup);
                  setEditingId(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#8C5A3C] text-white shadow-md shadow-[#8C5A3C]/20'
                    : 'text-[#5C554E] hover:text-[#1E241D] hover:bg-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-[#EDE6D8] text-[#5C554E]'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5C554E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeCategory.toLowerCase()} in ${activeLocation?.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] placeholder-[#5C554E]/60 focus:outline-none focus:border-[#8C5A3C]"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. CATEGORY: STAFF, HR, USER LOGINS & PAYSCALE LEVELS 0 - 50            */}
        {/* ========================================================================= */}
        {activeCategory === 'STAFF' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5DEC9] gap-2">
                <div>
                  <h2 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#8C5A3C]" />
                    <span>Create User / Staff Login with Payscale Levels (0–50) & KYC Documents</span>
                  </h2>
                  <p className="text-xs text-[#5C554E]">
                    Assigns credentials, KYC uploads (Aadhar/PAN), location, and automated salary calculation (Level N = ₹10,000 + N × ₹2,000).
                  </p>
                </div>
              </div>

              {/* Comprehensive User Creation Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newUser.name || !newUser.email) return;
                  addUser(newUser);
                  setNewUser({
                    name: '',
                    email: '',
                    phone: '',
                    username: '',
                    password: '',
                    category: 'MEMBER',
                    roleId: 'role-customer',
                    locationId: activeLocation.id,
                    membershipTierId: 'tier-club',
                    status: 'ACTIVE',
                    loyaltyPoints: 1000,
                    address: '',
                    city: 'Mohali',
                    state: 'Punjab',
                    pincode: '140601',
                    payscaleLevel: 0,
                    aadharImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80',
                    panImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
                  });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {/* 1. Category */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">1. Category / Designation</label>
                  <select
                    value={newUser.category}
                    onChange={(e) => handleCategoryChange(e.target.value as UserCategory)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl font-bold text-[#8C5A3C] focus:outline-none"
                  >
                    <option value="SUPER_ADMIN">👑 Super Administrator (Command)</option>
                    <option value="CHEF">🍳 Executive Chef / Kitchen Lead</option>
                    <option value="MANAGER">👔 General Manager</option>
                    <option value="EVENT_MANAGER">🎪 Event & Banquet Head</option>
                    <option value="SPORTS_COACH">🏆 Sports Club Arena Coach</option>
                    <option value="STAYS_DESK">🏨 Stays & Front Desk Supervisor</option>
                    <option value="FLOOR_STAFF">🍽️ Floor Staff / Waiter</option>
                    <option value="MEMBER">⭐ Club Member / Customer</option>
                  </select>
                </div>

                {/* 2. Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">2. Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sardar Gurjot Singh"
                    value={newUser.name || ''}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                  />
                </div>

                {/* 3. Mobile */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">3. Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={newUser.phone || ''}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                  />
                </div>

                {/* 4. Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">4. Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="staff@restroclub.com"
                    value={newUser.email || ''}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                  />
                </div>

                {/* 5. Auto Generated Login ID */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">5. Generated Login ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. c1, m1, s1"
                    value={newUser.username || ''}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl font-mono text-[#8C5A3C] font-bold focus:outline-none"
                  />
                </div>

                {/* 6. Password */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">6. Initial Password</label>
                  <input
                    type="text"
                    required
                    placeholder="Password"
                    value={newUser.password || ''}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl font-mono focus:outline-none"
                  />
                </div>

                {/* 7. Payscale Level Selector (0 to 50) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">
                    7. Payscale Level (0–50)
                  </label>
                  <select
                    value={newUser.payscaleLevel ?? 0}
                    onChange={(e) => setNewUser({ ...newUser, payscaleLevel: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl font-bold text-emerald-800 focus:outline-none"
                  >
                    {Array.from({ length: 51 }, (_, i) => (
                      <option key={i} value={i}>
                        Level {i} → ₹{calculatePayscaleSalary(i).toLocaleString()}/month
                      </option>
                    ))}
                  </select>
                </div>

                {/* 8. Assigned Location */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">8. Location Hub</label>
                  <select
                    value={newUser.locationId}
                    onChange={(e) => setNewUser({ ...newUser, locationId: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  >
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 9. Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">9. Full Residential Address</label>
                  <input
                    type="text"
                    placeholder="House/Villa No, Street"
                    value={newUser.address || ''}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 10. City & State */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">10. City & State</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={newUser.city || ''}
                      onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
                      className="w-1/2 px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newUser.state || 'Punjab'}
                      onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}
                      className="w-1/2 px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                {/* 11. Pincode */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">11. Postal Pincode</label>
                  <input
                    type="text"
                    placeholder="140601"
                    value={newUser.pincode || ''}
                    onChange={(e) => setNewUser({ ...newUser, pincode: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 12. Aadhar Card Image */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">12. Aadhar Document (Image URL)</label>
                  <input
                    type="text"
                    placeholder="Aadhar Image URL"
                    value={newUser.aadharImage || ''}
                    onChange={(e) => setNewUser({ ...newUser, aadharImage: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 13. PAN Card Image */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">13. PAN Document (Image URL)</label>
                  <input
                    type="text"
                    placeholder="PAN Image URL"
                    value={newUser.panImage || ''}
                    onChange={(e) => setNewUser({ ...newUser, panImage: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* Submit */}
                <div className="sm:col-span-2 lg:col-span-3 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-[#8C5A3C]/20 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Generate & Commit User Record to PostgreSQL</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Users / Staff Table */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
              <div className="p-5 bg-[#F2ECE1] border-b border-[#E5DEC9] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E241D]">
                  Active Personnel & Members at {activeLocation?.name}
                </span>
                <span className="text-[10px] font-bold text-[#8C5A3C] uppercase tracking-widest">
                  {locationUsers.length} Records Loaded
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F3] border-b border-[#E5DEC9] text-[10px] font-bold uppercase tracking-widest text-[#5C554E]">
                    <tr>
                      <th className="p-4">Staff / Member</th>
                      <th className="p-4">Category / Credentials</th>
                      <th className="p-4">Payscale (Level 0–50)</th>
                      <th className="p-4">KYC Documents</th>
                      <th className="p-4">Address & City</th>
                      <th className="p-4">Role / Permissions</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DEC9]">
                    {locationUsers
                      .filter(
                        (u) =>
                          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (u.username && u.username.toLowerCase().includes(searchTerm.toLowerCase()))
                      )
                      .map((u) => {
                        const isEditing = editingId === u.id;
                        const salary = calculatePayscaleSalary(u.payscaleLevel ?? 0);
                        const roleObj = roles.find((r) => r.id === u.roleId);

                        return (
                          <tr key={u.id} className="hover:bg-[#FAF8F3] transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                                  alt={u.name}
                                  className="w-9 h-9 rounded-xl object-cover border border-[#8C5A3C]"
                                />
                                <div>
                                  <span className="font-bold text-[#1E241D] block">{u.name}</span>
                                  <span className="text-[10px] text-[#5C554E] block">{u.email}</span>
                                  <span className="text-[10px] font-mono text-[#8C5A3C]">{u.phone}</span>
                                </div>
                              </div>
                            </td>

                            <td className="p-4">
                              <span className="px-2.5 py-1 bg-[#8C5A3C]/10 text-[#8C5A3C] font-bold text-[9px] uppercase tracking-wider rounded-lg block w-max">
                                {u.category || 'MEMBER'}
                              </span>
                              <p className="text-[10px] font-mono text-[#5C554E] mt-1">
                                Login: <strong className="text-[#1E241D]">{u.username || u.id}</strong>
                              </p>
                            </td>

                            <td className="p-4">
                              <span className="font-serif italic font-bold text-xs text-[#1E241D] block">
                                Level {u.payscaleLevel ?? 0}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-700">
                                ₹{salary.toLocaleString()}/mo
                              </span>
                            </td>

                            <td className="p-4">
                              <button
                                onClick={() => setDocModalUser(u)}
                                className="px-2.5 py-1 bg-[#F2ECE1] hover:bg-[#E5DEC9] border border-[#E5DEC9] rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <FileText className="w-3 h-3 text-[#8C5A3C]" />
                                <span>Aadhar & PAN</span>
                              </button>
                            </td>

                            <td className="p-4 text-[#5C554E]">
                              <p className="text-[11px] font-medium">{u.address || 'Address on file'}</p>
                              <p className="text-[10px]">{u.city || 'Mohali'}, {u.state || 'Punjab'} {u.pincode}</p>
                            </td>

                            <td className="p-4">
                              <span className="px-2.5 py-1 bg-[#3E4A38]/10 text-[#3E4A38] font-bold text-[10px] rounded-lg">
                                {roleObj?.name || u.roleId}
                              </span>
                            </td>

                            <td className="p-4 text-right">
                              <button
                                onClick={() => deleteUser(u.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete user"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CATEGORY: FOOD & BEVERAGES, MENU RECIPES, TABLES & QR CODES            */}
        {/* ========================================================================= */}
        {activeCategory === 'FOOD' && (
          <div className="space-y-8">
            {/* Add Menu Item Form */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
                <div>
                  <h2 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-[#8C5A3C]" />
                    <span>Culinary Menu Items & Gross Contribution Calculator</span>
                  </h2>
                  <p className="text-xs text-[#5C554E]">
                    Real-time contribution calculation (Selling Price - Making Cost) with dietary classification.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newItem.name) return;
                  addMenuItem(newItem);
                  setNewItem({
                    name: '',
                    categoryId: 'cat-sig',
                    price: 1500,
                    makingCost: 450,
                    description: '',
                    prepTimeMinutes: 15,
                    calories: 450,
                    allergens: ['Dairy'],
                    dietaryType: 'VEGETARIAN',
                    isSignature: false,
                    inStock: true,
                    stockCount: 50,
                    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
                  });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <input
                  type="text"
                  required
                  placeholder="Dish Name (e.g. Royal Truffle Risotto)"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                />

                <select
                  value={newItem.categoryId}
                  onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                >
                  {menuCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      Category: {c.name}
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5C554E]">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="Selling Price"
                    value={newItem.price || 0}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none font-bold"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5C554E]">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="Making Cost"
                    value={newItem.makingCost || 0}
                    onChange={(e) => setNewItem({ ...newItem, makingCost: Number(e.target.value) })}
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none text-red-700 font-bold"
                  />
                </div>

                <select
                  value={newItem.dietaryType}
                  onChange={(e) => setNewItem({ ...newItem, dietaryType: e.target.value as any })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                >
                  <option value="VEGETARIAN">Vegetarian (🌱)</option>
                  <option value="VEGAN">Vegan (🌿)</option>
                  <option value="NON_VEGETARIAN">Non-Vegetarian (🍗)</option>
                  <option value="GLUTEN_FREE">Gluten-Free (🌾)</option>
                </select>

                <input
                  type="number"
                  placeholder="Prep Time (Minutes)"
                  value={newItem.prepTimeMinutes || 15}
                  onChange={(e) => setNewItem({ ...newItem, prepTimeMinutes: Number(e.target.value) })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={newItem.image || ''}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <button
                  type="submit"
                  className="py-2.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#8C5A3C]/20"
                >
                  + Add Menu Item
                </button>
              </form>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F2ECE1] border-b border-[#E5DEC9] text-[10px] font-bold uppercase tracking-widest text-[#5C554E]">
                  <tr>
                    <th className="p-4">Dish</th>
                    <th className="p-4">Category Join</th>
                    <th className="p-4">Selling Price</th>
                    <th className="p-4">Making Cost</th>
                    <th className="p-4">Gross Margin</th>
                    <th className="p-4">Dietary</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DEC9]">
                  {menuItems.map((item) => {
                    const catName = menuCategories.find((c) => c.id === item.categoryId)?.name || item.categoryId;
                    const margin = item.price - item.makingCost;
                    const marginPct = item.price > 0 ? ((margin / item.price) * 100).toFixed(0) : '0';

                    return (
                      <tr key={item.id} className="hover:bg-[#FAF8F3] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover border border-[#E5DEC9]" />
                            <div>
                              <span className="font-bold text-[#1E241D] block">{item.name}</span>
                              <span className="text-[10px] text-[#5C554E]">{item.prepTimeMinutes} min prep • {item.calories} kcal</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-[#8C5A3C]/10 text-[#8C5A3C] font-bold text-[10px] rounded-lg">
                            {catName}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-[#1E241D]">₹{Number(item.price).toLocaleString()}</td>
                        <td className="p-4 text-[#5C554E]">₹{Number(item.makingCost).toLocaleString()}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px] rounded-lg">
                            +₹{margin.toLocaleString()} ({marginPct}%)
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-bold uppercase">{item.dietaryType.replace('_', ' ')}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => deleteMenuItem(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Dining Tables & QR Codes */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
                <div>
                  <h3 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#8C5A3C]" />
                    <span>Dining Tables & Printable QR Stands ({activeLocation?.name})</span>
                  </h3>
                  <p className="text-xs text-[#5C554E]">Manage dining zones, guest seating capacity, and QR ordering tokens.</p>
                </div>
              </div>

              {/* Add Table */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newTable.tableNumber) return;
                  addTable(newTable);
                  setNewTable({ tableNumber: '', areaZone: 'Main Dining', capacity: 4, qrCodeToken: '', status: 'VACANT', locationId: activeLocation.id });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
              >
                <input
                  type="text"
                  required
                  placeholder="Table # (e.g. 15)"
                  value={newTable.tableNumber || ''}
                  onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value, qrCodeToken: `RC-TBL-${e.target.value}` })}
                  className="px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <select
                  value={newTable.areaZone}
                  onChange={(e) => setNewTable({ ...newTable, areaZone: e.target.value as any })}
                  className="px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                >
                  <option value="Main Dining">Main Dining</option>
                  <option value="VIP Lounge">VIP Lounge</option>
                  <option value="Outdoor Terrace">Outdoor Terrace</option>
                  <option value="Bar Area">Bar Area</option>
                  <option value="Poolside Cabana">Poolside Cabana</option>
                </select>

                <input
                  type="number"
                  placeholder="Capacity (e.g. 4)"
                  value={newTable.capacity || 4}
                  onChange={(e) => setNewTable({ ...newTable, capacity: Number(e.target.value) })}
                  className="px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="QR Token"
                  value={newTable.qrCodeToken || ''}
                  onChange={(e) => setNewTable({ ...newTable, qrCodeToken: e.target.value })}
                  className="px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl font-mono focus:outline-none"
                />

                <button
                  type="submit"
                  className="py-2 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  + Add Table
                </button>
              </form>

              {/* Table Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {locationTables.map((tbl) => (
                  <div key={tbl.id} className="p-4 bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl space-y-2 text-center relative group">
                    <span className="font-serif italic font-bold text-2xl text-[#1E241D] block">
                      #{tbl.tableNumber}
                    </span>
                    <span className="text-[10px] font-bold text-[#8C5A3C] uppercase tracking-wider block">
                      {tbl.areaZone}
                    </span>
                    <p className="text-[10px] text-[#5C554E]">{tbl.capacity} Guests • {tbl.status}</p>

                    <button
                      onClick={() => setQrModalItem(tbl)}
                      className="w-full py-1.5 bg-white border border-[#E5DEC9] hover:border-[#8C5A3C] rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 mt-2 cursor-pointer shadow-sm"
                    >
                      <QrCode className="w-3 h-3 text-[#8C5A3C]" />
                      <span>Print Stand</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. CATEGORY: SPORTS, ARENAS & FACILITIES                                  */}
        {/* ========================================================================= */}
        {activeCategory === 'SPORTS' && (
          <div className="space-y-6">
            {/* Add Facility Form */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
                <div>
                  <h2 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#8C5A3C]" />
                    <span>Sports Facilities & Court Booking Setup ({activeLocation?.name})</span>
                  </h2>
                  <p className="text-xs text-[#5C554E]">Configure arena courts, slot duration, member/guest tariffs, and court rules.</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newFacility.name) return;
                  addFacility(newFacility);
                  setNewFacility({
                    name: '',
                    category: 'Racket Sports',
                    locationId: activeLocation.id,
                    courtDetails: 'Court 1',
                    slotDurationMinutes: 60,
                    capacity: 4,
                    memberPrice: 0,
                    guestPrice: 800,
                    peakPrice: 1200,
                    status: 'AVAILABLE',
                    rules: 'Proper sports gear required',
                    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
                  });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <input
                  type="text"
                  required
                  placeholder="Facility Name (e.g. Box Cricket Arena)"
                  value={newFacility.name || ''}
                  onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <select
                  value={newFacility.category}
                  onChange={(e) => setNewFacility({ ...newFacility, category: e.target.value as any })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                >
                  <option value="Racket Sports">Racket Sports</option>
                  <option value="Water Sports">Water Sports</option>
                  <option value="Indoor Games">Indoor Games</option>
                  <option value="Outdoor Sports">Outdoor Sports</option>
                  <option value="Fitness & Spa">Fitness & Spa</option>
                </select>

                <input
                  type="number"
                  placeholder="Guest Fee (₹)"
                  value={newFacility.guestPrice || 0}
                  onChange={(e) => setNewFacility({ ...newFacility, guestPrice: Number(e.target.value) })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <input
                  type="number"
                  placeholder="Peak Hour Fee (₹)"
                  value={newFacility.peakPrice || 0}
                  onChange={(e) => setNewFacility({ ...newFacility, peakPrice: Number(e.target.value) })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="Court Details (e.g. Courts 1-4)"
                  value={newFacility.courtDetails || ''}
                  onChange={(e) => setNewFacility({ ...newFacility, courtDetails: e.target.value })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={newFacility.image || ''}
                  onChange={(e) => setNewFacility({ ...newFacility, image: e.target.value })}
                  className="px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#8C5A3C]/20"
                  >
                    + Add Facility
                  </button>
                </div>
              </form>
            </div>

            {/* Facilities Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationFacilities.map((fac) => (
                <div key={fac.id} className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <img src={fac.image} alt={fac.name} className="w-full h-44 object-cover" />
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">{fac.name}</h3>
                          <p className="text-[10px] text-[#8C5A3C] font-bold uppercase tracking-wider">{fac.category}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-200">
                          {fac.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C554E]">{fac.courtDetails} • {fac.slotDurationMinutes} min slot</p>
                      <div className="p-3 bg-[#FAF8F3] rounded-xl text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#5C554E]">Member Price:</span>
                          <strong className="text-emerald-700">{fac.memberPrice === 0 ? 'Complimentary' : `₹${fac.memberPrice}`}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5C554E]">Guest Price:</span>
                          <strong>₹{fac.guestPrice}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5C554E]">Peak Hours:</span>
                          <strong className="text-[#8C5A3C]">₹{fac.peakPrice}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#E5DEC9] flex justify-end">
                    <button onClick={() => deleteFacility(fac.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. CATEGORY: STAYS & ACCOMMODATIONS                                       */}
        {/* ========================================================================= */}
        {activeCategory === 'STAYS' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
                <div>
                  <h2 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-[#8C5A3C]" />
                    <span>Luxury Stays & Accommodations Master</span>
                  </h2>
                  <p className="text-xs text-[#5C554E]">Boutique 1BHK, 2BHK, Luxury Suites & Penthouse accommodation inventory.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rooms.map((rm) => (
                  <div key={rm.id} className="bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl overflow-hidden shadow-sm">
                    <img src={rm.image} alt={rm.name} className="w-full h-40 object-cover" />
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif italic font-bold text-lg text-[#1E241D]">Room {rm.roomNumber} - {rm.name}</h4>
                          <span className="text-[10px] font-bold text-[#8C5A3C] uppercase">{rm.category}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded">
                          {rm.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C554E] line-clamp-2">{rm.description}</p>
                      <p className="text-sm font-bold text-[#8C5A3C] pt-2">₹{Number(rm.pricePerNight).toLocaleString()} / night</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. CATEGORY: KITCHEN INVENTORY & PROCUREMENT                              */}
        {/* ========================================================================= */}
        {activeCategory === 'INVENTORY' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
                <div>
                  <h2 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#8C5A3C]" />
                    <span>Kitchen Raw Materials & Inventory Thresholds ({activeLocation?.name})</span>
                  </h2>
                  <p className="text-xs text-[#5C554E]">Automatic stock alert warnings when inventory falls below threshold.</p>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-[#F2ECE1] border-b border-[#E5DEC9] text-[10px] font-bold uppercase tracking-widest text-[#5C554E]">
                  <tr>
                    <th className="p-4">Item Code</th>
                    <th className="p-4">Material / Spirits</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Current Stock</th>
                    <th className="p-4">Alert Threshold</th>
                    <th className="p-4">Unit Cost</th>
                    <th className="p-4">Supplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DEC9]">
                  {locationInventory.map((inv) => {
                    const isLow = Number(inv.currentStock) <= Number(inv.minStockThreshold);
                    return (
                      <tr key={inv.id} className="hover:bg-[#FAF8F3]">
                        <td className="p-4 font-mono font-bold text-[#8C5A3C]">{inv.itemCode}</td>
                        <td className="p-4 font-bold text-[#1E241D]">{inv.name}</td>
                        <td className="p-4">{inv.category}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] ${isLow ? 'bg-red-50 text-red-700 border border-red-200 animate-pulse' : 'bg-emerald-50 text-emerald-800'}`}>
                            {inv.currentStock} {inv.unit}
                          </span>
                        </td>
                        <td className="p-4 text-[#5C554E]">{inv.minStockThreshold} {inv.unit}</td>
                        <td className="p-4 font-bold">₹{Number(inv.unitCost).toLocaleString()}</td>
                        <td className="p-4 text-[#5C554E]">{inv.supplierName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. CATEGORY: MEMBERSHIPS, TIERS & CRM PIPELINE                            */}
        {/* ========================================================================= */}
        {activeCategory === 'MEMBERSHIPS' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipTiers.map((tier) => (
                <div key={tier.id} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif italic text-2xl font-bold text-[#1E241D]">{tier.name}</h3>
                    <span className="px-3 py-1 bg-[#8C5A3C]/10 text-[#8C5A3C] text-[10px] font-bold rounded-full uppercase">
                      {tier.discountPercentage}% OFF
                    </span>
                  </div>
                  <p className="text-xl font-bold text-[#8C5A3C]">₹{Number(tier.annualFee).toLocaleString()} / year</p>
                  <div className="space-y-1.5 pt-2 border-t border-[#E5DEC9]">
                    <span className="text-[10px] font-bold uppercase text-[#5C554E]">Perks & Privileges:</span>
                    {tier.perks.map((p, i) => (
                      <p key={i} className="text-xs text-[#1E241D] flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#8C5A3C]" />
                        <span>{p}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. CATEGORY: LOCATION HUBS & DEPARTMENTS MASTER                           */}
        {/* ========================================================================= */}
        {activeCategory === 'LOCATIONS' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {locations.map((loc) => (
                <div key={loc.id} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">{loc.name}</h3>
                      <span className="font-mono text-[10px] text-[#8C5A3C] font-bold">{loc.code}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded">
                      {loc.isActive ? 'Active' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C554E]">{loc.address}</p>
                  <div className="p-3 bg-[#FAF8F3] rounded-xl text-xs space-y-1">
                    <p className="text-[10px] font-bold text-[#5C554E] uppercase">Operating Hours</p>
                    <p className="font-medium text-[#1E241D]">{loc.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* KYC Documents Modal */}
      {docModalUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-[#E5DEC9]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5DEC9]">
              <div>
                <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">
                  Identity Documents: {docModalUser.name}
                </h3>
                <p className="text-xs text-[#5C554E]">Aadhar Card & PAN Card Records on PostgreSQL</p>
              </div>
              <button onClick={() => setDocModalUser(null)} className="p-2 hover:bg-[#F2ECE1] rounded-full cursor-pointer">
                <X className="w-5 h-5 text-[#5C554E]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C5A3C] block mb-1.5">
                  1. Aadhar Card Document
                </span>
                <img
                  src={docModalUser.aadharImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80'}
                  alt="Aadhar Document"
                  className="w-full h-44 object-cover rounded-2xl border border-[#E5DEC9]"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C5A3C] block mb-1.5">
                  2. PAN Card Document
                </span>
                <img
                  src={docModalUser.panImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80'}
                  alt="PAN Document"
                  className="w-full h-44 object-cover rounded-2xl border border-[#E5DEC9]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDocModalUser(null)}
                className="px-5 py-2.5 bg-[#8C5A3C] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#73482E] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Stand Generator Modal */}
      {qrModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full space-y-6 text-center shadow-2xl border border-[#E5DEC9]">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5DEC9]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C5A3C]">Printable Table Stand</span>
              <button onClick={() => setQrModalItem(null)} className="p-1 hover:bg-[#F2ECE1] rounded-full cursor-pointer">
                <X className="w-4 h-4 text-[#5C554E]" />
              </button>
            </div>

            <div className="p-6 bg-[#FAF8F3] border-2 border-dashed border-[#8C5A3C] rounded-2xl space-y-3">
              <span className="font-serif italic font-bold text-3xl text-[#1E241D] block">
                Table #{qrModalItem.tableNumber}
              </span>
              <p className="text-[10px] uppercase font-bold text-[#8C5A3C] tracking-widest">{qrModalItem.areaZone}</p>
              
              <div className="w-36 h-36 mx-auto bg-white p-2 border border-[#E5DEC9] rounded-xl flex items-center justify-center shadow-inner">
                <QrCode className="w-28 h-28 text-[#1E241D]" />
              </div>

              <p className="text-[9px] font-mono text-[#5C554E]">{qrModalItem.qrCodeToken}</p>
              <p className="text-[10px] font-bold text-[#1E241D]">Scan to Order with Chef Julian</p>
            </div>

            <button
              onClick={() => {
                window.print();
                setQrModalItem(null);
              }}
              className="w-full py-3 bg-[#8C5A3C] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#73482E] transition-all cursor-pointer"
            >
              Print QR Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
