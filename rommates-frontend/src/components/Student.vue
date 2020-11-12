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
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>

</template>

<script>
import StudentService from "@/services/students-service"

export default {
name: "Student",
  data() {
    return{
      item: {
        id:0,
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
        gender: '',
        address: '',
        password: '',
        mail: '',
        birthdate: '',
        description: '',
        hobbies: '',
        smoker: false
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
    }

  },
  created() {
    this.getById(this.$route.params.id);
  }

}
</script>

<style scoped>

</style>
