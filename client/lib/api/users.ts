import { apiClient } from './client';
import type { User } from '@/types';

export const usersApi = {
  async updateProfile(payload: { name?: string; email?: string }): Promise<User> {
    const { data } = await apiClient.put<User>('/users/profile', payload);
    return data;
  },
};
