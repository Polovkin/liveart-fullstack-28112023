<template>
  <v-snackbar v-model="snack" :color="state.color" bottom>
    {{ state.message }}

    <template #actions>
      <v-btn variant="text" size="small" icon @click="dismissAlert">
        <v-icon icon="mdi-close" />
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { Store } from 'vuex';
import { RootState } from '../../store/Store';

const Component = defineComponent({
  name: 'UpdateAlert',

  setup() {
    const store: Store<RootState> = useStore();

    const snack = computed({
      get: () => state.message !== '',
      set: (val: boolean) => {
        if (!val) dismissAlert();
      },
    });

    const state = reactive({
      color: computed(() => store.getters['uiModule/alertColor']),
      message: computed(() => store.getters['uiModule/alertMessage']),
    });

    function dismissAlert() {
      store.dispatch('uiModule/removeAlert');
    }

    return {
      snack,
      state,
      dismissAlert,
    };
  },
});

export default Component;
</script>

<style></style>
