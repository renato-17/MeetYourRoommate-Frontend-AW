<template>
  <v-app>
      <!--<v-app-bar app color="primary" dense dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>MEET YOUR ROOMMATE</v-toolbar-title>
        <div>
          <v-btn text to="/home">Home</v-btn>
          <v-btn text to="/users" v-if="currentUser">Users</v-btn>
        </div>
        <v-spacer></v-spacer>
        <div v-if="currentUser">
          <v-btn text to="/profile">Profile</v-btn>
          <v-btn text @click.prevent="logout">Sign Out</v-btn>
        </div>
        <div v-else>
          <v-btn text to="/register">Sign Up</v-btn>
          <v-btn text @click="goToLogin()">Sign In</v-btn>
        </div>
      </v-app-bar>-->
    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  components: {},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    discriminator(){
      return this.$store.state.auth.user.discriminator;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({name: 'login'});
    },
    goToLogin() {
      this.$router.push({name: 'login'});
    }
  },
  created() {

  }
}
</script>
<style>

</style>
