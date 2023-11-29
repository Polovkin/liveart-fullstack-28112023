<template>
  <v-navigation-drawer
    v-model:rail="state.isRailSidebar"
    rail-width="70"
    permanent
    dark
    color="primary"
  >
    <template #prepend>
      <v-list-item height="64px">
        <template #prepend>
          <v-icon size="x-large" color="white"> mdi-account-box </v-icon>
        </template>
        <v-list-item-title class="text-uppercase"> Admin Panel </v-list-item-title>
      </v-list-item>
    </template>

    <v-divider />

    <v-list class="pa-0">
      <v-list-item
        v-for="(item, key) in state.items"
        :key="key"
        link
        height="56px"
        :to="item.path"
      >
        <template #prepend>
          <v-icon size="large" color="white" class="pl-2">
            {{ item.meta?.icon }}
          </v-icon>
        </template>
        <v-list-item-title> {{ item.meta?.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <template #append>
      <v-list-item dense>
        <v-list-item>
          <v-list-item-subtitle>Admin Area {{ version() }}</v-list-item-subtitle>
        </v-list-item>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Store } from 'vuex';
import { RootState } from '../../store/Store.ts';
import { useDisplay } from 'vuetify';

interface State {
  items: RouteRecordRaw[];
  isRailSidebar: boolean;
}

const Component = defineComponent({
  name: 'SideBar',

  setup() {
    const router = useRouter();
    const store: Store<RootState> = useStore();
    const display = useDisplay();

    const filteredRoutes = router.options.routes[0].children?.filter(route => {
      return route.meta && route.meta.isSideBarIncludes === true;
    });

    const state = reactive({
      items: computed(() => filteredRoutes),
      isRailSidebar: computed(() => !store.getters['uiModule/isSidebarOpened']),
    }) as State;

    function version() {
      return process.env.VUE_APP_VERSION;
    }
    watch(
      () => display.name.value,
      (breakpointName: string) => {
        switch (breakpointName) {
          case 'xs':
          case 'sm':
          case 'md':
            if (state && !state.isRailSidebar) {
              store.dispatch('uiModule/toggleSidebar');
            }
            break;
          case 'lg':
          case 'xl':
          default:
            if (state && state.isRailSidebar) {
              store.dispatch('uiModule/toggleSidebar');
            }
        }
      },
    );

    return {
      state,
      version,
    };
  },
});

export default Component;
</script>

<style scoped></style>
