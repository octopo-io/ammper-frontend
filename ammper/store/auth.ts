import type { UserData } from '~/types/user-data';
import type { AuthResponse } from '~/types/auth-response';

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      userdata: <UserData | null>null,
      authenticated: false,
    };
  },
  actions: {
    async login(email: string, password: string) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<AuthResponse>(config.public.BASE_URL, {
          method: 'post',
          body: {
            data: {
              email, password
            },
            controller: 'user',
            action: 'login_user',
          },
        });
        console.log(response);
        return {
          status: true,
          response: response.data,
        };
      } catch (error: any) {
        console.error(error);
        return {
          status: false,
          response: error.data,
        };
      }
    }
  }
});