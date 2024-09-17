<script setup lang="ts">
import type { ErrorResponse } from '~/types/account';
import { useBelvoStore } from '~/store/belvo';

const route = useRoute();
const name = route.params.name as string;
const error = ref<ErrorResponse[] | undefined>(undefined);

const belvoStore = useBelvoStore();
const {account} = storeToRefs(belvoStore);

onMounted(async () => {
  error.value = undefined;
  const {status, response} = await belvoStore.getAccount(name);
  if (!status) {
    error.value = response as ErrorResponse[];
  }
});
onUnmounted(() => {
  account.value = null;
});
</script>

<template>
  <v-container>
    <div v-if="error">
      <v-alert type="error">
        Error desde la API:
        {{ error[0].message }}
      </v-alert>
    </div>
    <div v-if="account">
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
          <td>
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
    <NuxtLink to="/">Volver al inicio</NuxtLink>
  </v-container>
</template>

<style scoped>

</style>