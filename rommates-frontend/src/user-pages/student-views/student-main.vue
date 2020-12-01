<template>
  <v-app>
    <v-main>
      <Header></Header>
      <v-container class="pt-0 pl-0 pr-0">
        <v-row align="center" justify="center">
            <v-col cols="6" md="6">
                  <v-card class="elevation-4 d-flex flex-column" color="grey" width="500px">
                    <v-card-title class="align-self-center display-1 white--text">Hello {{item.firstName}}!</v-card-title>
                    <v-img :src="image" height="430px"></v-img>
                    <v-card-actions class="d-flex justify-center" >
                      <v-btn @click="goToProfile(item.id)">Mi Profile</v-btn>
                      <v-btn @click="logout">LOG OUT</v-btn>
                    </v-card-actions>
                  </v-card>
            </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/user-pages/general-views/header";
import StudentService from "@/services/students-service";

export default {
name: "Main-page",
  components: {Header},
  data() {
    return{
      image: require("@/assets/roomate.jpg"),
      item: {
        id:0,
        firstName: '',
        lastName: ''
      }
    }
  },
  methods: {
    getById(id){
      StudentService.getById(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },
    goToProfile(id){
      this.$router.push({name: 'student', params: {id: id} });
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({name: 'login'});
    },
  },
  computed: {
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if(!this.loggedIn){
      this.$router.push({name: 'login'});
    }
    if(this.currentUser) {
      this.getById(this.currentUser.id);
    }
  },
}
</script>

<style scoped>

</style>
