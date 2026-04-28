const BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'API Error');
  }
  
  return data;
}

// ============ USER API ============
export const userApi = {
  register: (email: string, password: string, name: string) =>
    apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getProfile: (userId: string) =>
    apiCall(`/users/${userId}`),

  updateProfile: (userId: string, name: string, bio: string) =>
    apiCall(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ name, bio }),
    }),
};

// ============ STORIES API ============
export const storiesApi = {
  create: (title: string, content: string, tags: string[], authorId: string, isAnonymous: boolean) =>
    apiCall('/stories', {
      method: 'POST',
      body: JSON.stringify({ title, content, tags, authorId, isAnonymous }),
    }),

  getAll: () =>
    apiCall('/stories'),

  getById: (id: string) =>
    apiCall(`/stories/${id}`),

  upvote: (storyId: string, userId: string) =>
    apiCall(`/stories/${storyId}/upvote`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  addComment: (storyId: string, content: string, authorId: string, isAnonymous: boolean) =>
    apiCall(`/stories/${storyId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, authorId, isAnonymous }),
    }),

  getComments: (storyId: string) =>
    apiCall(`/stories/${storyId}/comments`),
};

// ============ ROOMS API ============
export const roomsApi = {
  create: (name: string, description: string, isPrivate: boolean, createdBy: string) =>
    apiCall('/rooms', {
      method: 'POST',
      body: JSON.stringify({ name, description, isPrivate, createdBy }),
    }),

  getAll: () =>
    apiCall('/rooms'),

  getById: (id: string) =>
    apiCall(`/rooms/${id}`),

  sendMessage: (roomId: string, content: string, sender: string, senderName: string, isAnonymous: boolean) =>
    apiCall(`/rooms/${roomId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, sender, senderName, isAnonymous }),
    }),

  getMessages: (roomId: string) =>
    apiCall(`/rooms/${roomId}/messages`),
};

// ============ BOOKING API ============
export const bookingApi = {
  book: (userId: string, psychiatristId: string, date: string, time: string, notes?: string) =>
    apiCall('/sessions/book', {
      method: 'POST',
      body: JSON.stringify({ userId, psychiatristId, date, time, notes }),
    }),

  getUserSessions: (userId: string) =>
    apiCall(`/sessions/user/${userId}`),

  cancelSession: (sessionId: string) =>
    apiCall(`/sessions/${sessionId}/cancel`, {
      method: 'POST',
    }),
};

// ============ ADMIN API ============
export const adminApi = {
  getStats: () =>
    apiCall('/admin/stats'),

  getAllUsers: () =>
    apiCall('/admin/users'),

  deleteStory: (storyId: string) =>
    apiCall(`/admin/stories/${storyId}`, {
      method: 'DELETE',
    }),
};

// ============ PSYCHIATRISTS API ============
export const psychiatristsApi = {
  getAll: () =>
    apiCall('/psychiatrists'),

  getById: (id: string) =>
    apiCall(`/psychiatrists/${id}`),

  getBySpecialization: (specialization: string) =>
    apiCall(`/psychiatrists/specialization/${specialization}`),

  create: (data: any) =>
    apiCall('/psychiatrists', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
