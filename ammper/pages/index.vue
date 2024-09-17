<script setup lang="ts">

import { useBelvoStore } from '~/store/belvo';
import type { InvalidJWTError } from '~/types/institution';
import InstitutionCard from '~/components/InstitutionCard.vue';

useHead({
  title: 'Home',
});

const error = ref<InvalidJWTError | undefined>(undefined);
const loading = ref<boolean>(false);

const belvoStore = useBelvoStore();
const {institutions} = storeToRefs(belvoStore);

onMounted(async () => {
  const {status, response} = await belvoStore.fetchInstitutions();
  if (!status) {
    error.value = response.error;
  }
});

const handleClick = async (name: string) => {
  navigateTo(`/${ name }`);
};

const errors = {
  invalid_jwt: 'Debes volver a iniciar sesión.'
};
</script>

<template>
  <v-container>
    <v-alert class="mb-6" v-if="error">
      {{ errors[error] }}
    </v-alert>
    <InstitutionCard
        v-for="institution in institutions"
        :loading="loading"
        :institution="institution"
        :key="institution.id"
        @selected="handleClick"
    />
  </v-container>
</template>

<style scoped>
</style>