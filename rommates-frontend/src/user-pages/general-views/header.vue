<template>

    <v-toolbar color="white" flat class="mt-0 elevation-4">
      <v-toolbar-title><img src="../../assets/logo-m.png" alt="logo" id="logo" class="mt-3"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="currentUser.discriminator === 'student'">
        <v-btn text @click="goToInicio">Inicio</v-btn>
        <v-btn text @click="goToStudents">Roommates</v-btn>
        <v-btn text @click="goToAds">Anuncios</v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn text @click="goToPerfilLessor">Perfil</v-btn>
        <v-btn text @click="goToMyProperties">Mis propiedades</v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

</template>

<script>
export default {
  name: "Header",

  data() {
    return {

    }
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  methods: {
    goToInicio(){
      this.$router.push({name: 'student-home'});
    },
    goToAds(){
      this.$router.push({name: 'ads'});
    },
    goToStudents(){
      this.$router.push({name: 'students'});
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({name: 'login'});
    },
    goToPerfilLessor(){
      this.$router.push({name: 'lessors', params: {id: this.currentUser.id}});
    },
    goToMyProperties(){
      this.$router.push({ name: 'properties', params: { id: this.currentUser.id} })
    }
  }
}
</script>

<style scoped>
  #logo{
    margin-left: 50px;
    width: 60px;
    height: 61px;
  }
</style>
