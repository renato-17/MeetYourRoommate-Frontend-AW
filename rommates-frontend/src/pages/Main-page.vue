<template>
  <v-app>
    <v-main>
      <Header v-model="item.id"></Header>
      <v-container class="pt-0 pl-0 pr-0">
        <v-row align="center" justify="center">
            <v-col cols="12" md="12">
              <v-row>
                <v-col cols="6">
                  <v-card class="elevation-4 d-flex flex-column" color="grey">
                    <v-card-title class="align-self-center display-1 white--text">Hello {{item.firstName}}!</v-card-title>
                    <v-img :src="image" height="430px"></v-img>
                    <v-card-actions>
                      <v-btn @click="goToProfile(item.id)">Mi Profile</v-btn>
                      <v-btn @click="logout()">Logout</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col cols="6" class="pt-0">
                  <v-row align="center" justify="center">
                    <v-col cols="6">
                      <v-card class="elevation-4 mx-auto d-flex flex-column" color="red">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                               height="200px"></v-img>
                        <v-card-title class="align-self-center">PARTNERS</v-card-title>
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card class="elevation-4" color="red">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                               height="200px"></v-img>
                        <v-card-title class="align-self-center">ALOJAMIENTOS</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-card class="elevation-4" color="red">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                               height="200px"></v-img>
                        <v-card-title class="align-self-center">SOLICITUDES</v-card-title>
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card class="elevation-4" color="red">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                               height="200px"></v-img>
                        <v-card-title class="align-self-center">IMUEBLES FAVORITOS</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/pages/Header";
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
      this.$router.push({name: 'Student', params: {id: id} });
    },
    logout(){
      this.$router.push({name: 'Login' });
    }
  },
  created() {
    this.getById(this.$route.params.id);
  },
}
</script>

<style scoped>

</style>
