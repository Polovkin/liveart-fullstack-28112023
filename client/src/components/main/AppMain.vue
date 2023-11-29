<template>
  <SideBar />
  <NavBar />
  <MainArea />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './SideBar.vue';
import NavBar from './NavBar.vue';
import MainArea from './MainArea.vue';
const Component = defineComponent({
  name: 'AppMain',

  components: {
    SideBar,
    NavBar,
    MainArea,
  },
});

export default Component;
</script>

<style scoped></style>
