<template>
  <v-app-bar app fixed flat color="accent">
    <v-app-bar-nav-icon @click.stop="toggleSidebar()" />
    <v-toolbar-title />
    <v-spacer />
    <v-btn variant="outlined" size="small" @click="logout"> Sign out </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const Component = defineComponent({
  name: 'NavBar',

  setup() {
    const router = useRouter();
    const store = useStore();

    function logout() {
      store.dispatch('authModule/logout').then(() => {
        router.push('/login');
      });
    }
    function toggleSidebar() {
      store.dispatch('uiModule/toggleSidebar');
    }

    return {
      logout,
      toggleSidebar,
    };
  },
});

export default Component;
</script>

<style scoped></style>
