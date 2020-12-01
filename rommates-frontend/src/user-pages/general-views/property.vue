<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card class="mx-auto" color="#F9603D" dark>
          <v-container>
            <v-img height="500px" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
          </v-container>
          <v-card-title>
            Property
          </v-card-title>
          <v-card-text class="text--primary">
            <v-container>
              <v-row align="center" class="mx-0">
                <p>Description</p>
                <v-col cols="12" sm="12" md="12">
                  <p>{{ item.description }}</p>
                </v-col>
              </v-row>
              <v-row class="row-address">
                <p>Address</p>
                <v-col>
                  <p> {{ item.address }}</p>
                </v-col>
              </v-row>
              <v-row>
                <p>Lessor</p>
                <v-col>
                  <p>
                    {{ lessor.firstName }} {{ lessor.lastName }}
                  </p>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row class="d-flex justify-center mb-6">
                <v-col cols="12" sm="6" md="4">
                  SquareMeters: {{ details.squareMeters}}
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  Rooms: {{ details.rooms}}
                </v-col>
              </v-row>
              <v-row class="d-flex justify-center mb-6">
                <v-col cols="12" sm="6" md="4">
                  Bathrooms: {{ details.bathrooms}}
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  Kitchen: {{details.kitchen}}
                </v-col>
              </v-row>
              <v-row class="d-flex justify-center mb-6">
                <v-col cols="12" sm="6" md="4">
                  Livingroom: {{details.livingroom}}
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  Price: S/{{details.price}}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn @click="sendRequest" color="#770000">
                  Contactar
                </v-btn>
              </v-col>
              <v-col>
                <v-btn @click="goToLessorProfile(lessor.id)" color="#770000">
                  Ver perfil de Lessor
                </v-btn>
              </v-col>
              <v-col>
                <v-btn @click="goBack" color="#770000">
                  Go Back
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

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
</template>

<script>
import PropertyService from '../../services/property-service';
import LeaseRequestService from '../../services/lease-request-service';
import PropertyDetailService from '@/services/property-details-service';

export default {
  name: "property",
  data() {
    return {
      details: {
        squareMeters: 0,
        rooms: 0,
        bathrooms: 0,
        kitchen: 0,
        livingroom: 0,
        price: 0
      },
      data: {
        propertyId: 0
      },
      item: {},
      lessor: {},
      dialog: false,

    }
  },
  methods: {
    getById(id) {
      PropertyService.get(id)
          .then((response) => {
            this.item = response.data;
            this.lessor = response.data.lessor;
            // To print data
            console.log('this.item', this.item)
          })
          .catch(e => {
            console.log(e);
          })
    },
    sendRequest() {
      this.data.propertyId =  Number(this.$route.params.id);
      LeaseRequestService.create(this.$store.state.auth.user.id,this.lessor.id,this.data).then(
          (response)=>{
            console.log(response.data);
            this.dialog = true;
          }
      )
    },
    getPropertyDetail(id){
      PropertyDetailService.get(id)
          .then((response) => {
            this.details = response.data;
            // To print data
            console.log('this.details', this.details)
          })
          .catch(e=> {
            console.log(e);
          })
    },
    goToLessorProfile(id) {
      this.$router.push({name: 'lessor', params: {id: id}});
    },
    goBack(){
      this.$router.back();
    }
  },
  created() {
    this.getById(this.$route.params.id);
    this.getPropertyDetail(this.$route.params.id);
  }
}
</script>

<style scoped>
.row {
  padding: 5px;
  margin: 0 20px 10px 20px;
}

.row-address {
  border-bottom: .05rem solid #770000;
}

p {
  font-family: "Comic Sans MS", serif;
  font-size: 18px;
}
</style>
