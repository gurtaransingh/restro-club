import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  LocationMaster,
  DepartmentMaster,
  FacilityMaster,
  MenuCategoryMaster,
  MenuItemMaster,
  TableMaster,
  AccommodationRoomMaster,
  MembershipTierMaster,
  UserRoleMaster,
  UserMaster,
  EmployeeMaster,
  InventoryMaster,
  Order,
  Booking,
  ReviewItem,
  EventEnquiry,
  CartItem,
} from '../types';
import {
  INITIAL_LOCATIONS,
  INITIAL_DEPARTMENTS,
  INITIAL_ROLES,
  INITIAL_MEMBERSHIP_TIERS,
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
} from '../data/initialData';

export type ThemeMode = 'system' | 'light' | 'dark';

interface AppContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  effectiveTheme: 'light' | 'dark';

  locations: LocationMaster[];
  activeLocation: LocationMaster;
  setActiveLocation: (loc: LocationMaster) => void;

  currentUser: UserMaster | null;
  setCurrentUser: (usr: UserMaster | null) => void;
  allUsers: UserMaster[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; user?: UserMaster; error?: string }>;
  register: (userData: Partial<UserMaster>) => Promise<{ success: boolean; user?: UserMaster }>;
  logout: () => void;
  isSuperAdmin: boolean;
  isChef: boolean;
  isManager: boolean;
  isStaff: boolean;

  departments: DepartmentMaster[];
  roles: UserRoleMaster[];
  membershipTiers: MembershipTierMaster[];
  facilities: FacilityMaster[];
  menuCategories: MenuCategoryMaster[];
  menuItems: MenuItemMaster[];
  tables: TableMaster[];
  rooms: AccommodationRoomMaster[];
  orders: Order[];
  bookings: Booking[];
  reviews: ReviewItem[];
  employees: EmployeeMaster[];
  inventory: InventoryMaster[];
  eventEnquiries: EventEnquiry[];

  cart: CartItem[];
  addToCart: (item: MenuItemMaster, qty?: number, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Master Table CRUD Helpers
  addLocation: (loc: Partial<LocationMaster>) => void;
  updateLocation: (id: string, loc: Partial<LocationMaster>) => void;
  deleteLocation: (id: string) => void;

  addDepartment: (dept: Partial<DepartmentMaster>) => void;
  updateDepartment: (id: string, dept: Partial<DepartmentMaster>) => void;
  deleteDepartment: (id: string) => void;

  addRole: (role: Partial<UserRoleMaster>) => void;
  updateRole: (id: string, role: Partial<UserRoleMaster>) => void;
  deleteRole: (id: string) => void;

  addMembershipTier: (tier: Partial<MembershipTierMaster>) => void;
  updateMembershipTier: (id: string, tier: Partial<MembershipTierMaster>) => void;
  deleteMembershipTier: (id: string) => void;

  addUser: (usr: Partial<UserMaster>) => void;
  updateUser: (id: string, usr: Partial<UserMaster>) => void;
  deleteUser: (id: string) => void;

  addFacility: (fac: Partial<FacilityMaster>) => void;
  updateFacility: (id: string, fac: Partial<FacilityMaster>) => void;
  deleteFacility: (id: string) => void;

  addMenuCategory: (cat: Partial<MenuCategoryMaster>) => void;
  updateMenuCategory: (id: string, cat: Partial<MenuCategoryMaster>) => void;
  deleteMenuCategory: (id: string) => void;

  addMenuItem: (item: Partial<MenuItemMaster>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItemMaster>) => void;
  deleteMenuItem: (id: string) => void;

  addTable: (tbl: Partial<TableMaster>) => void;
  updateTable: (id: string, tbl: Partial<TableMaster>) => void;
  deleteTable: (id: string) => void;

  addRoom: (rm: Partial<AccommodationRoomMaster>) => void;
  updateRoom: (id: string, rm: Partial<AccommodationRoomMaster>) => void;
  deleteRoom: (id: string) => void;

  addEmployee: (emp: Partial<EmployeeMaster>) => void;
  updateEmployee: (id: string, emp: Partial<EmployeeMaster>) => void;
  deleteEmployee: (id: string) => void;

  addInventoryItem: (inv: Partial<InventoryMaster>) => void;
  updateInventoryItem: (id: string, inv: Partial<InventoryMaster>) => void;
  deleteInventoryItem: (id: string) => void;

  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;

  updateEnquiryStatus: (id: string, status: EventEnquiry['status']) => void;
  deleteEnquiry: (id: string) => void;

  deleteReview: (id: string) => void;

  // Operations
  placeOrder: (orderData: Partial<Order>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  createBooking: (bookingData: Partial<Booking>) => Promise<Booking>;
  addReview: (reviewData: Partial<ReviewItem>) => void;
  replyToReview: (reviewId: string, reply: string) => void;
  submitEventEnquiry: (enq: Partial<EventEnquiry>) => void;

  // UI State
  tableCodeInput: string;
  setTableCodeInput: (code: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<LocationMaster[]>(() => {
    const saved = localStorage.getItem('rc_locations');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS;
  });

  const [activeLocation, setActiveLocation] = useState<LocationMaster>(() => locations[0] || INITIAL_LOCATIONS[0]);

  const [allUsers, setAllUsers] = useState<UserMaster[]>(() => {
    const saved = localStorage.getItem('rc_users');
    if (!saved) return INITIAL_USERS;
    try {
      const parsed: UserMaster[] = JSON.parse(saved);
      // Merge initial users to guarantee standard roles (admin, c1, m1, etc.) always have correct username & password
      const map = new Map<string, UserMaster>();
      INITIAL_USERS.forEach((u) => map.set(u.id, u));
      parsed.forEach((u) => map.set(u.id, { ...map.get(u.id), ...u }));
      return Array.from(map.values());
    } catch (e) {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserMaster | null>(() => {
    const saved = localStorage.getItem('rc_session_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const isAuthenticated = !!currentUser;
  const isSuperAdmin = currentUser?.roleId === 'role-superadmin' || currentUser?.category === 'SUPER_ADMIN';
  const isChef = currentUser?.roleId === 'role-chef' || currentUser?.category === 'CHEF' || isSuperAdmin;
  const isManager = currentUser?.roleId === 'role-gm' || currentUser?.category === 'MANAGER' || isSuperAdmin;
  const isStaff = currentUser?.roleId === 'role-staff' || isManager || isChef || isSuperAdmin;

  const login = async (usernameInput: string, passwordInput: string): Promise<{ success: boolean; user?: UserMaster; error?: string }> => {
    const trimmedUser = usernameInput.trim().toLowerCase();
    const trimmedPass = passwordInput.trim();

    // 1. Search in allUsers state
    let matchedUser = allUsers.find(
      (u) =>
        (u.username?.toLowerCase() === trimmedUser ||
          u.email?.toLowerCase() === trimmedUser ||
          u.id?.toLowerCase() === trimmedUser) &&
        (u.password === trimmedPass ||
          u.username === trimmedPass ||
          (!u.password && trimmedPass === 'admin') ||
          (!u.password && trimmedPass === trimmedUser))
    );

    // 2. Search in INITIAL_USERS constant
    if (!matchedUser) {
      matchedUser = INITIAL_USERS.find(
        (u) =>
          (u.username?.toLowerCase() === trimmedUser ||
            u.email?.toLowerCase() === trimmedUser ||
            u.id?.toLowerCase() === trimmedUser) &&
          (u.password === trimmedPass ||
            u.username === trimmedPass ||
            (!u.password && trimmedPass === 'admin') ||
            (!u.password && trimmedPass === trimmedUser))
      );
    }

    // 3. Fallback for hardcoded shortcuts: admin/admin, c1/c1, m1/m1, e1/e1, s1/s1, st1/st1, u1/u1
    if (!matchedUser) {
      if (trimmedUser === 'admin' && trimmedPass === 'admin') {
        matchedUser = INITIAL_USERS.find((u) => u.id === 'usr-admin') || INITIAL_USERS[0];
      } else if (trimmedUser === 'c1' && trimmedPass === 'c1') {
        matchedUser = INITIAL_USERS.find((u) => u.id === 'usr-c1');
      } else if (trimmedUser === 'm1' && trimmedPass === 'm1') {
        matchedUser = INITIAL_USERS.find((u) => u.id === 'usr-m1');
      } else if (trimmedUser === 'e1' && trimmedPass === 'e1') {
        matchedUser = INITIAL_USERS.find((u) => u.id === 'usr-e1');
      } else if (trimmedUser === 's1' && trimmedPass === 's1') {
        matchedUser = INITIAL_USERS.find((u) => u.id === 'usr-s1');
      } else if (trimmedUser === 'st1' && trimmedPass === 'st1') {
        matchedUser = INITIAL_USERS.find((u) => u.id === 'usr-st1');
      } else if (trimmedUser === 'u1' && trimmedPass === 'u1') {
        matchedUser = INITIAL_USERS.find((u) => u.id === 'usr-1');
      }
    }

    if (matchedUser) {
      setCurrentUser(matchedUser);
      localStorage.setItem('rc_session_user', JSON.stringify(matchedUser));
      return { success: true, user: matchedUser };
    }

    return { success: false, error: 'Invalid ID or password. Try admin/admin, c1/c1, m1/m1, etc.' };
  };

  const register = async (userData: Partial<UserMaster>): Promise<{ success: boolean; user?: UserMaster }> => {
    const newId = `usr-${Date.now()}`;
    const newUserObj: UserMaster = {
      id: newId,
      username: userData.username || userData.email?.split('@')[0] || `user${Date.now().toString().slice(-4)}`,
      password: userData.password || 'password',
      name: userData.name || 'Valued Club Member',
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
      address: userData.address || '',
      city: userData.city || 'Mohali',
      state: userData.state || 'Punjab',
      pincode: userData.pincode || '140601',
    };

    setAllUsers((prev) => [...prev, newUserObj]);
    setCurrentUser(newUserObj);
    localStorage.setItem('rc_session_user', JSON.stringify(newUserObj));
    return { success: true, user: newUserObj };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rc_session_user');
  };

  const [departments, setDepartments] = useState<DepartmentMaster[]>(() => {
    const saved = localStorage.getItem('rc_departments');
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [roles, setRoles] = useState<UserRoleMaster[]>(() => {
    const saved = localStorage.getItem('rc_roles');
    return saved ? JSON.parse(saved) : INITIAL_ROLES;
  });

  const [membershipTiers, setMembershipTiers] = useState<MembershipTierMaster[]>(() => {
    const saved = localStorage.getItem('rc_tiers');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERSHIP_TIERS;
  });

  const [facilities, setFacilities] = useState<FacilityMaster[]>(() => {
    const saved = localStorage.getItem('rc_facilities');
    return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
  });

  const [menuCategories, setMenuCategories] = useState<MenuCategoryMaster[]>(() => {
    const saved = localStorage.getItem('rc_categories');
    return saved ? JSON.parse(saved) : INITIAL_MENU_CATEGORIES;
  });

  const [menuItems, setMenuItems] = useState<MenuItemMaster[]>(() => {
    const saved = localStorage.getItem('rc_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [tables, setTables] = useState<TableMaster[]>(() => {
    const saved = localStorage.getItem('rc_tables');
    return saved ? JSON.parse(saved) : INITIAL_TABLES;
  });

  const [rooms, setRooms] = useState<AccommodationRoomMaster[]>(() => {
    const saved = localStorage.getItem('rc_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rc_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('rc_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('rc_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [employees, setEmployees] = useState<EmployeeMaster[]>(() => {
    const saved = localStorage.getItem('rc_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [inventory, setInventory] = useState<InventoryMaster[]>(() => {
    const saved = localStorage.getItem('rc_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [eventEnquiries, setEventEnquiries] = useState<EventEnquiry[]>(() => {
    const saved = localStorage.getItem('rc_enquiries');
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableCodeInput, setTableCodeInput] = useState<string>('Table 12');

  // Theme state: strict light mode only
  const themeMode: ThemeMode = 'light';
  const effectiveTheme: 'light' | 'dark' = 'light';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.classList.add('light');
    root.classList.remove('dark');
  }, []);

  const setThemeMode = (_mode: ThemeMode) => {
    // Light mode strictly enforced
  };

  // Persistence effects
  useEffect(() => { localStorage.setItem('rc_locations', JSON.stringify(locations)); }, [locations]);
  useEffect(() => { localStorage.setItem('rc_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('rc_roles', JSON.stringify(roles)); }, [roles]);
  useEffect(() => { localStorage.setItem('rc_tiers', JSON.stringify(membershipTiers)); }, [membershipTiers]);
  useEffect(() => { localStorage.setItem('rc_users', JSON.stringify(allUsers)); }, [allUsers]);
  useEffect(() => { localStorage.setItem('rc_facilities', JSON.stringify(facilities)); }, [facilities]);
  useEffect(() => { localStorage.setItem('rc_categories', JSON.stringify(menuCategories)); }, [menuCategories]);
  useEffect(() => { localStorage.setItem('rc_menu_items', JSON.stringify(menuItems)); }, [menuItems]);
  useEffect(() => { localStorage.setItem('rc_tables', JSON.stringify(tables)); }, [tables]);
  useEffect(() => { localStorage.setItem('rc_rooms', JSON.stringify(rooms)); }, [rooms]);
  useEffect(() => { localStorage.setItem('rc_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('rc_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('rc_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('rc_employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('rc_inventory', JSON.stringify(inventory)); }, [inventory]);
  useEffect(() => { localStorage.setItem('rc_enquiries', JSON.stringify(eventEnquiries)); }, [eventEnquiries]);

  // Cart operations
  const addToCart = (item: MenuItemMaster, qty = 1, notes?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((c) => c.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        if (notes) updated[existingIndex].specialNotes = notes;
        return updated;
      }
      return [...prev, { menuItem: item, quantity: qty, specialNotes: notes }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.menuItem.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.menuItem.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);

  // Master Table Actions: Locations
  const addLocation = (loc: Partial<LocationMaster>) => {
    const newLoc: LocationMaster = {
      id: `loc-${Date.now()}`,
      code: loc.code || 'RC-LOC',
      name: loc.name || 'New Restro Club Location',
      region: loc.region || 'Punjab Region',
      address: loc.address || 'Highway Road',
      hours: loc.hours || '08:00 AM - 11:00 PM',
      contactEmail: loc.contactEmail || 'contact@restroclub.com',
      contactPhone: loc.contactPhone || '+91 800 000 0000',
      isActive: true,
    };
    setLocations((prev) => [...prev, newLoc]);
  };

  const updateLocation = (id: string, loc: Partial<LocationMaster>) => {
    setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, ...loc } : l)));
  };

  const deleteLocation = (id: string) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  // Master Table Actions: Departments
  const addDepartment = (dept: Partial<DepartmentMaster>) => {
    const newDept: DepartmentMaster = {
      id: `dept-${Date.now()}`,
      name: dept.name || 'New Operational Department',
      description: dept.description || 'Department description and scope',
      locationId: dept.locationId || activeLocation.id,
    };
    setDepartments((prev) => [...prev, newDept]);
  };

  const updateDepartment = (id: string, dept: Partial<DepartmentMaster>) => {
    setDepartments((prev) => prev.map((d) => (d.id === id ? { ...d, ...dept } : d)));
  };

  const deleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  // Master Table Actions: Roles
  const addRole = (role: Partial<UserRoleMaster>) => {
    const newRole: UserRoleMaster = {
      id: `role-${Date.now()}`,
      name: role.name || 'New Role Profile',
      permissions: role.permissions || ['VIEW_ANALYTICS'],
      description: role.description || 'Role responsibilities',
    };
    setRoles((prev) => [...prev, newRole]);
  };

  const updateRole = (id: string, role: Partial<UserRoleMaster>) => {
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, ...role } : r)));
  };

  const deleteRole = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  // Master Table Actions: Membership Tiers
  const addMembershipTier = (tier: Partial<MembershipTierMaster>) => {
    const newTier: MembershipTierMaster = {
      id: `tier-${Date.now()}`,
      name: tier.name || 'Platinum Tier',
      annualFee: tier.annualFee || 10000,
      discountPercentage: tier.discountPercentage || 12,
      perks: tier.perks || ['All Area Access', 'Complimentary Valet', 'Priority Booking'],
      priorityAccess: tier.priorityAccess ?? true,
      colorBadge: tier.colorBadge || '#8C5A3C',
    };
    setMembershipTiers((prev) => [...prev, newTier]);
  };

  const updateMembershipTier = (id: string, tier: Partial<MembershipTierMaster>) => {
    setMembershipTiers((prev) => prev.map((t) => (t.id === id ? { ...t, ...tier } : t)));
  };

  const deleteMembershipTier = (id: string) => {
    setMembershipTiers((prev) => prev.filter((t) => t.id !== id));
  };

  // Master Table Actions: Users & Logins
  const addUser = (usr: Partial<UserMaster>) => {
    const newU: UserMaster = {
      id: `usr-${Date.now()}`,
      name: usr.name || 'New Club User',
      email: usr.email || `user.${Date.now()}@restroclub.com`,
      phone: usr.phone || '+91 98000 00000',
      roleId: usr.roleId || 'role-customer',
      locationId: usr.locationId || activeLocation.id,
      membershipTierId: usr.membershipTierId || 'tier-club',
      status: usr.status || 'ACTIVE',
      avatar: usr.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      loyaltyPoints: usr.loyaltyPoints || 0,
      memberSinceYear: new Date().getFullYear(),
    };
    setAllUsers((prev) => [...prev, newU]);
  };

  const updateUser = (id: string, usr: Partial<UserMaster>) => {
    setAllUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...usr } : u)));
  };

  const deleteUser = (id: string) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Master Table Actions: Facilities
  const addFacility = (fac: Partial<FacilityMaster>) => {
    const newF: FacilityMaster = {
      id: `fac-${Date.now()}`,
      name: fac.name || 'New Sports Facility Court',
      category: fac.category || 'Racket Sports',
      locationId: fac.locationId || activeLocation.id,
      courtDetails: fac.courtDetails || 'Court Arena 1',
      slotDurationMinutes: fac.slotDurationMinutes || 60,
      capacity: fac.capacity || 4,
      memberPrice: fac.memberPrice || 0,
      guestPrice: fac.guestPrice || 600,
      peakPrice: fac.peakPrice || 1000,
      status: fac.status || 'AVAILABLE',
      rules: fac.rules || 'Standard club footwear & attire mandatory.',
      image: fac.image || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    };
    setFacilities((prev) => [...prev, newF]);
  };

  const updateFacility = (id: string, fac: Partial<FacilityMaster>) => {
    setFacilities((prev) => prev.map((f) => (f.id === id ? { ...f, ...fac } : f)));
  };

  const deleteFacility = (id: string) => {
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  };

  // Master Table Actions: Menu Categories
  const addMenuCategory = (cat: Partial<MenuCategoryMaster>) => {
    const newCat: MenuCategoryMaster = {
      id: `cat-${Date.now()}`,
      name: cat.name || 'New Category',
      displayOrder: cat.displayOrder || menuCategories.length + 1,
      description: cat.description || 'Category description',
    };
    setMenuCategories((prev) => [...prev, newCat]);
  };

  const updateMenuCategory = (id: string, cat: Partial<MenuCategoryMaster>) => {
    setMenuCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...cat } : c)));
  };

  const deleteMenuCategory = (id: string) => {
    setMenuCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Master Table Actions: Menu Items
  const addMenuItem = (item: Partial<MenuItemMaster>) => {
    const newI: MenuItemMaster = {
      id: `item-${Date.now()}`,
      name: item.name || 'New Culinary Dish',
      categoryId: item.categoryId || menuCategories[0]?.id || 'cat-main',
      price: item.price || 1500,
      makingCost: item.makingCost || 400,
      description: item.description || 'Artisanal preparation with fine ingredients',
      image: item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      prepTimeMinutes: item.prepTimeMinutes || 15,
      calories: item.calories || 400,
      allergens: item.allergens || [],
      dietaryType: item.dietaryType || 'VEGETARIAN',
      isSignature: item.isSignature || false,
      inStock: item.inStock ?? true,
      stockCount: item.stockCount || 50,
    };
    setMenuItems((prev) => [...prev, newI]);
  };

  const updateMenuItem = (id: string, item: Partial<MenuItemMaster>) => {
    setMenuItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...item } : i)));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Master Table Actions: Dining Tables
  const addTable = (tbl: Partial<TableMaster>) => {
    const newT: TableMaster = {
      id: `tbl-${Date.now()}`,
      tableNumber: tbl.tableNumber || `${Math.floor(10 + Math.random() * 80)}`,
      areaZone: tbl.areaZone || 'Main Dining',
      capacity: tbl.capacity || 4,
      qrCodeToken: `RC-TBL-${tbl.tableNumber || Date.now()}`,
      status: tbl.status || 'VACANT',
      locationId: tbl.locationId || activeLocation.id,
    };
    setTables((prev) => [...prev, newT]);
  };

  const updateTable = (id: string, tbl: Partial<TableMaster>) => {
    setTables((prev) => prev.map((t) => (t.id === id ? { ...t, ...tbl } : t)));
  };

  const deleteTable = (id: string) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  // Master Table Actions: Accommodation Rooms
  const addRoom = (rm: Partial<AccommodationRoomMaster>) => {
    const newR: AccommodationRoomMaster = {
      id: `room-${Date.now()}`,
      roomNumber: rm.roomNumber || `${Math.floor(100 + Math.random() * 800)}`,
      name: rm.name || 'Boutique Luxury Room',
      category: rm.category || 'Boutique 1BHK',
      pricePerNight: rm.pricePerNight || 22000,
      amenities: rm.amenities || ['High-Speed WiFi', 'Climate Control', 'Ensuite Spa Bath'],
      floor: rm.floor || '1st Floor',
      capacity: rm.capacity || 2,
      status: rm.status || 'AVAILABLE',
      image: rm.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      description: rm.description || 'Luxury accommodation curated for tranquility.',
    };
    setRooms((prev) => [...prev, newR]);
  };

  const updateRoom = (id: string, rm: Partial<AccommodationRoomMaster>) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...rm } : r)));
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  // Master Table Actions: Employees & Staff
  const addEmployee = (emp: Partial<EmployeeMaster>) => {
    const newE: EmployeeMaster = {
      id: `emp-${Date.now()}`,
      employeeCode: emp.employeeCode || `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: emp.name || 'Staff Member',
      departmentId: emp.departmentId || departments[0]?.id || 'dept-1',
      designation: emp.designation || 'Hospitality Executive',
      salaryMonthly: emp.salaryMonthly || 65000,
      joiningDate: emp.joiningDate || new Date().toISOString().split('T')[0],
      phone: emp.phone || '+91 98000 11111',
      status: emp.status || 'ACTIVE',
      locationId: emp.locationId || activeLocation.id,
    };
    setEmployees((prev) => [...prev, newE]);
  };

  const updateEmployee = (id: string, emp: Partial<EmployeeMaster>) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...emp } : e)));
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  // Master Table Actions: Inventory
  const addInventoryItem = (inv: Partial<InventoryMaster>) => {
    const newInv: InventoryMaster = {
      id: `inv-${Date.now()}`,
      itemCode: inv.itemCode || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      name: inv.name || 'Raw Ingredient / Supply Item',
      category: inv.category || 'Raw Ingredients',
      unit: inv.unit || 'kg',
      currentStock: inv.currentStock ?? 10,
      minStockThreshold: inv.minStockThreshold ?? 5,
      unitCost: inv.unitCost ?? 1000,
      supplierName: inv.supplierName || 'Prime Global Suppliers',
      locationId: inv.locationId || activeLocation.id,
    };
    setInventory((prev) => [...prev, newInv]);
  };

  const updateInventoryItem = (id: string, inv: Partial<InventoryMaster>) => {
    setInventory((prev) => prev.map((i) => (i.id === id ? { ...i, ...inv } : i)));
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((i) => i.id !== id));
  };

  // Operational Actions: Bookings, Enquiries, Reviews
  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const updateEnquiryStatus = (id: string, status: EventEnquiry['status']) => {
    setEventEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const deleteEnquiry = (id: string) => {
    setEventEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Operations
  const placeOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const subtotal = orderData.subtotal || cartTotal;
    const tax = Math.round(subtotal * 0.1);
    const discount = currentUser.membershipTierId === 'tier-elite' ? Math.round(subtotal * 0.15) : 0;
    const total = subtotal + tax - discount;

    const items = orderData.items || cart.map((c) => ({
      itemId: c.menuItem.id,
      itemName: c.menuItem.name,
      quantity: c.quantity,
      notes: c.specialNotes,
    }));

    const newOrder: Order = {
      id: `ord-${Math.floor(100 + Math.random() * 900)}`,
      orderNumber: `${Math.floor(100 + Math.random() * 900)}`,
      locationId: activeLocation.id,
      tableName: tableCodeInput || 'Table 12',
      guestName: currentUser.name,
      guestCount: 2,
      items,
      subtotal,
      tax,
      discount,
      total,
      status: 'RECEIVED',
      isVIP: currentUser.membershipTierId === 'tier-elite',
      hasAllergy: items.some((i) => i.notes?.toLowerCase().includes('allergy') || i.notes?.toLowerCase().includes('no ')),
      waitMinutes: 1,
      createdAt: new Date().toISOString(),
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
    } catch (e) {
      console.warn('API sync deferred', e);
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  };

  const createBooking = async (bookingData: Partial<Booking>): Promise<Booking> => {
    const newBk: Booking = {
      id: `bk-${Date.now()}`,
      bookingRef: `RC-BK-${Math.floor(1000 + Math.random() * 9000)}`,
      locationId: activeLocation.id,
      type: bookingData.type || 'SPORTS',
      title: bookingData.title || 'Court Reservation',
      targetId: bookingData.targetId || 'fac-1',
      guestName: currentUser?.name || 'Valued Guest',
      guestEmail: currentUser?.email || 'guest@restroclub.com',
      date: bookingData.date || new Date().toISOString().split('T')[0],
      timeSlot: bookingData.timeSlot || '10:00 AM',
      guestsCount: bookingData.guestsCount || 2,
      totalAmount: bookingData.totalAmount || 0,
      paymentStatus: 'PAID',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      notes: bookingData.notes,
    };

    setBookings((prev) => [newBk, ...prev]);
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBk),
    }).catch(() => {});

    return newBk;
  };

  const addReview = (reviewData: Partial<ReviewItem>) => {
    const newR: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName: currentUser?.name || 'Anonymous Guest',
      authorRole: 'Member',
      rating: reviewData.rating || 5,
      dateAgo: 'Just now',
      category: reviewData.category || 'Dining',
      comment: reviewData.comment || 'Phenomenal experience!',
      sentiment: (reviewData.rating || 5) >= 4 ? 'EXCEPTIONAL' : 'CONSTRUCTIVE',
      avatar: currentUser?.avatar,
    };
    setReviews((prev) => [newR, ...prev]);
  };

  const replyToReview = (reviewId: string, reply: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, managementReply: reply, repliedAt: 'Just now' } : r))
    );
  };

  const submitEventEnquiry = (enq: Partial<EventEnquiry>) => {
    const newE: EventEnquiry = {
      id: `enq-${Date.now()}`,
      eventType: enq.eventType || 'Corporate Summit',
      estimatedGuests: enq.estimatedGuests || '50-100 Guests',
      preferredDate: enq.preferredDate || new Date().toISOString().split('T')[0],
      contactName: enq.contactName || currentUser?.name || 'Event Host',
      specialRequirements: enq.specialRequirements || '',
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    setEventEnquiries((prev) => [newE, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        locations,
        activeLocation,
        setActiveLocation,

        currentUser,
        setCurrentUser,
        allUsers,
        isAuthenticated,
        login,
        register,
        logout,
        isSuperAdmin,
        isChef,
        isManager,
        isStaff,

        departments,
        roles,
        membershipTiers,
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

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,

        addLocation,
        updateLocation,
        deleteLocation,

        addDepartment,
        updateDepartment,
        deleteDepartment,

        addRole,
        updateRole,
        deleteRole,

        addMembershipTier,
        updateMembershipTier,
        deleteMembershipTier,

        addUser,
        updateUser,
        deleteUser,

        addFacility,
        updateFacility,
        deleteFacility,

        addMenuCategory,
        updateMenuCategory,
        deleteMenuCategory,

        addMenuItem,
        updateMenuItem,
        deleteMenuItem,

        addTable,
        updateTable,
        deleteTable,

        addRoom,
        updateRoom,
        deleteRoom,

        addEmployee,
        updateEmployee,
        deleteEmployee,

        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,

        updateBookingStatus,
        deleteBooking,

        updateEnquiryStatus,
        deleteEnquiry,

        deleteReview,

        placeOrder,
        updateOrderStatus,
        createBooking,
        addReview,
        replyToReview,
        submitEventEnquiry,

        tableCodeInput,
        setTableCodeInput,

        themeMode,
        setThemeMode,
        effectiveTheme,
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
