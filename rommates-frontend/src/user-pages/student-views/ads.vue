<template>
    <v-app>
        <v-main>
          <Header></Header>
          <v-container>
              <v-item-group active-class="primary">
                <v-container>
                  <v-row>
                    <v-col
                        v-for="item in items"
                        :key="item.id"
                        cols="12"
                        md="4"
                        class="border_all"
                    >
                      <v-item>
                        <v-card
                            class="mx-auto d-flex flex-column elevation-10"
                            max-width="400" color="#7CD5E7"
                        >
                          <v-img
                              height="250"
                              :src="image"
                          ></v-img>

                          <v-card-title class="align-self-center card-title">{{ item.title }}</v-card-title>
                          <v-card-text class="card-text">
                            <v-row align="center">
                              <v-col cols="4">
                                <h3>Description</h3>
                                <p class="student-card mt-2">{{ item.property.description }}</p>
                              </v-col>
                              <v-col>
                                <h3>Location</h3>
                                <p class="student-card mt-2">{{ item.property.address }}</p>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions class="d-flex flex-column mb-2">
                            <v-btn class="btn" @click="goToProperty(item.id)">
                              SEE MORE
                            </v-btn>
                          </v-card-actions>
                        </v-card>

                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
          </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import AdsService from '../../services/ads-service';
    import Header from "@/user-pages/general-views/header";
    export default {
        name: "ads",
      components: {Header},
      data() {
            return {
                items: [],
                image: require('@/assets/property.jpg')
            }
        },
        methods: {
            getAllAds() {
                AdsService.getAll()
                    .then(response => {
                        this.items = response.data;
                        console.log('this.item', this.items)
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            goToProperty(id){
                this.$router.push({ name: 'property', params: { id: id}})
            }
        },
        mounted() {
            this.getAllAds();
        }
    }
</script>

<style scoped>
    h2{
        font-family: "Comic Sans MS",serif;
        font-weight: bold;
    }
    p{
        font-family: "Comic Sans MS",serif;
        font-size: 18px;
    }
    .card-title{
        font-family: "Comic Sans MS",serif;
        font-size: 19px;
    }
    .btn{
        background-color: #ED3D3D !important;
        color: white;
    }
    .card-text{
        width: auto;
        padding: 5px;
        margin: 0 20px 10px 20px;
        border-top: .05rem solid #2E535B;
        border-bottom: .05rem solid #2E535B;
    }
</style>
