import { defineStore } from 'pinia';
import type { AuthResponse } from '~/types/auth-response';
import { useRuntimeConfig } from '#app';
import type { UserData } from '~/types/user-data';
import type { ApiResponse } from '~/types/api';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    userData: <UserData | null>null,
    authenticated: false,
  }),
  actions: {
    async authenticate(
      action: 'login_user' | 'sign_up_user',
      email: string,
      password: string
    ): Promise<ApiResponse<AuthResponse>> {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<AuthResponse>(config.public.BASE_URL, {
          method: 'POST',
          body: {
            data: {email, password},
            controller: 'user',
            action,
          },
        });
        const {token} = response;
        const [, payload] = token.split('.');
        const decoded = atob(payload);
        this.userData = JSON.parse(decoded);
        return {status: true, response};
      } catch (error: any) {
        console.error(error);
        return {
          status: false,
          response: error.data,
        };
      }
    },
    async login(
      email: string,
      password: string
    ): Promise<ApiResponse<AuthResponse>> {
      return this.authenticate('login_user', email, password);
    },
    async register(
      email: string,
      password: string
    ): Promise<ApiResponse<AuthResponse>> {
      return this.authenticate('sign_up_user', email, password);
    },
    setAuthenticated(authenticated: boolean) {
      this.authenticated = authenticated;
    },
  },
});
