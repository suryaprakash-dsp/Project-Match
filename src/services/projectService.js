// Project Service connecting to backend at http://localhost:5000/api/projects
const API_BASE = 'http://localhost:5000/api/projects';
const TOKEN_KEY = 'pm_auth_token';

function getAuthHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const projectService = {
  // GET http://localhost:5000/api/projects/getAllProjects?type=available or type=my
  // Query params: type, search, category, skills, page, limit, sortBy, order
  // Headers: Authorization: Bearer <token>
  getAll: async (params = {}) => {
    try {
      const query = new URLSearchParams();

      // type: 'available' (for Explore Projects) or 'my' (for My Projects)
      const projectType = params.type || 'available';
      query.set('type', projectType);

      if (params.search && params.search.trim()) {
        query.set('search', params.search.trim());
      }
      if (params.category && params.category !== 'All' && params.category !== 'All Categories') {
        query.set('category', params.category.trim());
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
      const url = `${API_BASE}/getAllProjects${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        const formattedProjects = (data.projects || []).map(p => {
          const vacancies = parseInt(p.open_vacancies) || 1;
          const ownerObj = p.userId && typeof p.userId === 'object' ? p.userId : null;
          const ownerName = ownerObj?.name || 'Project Lead';
          const ownerId = ownerObj?._id || p.userId || 'lead';

          return {
            id: p._id || p.id,
            title: p.project_Title || p.title || 'Untitled Project',
            category: p.category || 'General',
            openVacancies: vacancies,
            slots: `${vacancies} slot(s) open`,
            description: p.project_description || p.description || '',
            requiredSkills: p.required_skills || p.requiredSkills || [],
            skills: p.required_skills || p.skills || [],
            ownerName,
            ownerEmail: ownerObj?.email || '',
            ownerId,
            createdAt: p.createdAt || new Date().toISOString(),
            status: p.status || 'Recruiting',
            teamSize: vacancies + 1,
            currentMembers: [
              { id: ownerId, name: ownerName, role: 'Project Lead' }
            ],
            matchScore: 92,
            progress: 15,
            urgent: false,
            raw: p,
          };
        });

        return {
          success: true,
          type: data.type || projectType,
          projects: formattedProjects,
          pagination: data.pagination || {
            currentPage: Math.max(parseInt(params.page) || 1, 1),
            limit: Math.max(parseInt(params.limit) || 10, 1),
            totalProjects: formattedProjects.length,
            totalPages: Math.ceil(formattedProjects.length / (parseInt(params.limit) || 10)) || 1,
          },
          fromApi: true,
        };
      }

      return {
        success: false,
        error: data.message || `Failed to fetch projects (status ${response.status})`,
        status: response.status,
        projects: [],
        pagination: { currentPage: 1, limit: 10, totalProjects: 0, totalPages: 1 },
      };
    } catch (err) {
      return {
        success: false,
        error:
          err.message === 'Failed to fetch' || err.name === 'TypeError'
            ? 'Cannot connect to backend server at http://localhost:5000'
            : err.message,
        projects: [],
        pagination: { currentPage: 1, limit: 10, totalProjects: 0, totalPages: 1 },
      };
    }
  },

  // POST http://localhost:5000/api/projects/createProject
  // Headers: Authorization: Bearer <token>
  create: async (projectData) => {
    const payload = {
      project_Title: projectData.project_Title || projectData.title,
      category: projectData.category,
      open_vacancies: (projectData.open_vacancies !== undefined ? projectData.open_vacancies : (projectData.slots || 1)).toString(),
      project_description: projectData.project_description || projectData.description || '',
      required_skills: projectData.required_skills || projectData.skills || projectData.requiredSkills || [],
    };

    try {
      const response = await fetch(`${API_BASE}/createProject`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `Creation failed with status ${response.status}`,
          status: response.status,
        };
      }

      const p = data.project || {};
      const ownerObj = p.userId && typeof p.userId === 'object' ? p.userId : null;
      const formattedProject = {
        id: p._id || Date.now(),
        title: p.project_Title || payload.project_Title,
        category: p.category || payload.category,
        openVacancies: parseInt(p.open_vacancies || payload.open_vacancies) || 1,
        slots: `${p.open_vacancies || payload.open_vacancies} slot(s) open`,
        description: p.project_description || payload.project_description,
        requiredSkills: p.required_skills || payload.required_skills,
        skills: p.required_skills || payload.required_skills,
        ownerName: ownerObj?.name || 'You',
        ownerEmail: ownerObj?.email || '',
        createdAt: p.createdAt || new Date().toISOString(),
        status: 'Recruiting',
        currentMembers: [{ id: ownerObj?._id || 0, name: ownerObj?.name || 'You', role: 'Project Lead' }],
        teamSize: (parseInt(payload.open_vacancies) || 1) + 1,
        matchScore: 95,
        progress: 0,
        raw: p,
      };

      return {
        success: true,
        message: data.message || 'Project created successfully',
        data: formattedProject,
      };
    } catch (err) {
      return {
        success: false,
        error:
          err.message === 'Failed to fetch' || err.name === 'TypeError'
            ? 'Cannot connect to backend server at http://localhost:5000'
            : err.message,
      };
    }
  },

  // GET single project by id
  getById: async (id) => {
    try {
      // First check available projects
      const resAvailable = await projectService.getAll({ type: 'available', limit: 100 });
      if (resAvailable.success && resAvailable.projects) {
        const found = resAvailable.projects.find(p => p.id === id || p.raw?._id === id);
        if (found) return { success: true, data: found };
      }

      // Check my projects
      const resMy = await projectService.getAll({ type: 'my', limit: 100 });
      if (resMy.success && resMy.projects) {
        const found = resMy.projects.find(p => p.id === id || p.raw?._id === id);
        if (found) return { success: true, data: found };
      }
    } catch (e) {
      // ignore
    }

    return { success: false, error: 'Project not found' };
  },

  requestToJoin: async (projectId, message) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Request sent successfully' };
  },
};
