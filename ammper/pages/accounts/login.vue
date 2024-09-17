<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

useHead({
  title: 'Login',
});
const authStore = useAuthStore();
const error = ref<string | null>(null);
const loading = ref<boolean>(false);
const handleSubmit = async (email: string, password: string) => {
  console.log('submit');
  loading.value = true;
  const {status, response} = await authStore.login(email, password);
  if (!status) {
    error.value = response.error;
  }
  loading.value = false;
};
</script>

<template>
  <section>
    <v-container>
      <AuthForm :error="error" :loading="loading" mode="login" @submit="handleSubmit"/>
    </v-container>
  </section>
</template>

<style scoped>

</style>