<template>
  <v-card tile flat elevation="1" width="350" class="pa-3" :loading="loading">
    <v-card-title class="d-flex align-center justify-center">
      <v-icon icon="mdi-account" color="primary" class="pr-3" />
      Sign in to admin area
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="dataIsValid" class="px-3 mt-2 mb-4">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          v-model="data.email"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          class="pb-3"
          variant="outlined"
          :rules="rules.emailRules"
          required
        />

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
          :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordVisible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          class="pb-3"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          :rules="rules.passwordRules"
          required
          @click:append-inner="passwordVisible = !passwordVisible"
        />

        <v-btn block color="primary" :disabled="!dataIsValid" @click="login">
          Sign in
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'LoginForm',

  setup() {
    const store = useStore();
    const router = useRouter();
    const data = ref({
      email: '',
      password: '',
    });

    const rules = {
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) =>
          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => v.length >= 8 || 'Password is too short',
      ],
    };
    const dataIsValid = ref(false);
    const passwordVisible = ref(false);

    function togglePasswordVisibility() {
      passwordVisible.value = !passwordVisible.value;
    }

    const loading = computed(() => {
      return store.getters['authModule/loading'];
    });

    function login() {
      store.dispatch('authModule/login', 123).then(() => {
        router.push('/products');
      });
    }
    return {
      data,
      rules,
      passwordVisible,
      loading,
      dataIsValid,
      togglePasswordVisibility,
      login,
    };
  },
});
</script>

<style scoped></style>
