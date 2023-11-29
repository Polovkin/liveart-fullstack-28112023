<template>
  <v-container>
    <v-text-field
      v-model="state.value"
      class="searchBar pb-3"
      label="Search"
      append-icon="mdi-magnify"
      hide-details
      clearable
      @click:clear="cancelSearch"
      @click:append="search"
      @keyup.enter="search"
    />
  </v-container>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import { useStore, Store } from 'vuex';
import { RootState } from '../../store/Store';

interface State {
  value: string;
}

const Component = defineComponent({
  name: 'SearchBar',

  props: {
    storePath: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const store: Store<RootState> = useStore();

    const state: State = reactive({
      value: store.getters[`${props.storePath}/getSearchValue`] || '',
    });

    function search() {
      store.dispatch(`${props.storePath}/setSearchValue`, state.value);
    }

    function cancelSearch() {
      store.dispatch(`${props.storePath}/setSearchValue`, null);
    }
    return {
      state,
      search,
      cancelSearch,
    };
  },
});

export default Component;
</script>

<style scoped>
.searchBar {
  max-width: 200px;
}
</style>
