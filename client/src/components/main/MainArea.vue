<template>
  <v-main>
    <v-divider />
    <v-container fluid>
      <router-view />
      <v-overlay color="white" absolute z-index="1000" />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Component = defineComponent({
  name: 'MainArea',

  setup() {
    return {};
  },
});

export default Component;
</script>

<style scoped></style>
