import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const {authenticated, userData} = storeToRefs(useAuthStore());
  const token = useCookie('token');

  if (token.value) {
    authenticated.value = true;
    const [, payload] = token.value.split('.');
    const decoded = atob(payload);
    userData.value = JSON.parse(decoded);
  }

  if (token.value && (to?.name === 'accounts-login' || to?.name === 'accounts-register')) {
    return navigateTo('/');
  }

  if (!token.value && to?.name !== 'accounts-login' && to?.name !== 'accounts-register') {
    abortNavigation();
    return navigateTo('/accounts/login');
  }
});