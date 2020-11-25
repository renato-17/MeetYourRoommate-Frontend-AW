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
                                <p>Desctiption</p>
                                 <v-col cols="12" sm="12" md="12">
                                    <p>{{ item.description }}</p>
                                </v-col>
                            </v-row>
                            <v-row  class="row-address">
                                <p>Address</p>
                                <v-col>
                                    <p>  {{ item.address }}</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <p>Lessor</p>
                                <v-col>
                                    <p>
                                    {{ item.lessor.firstName}} {{ item.lessor.lastName }}
                                    </p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-row>
                            <v-col>
                                <v-btn color="#770000">
                                    Contactar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import PropertyService from '../services/property-service';
    export default {
        name: "property",
        data() {
            return {
                item: {}
            }
        },
        methods: {
            getById(id){
                PropertyService.get(id)
                .then((response) => {
                    this.item = response.data;
                    // To print data
                    console.log('this.item', this.item)
                })
                .catch(e=> {
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
    .row{
        padding: 5px;
        margin: 0 20px 10px 20px;
    }
    .row-address{
        border-bottom: .05rem solid #770000;
    }
    p{
        font-family: "Comic Sans MS";
        font-size: 18px;
    }
</style>
