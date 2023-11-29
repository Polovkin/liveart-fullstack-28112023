<template>
  <v-dialog v-model="state.dialog" max-width="450">
    <template #activator="{ props }">
      <slot name="activator-btn" :on="props" />
    </template>

    <v-card>
      <v-card-text class="body-1 text--primary pt-5">
        {{ confirmMessage }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="no()"> No </v-btn>
        <v-btn color="error" variant="text" @click="yes()"> Yes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'vue';

interface State {
  dialog: boolean;
}

const Component = defineComponent({
  name: 'ConfirmationDialog',

  props: {
    confirmMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['confirmed'],

  setup(ctx, { emit }: SetupContext) {
    const state = reactive({
      dialog: false,
    }) as State;

    function no() {
      state.dialog = false;
      emit('confirmed', false);
    }

    function yes() {
      state.dialog = false;
      emit('confirmed', true);
    }
    return {
      ctx,
      state,
      no,
      yes,
    };
  },
});

export default Component;
</script>

<style scoped></style>
