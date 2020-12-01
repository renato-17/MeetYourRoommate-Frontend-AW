<template>
  <v-app>
    <v-main class="login-background">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-25 background-card">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-6">
                    <h1 class="text-center display-2 red--text text--accent-4 font-weight-bold" id="title1"> Login in to
                      MeetYourRoommate</h1>
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
                    <v-form v-model="isValid" class="ml-8 mr-8">
                      <v-card-text>
                      <v-text-field
                          label="Mail"
                          v-model="user.mail"
                          :rules="[v => !!v || 'Mail is required']"
                          required
                          name="Email"
                          prepend-icon="email"
                          type="text"
                          color="red accent-4"></v-text-field>
                      <v-text-field
                          label="Password"
                          v-model="user.password"
                          :rules="[v => !!v || 'Password is required']"
                          required
                          name="Password"
                          prepend-icon="lock"
                          type="password"
                          color="red accent-4"></v-text-field>
                      </v-card-text>
                      <h3 class="text-center mt-3">Forget your password ?</h3>
                      <div class="text-center">
                        <v-btn rounded color="red accent-4" class="pr-8 pl-8 mt-5 align-self-center" dark :disabled="!isValid" @click="handleLogin">
                          Login</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>

                </v-col>
                <v-col cols="12" md="4" class="red accent-4 d-flex">
                  <v-card-text class="white--text align-self-center mt-n3">
                    <h1 class="text-center display-1">Hello Friends!</h1>
                    <h5 class="text-center">Enter your personal details and start journal with us</h5>
                    <div class="text-center mt-4">
                      <v-btn rounded outlined="" dark @click="goToRegister()" class="pr-8 pl-8">SIGN UP</v-btn>
                    </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


import User from "@/models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User('', '', '', ''),
      loading: false,
      message: '',
      isValid: true
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser(){
      return this.$store.state.auth.user;
    }
  },
  created() {
    if(this.loggedIn){
      this.$router.push({name: 'student-home'});
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      console.log('Starting Login handling');
      if (!this.isValid) {
        console.log('Invalid');
        this.loading = false;
        return;
      }
      if (this.user.username !== '' && this.user.password !== '') {
        console.log(this.user);
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              console.log('Logged In');
              console.log(this.$store.state.auth.user.discriminator);

              if(this.$store.state.auth.user.discriminator === 'student'){
                this.$router.push({name: 'student-home'});
              }else{
                console.log(this.$store.state.auth.user.id);
                this.$router.push({name: 'lessors', params: {id: '2' }});
              }
            },
            error => {
              console.log('Error');
              this.loading = false;
              this.message = (error.response && error.response.data)
                  || error.message || error.toString();
            }
        )
      }
    },
    goToRegister(){
      this.$router.push({name: 'register'})
    }
  }
}
</script>

<style scoped>
.login-background {
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(../assets/login-fondo.jpeg);
  background-position: center;
}

.background-card {
  background-color: rgba(365, 365, 365, 0.8);
}
</style>
