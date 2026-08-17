'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import {
  Database,
  MapPin,
  Users,
  UtensilsCrossed,
  Trophy,
  BedDouble,
  Package,
  Crown,
  Building2,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  QrCode,
  FileText,
  DollarSign,
  AlertTriangle,
  Sparkles,
  Printer,
  X,
  Eye,
  Shield,
  Clock,
  Send,
} from 'lucide-react';
import {
  calculatePayscaleSalary,
  UserCategory,
  UserMaster,
  MenuItemMaster,
  DiningTableMaster,
  FacilityMaster,
  AccommodationRoomMaster,
  InventoryMaster,
  LocationMaster,
} from '../../../lib/types';

export default function MasterTablesPage() {
  const {
    locations,
    activeLocation,
    setActiveLocation,
    departments,
    roles,
    membershipTiers,
    allUsers,
    addUser,
    updateUser,
    deleteUser,
    facilities,
    addFacility,
    updateFacility,
    deleteFacility,
    menuCategories,
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
    addInventory,
    updateInventory,
    deleteInventory,
    orders,
    bookings,
    reviews,
    replyReview,
    eventEnquiries,
    addLocation,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<
    'STAFF' | 'FOOD' | 'SPORTS' | 'STAYS' | 'INVENTORY' | 'MEMBERSHIP' | 'HUBS'
  >('STAFF');

  // Modals state
  const [selectedTableForQr, setSelectedTableForQr] = useState<DiningTableMaster | null>(null);
  const [kycDocModal, setKycDocModal] = useState<{ type: string; url: string; userName: string } | null>(null);
  const [reviewReplyModal, setReviewReplyModal] = useState<{ id: string; author: string; comment: string } | null>(null);
  const [replyText, setReplyText] = useState('');

  // Form State: Staff / User
  const [newUser, setNewUser] = useState<Partial<UserMaster>>({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    category: 'CHEF',
    roleId: 'role-chef',
    locationId: activeLocation.id,
    membershipTierId: 'tier-club',
    payscaleLevel: 10,
    address: '',
    city: 'Mohali',
    state: 'Punjab',
    pincode: '140601',
    aadharImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    panImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
  });

  // Form State: Menu Item
  const [newItem, setNewItem] = useState<Partial<MenuItemMaster>>({
    name: '',
    categoryId: 'cat-sig',
    price: 1500,
    makingCost: 450,
    description: '',
    dietaryType: 'NON_VEGETARIAN',
    isSignature: false,
    prepTimeMinutes: 15,
    calories: 450,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  });

  // Form State: Dining Table
  const [newTable, setNewTable] = useState<Partial<DiningTableMaster>>({
    tableNumber: '',
    areaZone: 'Main Dining',
    capacity: 4,
    locationId: activeLocation.id,
  });

  // Form State: Facility
  const [newFacility, setNewFacility] = useState<Partial<FacilityMaster>>({
    name: '',
    category: 'Racket Sports',
    locationId: activeLocation.id,
    courtDetails: 'Court 1',
    slotDurationMinutes: 60,
    capacity: 4,
    memberPrice: 0,
    guestPrice: 800,
    peakPrice: 1200,
    rules: 'Non-marking sports shoes mandatory.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
  });

  // Form State: Room
  const [newRoom, setNewRoom] = useState<Partial<AccommodationRoomMaster>>({
    roomNumber: '',
    name: 'Executive Suite',
    category: 'Executive Suite',
    pricePerNight: 28000,
    floor: '2nd Floor',
    capacity: 2,
    amenities: ['High-Speed WiFi', 'Climate Control', 'Pool Access'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    description: 'Refined retreat with luxury linens and court view.',
  });

  // Form State: Inventory
  const [newInv, setNewInv] = useState<Partial<InventoryMaster>>({
    itemCode: '',
    name: '',
    category: 'Raw Ingredients',
    unit: 'kg',
    currentStock: 10,
    minStockThreshold: 5,
    unitCost: 250,
    supplierName: 'Fresh Farms Punjab',
    locationId: activeLocation.id,
  });

  const categoriesList = [
    { id: 'STAFF', label: 'Staff, HR & Payscales', icon: Users },
    { id: 'FOOD', label: 'Food & Dining Tables', icon: UtensilsCrossed },
    { id: 'SPORTS', label: 'Sports & Arenas', icon: Trophy },
    { id: 'STAYS', label: 'Stays & Accommodations', icon: BedDouble },
    { id: 'INVENTORY', label: 'Inventory & Stock', icon: Package },
    { id: 'MEMBERSHIP', label: 'Memberships & CRM', icon: Crown },
    { id: 'HUBS', label: 'Location Property Hubs', icon: Building2 },
  ] as const;

  const filteredUsers = allUsers.filter((u) => u.locationId === activeLocation.id || !u.locationId);
  const filteredTables = tables.filter((t) => t.locationId === activeLocation.id || !t.locationId);
  const filteredFacilities = facilities.filter((f) => f.locationId === activeLocation.id || !f.locationId);
  const filteredInventory = inventory.filter((i) => i.locationId === activeLocation.id || !i.locationId);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24">
      {/* Top Location Anchor Header */}
      <section className="bg-[#EDE6D8] border-b border-[#E5DEC9] pt-8 pb-6 px-4 sm:px-6 lg:px-8 sticky top-16 sm:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>PostgreSQL 18 Normalized Master Engine</span>
            </div>
            <h1 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1E241D]">
              Master Tables CRUD Console
            </h1>
          </div>

          {/* Location Anchor Selector */}
          <div className="flex items-center gap-3 bg-white border border-[#E5DEC9] p-2 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#8C5A3C] text-white rounded-xl text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Active Property Hub:</span>
            </div>
            <select
              value={activeLocation.id}
              onChange={(e) => {
                const loc = locations.find((l) => l.id === e.target.value);
                if (loc) setActiveLocation(loc);
              }}
              className="bg-transparent text-xs font-bold text-[#1E241D] py-1 px-2 focus:outline-none cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.region})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#8C5A3C] text-white shadow-md'
                    : 'bg-white border border-[#E5DEC9] text-[#5C554E] hover:bg-[#FAF8F3]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ======================================================== */}
        {/* 1. STAFF & PAYSCALES & KYC */}
        {/* ======================================================== */}
        {activeCategory === 'STAFF' && (
          <div className="space-y-8">
            {/* Add User / Staff Form */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
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

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newUser.name || !newUser.email) return;
                  addUser({
                    ...newUser,
                    locationId: activeLocation.id,
                  });
                  setNewUser({
                    name: '',
                    email: '',
                    phone: '',
                    username: '',
                    password: '',
                    category: 'CHEF',
                    roleId: 'role-chef',
                    locationId: activeLocation.id,
                    membershipTierId: 'tier-club',
                    payscaleLevel: 10,
                    address: '',
                    city: 'Mohali',
                    state: 'Punjab',
                    pincode: '140601',
                    aadharImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
                    panImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
                  });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs"
              >
                {/* 1. Category */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">1. Category / Role</label>
                  <select
                    value={newUser.category}
                    onChange={(e) => {
                      const cat = e.target.value as UserCategory;
                      let rId = 'role-staff';
                      if (cat === 'SUPER_ADMIN') rId = 'role-superadmin';
                      else if (cat === 'CHEF') rId = 'role-chef';
                      else if (cat === 'MANAGER') rId = 'role-gm';
                      else if (cat === 'MEMBER') rId = 'role-customer';
                      setNewUser({ ...newUser, category: cat, roleId: rId });
                    }}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN (Super Administrator)</option>
                    <option value="CHEF">CHEF (Executive Chef / Kitchen Lead)</option>
                    <option value="MANAGER">MANAGER (General Manager)</option>
                    <option value="EVENT_MANAGER">EVENT_MANAGER (Banquet & Events Lead)</option>
                    <option value="SPORTS_COACH">SPORTS_COACH (Sports Coach / Racket Lead)</option>
                    <option value="STAYS_DESK">STAYS_DESK (Stays & Suites Supervisor)</option>
                    <option value="FLOOR_STAFF">FLOOR_STAFF (Table Service & Bartender)</option>
                    <option value="MEMBER">MEMBER (Club Member)</option>
                  </select>
                </div>

                {/* 2. Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">2. Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Gurtaran Singh"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 3. Mobile */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">3. Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98000 00000"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 4. Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">4. Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="user@restroclub.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 5. Username */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">5. Login Username/ID</label>
                  <input
                    type="text"
                    placeholder="e.g. c2, m2, user99"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 6. Password */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">6. Initial Password</label>
                  <input
                    type="text"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 7. Payscale Level */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">7. Payscale Level (0–50)</label>
                    <span className="text-[10px] font-bold text-[#8C5A3C]">
                      Level {newUser.payscaleLevel}: ₹{calculatePayscaleSalary(newUser.payscaleLevel || 0).toLocaleString()}/mo
                    </span>
                  </div>
                  <select
                    value={newUser.payscaleLevel}
                    onChange={(e) => setNewUser({ ...newUser, payscaleLevel: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none font-medium"
                  >
                    {Array.from({ length: 51 }).map((_, i) => (
                      <option key={i} value={i}>
                        Level {i} — ₹{calculatePayscaleSalary(i).toLocaleString()} / month
                      </option>
                    ))}
                  </select>
                </div>

                {/* 8. Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">8. Residential Address</label>
                  <input
                    type="text"
                    placeholder="Street / Sector"
                    value={newUser.address || ''}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 9. City */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">9. City</label>
                  <input
                    type="text"
                    placeholder="Mohali"
                    value={newUser.city || ''}
                    onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 10. State */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">10. State</label>
                  <input
                    type="text"
                    placeholder="Punjab"
                    value={newUser.state || ''}
                    onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 11. Pincode */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">11. Pincode</label>
                  <input
                    type="text"
                    placeholder="140601"
                    value={newUser.pincode || ''}
                    onChange={(e) => setNewUser({ ...newUser, pincode: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                {/* 12. Submit */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create User / Staff</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Users / Staff Table */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-[#E5DEC9] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E241D]">
                  Active Personnel & Logins ({filteredUsers.length} in {activeLocation.name})
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EDE6D8] text-[10px] uppercase font-bold text-[#5C554E] tracking-wider">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Login Credentials</th>
                      <th className="p-4">Payscale (0–50)</th>
                      <th className="p-4">KYC Documents</th>
                      <th className="p-4">Address</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DEC9]">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#FAF8F3]">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                              alt={u.name}
                              className="w-9 h-9 rounded-full object-cover border border-[#8C5A3C]"
                            />
                            <div>
                              <strong className="block font-bold text-[#1E241D]">{u.name}</strong>
                              <span className="text-[10px] text-[#5C554E]">{u.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-[#8C5A3C]/10 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-wider rounded-lg">
                            {u.category || 'MEMBER'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-mono text-[11px] space-y-0.5">
                            <div>ID: <strong className="text-[#1E241D]">{u.username || u.id}</strong></div>
                            <div>Pass: <strong className="text-[#8C5A3C]">{u.password || '••••'}</strong></div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <span className="font-bold text-[#1E241D]">Level {u.payscaleLevel ?? 0}</span>
                            <span className="text-[11px] text-emerald-800 font-semibold block">
                              ₹{calculatePayscaleSalary(u.payscaleLevel ?? 0).toLocaleString()}/mo
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setKycDocModal({
                                  type: 'Aadhar Card',
                                  url: u.aadharImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
                                  userName: u.name,
                                })
                              }
                              className="px-2.5 py-1 bg-[#FAF8F3] border border-[#E5DEC9] rounded-lg text-[10px] font-bold text-[#8C5A3C] hover:bg-[#EDE6D8] transition-colors"
                            >
                              Aadhar 📄
                            </button>
                            <button
                              onClick={() =>
                                setKycDocModal({
                                  type: 'PAN Card',
                                  url: u.panImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
                                  userName: u.name,
                                })
                              }
                              className="px-2.5 py-1 bg-[#FAF8F3] border border-[#E5DEC9] rounded-lg text-[10px] font-bold text-[#3E4A38] hover:bg-[#EDE6D8] transition-colors"
                            >
                              PAN 📄
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-[11px] text-[#5C554E] max-w-xs">
                          {u.address ? `${u.address}, ${u.city || ''} ${u.pincode || ''}` : 'Mohali, Punjab'}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. FOOD & DINING TABLES */}
        {/* ======================================================== */}
        {activeCategory === 'FOOD' && (
          <div className="space-y-8">
            {/* Add Menu Item */}
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
                    dietaryType: 'NON_VEGETARIAN',
                    isSignature: false,
                    prepTimeMinutes: 15,
                    calories: 450,
                    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
                  });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Dish Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Truffle Infused Burrata"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Menu Category</label>
                  <select
                    value={newItem.categoryId}
                    onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  >
                    {menuCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Making Cost (₹)</label>
                  <input
                    type="number"
                    value={newItem.makingCost}
                    onChange={(e) => setNewItem({ ...newItem, makingCost: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Dietary Type</label>
                  <select
                    value={newItem.dietaryType}
                    onChange={(e) => setNewItem({ ...newItem, dietaryType: e.target.value as any })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  >
                    <option value="VEGETARIAN">VEGETARIAN (Pure Veg)</option>
                    <option value="NON_VEGETARIAN">NON_VEGETARIAN</option>
                    <option value="VEGAN">VEGAN</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Description & Ingredients</label>
                  <input
                    type="text"
                    placeholder="Fresh ingredients, garnishes, pairing..."
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Menu Dish</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-[#E5DEC9] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E241D]">
                  Active Menu Items ({menuItems.length})
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EDE6D8] text-[10px] uppercase font-bold text-[#5C554E] tracking-wider">
                    <tr>
                      <th className="p-4">Dish</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Selling Price</th>
                      <th className="p-4">Cost Price</th>
                      <th className="p-4">Gross Margin</th>
                      <th className="p-4">Diet</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DEC9]">
                    {menuItems.map((item) => {
                      const margin = Number(item.price) - Number(item.makingCost || 0);
                      const marginPct = Math.round((margin / Number(item.price)) * 100);
                      return (
                        <tr key={item.id} className="hover:bg-[#FAF8F3]">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                              <div>
                                <strong className="font-bold text-[#1E241D] block">{item.name}</strong>
                                <span className="text-[10px] text-[#5C554E]">{item.prepTimeMinutes} mins prep</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-xs font-semibold text-[#8C5A3C]">
                            {menuCategories.find((c) => c.id === item.categoryId)?.name || item.categoryId}
                          </td>
                          <td className="p-4 font-bold text-[#1E241D]">₹{Number(item.price).toLocaleString()}</td>
                          <td className="p-4 text-[#5C554E]">₹{Number(item.makingCost || 0).toLocaleString()}</td>
                          <td className="p-4">
                            <span className="font-bold text-emerald-800">₹{margin.toLocaleString()} ({marginPct}%)</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                                item.dietaryType === 'VEGETARIAN'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.dietaryType === 'VEGETARIAN' ? 'Veg' : 'Non-Veg'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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

            {/* Dining Tables & QR Stands */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
                <div>
                  <h3 className="font-serif italic text-xl font-bold text-[#1E241D] flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#8C5A3C]" />
                    <span>Dining Tables & Printable QR Stands</span>
                  </h3>
                  <p className="text-xs text-[#5C554E]">
                    Generate acrylic QR stand tokens for contactless guest ordering in {activeLocation.name}.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newTable.tableNumber) return;
                  addTable({
                    ...newTable,
                    locationId: activeLocation.id,
                  });
                  setNewTable({ tableNumber: '', areaZone: 'Main Dining', capacity: 4 });
                }}
                className="flex flex-wrap items-end gap-3 text-xs"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Table Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15, VIP-03"
                    value={newTable.tableNumber}
                    onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                    className="px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Zone</label>
                  <select
                    value={newTable.areaZone}
                    onChange={(e) => setNewTable({ ...newTable, areaZone: e.target.value as any })}
                    className="px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  >
                    <option value="Main Dining">Main Dining</option>
                    <option value="VIP Lounge">VIP Lounge</option>
                    <option value="Poolside Cabana">Poolside Cabana</option>
                    <option value="Bar Area">Bar Area</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Capacity</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newTable.capacity}
                    onChange={(e) => setNewTable({ ...newTable, capacity: Number(e.target.value) })}
                    className="w-24 px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-[#3E4A38] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#2F392B] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Table & Token</span>
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTables.map((t) => (
                  <div key={t.id} className="p-4 bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-serif italic font-bold text-xl text-[#1E241D]">Table {t.tableNumber}</span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                            t.status === 'OCCUPIED' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5C554E] mt-0.5">{t.areaZone} • {t.capacity} Seats</p>
                      <span className="font-mono text-[10px] text-[#8C5A3C] block mt-1">Token: {t.qrCodeToken}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTableForQr(t)}
                        className="flex-1 py-1.5 bg-white border border-[#E5DEC9] text-[#1E241D] hover:bg-[#EDE6D8] rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#8C5A3C]" />
                        <span>Print Stand</span>
                      </button>
                      <button
                        onClick={() => deleteTable(t.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. SPORTS & ARENAS */}
        {/* ======================================================== */}
        {activeCategory === 'SPORTS' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#8C5A3C]" />
                <span>Configure Athletic Arenas, Durations & Pricing Rules</span>
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newFacility.name) return;
                  addFacility({
                    ...newFacility,
                    locationId: activeLocation.id,
                  });
                  setNewFacility({
                    name: '',
                    category: 'Racket Sports',
                    courtDetails: 'Court 1',
                    slotDurationMinutes: 60,
                    capacity: 4,
                    memberPrice: 0,
                    guestPrice: 800,
                    peakPrice: 1200,
                    rules: 'Non-marking sports shoes mandatory.',
                    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
                  });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Arena Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Squash Court Elite"
                    value={newFacility.name}
                    onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Category</label>
                  <select
                    value={newFacility.category}
                    onChange={(e) => setNewFacility({ ...newFacility, category: e.target.value as any })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  >
                    <option value="Racket Sports">Racket Sports (Pickleball / Badminton)</option>
                    <option value="Indoor Games">Indoor Games (Cricket / Snooker)</option>
                    <option value="Water Sports">Water Sports (Swimming Pool)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Slot Duration (mins)</label>
                  <input
                    type="number"
                    value={newFacility.slotDurationMinutes}
                    onChange={(e) => setNewFacility({ ...newFacility, slotDurationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Guest Price (₹/hr)</label>
                  <input
                    type="number"
                    value={newFacility.guestPrice}
                    onChange={(e) => setNewFacility({ ...newFacility, guestPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="flex items-end sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Arena Setup</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFacilities.map((fac) => (
                <div key={fac.id} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#8C5A3C] tracking-wider">{fac.category}</span>
                        <h3 className="font-serif italic text-2xl font-bold text-[#1E241D] mt-0.5">{fac.name}</h3>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-lg">
                        {fac.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C554E] mt-2">{fac.rules}</p>
                    <div className="pt-3 border-t border-[#E5DEC9] grid grid-cols-3 gap-2 text-center text-xs mt-4">
                      <div>
                        <span className="text-[10px] text-[#5C554E] block">Duration</span>
                        <strong>{fac.slotDurationMinutes}m</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#5C554E] block">Member</span>
                        <strong className="text-emerald-700">{fac.memberPrice === 0 ? 'Free' : `₹${fac.memberPrice}`}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#5C554E] block">Guest</span>
                        <strong className="text-[#8C5A3C]">₹{fac.guestPrice}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5DEC9] flex justify-end">
                    <button
                      onClick={() => deleteFacility(fac.id)}
                      className="text-xs font-bold text-red-600 hover:bg-red-50 p-2 rounded-xl"
                    >
                      Delete Arena
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. STAYS & ACCOMMODATIONS */}
        {/* ======================================================== */}
        {activeCategory === 'STAYS' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-[#8C5A3C]" />
                <span>Add Sanctuary Suite / 1BHK / 2BHK Units</span>
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newRoom.roomNumber) return;
                  addRoom(newRoom);
                  setNewRoom({ roomNumber: '', name: 'Luxury Suite', pricePerNight: 28000 });
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Room / Suite Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 104, PH-02"
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Suite Name</label>
                  <input
                    type="text"
                    required
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Price Per Night (₹)</label>
                  <input
                    type="number"
                    value={newRoom.pricePerNight}
                    onChange={(e) => setNewRoom({ ...newRoom, pricePerNight: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex items-end sm:col-span-3">
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    + Add Suite
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rooms.map((r) => (
                <div key={r.id} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-[#8C5A3C] uppercase">Suite #{r.roomNumber}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">{r.status}</span>
                    </div>
                    <h3 className="font-serif italic text-xl font-bold text-[#1E241D] mt-1">{r.name}</h3>
                    <span className="font-serif italic font-bold text-lg text-[#8C5A3C] block mt-1">
                      ₹{r.pricePerNight.toLocaleString()} / night
                    </span>
                  </div>
                  <div className="pt-3 border-t border-[#E5DEC9] flex justify-end">
                    <button onClick={() => deleteRoom(r.id)} className="text-xs font-bold text-red-600 hover:bg-red-50 p-1.5 rounded-lg">
                      Delete Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. INVENTORY */}
        {/* ======================================================== */}
        {activeCategory === 'INVENTORY' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-[#1E241D] uppercase tracking-wider flex items-center gap-2">
                <Package className="w-5 h-5 text-[#8C5A3C]" />
                <span>Raw Materials & Spirit Cellar Inventory Control</span>
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newInv.name) return;
                  addInventory({
                    ...newInv,
                    locationId: activeLocation.id,
                  });
                  setNewInv({ name: '', unitCost: 100, currentStock: 10, minStockThreshold: 5 });
                }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Item Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Blue Label 750ml"
                    value={newInv.name}
                    onChange={(e) => setNewInv({ ...newInv, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Stock Count</label>
                  <input
                    type="number"
                    value={newInv.currentStock}
                    onChange={(e) => setNewInv({ ...newInv, currentStock: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#5C554E]">Min Alert Threshold</label>
                  <input
                    type="number"
                    value={newInv.minStockThreshold}
                    onChange={(e) => setNewInv({ ...newInv, minStockThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    + Add Inventory
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-[#E5DEC9] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E241D]">
                  Stock Inventory ({filteredInventory.length} items in {activeLocation.name})
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EDE6D8] text-[10px] uppercase font-bold text-[#5C554E] tracking-wider">
                    <tr>
                      <th className="p-4">Item Code</th>
                      <th className="p-4">Item Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Current Stock</th>
                      <th className="p-4">Min Alert Threshold</th>
                      <th className="p-4">Unit Cost</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DEC9]">
                    {filteredInventory.map((i) => {
                      const isLow = Number(i.currentStock) <= Number(i.minStockThreshold);
                      return (
                        <tr key={i.id} className="hover:bg-[#FAF8F3]">
                          <td className="p-4 font-mono font-bold text-[#8C5A3C]">{i.itemCode}</td>
                          <td className="p-4 font-bold text-[#1E241D]">{i.name}</td>
                          <td className="p-4 text-[#5C554E]">{i.category}</td>
                          <td className="p-4">
                            <span className={`font-bold ${isLow ? 'text-red-600' : 'text-emerald-800'}`}>
                              {i.currentStock} {i.unit} {isLow && '⚠️ Low'}
                            </span>
                          </td>
                          <td className="p-4">{i.minStockThreshold} {i.unit}</td>
                          <td className="p-4">₹{Number(i.unitCost).toLocaleString()}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => deleteInventory(i.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
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

        {/* ======================================================== */}
        {/* 6. MEMBERSHIPS & CRM */}
        {/* ======================================================== */}
        {activeCategory === 'MEMBERSHIP' && (
          <div className="space-y-8">
            {/* Reviews & Replies */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Guest Reviews & Management Reply Threads</h3>
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-xs font-bold text-[#1E241D]">{rev.authorName} ({rev.authorRole})</strong>
                        <span className="text-[10px] text-[#8C5A3C] ml-2 font-bold">★ {rev.rating} / 5</span>
                      </div>
                      <span className="text-[10px] text-[#5C554E]">{rev.dateAgo}</span>
                    </div>
                    <p className="text-xs text-[#5C554E] italic">"{rev.comment}"</p>
                    {rev.managementReply ? (
                      <div className="p-3 bg-[#EDE6D8] rounded-xl text-xs space-y-1">
                        <span className="text-[10px] font-bold uppercase text-[#8C5A3C] block">Management Response:</span>
                        <p className="text-xs text-[#1E241D]">{rev.managementReply}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReviewReplyModal({ id: rev.id, author: rev.authorName, comment: rev.comment })}
                        className="px-3 py-1.5 bg-[#8C5A3C] text-white text-[10px] font-bold uppercase rounded-lg hover:bg-[#73482E] transition-colors"
                      >
                        Reply as Management →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Event Inquiries */}
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Event Enquiries CRM Pipeline</h3>
              {eventEnquiries.length === 0 ? (
                <p className="text-xs text-[#5C554E]">No pending banquet inquiries.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eventEnquiries.map((enq) => (
                    <div key={enq.id} className="p-4 bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl space-y-2 text-xs">
                      <div className="flex justify-between">
                        <strong className="font-bold text-[#1E241D]">{enq.eventType}</strong>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold text-[9px]">{enq.status}</span>
                      </div>
                      <p className="text-[#5C554E]">Contact: {enq.contactName} • {enq.estimatedGuests} Guests</p>
                      <p className="text-[#5C554E]">Date: {enq.preferredDate}</p>
                      {enq.specialRequirements && <p className="text-[#8C5A3C]">Note: {enq.specialRequirements}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 7. HUBS */}
        {/* ======================================================== */}
        {activeCategory === 'HUBS' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {locations.map((loc) => (
                <div key={loc.id} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs font-bold text-[#8C5A3C]">{loc.code}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase rounded">
                      {loc.isActive ? 'Active' : 'Offline'}
                    </span>
                  </div>
                  <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">{loc.name}</h3>
                  <p className="text-xs text-[#5C554E]">{loc.address}</p>
                  <p className="text-[10px] text-[#5C554E]">Hours: {loc.hours}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Printable QR Code Stand Modal */}
      {selectedTableForQr && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#8C5A3C] rounded-3xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedTableForQr(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-[#5C554E]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-4 border-[#1E241D] p-6 rounded-2xl space-y-3 bg-[#FAF8F3]">
              <span className="font-serif italic text-2xl font-black text-[#1E241D] block">RESTRO CLUB</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C5A3C] font-bold block">
                {activeLocation.name}
              </span>
              <div className="py-2 flex justify-center">
                <div className="w-36 h-36 bg-white border-2 border-black flex flex-col items-center justify-center p-2 rounded-xl shadow-inner">
                  <QrCode className="w-28 h-28 text-[#1E241D]" />
                </div>
              </div>
              <span className="font-serif italic text-3xl font-bold text-[#1E241D] block">
                TABLE {selectedTableForQr.tableNumber}
              </span>
              <span className="text-[10px] text-[#5C554E] uppercase tracking-wider block">
                {selectedTableForQr.areaZone} • Token: {selectedTableForQr.qrCodeToken}
              </span>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3.5 bg-[#8C5A3C] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#73482E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Table Stand Acrylic</span>
            </button>
          </div>
        </div>
      )}

      {/* KYC Document Viewer Modal */}
      {kycDocModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setKycDocModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-[#5C554E]"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold text-[#8C5A3C] uppercase tracking-wider block">KYC Document Verification</span>
              <h3 className="font-serif italic text-xl font-bold text-[#1E241D] mt-0.5">
                {kycDocModal.type} — {kycDocModal.userName}
              </h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E5DEC9] bg-gray-50 h-64">
              <img src={kycDocModal.url} alt={kycDocModal.type} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Document Verified & Stored on Cloud Server</span>
            </div>
          </div>
        </div>
      )}

      {/* Review Reply Modal */}
      {reviewReplyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setReviewReplyModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-[#5C554E]"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold text-[#8C5A3C] uppercase tracking-wider block">Management Response</span>
              <h3 className="font-serif italic text-lg font-bold text-[#1E241D] mt-0.5">Reply to {reviewReplyModal.author}</h3>
              <p className="text-xs text-[#5C554E] italic mt-1">"{reviewReplyModal.comment}"</p>
            </div>
            <textarea
              rows={3}
              placeholder="Type your official management response..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
            />
            <button
              onClick={async () => {
                if (!replyText) return;
                await replyReview(reviewReplyModal.id, replyText);
                setReviewReplyModal(null);
                setReplyText('');
              }}
              className="w-full py-3 bg-[#8C5A3C] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#73482E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Post Official Response</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
