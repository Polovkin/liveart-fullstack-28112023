<template>
  <v-container fluid>
    <v-row class="px-1" align="center">
      <v-col>
        <v-row class="pl-3 d-flex align-center">
          <span class="inputTitle mr-3">Rows per page</span>
          <v-select
            v-model="state.rowsPerPage"
            class="ma-0 pa-0 rowsInput"
            :items="getDropdownItems()"
            variant="underlined"
            density="comfortable"
            hide-details
            @change="state.rowsPerPage = parseInt($event, 10)"
          />
        </v-row>
      </v-col>

      <v-col v-if="total">
        <v-row justify="end">
          <v-pagination
            v-model="state.page"
            class="pagination"
            color="primary"
            density="comfortable"
            :length="totalPages()"
            :total-visible="5"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { Store } from 'vuex';
import { RootState } from '../../store/Store';
import { useStore } from 'vuex';
interface State {
  page: number;
  rowsPerPage: number;
}

const Component = defineComponent({
  name: 'TablePagination',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    storePath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store: Store<RootState> = useStore();

    const state = reactive({
      page: computed({
        get(): number {
          return store.getters[`${props.storePath}/queryPage`] || 1;
        },
        set(newVal: number) {
          store.dispatch(`${props.storePath}/setQueryPage`, newVal);
        },
      }),
      rowsPerPage: computed({
        get(): number {
          return store.getters[`${props.storePath}/queryRowsPerPage`] || 20;
        },
        set(newVal: number) {
          store.dispatch(`${props.storePath}/setQueryRowsPerPage`, newVal);
        },
      }),
    }) as State;
    function totalPages() {
      if (!props.total) return 0;
      return (
        Math.floor(props.total / state.rowsPerPage) +
        (props.total % state.rowsPerPage ? 1 : 0)
      );
    }
    function getDropdownItems() {
      return [5, 20, 50, 100];
    }
    return {
      state,
      totalPages,
      getDropdownItems,
    };
  },
});
export default Component;
</script>

<style scoped>
.rowsInput.v-input {
  max-width: 60px;
}

.inputTitle {
  margin-right: 10px !important;
}

.rowsInput.v-select__selection,
.inputTitle {
  font-size: smaller;
}

.pagination.v-pagination {
  width: auto !important;
}

.pagination.v-pagination__item,
.pagination.v-pagination__navigation {
  box-shadow: none;
  opacity: 1;
  background: none;
  outline: none;
}

.pagination.v-pagination__item {
  padding: 5px 10px;
  min-width: 26px;
  height: 32px;
  outline: none;
  font-size: smaller;
}
</style>
