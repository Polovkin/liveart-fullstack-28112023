<template>
  <EntityDialog
    entity-type="tag"
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
        </v-row>
      </div>
    </template>
  </EntityDialog>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, watch, computed, ref } from 'vue';
import EntityDialog from '@/components/common/EntityDialog.vue';
import { Tag } from '../../../models/entities/Tag';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface State {
  entity: Tag;
  loading: boolean;
}

const Component = defineComponent({
  name: 'TagDialog',

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
    const tag = new Tag({});
    const store = useStore();
    const router = useRouter();
    const isNew = () => !props.id;

    let listTag = ref(<Tag[]>[]);

    onBeforeMount(async () => {
      if (!isNew()) {
        const res = await store.dispatch('tagModule/fetchItem', props.id);
        if (!res) router.back();
      }
      listTag.value = await store.dispatch(
        'tagModule/fetchAllItems',
        undefined,
      );
    });

    const state = reactive({
      entity: tag,
      loading: computed(() => store.getters['tagModule/loading']),
    }) as State;

    watch(
      () => store.getters['tagModule/selectedItem'],
      (newValue: Tag) => Object.assign(tag, newValue),
      { immediate: false, deep: true },
    );

    const title = computed(() => {
      if (state.loading) return '';
      if (isNew()) return 'New Tag';
      const getSelectedItem = store.getters['tagModule/selectedItem'];
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
      listTag,
    };
  },
});
export default Component;
</script>

<style scoped></style>
