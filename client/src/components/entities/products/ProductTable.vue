<template>
  <EntityTable :entity-type="entityType" :headers="state.headers" :product-tags="tags" />
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, ref} from 'vue';
import {EntityType} from '../../../store/entityModules/types';
import EntityTable from '../../common/EntityTable.vue';
import {Tag} from "../../../models/entities/Tag";
import {useStore} from "vuex";

const Component = defineComponent({
  name: 'ProductTable',

  components: {
    EntityTable,
  },

  setup() {
    const entityType = EntityType.PRODUCT;
    const store = useStore();
    const tags = ref<Tag[]>([]);
    const state = reactive({
      headers: [
        { title: 'Name', key: 'name', sortable: true, searchable: true },
        { title: 'Thumbnail', key: 'previewImage', sortable: false },
        { title: 'Category ID', key: 'categoryId', sortable: true },
        { title: 'Description', key: 'description', sortable: false },
        { title: 'Is Hidden', key: 'isHidden', sortable: true },
        { title: 'Tags', key: 'tags', sortable: true },
        { title: 'Details', key: 'actions', sortable: false },
      ],
    });

    onBeforeMount(async () => {
      tags.value = await store.dispatch(
          'tagModule/fetchAllItems',
          undefined,
      );
    });

    return {
      tags,
      entityType,
      state,
    };
  },
});
export default Component;
</script>

<style lang="scss" scoped></style>
