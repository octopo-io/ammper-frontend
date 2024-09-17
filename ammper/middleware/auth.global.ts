export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');

  if (token.value && to?.name === 'accounts-login') {
    return navigateTo('/');
  }

  if (!token.value && to?.name !== 'accounts-login' && to?.name !== 'accounts-register') {
    abortNavigation();
    return navigateTo('/accounts/login');
  }
});