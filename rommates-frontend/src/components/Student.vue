<template>
  <v-card>
    <v-card-title>
      <span class="headline">Student Profile</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Tutorial Id"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.title" label="Tutorial Title"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.description" label="Description"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-checkbox v-model="item.published" label="Published"></v-checkbox>
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import StudentService from "@/services/students-service"

export default {
name: "Student",
  data(){
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
    retrievePerson(id) {
      StudentService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

  },
  created() {
    this.retrievePerson(this.$route.params.id);
  }

}
</script>

<style scoped>

</style>
