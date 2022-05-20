<template>
  <v-app>
    <v-app-bar app dark color="#456050">
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

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
