<template>
  <section class="bg-primary">
    <v-container class="d-flex justify-space-between">
      <div>
        <NuxtLink id="logo" to="/" class="text-white">
          <v-icon class="mt-n1">mdi-monitor-dashboard</v-icon>
          <span class="ml-2">My App</span>
        </NuxtLink>
      </div>
      <div class="cursor-pointer" @click="handleLogout">
        Cerrar Sesión
      </div>
    </v-container>
  </section>
  <section>
    <v-container>
      Bienvenido/a: <span class="font-weight-bold">{{ userData?.email }}</span>
    </v-container>
  </section>
  <NuxtPage/>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const {authenticated, userData} = storeToRefs(useAuthStore());

const handleLogout = () => {
  const token = useCookie('token');
  token.value = null;
  authenticated.value = false;
  navigateTo('/accounts/login');
};
</script>
<style scoped>
#logo {
  text-decoration: none;
}
</style>