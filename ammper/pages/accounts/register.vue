<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import type { ErrorType } from '~/types/auth-response';

useHead({
  title: 'Register',
});

definePageMeta({
  layout: 'auth',
});

const authStore = useAuthStore();
const error = ref<ErrorType | undefined>(undefined);
const loading = ref<boolean>(false);
const handleSubmit = async (email: string, password: string) => {
  error.value = undefined;
  loading.value = true;
  const {status, response} = await authStore.register(email, password);
  if (!status) {
    error.value = response.error;
  } else {
    const token = useCookie('token');
    token.value = response.token;
    authStore.setAuthenticated(true);
    await navigateTo('/');
  }
  loading.value = false;
};
</script>

<template>
  <section>
    <v-container>
      <AuthForm
          mode="register"
          :error="error"
          :loading="loading"
          @submit="handleSubmit"
      />
    </v-container>
  </section>
</template>

<style scoped>

</style>