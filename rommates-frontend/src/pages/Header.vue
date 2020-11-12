<template>

    <v-toolbar color="white" flat class="mt-0 elevation-4">
      <v-toolbar-title><img src="../assets/logo-m.png" alt="logo" id="logo" class="mt-3"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="goToInicio()">Inicio</v-btn>
        <v-btn text>Roommates</v-btn>
        <v-btn text>Anuncios</v-btn>
        <v-btn text>Mi Plan</v-btn>
        <v-btn text>Contáctanos</v-btn>
      </v-toolbar-items>
    </v-toolbar>

</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      id: 0
    }
  },
  methods: {
    goToInicio(){
      this.$router.go();
    }
  },
  created() {
    this.id = this.user_id;
  },
  props: ["user_id"],
}
</script>

<style scoped>
  #logo{
    margin-left: 50px;
    width: 60px;
    height: 61px;
  }
</style>
