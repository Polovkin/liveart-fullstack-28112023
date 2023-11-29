<template>
  <EntityDialog
    entity-type="category"
    :title="title"
    :item="state.entity"
    :loading="state.loading"
    :is-new="isNew()"
    :is-deletable="!isNew()"
  >
    <template #form-content>
      <div>
        <v-row align="start">
          <v-col cols="12">
            <v-text-field
              v-model="state.entity.name"
              label="Name"
              variant="outlined"
              required
              hide-details="auto"
              :rules="rules.name"
              data-test="product-name"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="state.entity.categoryId"
              label="Parent Category"
              variant="outlined"
              hide-details="auto"
              :items="listCategory"
              item-title="name"
              item-value="id"
              data-test="product-categoryId"
            />
          </v-col>
        </v-row>
      </div>
    </template>
  </EntityDialog>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, watch, computed, ref } from 'vue';
import EntityDialog from '@/components/common/EntityDialog.vue';
import { Category } from '../../../models/entities/Category';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface State {
  entity: Category;
  loading: boolean;
}

const Component = defineComponent({
  name: 'CategoryDialog',

  components: {
    EntityDialog,
  },

  props: {
    id: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const category = new Category({});
    const store = useStore();
    const router = useRouter();
    const isNew = () => !props.id;

    let listCategory = ref(<Category[]>[]);

    onBeforeMount(async () => {
      if (!isNew()) {
        const res = await store.dispatch('categoriesModule/fetchItem', props.id);
        if (!res) router.back();
      }
      listCategory.value = await store.dispatch(
        'categoriesModule/fetchAllItems',
        undefined,
      );
    });

    const state = reactive({
      entity: category,
      loading: computed(() => store.getters['categoriesModule/loading']),
    }) as State;

    watch(
      () => store.getters['categoriesModule/selectedItem'],
      (newValue: Category) => Object.assign(category, newValue),
      { immediate: false, deep: true },
    );

    const title = computed(() => {
      if (state.loading) return '';
      if (isNew()) return 'New Category';
      const getSelectedItem = store.getters['categoriesModule/selectedItem'];
      return getSelectedItem.name;
    });

    const rules = {
      name: [(v: string) => !!v || 'Name is required'],
    };
    return {
      state,
      title,
      rules,
      isNew,
      listCategory,
    };
  },
});
export default Component;
</script>

<style scoped></style>
