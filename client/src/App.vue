<template>
  <v-app>
    <router-view />
    <UpdateAlert />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UpdateAlert from './components/utils/UpdateAlert.vue';
const Component = defineComponent({
  name: 'App',

  components: {
    UpdateAlert,
  },
});
export default Component;
</script>
<style></style>
