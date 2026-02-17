import { apiClient, setAuthToken } from './client';
import type { User, AuthResponse } from '@/types';

export const authApi = {
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', { name, email, password });
    setAuthToken(data.token);
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    setAuthToken(data.token);
    return data;
  },

  async me(): Promise<User> {
    const { data } = await apiClient.get<User>('/auth/me');
    return data;
  },

  logout() {
    setAuthToken(null);
  },
};
