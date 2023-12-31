<template>
  <EntityPage
      entity-type="product"
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
                label="Category ID"
                variant="outlined"
                hide-details="auto"
                :items="listCategory"
                item-title="name"
                item-value="id"
                data-test="product-categoryId"
            />
          </v-col>
          <v-col cols="12">
            <v-select
                v-model="state.entity.isHidden"
                label="Is Hidden"
                variant="outlined"
                hide-details="auto"
                :items="isHiddenValues"
                item-title="name"
                item-value="id"
                data-test="product-isHidden"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="state.entity.description"
                label="Description"
                variant="outlined"
                hide-details="auto"
                data-test="product-categoryId"
            />
          </v-col>
          <v-col cols="12">
            <v-select
                v-model="state.entity.tags"
                label="Tags"
                variant="outlined"
                hide-details="auto"
                item-title="name"
                item-value="id"
                data-test="product-isHidden"
                chips
                :items="tags"
                multiple
            ></v-select>
          </v-col>
          <v-col cols="12">
            Upload image
            <v-file-input
                @change="updateImage"
                :rules="imageValidationRules"
                label="Image"
                outlined
                hide-details="auto"
                data-test="product-image"
                accept="image/png, image/jpeg"
            />
          </v-col>
        </v-row>
      </div>
    </template>
  </EntityPage>
</template>

<script lang="ts">
import EntityPage from '@/components/common/EntityPage.vue';
import {computed, defineComponent, onBeforeMount, reactive, ref, Ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {Product} from '../../../models/entities/Product';
import {Tag} from "../../../models/entities/Tag";

interface State {
  entity: Product;
  loading: boolean;
}

const Component = defineComponent({
  name: 'ProductDialog',

  components: {
    EntityPage,
  },

  props: {
    id: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const product = new Product({});
    const isNew = () => !props.id;
    let listCategory: Ref<string[]> = ref([]);


    const tags = ref<Tag[]>([]);

    onBeforeMount(async () => {
      if (!isNew()) {
        const res = await store.dispatch(`productsModule/fetchItem`, props.id);
        if (!res) router.back();
      }
      listCategory.value = await store.dispatch(
          'categoriesModule/fetchAllItems',
          undefined,
      );

      tags.value = await store.dispatch(
          'tagModule/fetchAllItems',
          undefined,
      );
    });

    const state = reactive({
      entity: product,
      loading: computed(() => store.getters['productsModule/loading']),
    }) as State;

    watch(
        () => store.getters['productsModule/selectedItem'],
        (newValue: Product) => {
          Object.assign(product, newValue)
        },
        {immediate: false, deep: true},
    );

    const updateImage = (event: any) => {
      const file = event.target.files[0];
      // Prevent upload input data, if ve press cancel button
      if (!file || !file.type.includes('image')) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          state.entity.previewImage = reader.result as string;
        }
      };
    };

    const title = computed(() => {
      if (state.loading) return '';
      if (isNew()) return 'New Product';
      const getSelectedItem = store.getters['productsModule/selectedItem'];
      return getSelectedItem.name;
    });
    const rules = {
      name: [(v: string) => !!v || 'Name is required'],
    };

    const imageValidationRules = [
      value => !value || !value.length || value[0].size < 2000000 || 'Image size should be less than 2 MB!',
      value => {
        const file = value[0];
        if (!file) return true;
        const isValidType = file.type === 'image/png' || file.type === 'image/jpeg';
        return isValidType || 'Image should be in PNG or JPEG format!'
      }
    ];

    return {
      updateImage,
      state,
      title,
      rules,
      isNew,
      listCategory,
      imageValidationRules,
      tags,
      isHiddenValues: [
        {id: true, name: 'Yes'},
        {id: false, name: 'No'},
      ],
    };
  },
});
export default Component;
</script>

<style scoped></style>
