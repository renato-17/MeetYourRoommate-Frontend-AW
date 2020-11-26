<template>
    <v-app>
        <v-container>
            <v-card>
                <v-card-title>
                    <span class="headline">Reservation</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row class="d-flex justify-center mb-6">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="item.dateStart" label="DateStart"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="item.dateEnd" label="DateEnd"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container>
                        <h2 class="d-flex justify-start mb-6">Details</h2>
                        <v-row class="d-flex justify-center mb-6">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="details.amount" label="Amount"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="details.downpayment" label="Downpayment"></v-text-field>
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
    import ReservationService from '@/services/reservation-service'
    import ReservationDetailService from '@/services/reservation-details-service'

    export default {
        name: "reservation",
        data(){
            return {
                item: {
                    dateStart : '',
                    dateEnd: '',
                    studentId: 0,
                    propertyId: 0
                },
                details: {
                    amount: 0,
                    downpayment: 0,
                    studentId: 0,
                    propertyId: 0
                }
            }
        },
        methods: {
            save() {
                let reservation = this.item;
                reservation.studentId= Number(this.$route.params.studentId);
                reservation.propertyId= Number(this.$route.params.propertyId);
                ReservationService.create(reservation)
                    .then((response) => {
                        let reservationDetail= this.details;
                        reservationDetail.amount= Number(this.details.amount);
                        reservationDetail.downpayment= Number(this.details.downpayment);
                        reservationDetail.studentId= Number(this.$route.params.studentId);
                        reservationDetail.propertyId= Number(this.$route.params.propertyId)
                        console.log('dataaaaaaaaaaaa', reservationDetail);
                        console.log('iddddddd', response.data.id);
                        ReservationDetailService.create(response.data.id,reservationDetail)
                            .then(() => {
                                this.navigateMyProperties(this.$route.params.id);
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
            navigateMyProperties(id){
                this.$router.push({name: 'Lessor', params: { id: id }});
            }
        },
        created(){
            this.lessorId = this.$route.params.id;
        }
    }
</script>

<style scoped>
</style>
