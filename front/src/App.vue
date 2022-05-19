<template>
  <v-app>
    <v-app-bar app dark>
      <v-row justify="center">
        <v-col cols="auto">
          <h1>SolarMarket Contacts</h1>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default Vue.extend({
  data: () => ({
    value: 10,
  }),
});
</script>
