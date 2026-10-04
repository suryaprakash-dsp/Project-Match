// Project Service - Replace mock implementations with real API calls when backend is ready
import { mockProjects } from '../data/mockProjects';

export const projectService = {
  getAll: async (filters = {}) => {
    // TODO: Replace with: await axios.get('/api/projects', { params: filters })
    await new Promise(r => setTimeout(r, 500));
    let projects = [...mockProjects];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.requiredSkills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (filters.category && filters.category !== 'All') {
      projects = projects.filter(p => p.category === filters.category);
    }
    if (filters.status && filters.status !== 'All') {
      projects = projects.filter(p => p.status === filters.status);
    }
    if (filters.department && filters.department !== 'All') {
      projects = projects.filter(p => p.department === filters.department);
    }
    return { success: true, data: projects };
  },

  getById: async (id) => {
    // TODO: Replace with: await axios.get(`/api/projects/${id}`)
    await new Promise(r => setTimeout(r, 300));
    const project = mockProjects.find(p => p.id === parseInt(id));
    return project
      ? { success: true, data: project }
      : { success: false, error: 'Project not found' };
  },

  create: async (projectData) => {
    // TODO: Replace with: await axios.post('/api/projects', projectData)
    await new Promise(r => setTimeout(r, 800));
    return { success: true, data: { ...projectData, id: Date.now() } };
  },

  requestToJoin: async (projectId, message) => {
    // TODO: Replace with: await axios.post(`/api/projects/${projectId}/join`, { message })
    await new Promise(r => setTimeout(r, 500));
    return { success: true, message: 'Request sent successfully' };
  },
};
