import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/utils/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));

  const isAuthenticated = computed(() => !!token.value);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      token.value = response.data.token;
      user.value = response.data.user;
      localStorage.setItem('token', token.value);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      token.value = response.data.token;
      user.value = response.data.user;
      localStorage.setItem('token', token.value);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    signup,
    logout,
  };
});
