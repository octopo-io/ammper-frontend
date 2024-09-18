<script setup lang="ts">
import type { AccountsResponse, ErrorResponse } from '~/types/account';
import { useBelvoStore } from '~/store/belvo';

useHead({
  title: 'Detalle Institución',
});

const route = useRoute();
const name = route.params.name as string;
const error = ref<ErrorResponse[] | undefined>(undefined);
const loading = ref<boolean>(true);
const retrying = ref<boolean>(false);
const tryNumber = ref<number>(0);

const belvoStore = useBelvoStore();
const {account} = storeToRefs(belvoStore);

onMounted(async () => {
  await getAccount();
});

onUnmounted(() => {
  account.value = null;
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getAccount = async () => {
  account.value = null;
  loading.value = true;
  error.value = undefined;

  let retries = 0;
  const maxRetries = 4;
  let success = false;

  while (retries < maxRetries && !success) {
    const {status, response} = await belvoStore.getAccount(name);

    if (status) {
      if (account.value?.results.length > 0) {
        success = true;
      } else {
        retrying.value = true;
        tryNumber.value = retries + 1;
        retries++;
        await delay(2000); // Espera 1 segundo antes de volver a intentar
      }
    } else {
      error.value = response as ErrorResponse[];
      break;
    }
  }
  retrying.value = false;
  loading.value = false;
};


const handleClick = (accountID: string) => {
  navigateTo(`/${ name }/${ accountID }`);
};
</script>

<template>
  <v-container>
    <v-skeleton-loader v-if="loading" type="table-tbody"/>

    <div v-if="error">
      <v-alert type="error">
        Error desde la API:
        {{ error[0].message }}
      </v-alert>
    </div>
    <div v-if="!loading && account">
      <v-table v-if="account.results.length > 0">
        <thead>
        <tr>
          <th class="font-weight-bold">CUENTA</th>
          <th class="font-weight-bold">ACCIÓN</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in account.results">
          <td>{{ item.name }} N° {{ item.number }}</td>
          <td class="cursor-pointer" @click="handleClick(item.id)">
            Ver
            <v-icon>mdi-eye-outline</v-icon>
          </td>
        </tr>
        </tbody>
      </v-table>
      <v-alert v-else type="warning">
        No se encontraron cuentas para esta institución.
      </v-alert>
    </div>
    <v-divider class="my-6"/>
    <div v-if="retrying">
      Reintentando obtener tus cuentas: {{ tryNumber }} de {{ 4 }}
    </div>
    <div class="d-flex align-center justify-space-between">
      <NuxtLink to="/">Volver al inicio</NuxtLink>
      <v-btn :disabled="loading" color="warning" density="compact" @click="getAccount">Refrescar</v-btn>
    </div>
  </v-container>
</template>

<style scoped>

</style>