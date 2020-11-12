<template>
  <v-app>
    <v-main class="login-background">
      <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-25 background-card">
                  <v-window v-model="step" >
                    <v-window-item :value="1">
                      <v-row>
                        <v-col cols="12" md="8">
                          <v-card-text class="mt-6">
                            <h1 class="text-center display-2 red--text text--accent-4 font-weight-bold" id="title1"> Login in to MeetYourRoommate</h1>
                            <div class="text-center mt-6">
                              <v-btn class="mx-2" fab color="black" outlined>
                                <v-icon>fab fa-facebook-f</v-icon>
                              </v-btn>
                              <v-btn class="mx-2" fab color="black" outlined>
                                <v-icon>fab fa-google-plus-g</v-icon>
                              </v-btn>
                              <v-btn class="mx-2" fab color="black" outlined>
                                <v-icon>fab fa-twitter</v-icon>
                              </v-btn>
                            </div>
                            <h4 class="text-center mt-4">Ensure your email for registration</h4>
                            <v-form class="ml-8 mr-8">
                              <v-text-field
                                v-model="mail"
                                label="Email"
                                name="Email"
                                prepend-icon="email"
                                type="text"
                                color="red accent-4"></v-text-field>
                              <v-text-field
                                v-model="password"
                                label="Password"
                                name="Password"
                                prepend-icon="lock"
                                type="password"
                                color="red accent-4"></v-text-field>
                            </v-form>
                            <h3 class="text-center mt-3">Forget your password ?</h3>
                          </v-card-text>
                          <div class="text-center mb-6">
                            <v-btn rounded color="red accent-4" class="pr-8 pl-8" dark @click="confirmData">LOGIN</v-btn>
                          </div>
                        </v-col>
                        <v-col cols="12" md="4" class="red accent-4 d-flex">
                          <v-card-text class="white--text align-self-center mt-n3">
                            <h1 class="text-center display-1">Hello Friends!</h1>
                            <h5 class="text-center">Enter your personal details and start journal with us</h5>
                            <div class="text-center mt-4">
                              <v-btn rounded outlined="" dark @click="step++" class="pr-8 pl-8">SIGN UP</v-btn>
                            </div>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-window-item>
                    <v-window-item :value="2">
                      <v-row class="fill-height">
                        <v-col cols="12" md="4" class="red accent-4 d-flex">
                          <v-card-text class="white--text mt-12 align-self-center mt-n3">
                            <h1 class="text-center display-1">Welcome Back!</h1>
                            <h5 class="text-center">To keep connected with us please login with your personal info</h5>
                            <div class="text-center mt-4">
                              <v-btn rounded outlined dark @click="step--" class="pr-8 pl-8">LOGIN</v-btn>
                            </div>
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" md="8">
                          <v-card-text class="mt-8">
                            <h1 class="text-center display-2 red--text text--accent-4 font-weight-bold">Create account</h1>
                            <div class="text-center mt-4">
                              <v-btn class="mx-2" fab color="black" outlined>
                                <v-icon>fab fa-facebook-f</v-icon>
                              </v-btn>
                              <v-btn class="mx-2" fab color="black" outlined>
                                <v-icon>fab fa-google-plus-g</v-icon>
                              </v-btn>
                              <v-btn class="mx-2" fab color="black" outlined>
                                <v-icon>fab fa-twitter</v-icon>
                              </v-btn>
                            </div>
                            <v-form class="ml-8 mr-8">
                              <v-text-field
                                  v-model="rMail"
                                  label="Email"
                                  name="Email"
                                  prepend-icon="email"
                                  type="text"
                                  color="red accent-4"/>
                              <v-text-field
                                  v-model="rPassword"
                                  label="Password"
                                  name="Password"
                                  prepend-icon="lock"
                                  type="password"
                                  color="red accent-4"/>
                              <v-text-field
                                  v-model="cPassword"
                                  label="Confirm password"
                                  name="Password"
                                  prepend-icon="lock"
                                  type="password"
                                  color="red accent-4"/>
                            </v-form>
                            <div class="text-center mb-6 mt-6">
                              <v-btn rounded color="red accent-4" class="pr-8 pl-8 mr-2" dark @click="step=3">LOGIN AS STUDENT</v-btn>
                              <v-btn rounded color="red accent-4" class="pr-8 pl-8 ml-2" dark>LOGIN AS LESSOR</v-btn>
                            </div>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-window-item>
                    <v-window-item :value="3">
                      <StudentRegister></StudentRegister>
                    </v-window-item>
                  </v-window>
              </v-card>
            </v-col>
          </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import PeopleService from "@/services/people-service";
import StudentRegister from "@/pages/Student-register";

export default {
name: "Login",
  components: {StudentRegister},
  data: () =>({
    step: 1,
    mail: '',
    password: '',
    cPassword: '',
    rMail: '',
    rPassword: '',
    user:{
      id: 0,
      discriminator: '',
    }

  }),

  methods: {
    confirmData(){

      PeopleService.getPersonByData(this.mail,this.password)
          .then((response)=>{
            this.user = response.data;
            this.enterToTheApplication(response.data.id);
          })
          .catch(e=>{
            console.log(e);
            return false;
          })
    },
    enterToTheApplication(id){
        this.$router.push({name: 'HomeApp', params: {id: id} });
    }
  }
}
</script>

<style scoped>
  .login-background{
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(../assets/login-fondo.jpeg);
    background-position: center;
  }

  .background-card{
    background-color: rgba(365,365,365,0.8);
  }
</style>
