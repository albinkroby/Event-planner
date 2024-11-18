<template>
  <v-card class="elevation-12">
    <v-card-title class="text-h5 text-center py-4">
      Login to Your Account
    </v-card-title>
    
    <v-card-text>
      <v-form @submit.prevent="handleSubmit" ref="form">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          required
          prepend-icon="mdi-email"
          :rules="[v => !!v || 'Email is required']"
        />

        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          required
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="[v => !!v || 'Password is required']"
        />

        <v-alert
          v-if="error"
          type="error"
          class="mb-4"
        >
          {{ error }}
        </v-alert>

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-4"
          :loading="loading"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-text class="text-center">
      Don't have an account?
      <router-link to="/signup">Sign Up</router-link>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const form = ref(null);
const showPassword = ref(false);

async function handleSubmit() {
  if (!form.value.validate()) return;
  
  try {
    loading.value = true;
    await authStore.login(email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
}
</script>
