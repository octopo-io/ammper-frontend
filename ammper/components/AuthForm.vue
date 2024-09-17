<script setup lang="ts">
const props = defineProps<{
  mode: 'register' | 'login';
  error?: 'user_not_found' | 'invalid_password';
  loading: boolean;
}>();

const {mode, error, loading} = toRefs(props);
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const formValid = computed(() => {
  const emailValid = /.+@.+\..+/.test(email.value);
  return emailValid && password.value.length >= 4;
});

const emit = defineEmits(['submit']);

const errors = {
  user_not_found: 'Email no registrado.',
  invalid_password: 'Contraseña incorrecta.',
};
</script>

<template>
  <v-card>
    <v-card-title>
      <h1 v-if="mode === 'register'">Regístrate</h1>
      <h1 v-else>Inicia Sesión</h1>
    </v-card-title>
    <v-card-text>
      <v-text-field
          label="Email"
          v-model="email"
          hint="Correo electrónico"
          class="mb-2"
      />
      <v-text-field
          label="Contraseña"
          v-model="password"
          hint="Mínimo 4 caracteres"
          class="mb-2"
          :type="showPassword ? 'text' : 'password'"
      >
        <template #append>
          <v-icon class="" @click="showPassword = !showPassword">
            <template v-if="!showPassword">mdi-eye</template>
            <template v-else>mdi-eye-off</template>
          </v-icon>
        </template>
      </v-text-field>

      <v-alert v-if="error" class="mb-8" type="error">{{ errors[error] }}</v-alert>

      <div class="d-flex justify-space-between align-center">
        <v-btn :disabled="!formValid || loading" color="success" @click="emit('submit', email, password)">
          <template v-if="mode === 'register'">Crear cuenta</template>
          <template v-else>Iniciar Sesión</template>
        </v-btn>
        <NuxtLink v-if="mode === 'register'" to="/accounts/login"> o Inicia sesión</NuxtLink>
        <NuxtLink v-else to="/accounts/register"> o Regístrate</NuxtLink>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>