<script setup lang="ts">
import { useBelvoStore } from '~/store/belvo';

useHead({
  title: 'Detalle Cuenta',
});
const route = useRoute();
const {name, account} = route.params as { name: string, account: string };
const loading = ref<boolean>(true);
const error = ref<Array<Object> | string | undefined>(undefined);
const transactions = ref<Array<Object> | undefined>(undefined);

const belvoStore = useBelvoStore();

onMounted(async () => {
  const {status, response} = await belvoStore.getTransactions(name, account);
  if (!status) {
    error.value = response;
  } else {
    transactions.value = response.results.sort((a: any, b: any) => {
      const dateA = new Date(a.accounting_date).getTime();
      const dateB = new Date(b.accounting_date).getTime();
      return dateB - dateA;
    });
  }
  loading.value = false;
});

const balance = computed(() => {
  if (transactions.value) {
    return transactions.value.reduce((acc: number, item: any) => {
      if (item.type === 'INFLOW') {
        return acc + item.amount;
      }
      return (acc - item.amount);
    }, 0).toFixed(2);
  }
  return 0;
});

</script>

<template>
  <v-container>
    <v-card color="success" class="mb-6">
      <v-card-text>
        <h2>Balance: ${{ balance }}</h2>
      </v-card-text>
    </v-card>
    <h3>Últimos 10 movimientos</h3>
    <v-skeleton-loader v-if="loading" type="table-tbody"/>
    <div v-if="transactions && transactions?.length > 0">
      <v-table>
        <thead>
        <tr>
          <th class="font-weight-bold">MONTO</th>
          <th class="font-weight-bold">TIPO</th>
          <th class="font-weight-bold">FECHA</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in transactions">
          <td :class="item.type==='INFLOW' ? 'text-success' : 'text-error'">
            <span v-if="item.type==='OUTFLOW'">-</span>
            $ {{ item.amount }}
          </td>
          <td>
            <v-icon color="success" v-if="item.type==='INFLOW'">
              mdi-arrow-bottom-left
            </v-icon>
            <v-icon color="error" v-else>
              mdi-arrow-top-right
            </v-icon>
          </td>
          <td>{{ new Date(item.accounting_date).toLocaleDateString() }}</td>
        </tr>
        </tbody>
      </v-table>
    </div>
    <v-alert v-else-if="transactions && transactions?.length === 0" type="warning">
      No se encontraron transacciones.
    </v-alert>
    <v-divider class="my-6"/>
    <NuxtLink :to="`/${name}`">Volver</NuxtLink>
  </v-container>
</template>

<style scoped>

</style>