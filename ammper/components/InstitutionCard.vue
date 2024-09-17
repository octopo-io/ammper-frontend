<script setup lang="ts">
import type { Institution } from '~/types/institution';

const emit = defineEmits(['selected']);

const props = defineProps<{
  institution: Institution;
}>();
const {institution} = toRefs(props);

const getCountryFlag = (countryCode: string) => {
  return {
    CO: '🇨🇴',
    BR: '🇧🇷',
    MX: '🇲🇽',
  }[countryCode];
};
const handleClick = () => {
  emit('selected', institution.value.name);
};
</script>

<template>
  <v-card class="mb-6" :color="institution.primary_color" @click="handleClick">
    <v-card-title class="d-flex justify-space-between">
      <div>
        {{ getCountryFlag(institution.country_code) }} {{ institution.display_name }}
      </div>
      <div>
        <v-icon class="cursor-pointer">
          mdi-chevron-right
        </v-icon>
      </div>
    </v-card-title>
  </v-card>
</template>

<style scoped>

</style>