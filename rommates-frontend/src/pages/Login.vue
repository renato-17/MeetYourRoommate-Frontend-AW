<template>
  <v-card>
    <v-container>
      <v-card-title CLASS="">
        Login Form
      </v-card-title>

      <v-card-text>
        <v-form v-model="item.isValid">
          <v-text-field
              label="Email"
              v-model="item.mail"
              :rules="[v=> !!v || 'Email is required']"
              required></v-text-field>
          <v-text-field
              label="Password"
              v-model="item.password"
              type="password"
              :rules="[v=> !!v || 'Password is required']"
              required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!item.isValid">Login</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import PeopleService from "@/services/people-service";

export default {
name: "Login",

  data(){
    return{
      item:{
        id: 0,
        mail: '',
        password: '',
        isValid: true
      }
    }
  },
  methods:{

    confirmData(){
      PeopleService.getPersonByData(this.mail,this.password)
          .then((response)=>{
            this.item = response.data;
            return true;
          })
          .catch(e=>{
            console.log(e);
            return false;
          })
    },
    login(){
      if(!this.confirmData()){
          this.$router.push({name: 'Home'});
      }else{
          this.$router.push({name:'Student', params: {id : this.item.id.toString()}});
      }
    }
  }
}
</script>

<style scoped>

</style>
