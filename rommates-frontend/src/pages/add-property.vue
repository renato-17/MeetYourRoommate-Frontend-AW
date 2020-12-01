<template>
    <v-app>
        <v-container>
            <v-card>
                <v-card-title>
                    <span class="headline">Add Property</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row class="d-flex justify-center mb-6">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="item.address" label="Address"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="item.description" label="Description"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container>
                        <h2 class="d-flex justify-start mb-6">Number of</h2>
                        <v-row class="d-flex justify-center mb-6">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="details.squareMeters" label="SquareMeters"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="details.rooms" label="Rooms"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="d-flex justify-center mb-6">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="details.bathrooms" label="Bathrooms"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="details.kitchen" label="Kitchen"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="d-flex justify-center mb-6">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="details.livingroom" label="Livingroom"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="details.price" label="price"></v-text-field>
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
        </v-container>
    </v-app>
</template>

<script>
    import PropertyService from '@/services/property-service'
    import PropertyDetailService from '@/services/property-details-service'

    export default {
        name: "add-property",
        data(){
            return {
                item: {
                    address : '',
                    description: '',
                    lessorId: 0
                },
                lessorId: '',
                details: {
                    squareMeters: 0,
                    rooms: 0,
                    bathrooms: 0,
                    kitchen: 0,
                    livingroom: 0,
                    price: 0
                }
            }
        },
        methods: {
            save() {
                let property = this.item;
                property.lessorId= Number(this.$route.params.id)
                PropertyService.create(property)
                    .then((response) => {
                        let propertyDetail = this.details;
                        propertyDetail.squareMeters= Number(this.details.squareMeters);
                        propertyDetail.rooms= Number(this.details.rooms);
                        propertyDetail.bathrooms= Number(this.details.bathrooms);
                        propertyDetail.kitchen= Number(this.details.kitchen);
                        propertyDetail.livingroom= Number(this.details.livingroom);
                        propertyDetail.price= Number(this.details.price);
                        PropertyDetailService.create(response.data.id,propertyDetail)
                            .then(() => {
                                this.navigateMyProperties();
                            })
                            .catch(e=> {
                                console.log(e);
                            })
                    })
                    .catch(e=> {
                        console.log(e);
                    })

            },
            close() {
                this.navigateMyProperties();
            },
            navigateMyProperties(){
                this.$router.push({name: 'Lessor', params: { id: this.$route.params.id }});
            }
        },
        created(){
            this.lessorId = this.$route.params.id;
        }
    }
</script>

<style scoped>
</style>
