<template>
  <v-app>
    <v-main class="login-background">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-25 background-card">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="red accent-4 d-flex">
                      <v-card-text class="white--text mt-12 align-self-center mt-n3">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5 class="text-center">To keep connected with us please login with your personal info</h5>
                        <div class="text-center mt-4">
                          <v-btn rounded outlined dark @click="goBackToLogin()" class="pr-8 pl-8">LOGIN</v-btn>
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

                        <v-form v-model="firstValid" class="ml-8 mr-8">
                          <v-text-field
                              v-model="item.mail"
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="red accent-4"
                              :rules="emailRules"
                              required
                          ></v-text-field>
                          <v-text-field
                              v-model="item.password"
                              label="Password"
                              name="Password"
                              prepend-icon="lock"
                              type="password"
                              color="red accent-4"
                              :rules="passwordRules"
                              required
                          ></v-text-field>
                          <v-text-field
                              label="Confirm password"
                              name="Password"
                              prepend-icon="lock"
                              type="password"
                              color="red accent-4"
                              :rules=" [p => !!p || 'Password is required',
                                        p => (p && p.length >= 8) || 'Password must be more than 8 characters',
                                        p => (p === item.password ) || 'Passwords must be equals']"
                              required
                          ></v-text-field>
                        </v-form>
                        <div class="text-center mb-6 mt-6">
                          <v-btn rounded color="red accent-4" :disabled="!firstValid" @click="registerAsStudent">
                            REGISTER AS STUDENT
                          </v-btn>
                          <v-btn rounded color="red accent-4" class="pr-3 pl-3" :disabled="!firstValid"
                                 @click="registerAsLessor">REGISTER AS LESSOR
                          </v-btn>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
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
                        <v-form v-model="secondValid" class="ml-8 mr-8">
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                  v-model="item.firstName"
                                  :rules="[ v => !!v || 'Name is required']"
                                  label="First name"
                                  name="First name"
                                  type="text"
                                  color="red accent-4"/>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                  v-model="item.lastName"
                                  :rules="[ v => !!v || 'Name is required']"
                                  label="Last name"
                                  name="Last name"
                                  type="text"
                                  color="red accent-4"/>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                  v-model="item.dni"
                                  :rules="[v => !!v || 'Last Name is required']"
                                  label="Dni"
                                  name="Dni"
                                  type="text"
                                  color="red accent-4"/>
                              <v-text-field
                                  v-model="item.phone"
                                  :rules="[v => !!v || 'Phone is required', p => (p && p.length === 9) || 'Phone must be 9 characters']"
                                  label="Phone"
                                  name="Phone"
                                  type="phone"
                                  color="red accent-4"/>
                            </v-col>
                            <v-col cols="6">
                              <v-select :items="genders" v-model="item.gender" label="Gender" :rules="[v=>!!v || 'You must select one']"></v-select>

                              <v-text-field
                                  v-model="item.birthdate"
                                  :rules="[v => !!v || 'Birthdate is required']"
                                  label="Birthdate: YYYY-MM-DD"
                                  name="Birthdate"
                                  type="text"
                                  color="red accent-4"/>
                            </v-col>
                            <v-textarea
                                outlined
                                v-model="item.address"
                                :rules="[v => !!v || 'Address is required']"
                                label="Where do you live? Tell us"
                                name="Address"
                                rows="2"
                                type="text"
                                color="red accent-4"/>
                          </v-row>
                        </v-form>
                        <div class="text-center mb-6 mt-6">
                          <v-btn v-if="this.discriminator==='student'" :disabled="!secondValid" rounded color="red accent-4" class="pr-8 pl-8 mr-2" dark
                                 @click="step++">NEXT
                          </v-btn>
                          <v-btn v-else :disabled="!secondValid" rounded color="red accent-4" class="pr-8 pl-8 mr-2"
                                 @click="handleRegister()">REGISTER
                          </v-btn>
                          <v-btn rounded color="red accent-4" class="pr-8 pl-8 mr-2" @click="step--">BACK
                          </v-btn>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="3">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="red accent-4 d-flex">
                      <v-card-text class="white--text mt-12 align-self-center mt-n3">
                        <h1 class="text-center display-1">Only one step more!</h1>
                        <h5 class="text-center">Tell us more about you</h5>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-8">
                        <h1 class="text-center display-2 red--text text--accent-4 font-weight-bold">Create account</h1>
                        <v-form v-model="lastValid" class="ml-8 mr-8 mt-7">
                          <v-row>
                            <v-col cols="6">
                              <v-select :items="studyCenters" v-model="studyCenter.name" label="Study Center"
                                        v-on:change="getCampuses()" :rules="[v=>!!v || 'You must select one']"></v-select>
                            </v-col>
                            <v-col cols="6">
                              <v-select :items="campuses" v-model="campus.name" label="Campus"
                                        v-on:change="lookForCampus()" :rules="[v=>!!v || 'You must select one']"></v-select>
                            </v-col>
                          </v-row>
                          <v-textarea
                              outlined
                              v-model="item.description"
                              label="Write a short description about yourself"
                              name="Description"
                              rows="3"
                              type="text"
                              :rules="[v=>!!v || 'Description is required']"
                              color="red accent-4"/>
                          <v-textarea
                              outlined
                              v-model="item.hobbies"
                              label="Do you have any hobby? Write it please"
                              :rules="[v=>!!v || 'Hobbies is required']"
                              name="Hobbies"
                              rows="3"
                              type="text"
                              color="red accent-4"/>

                        </v-form>
                        <div class="text-center mb-6 mt-6">
                          <v-btn rounded color="red accent-4" class="pr-8 pl-8 mr-2" dark @click="step--">BACK
                          </v-btn>
                          <v-btn :disabled="!lastValid" rounded color="red accent-4" class="pr-8 pl-8 mr-2" dark @click="handleRegister">
                            COMPLETE REGISTER
                          </v-btn>
                        </div>

                      </v-card-text>
                    </v-col>
                  </v-row>
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
import StudyCenterService from "@/services/study-center-service";
import CampusService from "@/services/campus-service";

export default {
  name: "Student-register",
  data: () => ({

    firstValid: true,
    secondValid: true,
    lastValid: true,

    discriminator: '',
    step: 1,

    submitted: false,
    successful: false,
    message: '',

    genders: ['Male', 'Female'],

    studyCenterItems: [],
    studyCenters: [],
    studyCenter: {
      id: 0,
      name: ''
    },

    campusesItems: [],
    campuses: [],
    campus: {
      id: 0,
      name: '',
      address: ''
    },

    item: {},

    defaultItem: {},

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      p => !!p || 'Password is required',
      p => (p && p.length >= 8) || 'Password must be more than 8 characters',
    ],

  }),
  methods: {
    goBackToLogin() {
      this.$router.push('/login');
    },
    handleRegister() {
      let isValid = false;
      this.message = '';
      this.submitted = true;

      if(this.discriminator === 'lessor') {
        this.item.premium = false;
        isValid=this.secondValid;
      }else{
        this.item.campusId = this.campus.id;
        this.item.studyCenterId = this.studyCenter.id;
        this.item.smoker = false;
        isValid=this.lastValid;
      }

      this.item.discriminator = this.discriminator;

      if (isValid) {
        console.log(this.item);
        this.$store.dispatch('auth/register', this.item).then(
            response => {
              this.message = response.message;
              this.successful = true;
              this.$router.push({name:'login'})
            },
            error => {
              this.message = (error.response && error.response.data)
                  || error.message || error.toString();
              this.successful = false;
            }
        )
      }
    },
    getStudyCenters() {
      StudyCenterService.getByAll()
          .then((response) => {
            this.studyCenterItems = JSON.parse(JSON.stringify(response.data));
            this.studyCenterItems.forEach((a) => {
              this.studyCenters.push(a.name);
            })
          })
    },
    lookForStudyCenter() {
      this.studyCenterItems.forEach(
          (a) => {
            if (this.studyCenter.name === a.name)
              this.studyCenter.id = a.id;
          }
      )
    },
    getCampuses() {
      this.campuses = [];
      this.lookForStudyCenter();

      CampusService.getByStudyCenterId(this.studyCenter.id)
          .then((response) => {
            this.campusesItems = JSON.parse(JSON.stringify(response.data));
            this.campusesItems.forEach((a) => {
              this.campuses.push(a.name);
            })
          })
    },
    lookForCampus() {
      this.campusesItems.forEach(
          (a) => {
            if (this.campus.name === a.name)
              this.campus.id = a.id;
          }
      )
    },
    registerAsStudent() {
      this.discriminator = 'student';
      this.step++;
    },
    registerAsLessor() {
      this.discriminator = 'lessor';
      this.step++;
    }
  },
  created() {
    this.getStudyCenters();
    this.item = this.defaultItem;
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

