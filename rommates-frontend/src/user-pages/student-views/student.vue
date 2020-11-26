<template>
  <v-card>
    <v-card-title>
      <span class="headline">Student Profile</span>
    </v-card-title>

    <v-card-text >
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.firstName" label="FirstName"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.lastName" label="LastName"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.dni" label="Dni"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.phone" label="Phone"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.gender" label="Gender"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.address" label="Address"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.description" label="Description"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.hobbies" label="Hobbies"></v-text-field>
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
    <v-card-actions>
      <v-btn @click="logout">Logout</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import StudentService from "@/services/students-service"

export default {
name: "Student",

  data() {
    return{
      item: {}
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
    goBack(){
      this.$router.push({name: 'home'});
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({name: 'login'});
    }

  },
  computed: {
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if(!this.currentUser){
      this.$router.push('/login');
    }
  },
  created() {
    this.getById(this.currentUser.id);
  }


}
</script>

<style scoped>

</style>
