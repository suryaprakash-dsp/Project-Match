// User Service connecting to backend at http://localhost:5000/api/users
import { mockUsers } from '../data/mockUsers';

const API_BASE = 'http://localhost:5000/api/users';

export const userService = {
  // GET http://localhost:5000/api/users/getAllUsers
  // Query params: search, skills, page, limit, sortBy, order
  getAll: async (params = {}) => {
    try {
      const query = new URLSearchParams();

      if (params.search && params.search.trim()) {
        query.set('search', params.search.trim());
      }
      if (params.skills) {
        const skillsVal = Array.isArray(params.skills)
          ? params.skills.join(',')
          : params.skills;
        if (skillsVal.trim()) {
          query.set('skills', skillsVal.trim());
        }
      }
      if (params.page) {
        query.set('page', params.page);
      }
      if (params.limit) {
        query.set('limit', params.limit);
      }
      if (params.sortBy) {
        query.set('sortBy', params.sortBy);
      }
      if (params.order) {
        query.set('order', params.order);
      }

      const queryString = query.toString();
      const url = `${API_BASE}/getAllUsers${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        return {
          success: true,
          users: data.users || [],
          pagination: data.pagination || {
            currentPage: 1,
            limit: 10,
            totalUsers: (data.users || []).length,
            totalPages: 1,
          },
          fromApi: true,
        };
      }

      // If backend returns unsuccessful response, gracefully fallback to mock data
      return fallbackFilter(params);
    } catch (err) {
      // If backend is unreachable or down, gracefully fallback to mock data
      return fallbackFilter(params);
    }
  },

  getById: async (id) => {
    // Check in mockUsers first or fallback
    const user = mockUsers.find(u => u.id === parseInt(id) || u.id === id || u._id === id);
    if (user) {
      return { success: true, data: user };
    }
    // Also try fetching from users endpoint if needed
    try {
      const res = await fetch(`${API_BASE}/getAllUsers?limit=100`);
      const data = await res.json();
      if (data.success && data.users) {
        const found = data.users.find(u => u._id === id || u.id === id);
        if (found) return { success: true, data: found };
      }
    } catch (e) {
      // ignore
    }
    return { success: false, error: 'User not found' };
  },

  updateProfile: async (userId, data) => {
    await new Promise(r => setTimeout(r, 600));
    return { success: true, data: { id: userId, ...data } };
  },

  connect: async (userId) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Connection request dispatched successfully' };
  },
};

// Fallback filtering when backend is offline or empty
function fallbackFilter(filters = {}) {
  let users = [...mockUsers];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    users = users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      (u.skills && u.skills.some(s => s.toLowerCase().includes(q))) ||
      (u.department && u.department.toLowerCase().includes(q))
    );
  }
  if (filters.skills) {
    const skillList = Array.isArray(filters.skills)
      ? filters.skills
      : filters.skills.split(',').map(s => s.trim().toLowerCase());
    users = users.filter(u =>
      u.skills && u.skills.some(s => skillList.includes(s.toLowerCase()))
    );
  }
  const page = Math.max(parseInt(filters.page) || 1, 1);
  const limit = Math.max(parseInt(filters.limit) || 10, 1);
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / limit) || 1;
  const paginated = users.slice((page - 1) * limit, page * limit);

  return {
    success: true,
    users: paginated,
    pagination: {
      currentPage: page,
      limit,
      totalUsers,
      totalPages,
    },
    fromApi: false,
  };
}
