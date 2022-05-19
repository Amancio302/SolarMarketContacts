<template>
  <v-container>
    <v-card outlined>
      <v-row no-gutters align="center">
        <v-col>
          <v-card-title>
            {{ title }}
          </v-card-title>
        </v-col>
        <v-col v-for="action in actions" :key="action.name" cols="auto">
          <v-btn
            :color="action.color"
            :icon="!!action.icon"
            :text="!action.icon"
            :x-small="action.xSmall"
            :small="action.small"
            :large="action.large"
            :x-large="action.xLarge"
            @click="$emit(action.name, $event)"
          >
            <v-icon
              v-if="!!action.icon"
              :x-small="action.xSmall"
              :small="action.small"
              :large="action.large"
              :x-large="action.xLarge"
            >
              {{ action.icon }}
            </v-icon>
            <div v-else>
              {{ action.text }}
            </div>
          </v-btn>
        </v-col>
      </v-row>
      <slot></slot>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

import { IDefaultCardAction } from "../../models/DefaultCardInterfaces";

export default Vue.extend({
  name: "DefaultCardComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    actions: {
      type: Array as () => IDefaultCardAction[],
    },
  },
});
</script>

<style></style>
