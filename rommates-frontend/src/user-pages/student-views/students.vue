<template>
  <v-app>
    <v-main>
      <Header></Header>
      <div id="app">
        <v-app id="inspire">
          <v-item-group active-class="primary">
            <v-container>
              <v-row>
                <v-col
                    v-for="item in items"
                    :key="item.id"
                    cols="12"
                    md="4"
                    class="border_all"
                >
                  <v-item>
                    <v-card
                        class="mx-auto d-flex flex-column elevation-10"
                        max-width="400"
                    >
                      <v-img
                          height="250"
                          :src="image"
                      ></v-img>

                      <v-card-title class="align-self-center card-title">{{ item.firstName }} {{ item.lastName }}</v-card-title>
                      <v-card-text class="card-text">
                        <v-row align="center">
                          <v-col cols="4">
                            <h3>AGE</h3>
                            <p class="student-card mt-2">{{item.birthdate}}</p>
                          </v-col>
                          <v-col>
                            <h3>DESCRIPTION</h3>
                            <p class="student-card mt-2">{{item.description}}</p>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions class="d-flex flex-column mb-2">
                        <v-btn class="btn" @click="goToProfile(item.id)">
                          Know more about me
                        </v-btn>
                      </v-card-actions>
                    </v-card>

                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-app>
      </div>
    </v-main>
  </v-app>

</template>

<script>
import Header from "@/user-pages/general-views/header";
import StudentService from "@/services/students-service";
import moment from 'moment';

export default {
name: "Students",
  components: {Header},
  data() {
    return {
      image: require("@/assets/roomate.jpg"),
      items: [],
      item:{}
    }
  },
  methods:{
    getStudents(){
      StudentService.getAll()
        .then((response)=>{
           let auxItems = response.data;
           auxItems.forEach((a)=>{
             if(a.id !== this.currentUser.id){
               this.items.push(a);
             }
           })
           this.items.forEach((a)=> a.birthdate = this.getAge(a.birthdate));
           console.log('this.item',this.items);
        })
        .catch(e=>{
          console.log(e);
        })
    },
    getAge(birthdate){
      let dateBirthdate = moment(birthdate);
      let today = moment();
      let age = 0;
      if(dateBirthdate < today){
        age = today.diff(dateBirthdate, 'years');
      }else{
        console.error("Birthdate can not be after than actual date");
      }
      return age.toString();
    },
    goToProfile(id){
      this.$router.push({name: 'student', params: {id: id} });
    },
  },
  computed: {
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  created() {
    this.getStudents();
  }

}

</script>


<style scoped>
  h2{
    font-family: "Comic Sans MS";
    font-weight: bold;
  }
  p{
    font-family: "Comic Sans MS";
    font-size: 18px;
  }
  .card-title{
    font-family: "Comic Sans MS";
    font-size: 30px;
  }

  .btn{
    background-color: #B3061A !important;
    color: white;
  }

  .card-text{
    width: auto;
    padding: 5px;
    margin: 0 20px 10px 20px;
    border-top: .05rem solid #d1d1d1;
    border-bottom: .05rem solid #d1d1d1;
  }
  .card-title{
    color: #B3061A;
  }

</style>
