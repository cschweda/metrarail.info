<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>METRARAIL.</span>
        <span class="font-weight-light">INFO TEST</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="blue-grey"
        class="white--text"
        href="https://github.com/cschweda/metrarail.info.dev"
      >Github
        <v-icon right dark>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
