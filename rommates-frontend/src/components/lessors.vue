
<template>
    <v-card>
        <v-card-title>
            <span class="headline">Lessor Profile</span>
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
    import LessorService from '@/services/lessors-service';
    export default {
        name: "lessors",
        data() {
            return {
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
                    premium: false
                }
            }
        },
        methods: {
          getById(id){
              LessorService.get(id)
              .then((response) => {
                  this.item = response.data;
              })
              .catch(e => {
                  console.log(e);
              })
          }
        },
        created(){
            this.getById(this.$route.params.id);
        }
    }
</script>

<style scoped>

</style>