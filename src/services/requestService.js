// Request Service - Replace mock implementations with real API calls when backend is ready
import { mockReceivedRequests, mockSentRequests } from '../data/mockRequests';

export const requestService = {
  getReceived: async () => {
    // TODO: Replace with: await axios.get('/api/requests/received')
    await new Promise(r => setTimeout(r, 400));
    return { success: true, data: mockReceivedRequests };
  },

  getSent: async () => {
    // TODO: Replace with: await axios.get('/api/requests/sent')
    await new Promise(r => setTimeout(r, 400));
    return { success: true, data: mockSentRequests };
  },

  respond: async (requestId, action) => {
    // TODO: Replace with: await axios.put(`/api/requests/${requestId}`, { action })
    await new Promise(r => setTimeout(r, 500));
    return { success: true, message: `Request ${action}ed successfully` };
  },
};
