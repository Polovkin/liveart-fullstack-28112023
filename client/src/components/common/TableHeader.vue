<template>
  <v-toolbar flat color="white" class="mb-1 pt-3 pl-4">
    <slot name="left">
      <SearchBar :store-path="storePath" />
    </slot>
    <v-spacer />

    <slot name="right">
      <v-btn depressed small class="mb-2" color="primary" @click="showAddForm()">
        New Item
      </v-btn>
    </slot>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from '@/components/utils/SearchBar.vue';

const Component = defineComponent({
  name: 'TableHeader',

  components: {
    SearchBar,
  },

  props: {
    placeholder: {
      type: String,
      default: '',
    },
    storePath: {
      type: String,
      default: '',
    },
  },

  setup() {
    const router = useRouter();
    function showAddForm() {
      router.push(router.currentRoute.value.path + '/new');
    }

    return {
      showAddForm,
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
