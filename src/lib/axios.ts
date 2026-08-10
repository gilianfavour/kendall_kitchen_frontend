import axios from 'axios';

/**
 * Client-side Axios instance.
 * Attaches the Sanctum Bearer token from the auth store on every request.
 */
const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL_CLIENT ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:8000/api',
  headers: {
    'Content-Type':     'application/json',
    'Accept':           'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10_000,
});

// Attach the Bearer token on every request if the user is logged in
apiClient.interceptors.request.use((config) => {
  // Dynamically read from localStorage to always get the latest token
  // (avoids stale closures from the Zustand store)
  try {
    const raw = localStorage.getItem('kk-auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      const token  = parsed?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // localStorage not available (SSR) — skip
  }
  return config;
});

export default apiClient;
