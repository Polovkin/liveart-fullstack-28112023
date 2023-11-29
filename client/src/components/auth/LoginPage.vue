<template>
  <div class="fill-height">
    <v-container fluid class="fill-height accent-background">
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center">
            <LoginForm />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import LoginForm from './LoginForm.vue';

export default {
  name: 'LoginPage',

  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh !important;
}

.container.fill-height > .row {
  max-width: 100vw !important;
}

.accent-background {
  background-color: rgb(var(--v-theme-accent));
}
</style>
