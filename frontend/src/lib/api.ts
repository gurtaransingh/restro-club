const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchApi<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!res.ok) {
      let errorMsg = `HTTP Error ${res.status}: ${res.statusText}`;
      try {
        const errorData = await res.json();
        if (errorData?.message) {
          errorMsg = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
        } else if (errorData?.error) {
          errorMsg = errorData.error;
        }
      } catch (e) {
        // use default statusText
      }
      throw new Error(errorMsg);
    }

    return await res.json();
  } catch (err) {
    console.error(`API Fetch Error [${endpoint}]:`, err);
    throw err;
  }
}

export const api = {
  // Master Store
  getMasterStore: () => fetchApi('/master-store'),

  // Auth
  login: (data: { username?: string; id?: string; password?: string }) =>
    fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  health: () => fetchApi('/health'),

  // Locations
  getLocations: () => fetchApi('/locations'),
  createLocation: (data: any) => fetchApi('/locations', { method: 'POST', body: JSON.stringify(data) }),
  updateLocation: (id: string, data: any) => fetchApi(`/locations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteLocation: (id: string) => fetchApi(`/locations/${id}`, { method: 'DELETE' }),

  // Users
  getUsers: (locationId?: string) => fetchApi(`/users${locationId ? `?locationId=${locationId}` : ''}`),
  createUser: (data: any) => fetchApi('/users', { method: 'POST', body: JSON.stringify(data) }),
  updateUser: (id: string, data: any) => fetchApi(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id: string) => fetchApi(`/users/${id}`, { method: 'DELETE' }),

  // Menu
  getMenuCategories: () => fetchApi('/menu/categories'),
  createMenuCategory: (data: any) => fetchApi('/menu/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateMenuCategory: (id: string, data: any) => fetchApi(`/menu/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMenuCategory: (id: string) => fetchApi(`/menu/categories/${id}`, { method: 'DELETE' }),

  getMenuItems: (categoryId?: string) => fetchApi(`/menu/items${categoryId ? `?categoryId=${categoryId}` : ''}`),
  createMenuItem: (data: any) => fetchApi('/menu/items', { method: 'POST', body: JSON.stringify(data) }),
  updateMenuItem: (id: string, data: any) => fetchApi(`/menu/items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMenuItem: (id: string) => fetchApi(`/menu/items/${id}`, { method: 'DELETE' }),

  // Facilities (Sports)
  getFacilities: (locationId?: string) => fetchApi(`/facilities${locationId ? `?locationId=${locationId}` : ''}`),
  createFacility: (data: any) => fetchApi('/facilities', { method: 'POST', body: JSON.stringify(data) }),
  updateFacility: (id: string, data: any) => fetchApi(`/facilities/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFacility: (id: string) => fetchApi(`/facilities/${id}`, { method: 'DELETE' }),

  // Tables
  getTables: (locationId?: string) => fetchApi(`/tables${locationId ? `?locationId=${locationId}` : ''}`),
  createTable: (data: any) => fetchApi('/tables', { method: 'POST', body: JSON.stringify(data) }),
  updateTable: (id: string, data: any) => fetchApi(`/tables/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTable: (id: string) => fetchApi(`/tables/${id}`, { method: 'DELETE' }),

  // Rooms
  getRooms: () => fetchApi('/rooms'),
  createRoom: (data: any) => fetchApi('/rooms', { method: 'POST', body: JSON.stringify(data) }),
  updateRoom: (id: string, data: any) => fetchApi(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteRoom: (id: string) => fetchApi(`/rooms/${id}`, { method: 'DELETE' }),

  // Employees
  getEmployees: (locationId?: string) => fetchApi(`/employees${locationId ? `?locationId=${locationId}` : ''}`),
  createEmployee: (data: any) => fetchApi('/employees', { method: 'POST', body: JSON.stringify(data) }),
  updateEmployee: (id: string, data: any) => fetchApi(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEmployee: (id: string) => fetchApi(`/employees/${id}`, { method: 'DELETE' }),

  // Inventory
  getInventory: (locationId?: string) => fetchApi(`/inventory${locationId ? `?locationId=${locationId}` : ''}`),
  createInventory: (data: any) => fetchApi('/inventory', { method: 'POST', body: JSON.stringify(data) }),
  updateInventory: (id: string, data: any) => fetchApi(`/inventory/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteInventory: (id: string) => fetchApi(`/inventory/${id}`, { method: 'DELETE' }),

  // Orders & KDS
  getOrders: (locationId?: string) => fetchApi(`/orders${locationId ? `?locationId=${locationId}` : ''}`),
  createOrder: (data: any) => fetchApi('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateOrderStatus: (id: string, status: string) => fetchApi(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteOrder: (id: string) => fetchApi(`/orders/${id}`, { method: 'DELETE' }),

  // Bookings
  getBookings: (locationId?: string) => fetchApi(`/bookings${locationId ? `?locationId=${locationId}` : ''}`),
  createBooking: (data: any) => fetchApi('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  updateBooking: (id: string, data: any) => fetchApi(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBooking: (id: string) => fetchApi(`/bookings/${id}`, { method: 'DELETE' }),

  // Events & CRM
  getEventEnquiries: () => fetchApi('/events/enquiries'),
  createEventEnquiry: (data: any) => fetchApi('/events/enquiries', { method: 'POST', body: JSON.stringify(data) }),
  updateEventEnquiry: (id: string, data: any) => fetchApi(`/events/enquiries/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEventEnquiry: (id: string) => fetchApi(`/events/enquiries/${id}`, { method: 'DELETE' }),

  // Reviews
  getReviews: () => fetchApi('/reviews'),
  createReview: (data: any) => fetchApi('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  replyReview: (id: string, reply: string) => fetchApi(`/reviews/${id}/reply`, { method: 'PUT', body: JSON.stringify({ reply }) }),
  deleteReview: (id: string) => fetchApi(`/reviews/${id}`, { method: 'DELETE' }),
};
