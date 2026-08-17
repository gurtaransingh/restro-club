'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LocationMaster,
  DepartmentMaster,
  RoleMaster,
  MembershipTierMaster,
  UserMaster,
  FacilityMaster,
  MenuCategoryMaster,
  MenuItemMaster,
  DiningTableMaster,
  AccommodationRoomMaster,
  Order,
  Booking,
  ReviewMaster,
  EmployeeMaster,
  InventoryMaster,
  EventEnquiryMaster,
  OrderItem,
} from '../lib/types';
import {
  INITIAL_LOCATIONS,
  INITIAL_DEPARTMENTS,
  INITIAL_ROLES,
  INITIAL_TIERS,
  INITIAL_USERS,
  INITIAL_FACILITIES,
  INITIAL_MENU_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_ROOMS,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_EMPLOYEES,
  INITIAL_INVENTORY,
  INITIAL_EVENT_ENQUIRIES,
} from '../data/initialData';
import { api } from '../lib/api';

interface CartItem extends OrderItem {
  price: number;
  image?: string;
}

interface AppContextType {
  locations: LocationMaster[];
  activeLocation: LocationMaster;
  setActiveLocation: (loc: LocationMaster) => void;
  departments: DepartmentMaster[];
  roles: RoleMaster[];
  membershipTiers: MembershipTierMaster[];
  allUsers: UserMaster[];
  facilities: FacilityMaster[];
  menuCategories: MenuCategoryMaster[];
  menuItems: MenuItemMaster[];
  tables: DiningTableMaster[];
  rooms: AccommodationRoomMaster[];
  orders: Order[];
  bookings: Booking[];
  reviews: ReviewMaster[];
  employees: EmployeeMaster[];
  inventory: InventoryMaster[];
  eventEnquiries: EventEnquiryMaster[];

  // Auth
  currentUser: UserMaster | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isChef: boolean;
  isManager: boolean;
  isStaff: boolean;
  login: (usernameInput: string, passwordInput: string) => Promise<{ success: boolean; user?: UserMaster; error?: string }>;
  register: (userData: Partial<UserMaster>) => Promise<{ success: boolean; user?: UserMaster; error?: string }>;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItemMaster, qty?: number, notes?: string, allergyNotice?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQty: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Booking Modal
  bookingModalOpen: boolean;
  bookingServiceType: 'DINING' | 'SPORTS' | 'STAY' | 'EVENT' | 'POOL';
  bookingTargetItem: any;
  openBookingModal: (type: 'DINING' | 'SPORTS' | 'STAY' | 'EVENT' | 'POOL', item?: any) => void;
  closeBookingModal: () => void;

  // Master Actions
  addLocation: (data: Partial<LocationMaster>) => Promise<void>;
  updateLocation: (id: string, data: Partial<LocationMaster>) => Promise<void>;
  deleteLocation: (id: string) => Promise<void>;

  addUser: (data: Partial<UserMaster>) => Promise<void>;
  updateUser: (id: string, data: Partial<UserMaster>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;

  addMenuItem: (data: Partial<MenuItemMaster>) => Promise<void>;
  updateMenuItem: (id: string, data: Partial<MenuItemMaster>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;

  addTable: (data: Partial<DiningTableMaster>) => Promise<void>;
  updateTable: (id: string, data: Partial<DiningTableMaster>) => Promise<void>;
  deleteTable: (id: string) => Promise<void>;

  addFacility: (data: Partial<FacilityMaster>) => Promise<void>;
  updateFacility: (id: string, data: Partial<FacilityMaster>) => Promise<void>;
  deleteFacility: (id: string) => Promise<void>;

  addRoom: (data: Partial<AccommodationRoomMaster>) => Promise<void>;
  updateRoom: (id: string, data: Partial<AccommodationRoomMaster>) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;

  addEmployee: (data: Partial<EmployeeMaster>) => Promise<void>;
  updateEmployee: (id: string, data: Partial<EmployeeMaster>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;

  addInventory: (data: Partial<InventoryMaster>) => Promise<void>;
  updateInventory: (id: string, data: Partial<InventoryMaster>) => Promise<void>;
  deleteInventory: (id: string) => Promise<void>;

  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;

  createBooking: (bookingData: Partial<Booking>) => Promise<Booking>;
  updateBooking: (id: string, data: Partial<Booking>) => Promise<void>;

  createEventEnquiry: (enquiryData: Partial<EventEnquiryMaster>) => Promise<void>;
  addReview: (reviewData: Partial<ReviewMaster>) => Promise<void>;
  replyReview: (id: string, reply: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<LocationMaster[]>(INITIAL_LOCATIONS);
  const [activeLocation, setActiveLocation] = useState<LocationMaster>(INITIAL_LOCATIONS[0]);
  const [departments, setDepartments] = useState<DepartmentMaster[]>(INITIAL_DEPARTMENTS);
  const [roles, setRoles] = useState<RoleMaster[]>(INITIAL_ROLES);
  const [membershipTiers, setMembershipTiers] = useState<MembershipTierMaster[]>(INITIAL_TIERS);
  const [allUsers, setAllUsers] = useState<UserMaster[]>(INITIAL_USERS);
  const [facilities, setFacilities] = useState<FacilityMaster[]>(INITIAL_FACILITIES);
  const [menuCategories, setMenuCategories] = useState<MenuCategoryMaster[]>(INITIAL_MENU_CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItemMaster[]>(INITIAL_MENU_ITEMS);
  const [tables, setTables] = useState<DiningTableMaster[]>(INITIAL_TABLES);
  const [rooms, setRooms] = useState<AccommodationRoomMaster[]>(INITIAL_ROOMS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [reviews, setReviews] = useState<ReviewMaster[]>(INITIAL_REVIEWS);
  const [employees, setEmployees] = useState<EmployeeMaster[]>(INITIAL_EMPLOYEES);
  const [inventory, setInventory] = useState<InventoryMaster[]>(INITIAL_INVENTORY);
  const [eventEnquiries, setEventEnquiries] = useState<EventEnquiryMaster[]>(INITIAL_EVENT_ENQUIRIES);

  const [currentUser, setCurrentUser] = useState<UserMaster | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingServiceType, setBookingServiceType] = useState<'DINING' | 'SPORTS' | 'STAY' | 'EVENT' | 'POOL'>('DINING');
  const [bookingTargetItem, setBookingTargetItem] = useState<any>(null);

  // Hydrate session from localStorage on client
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('rc_session_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn('Session hydration error', e);
    }
  }, []);

  // Hydrate Master Store from NestJS Backend API
  useEffect(() => {
    let isMounted = true;
    async function loadStore() {
      try {
        const data = await api.getMasterStore();
        if (data && isMounted) {
          if (data.locations?.length) {
            setLocations(data.locations);
            setActiveLocation((prev) => data.locations.find((l: any) => l.id === prev.id) || data.locations[0]);
          }
          if (data.departments?.length) setDepartments(data.departments);
          if (data.roles?.length) setRoles(data.roles);
          if (data.membershipTiers?.length) setMembershipTiers(data.membershipTiers);
          if (data.users?.length) {
            const map = new Map<string, UserMaster>();
            INITIAL_USERS.forEach((u) => map.set(u.id, u));
            data.users.forEach((u: any) => map.set(u.id, { ...map.get(u.id), ...u }));
            setAllUsers(Array.from(map.values()));
          }
          if (data.facilities?.length) setFacilities(data.facilities);
          if (data.menuCategories?.length) setMenuCategories(data.menuCategories);
          if (data.menuItems?.length) setMenuItems(data.menuItems);
          if (data.tables?.length) setTables(data.tables);
          if (data.rooms?.length) setRooms(data.rooms);
          if (data.orders?.length) setOrders(data.orders);
          if (data.bookings?.length) setBookings(data.bookings);
          if (data.reviews?.length) setReviews(data.reviews);
          if (data.employees?.length) setEmployees(data.employees);
          if (data.inventory?.length) setInventory(data.inventory);
          if (data.eventEnquiries?.length) setEventEnquiries(data.eventEnquiries);
        }
      } catch (err) {
        console.warn('NestJS Master Store not reachable yet, using initial data cache.');
      }
    }
    loadStore();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auth Helpers
  const isAuthenticated = !!currentUser;
  const isSuperAdmin = currentUser?.roleId === 'role-superadmin' || currentUser?.category === 'SUPER_ADMIN';
  const isChef = currentUser?.roleId === 'role-chef' || currentUser?.category === 'CHEF' || isSuperAdmin;
  const isManager = currentUser?.roleId === 'role-gm' || currentUser?.category === 'MANAGER' || isSuperAdmin;
  const isStaff = currentUser?.roleId === 'role-staff' || isManager || isChef || isSuperAdmin;

  const login = async (usernameInput: string, passwordInput: string) => {
    const cleanUser = usernameInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    try {
      const res = await api.login({ username: cleanUser, password: cleanPass });
      if (res.success && res.user) {
        setCurrentUser(res.user);
        localStorage.setItem('rc_session_user', JSON.stringify(res.user));
        return { success: true, user: res.user };
      }
    } catch (e) {
      console.warn('Backend login fallback to local cache:', e);
    }

    // Client-side fallback
    const matchedUser = allUsers.find(
      (u) =>
        (u.username?.toLowerCase() === cleanUser || u.email?.toLowerCase() === cleanUser || u.id?.toLowerCase() === cleanUser) &&
        (u.password === cleanPass || u.username === cleanPass || (!u.password && cleanPass === 'admin') || (!u.password && cleanPass === cleanUser))
    ) || INITIAL_USERS.find(
      (u) =>
        (u.username?.toLowerCase() === cleanUser || u.email?.toLowerCase() === cleanUser || u.id?.toLowerCase() === cleanUser) &&
        (u.password === cleanPass || u.username === cleanPass || (!u.password && cleanPass === 'admin') || (!u.password && cleanPass === cleanUser))
    );

    if (matchedUser) {
      setCurrentUser(matchedUser);
      localStorage.setItem('rc_session_user', JSON.stringify(matchedUser));
      return { success: true, user: matchedUser };
    }

    return { success: false, error: 'Invalid ID or password. Try admin/admin, c1/c1, m1/m1, etc.' };
  };

  const register = async (userData: Partial<UserMaster>) => {
    try {
      const res = await api.register(userData);
      if (res.success && res.user) {
        setAllUsers((prev) => [...prev, res.user]);
        setCurrentUser(res.user);
        localStorage.setItem('rc_session_user', JSON.stringify(res.user));
        return { success: true, user: res.user };
      }
    } catch (e) {
      console.warn('Backend register fallback', e);
    }

    const newId = `usr-${Date.now()}`;
    const newUser: UserMaster = {
      id: newId,
      name: userData.name || 'Club Member',
      email: userData.email || `member${Date.now()}@restroclub.com`,
      phone: userData.phone || '+91 98000 00000',
      roleId: 'role-customer',
      category: 'MEMBER',
      locationId: userData.locationId || activeLocation.id,
      membershipTierId: userData.membershipTierId || 'tier-club',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      loyaltyPoints: 1000,
      memberSinceYear: new Date().getFullYear(),
      username: userData.username || `u${Date.now().toString().slice(-4)}`,
      password: userData.password || 'password',
      payscaleLevel: 0,
      address: userData.address || '',
      city: userData.city || 'Mohali',
      state: userData.state || 'Punjab',
      pincode: userData.pincode || '140601',
    };

    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('rc_session_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rc_session_user');
  };

  // Cart
  const addToCart = (item: MenuItemMaster, qty = 1, notes?: string, allergyNotice?: string) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.itemId === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.itemId === item.id ? { ...ci, quantity: ci.quantity + qty } : ci
        );
      }
      return [
        ...prev,
        {
          itemId: item.id,
          itemName: item.name,
          price: item.price,
          quantity: qty,
          image: item.image,
          notes,
          allergyNotice,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.itemId !== itemId));
  };

  const updateCartQty = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.itemId === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  // Booking Modal
  const openBookingModal = (type: 'DINING' | 'SPORTS' | 'STAY' | 'EVENT' | 'POOL', item?: any) => {
    setBookingServiceType(type);
    setBookingTargetItem(item || null);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setBookingTargetItem(null);
  };

  // CRUD Implementations
  const addLocation = async (data: Partial<LocationMaster>) => {
    try {
      const created = await api.createLocation(data);
      setLocations((prev) => [...prev, created]);
    } catch (e) {
      const fallback: LocationMaster = {
        id: `loc-${Date.now()}`,
        code: data.code || 'RC-NEW',
        name: data.name || 'New Location',
        region: data.region || 'Region',
        address: data.address || '',
        hours: data.hours || '6:00 AM - 11:00 PM',
        contactEmail: data.contactEmail || 'info@restroclub.com',
        contactPhone: data.contactPhone || '+91 98000 00000',
        isActive: true,
      };
      setLocations((prev) => [...prev, fallback]);
    }
  };

  const updateLocation = async (id: string, data: Partial<LocationMaster>) => {
    try {
      const updated = await api.updateLocation(id, data);
      setLocations((prev) => prev.map((l) => (l.id === id ? updated : l)));
    } catch (e) {
      setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)));
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      await api.deleteLocation(id);
    } catch (e) {}
    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  const addUser = async (data: Partial<UserMaster>) => {
    try {
      const created = await api.createUser(data);
      setAllUsers((prev) => [...prev, created]);
    } catch (e) {
      const fallback: UserMaster = {
        id: `usr-${Date.now()}`,
        name: data.name || 'User',
        email: data.email || 'user@restroclub.com',
        phone: data.phone || '+91 98000 00000',
        roleId: data.roleId || 'role-customer',
        category: data.category || 'MEMBER',
        locationId: data.locationId || activeLocation.id,
        membershipTierId: data.membershipTierId || 'tier-club',
        status: 'ACTIVE',
        avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        loyaltyPoints: 1000,
        memberSinceYear: new Date().getFullYear(),
        username: data.username,
        password: data.password,
        payscaleLevel: data.payscaleLevel ?? 0,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        aadharImage: data.aadharImage,
        panImage: data.panImage,
      };
      setAllUsers((prev) => [...prev, fallback]);
    }
  };

  const updateUser = async (id: string, data: Partial<UserMaster>) => {
    try {
      const updated = await api.updateUser(id, data);
      setAllUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (e) {
      setAllUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api.deleteUser(id);
    } catch (e) {}
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const addMenuItem = async (data: Partial<MenuItemMaster>) => {
    try {
      const created = await api.createMenuItem(data);
      setMenuItems((prev) => [...prev, created]);
    } catch (e) {
      const fallback: MenuItemMaster = {
        id: `item-${Date.now()}`,
        name: data.name || 'Menu Dish',
        categoryId: data.categoryId || 'cat-sig',
        price: data.price || 1500,
        makingCost: data.makingCost || 450,
        description: data.description || '',
        image: data.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        prepTimeMinutes: data.prepTimeMinutes || 15,
        calories: data.calories || 400,
        allergens: data.allergens || [],
        dietaryType: data.dietaryType || 'NON_VEGETARIAN',
        isSignature: data.isSignature || false,
        inStock: true,
        stockCount: 50,
      };
      setMenuItems((prev) => [...prev, fallback]);
    }
  };

  const updateMenuItem = async (id: string, data: Partial<MenuItemMaster>) => {
    try {
      const updated = await api.updateMenuItem(id, data);
      setMenuItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (e) {
      setMenuItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)));
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await api.deleteMenuItem(id);
    } catch (e) {}
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addTable = async (data: Partial<DiningTableMaster>) => {
    try {
      const created = await api.createTable(data);
      setTables((prev) => [...prev, created]);
    } catch (e) {
      const fallback: DiningTableMaster = {
        id: `tbl-${Date.now()}`,
        tableNumber: data.tableNumber || '10',
        areaZone: data.areaZone || 'Main Dining',
        capacity: data.capacity || 4,
        qrCodeToken: data.qrCodeToken || `RC-TBL-${data.tableNumber || '10'}`,
        status: data.status || 'VACANT',
        locationId: data.locationId || activeLocation.id,
      };
      setTables((prev) => [...prev, fallback]);
    }
  };

  const updateTable = async (id: string, data: Partial<DiningTableMaster>) => {
    try {
      const updated = await api.updateTable(id, data);
      setTables((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setTables((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    }
  };

  const deleteTable = async (id: string) => {
    try {
      await api.deleteTable(id);
    } catch (e) {}
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  const addFacility = async (data: Partial<FacilityMaster>) => {
    try {
      const created = await api.createFacility(data);
      setFacilities((prev) => [...prev, created]);
    } catch (e) {
      const fallback: FacilityMaster = {
        id: `fac-${Date.now()}`,
        name: data.name || 'Arena',
        category: data.category || 'Racket Sports',
        locationId: data.locationId || activeLocation.id,
        courtDetails: data.courtDetails || 'Courts 1-2',
        slotDurationMinutes: data.slotDurationMinutes || 60,
        capacity: data.capacity || 4,
        memberPrice: data.memberPrice || 0,
        guestPrice: data.guestPrice || 500,
        peakPrice: data.peakPrice || 800,
        status: 'AVAILABLE',
        rules: data.rules || 'Sports shoes mandatory',
        image: data.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      };
      setFacilities((prev) => [...prev, fallback]);
    }
  };

  const updateFacility = async (id: string, data: Partial<FacilityMaster>) => {
    try {
      const updated = await api.updateFacility(id, data);
      setFacilities((prev) => prev.map((f) => (f.id === id ? updated : f)));
    } catch (e) {
      setFacilities((prev) => prev.map((f) => (f.id === id ? { ...f, ...data } : f)));
    }
  };

  const deleteFacility = async (id: string) => {
    try {
      await api.deleteFacility(id);
    } catch (e) {}
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  };

  const addRoom = async (data: Partial<AccommodationRoomMaster>) => {
    try {
      const created = await api.createRoom(data);
      setRooms((prev) => [...prev, created]);
    } catch (e) {
      const fallback: AccommodationRoomMaster = {
        id: `room-${Date.now()}`,
        roomNumber: data.roomNumber || '101',
        name: data.name || 'Luxury Suite',
        category: data.category || 'Luxury Suite',
        pricePerNight: data.pricePerNight || 25000,
        amenities: data.amenities || ['WiFi', 'Climate Control'],
        floor: data.floor || '1st Floor',
        capacity: data.capacity || 2,
        status: 'AVAILABLE',
        image: data.image || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
        description: data.description || '',
      };
      setRooms((prev) => [...prev, fallback]);
    }
  };

  const updateRoom = async (id: string, data: Partial<AccommodationRoomMaster>) => {
    try {
      const updated = await api.updateRoom(id, data);
      setRooms((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (e) {
      setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
    }
  };

  const deleteRoom = async (id: string) => {
    try {
      await api.deleteRoom(id);
    } catch (e) {}
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const addEmployee = async (data: Partial<EmployeeMaster>) => {
    try {
      const created = await api.createEmployee(data);
      setEmployees((prev) => [...prev, created]);
    } catch (e) {
      const fallback: EmployeeMaster = {
        id: `emp-${Date.now()}`,
        employeeCode: data.employeeCode || `EMP-${Date.now().toString().slice(-3)}`,
        name: data.name || 'Staff',
        departmentId: data.departmentId || 'dept-1',
        designation: data.designation || 'Staff',
        salaryMonthly: data.salaryMonthly || 25000,
        joiningDate: data.joiningDate || new Date().toISOString(),
        phone: data.phone || '+91 98000 00000',
        status: 'ACTIVE',
        locationId: data.locationId || activeLocation.id,
        username: data.username,
        password: data.password,
        category: data.category || 'STAFF',
        payscaleLevel: data.payscaleLevel ?? 0,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        aadharImage: data.aadharImage,
        panImage: data.panImage,
      };
      setEmployees((prev) => [...prev, fallback]);
    }
  };

  const updateEmployee = async (id: string, data: Partial<EmployeeMaster>) => {
    try {
      const updated = await api.updateEmployee(id, data);
      setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)));
    } catch (e) {
      setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await api.deleteEmployee(id);
    } catch (e) {}
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const addInventory = async (data: Partial<InventoryMaster>) => {
    try {
      const created = await api.createInventory(data);
      setInventory((prev) => [...prev, created]);
    } catch (e) {
      const fallback: InventoryMaster = {
        id: `inv-${Date.now()}`,
        itemCode: data.itemCode || `INV-${Date.now().toString().slice(-4)}`,
        name: data.name || 'Item',
        category: data.category || 'Raw Ingredients',
        unit: data.unit || 'units',
        currentStock: data.currentStock || 10,
        minStockThreshold: data.minStockThreshold || 5,
        unitCost: data.unitCost || 100,
        supplierName: data.supplierName || '',
        locationId: data.locationId || activeLocation.id,
      };
      setInventory((prev) => [...prev, fallback]);
    }
  };

  const updateInventory = async (id: string, data: Partial<InventoryMaster>) => {
    try {
      const updated = await api.updateInventory(id, data);
      setInventory((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (e) {
      setInventory((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)));
    }
  };

  const deleteInventory = async (id: string) => {
    try {
      await api.deleteInventory(id);
    } catch (e) {}
    setInventory((prev) => prev.filter((i) => i.id !== id));
  };

  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    try {
      const created = await api.createOrder({
        ...orderData,
        locationId: activeLocation.id,
      });
      setOrders((prev) => [created, ...prev]);
      return created;
    } catch (e) {
      const fallback: Order = {
        id: `ord-${Math.floor(100 + Math.random() * 900)}`,
        orderNumber: `${Math.floor(100 + Math.random() * 900)}`,
        locationId: activeLocation.id,
        tableId: orderData.tableId,
        tableName: orderData.tableName || 'Dining Table',
        guestName: orderData.guestName || currentUser?.name || 'Valued Guest',
        guestCount: orderData.guestCount || 2,
        items: orderData.items || [],
        subtotal: orderData.subtotal || 0,
        tax: orderData.tax || 0,
        discount: orderData.discount || 0,
        total: orderData.total || 0,
        status: 'RECEIVED',
        isVIP: currentUser?.membershipTierId === 'tier-elite',
        hasAllergy: orderData.hasAllergy || false,
        allergyNotes: orderData.allergyNotes,
        waitMinutes: 15,
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await api.updateOrderStatus(id, status);
    } catch (e) {}
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const createBooking = async (bookingData: Partial<Booking>): Promise<Booking> => {
    try {
      const created = await api.createBooking({
        ...bookingData,
        locationId: activeLocation.id,
      });
      setBookings((prev) => [created, ...prev]);
      return created;
    } catch (e) {
      const fallback: Booking = {
        id: `bk-${Date.now()}`,
        bookingRef: `RC-BK-${Math.floor(1000 + Math.random() * 9000)}`,
        locationId: activeLocation.id,
        type: bookingData.type || 'SPORTS',
        title: bookingData.title || 'Reservation',
        targetId: bookingData.targetId,
        guestName: bookingData.guestName || currentUser?.name || 'Valued Member',
        guestEmail: bookingData.guestEmail || currentUser?.email || 'guest@restroclub.com',
        date: bookingData.date || new Date().toISOString().split('T')[0],
        timeSlot: bookingData.timeSlot || '09:00 AM',
        guestsCount: bookingData.guestsCount || 1,
        totalAmount: bookingData.totalAmount || 0,
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
        notes: bookingData.notes,
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  const updateBooking = async (id: string, data: Partial<Booking>) => {
    try {
      const updated = await api.updateBooking(id, data);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (e) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    }
  };

  const createEventEnquiry = async (enquiryData: Partial<EventEnquiryMaster>) => {
    try {
      const created = await api.createEventEnquiry(enquiryData);
      setEventEnquiries((prev) => [created, ...prev]);
    } catch (e) {
      const fallback: EventEnquiryMaster = {
        id: `enq-${Date.now()}`,
        eventType: enquiryData.eventType || 'Banquet',
        estimatedGuests: enquiryData.estimatedGuests || 50,
        preferredDate: enquiryData.preferredDate || new Date().toISOString().split('T')[0],
        contactName: enquiryData.contactName || 'Guest',
        specialRequirements: enquiryData.specialRequirements || '',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
      setEventEnquiries((prev) => [fallback, ...prev]);
    }
  };

  const addReview = async (reviewData: Partial<ReviewMaster>) => {
    try {
      const created = await api.createReview(reviewData);
      setReviews((prev) => [created, ...prev]);
    } catch (e) {
      const fallback: ReviewMaster = {
        id: `rev-${Date.now()}`,
        authorName: reviewData.authorName || currentUser?.name || 'Guest',
        authorRole: reviewData.authorRole || 'Club Member',
        rating: reviewData.rating || 5,
        dateAgo: 'Just now',
        category: reviewData.category || 'Dining',
        comment: reviewData.comment || '',
        sentiment: (reviewData.rating || 5) >= 4 ? 'EXCEPTIONAL' : 'SATISFACTORY',
      };
      setReviews((prev) => [fallback, ...prev]);
    }
  };

  const replyReview = async (id: string, reply: string) => {
    try {
      const updated = await api.replyReview(id, reply);
      setReviews((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (e) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, managementReply: reply, repliedAt: 'Just now' } : r))
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        locations,
        activeLocation,
        setActiveLocation,
        departments,
        roles,
        membershipTiers,
        allUsers,
        facilities,
        menuCategories,
        menuItems,
        tables,
        rooms,
        orders,
        bookings,
        reviews,
        employees,
        inventory,
        eventEnquiries,
        currentUser,
        isAuthenticated,
        isSuperAdmin,
        isChef,
        isManager,
        isStaff,
        login,
        register,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        bookingModalOpen,
        bookingServiceType,
        bookingTargetItem,
        openBookingModal,
        closeBookingModal,
        addLocation,
        updateLocation,
        deleteLocation,
        addUser,
        updateUser,
        deleteUser,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addTable,
        updateTable,
        deleteTable,
        addFacility,
        updateFacility,
        deleteFacility,
        addRoom,
        updateRoom,
        deleteRoom,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addInventory,
        updateInventory,
        deleteInventory,
        createOrder,
        updateOrderStatus,
        createBooking,
        updateBooking,
        createEventEnquiry,
        addReview,
        replyReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
