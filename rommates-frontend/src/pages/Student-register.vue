<template>
  <v-window v-model="studentStep">
    <v-window-item :value="1">
      <v-row class="fill-height">
        <v-col cols="12" md="4" class="red accent-4 d-flex">
          <v-card-text class="white--text mt-12 align-self-center mt-n3">
            <h1 class="text-center display-1">Welcome Student!</h1>
            <h5 class="text-center">To keep connected with us please login with your personal info</h5>
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
              <v-row>
                <v-col cols="6">
                  <v-text-field
                      v-model="mail"
                      label="First name"
                      name="First name"
                      type="text"
                      color="red accent-4"/>
                  <v-text-field
                      v-model="mail"
                      label="Email"
                      name="Email"
                      prepend-icon="email"
                      type="text"
                      color="red accent-4"/>

                </v-col>
                <v-col cols="6">
                  <v-text-field
                      v-model="password"
                      label="Last name"
                      name="Last name"
                      type="text"
                      color="red accent-4"/>
                  <v-text-field
                      v-model="password"
                      label="Password"
                      name="Password"
                      prepend-icon="lock"
                      type="password"
                      color="red accent-4"/>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      v-model="password"
                      label="Dni"
                      name="Dni"
                      type="text"
                      color="red accent-4"/>
                  <v-text-field
                      v-model="password"
                      label="Phone"
                      name="Phone"
                      prepend-icon="phone"
                      type="password"
                      color="red accent-4"/>
                </v-col>
                <v-col cols="6">
                  <v-select :items="genders" label="Gender"></v-select>
                  <v-text-field
                      v-model="password"
                      label="Birthdate: YYYY-MM-DD"
                      name="Birthdate"
                      type="text"
                      color="red accent-4"/>
                </v-col>

              </v-row>
            </v-form>
            <div class="text-center mb-6 mt-6">
              <v-btn rounded color="red accent-4" class="pr-8 pl-8 mr-2" dark @click="studentStep++">NEXT</v-btn>
              <v-btn rounded color="red accent-4" class="pr-8 pl-8 mr-2" dark @click="goBackToLogin()">BACK TO LOGIN</v-btn>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item :value="2">
      <v-row class="fill-height">
        <v-col cols="12" md="4" class="red accent-4 d-flex">
          <v-card-text class="white--text mt-12 align-self-center mt-n3">
            <h1 class="text-center display-1">Only one step more!</h1>
            <h5 class="text-center">To keep connected with us please login with your personal info</h5>
            <div class="text-center mt-4">
              <v-btn rounded outlined dark @click="step--" class="pr-8 pl-8">LOGIN</v-btn>
            </div>
          </v-card-text>
        </v-col>
        <v-col cols="12" md="8">
          <v-card-text class="mt-8">
            <h1 class="text-center display-2 red--text text--accent-4 font-weight-bold">Create account</h1>
            <v-form class="ml-8 mr-8 mt-7">
              <v-textarea
                  outlined
                  v-model="mail"
                  label="Write a short description about yourself"
                  name="Description"
                  type="text"
                  color="red accent-4"/>
              <v-textarea
                  outlined
                  v-model="mail"
                  label="Do you have any hobby? Write it please"
                  name="Hobbies"
                  type="text"
                  color="red accent-4"/>
            </v-form>
           
            <div class="text-center mb-6 mt-6">
              <v-btn rounded color="red accent-4" class="pr-8 pl-8 mr-2" dark @click="studentStep--">BACK</v-btn>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>
</template>

<script>
import StudyCenterService from "@/services/study-center-service";

export default {
  name: "Student-register",
  data: ()=>({
    studentStep: 1,
    mail: null,
    password: null,
    genders: ['Male','Female'],
    studyCenters: [],
    center:{
      id:0,
      name:''
    },
    campuses: []
  }),
  methods: {
    goBackToLogin(){
      this.$router.go();
    },
    getStudyCenters(){
      StudyCenterService.getByAll()
          .then((response)=>{
            this.studyCenters = response.data;

          })
    }
  },
  created() {
    this.mail = this.rMail;
    this.getStudyCenters();
  }
}
</script>

<style scoped>

</style>
