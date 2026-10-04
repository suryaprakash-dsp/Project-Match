// User Service - Replace mock implementations with real API calls when backend is ready
import { mockUsers } from '../data/mockUsers';

export const userService = {
  getAll: async (filters = {}) => {
    // TODO: Replace with: await axios.get('/api/users', { params: filters })
    await new Promise(r => setTimeout(r, 500));
    let users = [...mockUsers];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      users = users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.skills.some(s => s.toLowerCase().includes(q)) ||
        u.department.toLowerCase().includes(q)
      );
    }
    if (filters.department && filters.department !== 'All') {
      users = users.filter(u => u.department === filters.department);
    }
    if (filters.year && filters.year !== 'All') {
      const yearNum = parseInt(filters.year);
      users = users.filter(u => u.year === yearNum);
    }
    if (filters.skill && filters.skill !== 'All') {
      users = users.filter(u => u.skills.includes(filters.skill));
    }
    if (filters.availability && filters.availability !== 'All') {
      users = users.filter(u => u.availability === filters.availability);
    }
    return { success: true, data: users };
  },

  getById: async (id) => {
    // TODO: Replace with: await axios.get(`/api/users/${id}`)
    await new Promise(r => setTimeout(r, 300));
    const user = mockUsers.find(u => u.id === parseInt(id));
    return user
      ? { success: true, data: user }
      : { success: false, error: 'User not found' };
  },

  updateProfile: async (userId, data) => {
    // TODO: Replace with: await axios.put(`/api/users/${userId}`, data)
    await new Promise(r => setTimeout(r, 800));
    return { success: true, data: { id: userId, ...data } };
  },

  connect: async (userId) => {
    // TODO: Replace with: await axios.post(`/api/users/${userId}/connect`)
    await new Promise(r => setTimeout(r, 500));
    return { success: true, message: 'Connection request sent' };
  },
};
