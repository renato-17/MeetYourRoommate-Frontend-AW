<template>
    <v-app>
        <v-main>
            <p class="text-h1"> My Properties </p>
            <div id="app">
                <v-app id="inspire">
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

                                            <v-card-text class="card-text">
                                                <v-row align="center">
                                                    <v-col cols="4">
                                                        <h3>Description</h3>
                                                        <p class="student-card mt-2">{{ item.description }}</p>
                                                    </v-col>
                                                    <v-col>
                                                        <h3>Location</h3>
                                                        <p class="student-card mt-2">{{ item.address }}</p>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                            <v-card-actions class="d-flex flex-column mb-2">
                                                <v-row>
                                                    <v-expansion-panels>
                                                        <v-expansion-panel>
                                                            <v-expansion-panel-header>
                                                                Edit Property
                                                            </v-expansion-panel-header>
                                                            <v-expansion-panel-content>
                                                                <div>
                                                                    <v-col>
                                                                        <v-row>
                                                                            <v-col cols="12" sm="12" md="12">
                                                                                <v-text-field v-model="item.address" label="Address"></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="12" md="12">
                                                                                <v-text-field v-model="item.description" label="Description"></v-text-field>
                                                                            </v-col>
                                                                        </v-row>
                                                                        <v-row class="d-flex flex-row-reverse">
                                                                            <v-btn class="mx-2" fab dark large color="pink" @click="EditProperty(item)">
                                                                                Save
                                                                            </v-btn>
                                                                        </v-row>
                                                                    </v-col>
                                                                </div>
                                                            </v-expansion-panel-content>
                                                        </v-expansion-panel>
                                                    </v-expansion-panels>
                                                </v-row>
                                                <v-row>
                                                    <v-expansion-panels class="expan">
                                                        <v-expansion-panel>
                                                            <v-expansion-panel-header>
                                                                Create Ad
                                                            </v-expansion-panel-header>
                                                            <v-expansion-panel-content>
                                                                <div>
                                                                    <v-col>
                                                                        <v-row>
                                                                            <v-col cols="12" sm="12" md="12">
                                                                                <v-text-field v-model="title" label="Title"></v-text-field>
                                                                            </v-col>
                                                                        </v-row>
                                                                        <v-row class="d-flex flex-row-reverse">
                                                                            <v-btn class="mx-2" fab dark large color="pink" @click="CreateAnAd(item.id)">
                                                                                Save
                                                                            </v-btn>
                                                                        </v-row>
                                                                    </v-col>
                                                                </div>
                                                            </v-expansion-panel-content>
                                                        </v-expansion-panel>
                                                    </v-expansion-panels>
                                                </v-row>
                                            </v-card-actions>
                                        </v-card>

                                    </v-item>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-item-group>
                </v-app>
            </div>
        </v-main>
    </v-app>
</template>

<script>
    import PropertyService from '../services/property-service';
    import AdService from '../services/ads-service';
    export default {
        name: "ads",
        data() {
            return {
                items: [],
                title: '',
                editproperty: {
                    address: '',
                    description: '',
                    lessorId: 0
                },
                newAd:{
                    title: '',
                    lessorId: 0,
                    propertyId: 0
                },
            }
        },
        methods: {
            getAllProperties(id) {
                PropertyService.getAllMyProperties(id)
                    .then(response => {
                        this.items = response.data;
                        console.log('this.item', this.items)
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            EditProperty(item){
                this.editproperty.address = item.address
                this.editproperty.description = item.description
                this.editproperty.lessorId = Number(this.$route.params.id)
                PropertyService.update(item.id, this.editproperty)
            },
            CreateAnAd(id){
                this.newAd.title= this.title
                this.newAd.lessorId= Number(this.$route.params.id)
                this.newAd.propertyId= Number(id)
                console.log('ad', this.newAd)
                AdService.create(this.newAd)
                    .then(() => {
                        console.log('ez')
                     })
                    .catch(e => {
                        console.log(e);
                    })
            }
        },
        mounted() {
            this.getAllProperties(this.$route.params.id);
        }
    }
</script>

<style scoped>
    h2{
        font-family: "Comic Sans MS";
        font-weight: bold;
    }
    p{
        font-family: "Comic Sans MS";
        font-size: 18px;
    }
    .card-title{
        font-family: "Comic Sans MS";
        font-size: 30px;
    }
    .card-text{
        width: auto;
        padding: 5px;
        margin: 0 20px 10px 20px;
        border-top: .05rem solid #2E535B;
        border-bottom: .05rem solid #2E535B;
    }
    .expan{
        padding: 5px;
        margin: 20px 20px 20px 20px;
    }
</style>
