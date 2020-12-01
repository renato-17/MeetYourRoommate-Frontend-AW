<template>
  <v-app>
    <v-container>
      <v-card>
        <v-container mx>
          <v-card-title>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
              <v-row align="center" class="fill-height text-center">
                <v-col class="pa-0" cols="12">
                  <v-avatar class="profile" color="grey" size="164" tile>
                    <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                  </v-avatar>
                </v-col>
                <v-col>
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content>
                      <v-list-item-title class="title">
                        <p class="text-h1"> {{ item.firstName }} {{ item.lastName }} </p>
                      </v-list-item-title>
                      <v-list-item-subtitle>Student</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-img>
          </v-card-title>
        </v-container>
        <v-container>
          <v-card-text>
            <v-row>
              <v-col>
                <v-card>
                  <div class="text-center d-flex flex-column">
                    <v-card-title class="align-self-center">Information</v-card-title>
                    <v-card-text>
                      <p>
                        Dni: {{ item.dni }}<br>
                        Phone: {{ item.phone }}<br>
                        Gender: {{ item.gender }}<br>
                        Mail: {{ item.mail }}<br>
                        Birthday: {{ item.birthdate }}<br>
                      </p>
                    </v-card-text>
                    <div v-if="item.id === currentUser.id">
                      <v-col>
                        <v-row class="d-flex flex-row-reverse">
                          <v-card-actions>
                            <v-btn class="mx-2" fab dark large color="red accent-4">
                              <v-icon dark>
                                mdi-pencil
                              </v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-row>
                      </v-col>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12" md="6" v-if="item.id === currentUser.id">
                <v-card>
                  <v-card-text class="grey lighten-5 text-center">
                    <v-btn color="primary" @click="hiddenR = !hiddenR">
                      Request
                    </v-btn>
                  </v-card-text>
                  <v-card-text>
                    <v-data-table :headers="headersLease" :items="displayLeases" :items-per-page="5" :search="search"
                                  class="elevation-1" ref="leaseTable" v-show="!hiddenR">
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="acceptFriend(item.personOneId)" color="green">mdi-plus
                        </v-icon>
                        <v-icon small class="mr-2" @click="rejectFriend(item.personOneId)" color="red">mdi-minus</v-icon>
                        <v-icon small class="mr-2" @click="goToPerfil(item.id)" color="red">mdi-account</v-icon>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>
        <v-card-actions>
          <v-btn @click="goBack">BACK INICIO</v-btn>
          <v-btn v-if="item.id !== currentUser.id" @click="goBackPerfil">BACK PERFIL</v-btn>
          <v-btn v-if="item.id !== currentUser.id" @click="sendFriendRequest(item.id)">SEND FRIEND REQUEST</v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title>¡Solicitud enviada!</v-card-title>
          <v-card-text>Solo queda esperar a que el propietario acepte tu solicitud</v-card-text>
          <v-card-actions>
            <v-btn @click="dialog=false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </v-app>
</template>

<script>
import StudentService from "@/services/students-service"
import FriendRequestService from "@/services/friend-request-service";

export default {
  name: "Student",

  data() {
    return {
      search: '',
      item: {},
      dialog: false,

      headersLease: [
        {text: 'Name', value: 'firstName'},
        {text: 'LastName', value: 'lastName'},
        {text: 'Status', value: 'status'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      leases: [],
      displayLeases: [],
      students: {},
      hiddenR: false,
      hiddenP: false,
      student:{}
    }
  },
  methods: {
    getById(id) {
      StudentService.getById(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },
    getAllReceivedLease(id) {
      FriendRequestService.getAllReceivedFriendRequest(id)
          .then((response) => {
            this.leases = response.data;
            this.displayLeases = response.data.map(this.getDisplayLease);
          })
          .catch(e => {
            console.log(e);
          });
    },
    getDisplayLease(lease) {
      let student = {
        id:0,
        firstName: '',
        lastName: '',
        status: lease.statusDetail,
      };

      let item1 ={};
       StudentService.getById(lease.personOneId)
          .then((response) => {
            item1 = response.data;
            student.id = item1.id;
            student.firstName= item1.firstName;
            student.lastName = item1.lastName;
            console.log(student);
          })
      console.log(student);
      return student;
    },
    acceptFriend(personOneId) {
      console.log(personOneId)
          FriendRequestService.update(1, this.$route.params.id, 2)
    },
    sendFriendRequest(id){
      console.log(id);
      FriendRequestService.create(this.currentUser.id,id).then(
          () =>{
            this.dialog = true;
          }
      )
    },
    goBack() {
      this.$router.push({name: 'student-home'});
    },
    goBackPerfil() {
      this.refresh(this.currentUser.id);
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({name: 'login'});
    },
    refresh(id){
      this.getById(id);
      this.getAllReceivedLease(id);
    },
    goToPerfil(id){
      this.refresh(id);
    }
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  created() {
    this.getById(this.$route.params.id);
    this.getAllReceivedLease(this.$route.params.id);
  }


}
</script>

<style scoped>

</style>
