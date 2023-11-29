import { watch } from 'vue';
import { useStore } from 'vuex';
import { Store } from 'vuex';
import { RootState } from '../../store/Store';
import isEqual from 'lodash/isEqual';

export function watchItems(moduleName: string) {
  const store: Store<RootState> = useStore();

  watch(
    () => store.getters[`${moduleName}/queryFilters`],
    async (newVal, oldVal) => {
      if (!isEqual(newVal, oldVal)) {
        await store.dispatch(`${moduleName}/fetchItems`);
        await store.dispatch(`${moduleName}/fetchCount`);
      }
    },
    { immediate: true, deep: true },
  );
}
