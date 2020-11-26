<template>
    <v-app>
        <v-container>
        <v-card>
            <v-container mx>
                <v-card-title>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
                        <v-row align="end" class="fill-height">
                            <v-col class="pa-0" cols="12">
                                <v-avatar class="profile" color="grey" size="164" tile>
                                    <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" ></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col>
                                <v-list-item color="rgba(0, 0, 0, .4)" dark >
                                    <v-list-item-content>
                                        <v-list-item-title class="title">
                                            <p class="text-h1"> {{ item.firstName}} {{ item.lastName}} </p>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>Lessor</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-img>
                </v-card-title>
            </v-container>
            <v-card-text>
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            Information
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Dni: {{ item.dni}}<br>
                            Phone: {{ item.phone}}<br>
                            Gender: {{ item.gender}}<br>
                            Mail: {{ item.mail}}<br>
                            Birthday: {{ item.birthdate}}<br>
                            <div>
                                <v-col>
                                    <v-row class="d-flex flex-row-reverse">
                                        <v-btn class="mx-2" fab dark large color="cyan">
                                            <v-icon dark>
                                                mdi-pencil
                                            </v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-col>
                            </div>

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" sm="12" md="6">
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
                                            <v-icon small class="mr-2" @click="acceptLease(item.personOneId)" color="green">mdi-plus</v-icon>
<!--                                            <v-icon small class="mr-2" @click="rejectLease(item.personOneId)" color="red">mdi-minus</v-icon>-->
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                            <v-card>
                                <v-card-text class="grey lighten-5 text-center">
                                    <v-btn color="primary" @click="hiddenP = !hiddenP">
                                        Property
                                    </v-btn>
                                </v-card-text>
                                <v-card-text>
                                    <v-row>
                                        <v-col>
                                            <v-btn tile color="success" v-show="!hiddenP">
                                                <v-icon left>
                                                    mdi-plus
                                                </v-icon>
                                                Create New Property
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn tile color="success" v-show="!hiddenP">
                                                <v-icon left>
                                                    mdi-television
                                                </v-icon>
                                                See all my properties
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn tile color="success" v-show="!hiddenP">
                                                <v-icon left>
                                                    mdi-plus
                                                </v-icon>
                                                Create Ad
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
        </v-container>
    </v-app>
</template>

<script>
    import LessorService from '@/services/lessors-service';
    import LeaseRequestService from '@/services/lease-request-service';
    export default {
        name: "lessors",
        data() {
            return {
                search: '',
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
                },
                headersLease: [
                    {text: 'Name', value: 'personOneId'},
                    {text: 'LastName', value: 'personOneId'},
                    {text: 'Status', value: 'status'},
                    {text: 'Actions', value: 'actions', sortable: false}
                ],
                leases: [],
                displayLeases: [],
                students: {},
                hiddenR: false,
                hiddenP: false,
            }
        },
        methods: {
            getById(id){
                LessorService.get(id)
                    .then((response) => {
                        this.item = response.data;
                        console.log('this.item', this.item)
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getAllReceivedLease(id) {
                LeaseRequestService.getAllReceivedLeaseRequest(id)
                    .then((response) => {
                       this.leases = response.data;
                       this.displayLeases = response.data.map(this.getDisplayLease);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getDisplayLease(lease) {
                return {
                    personOneId: lease.personOneId,
                    personTwoId: lease.personTwoId,
                    status: lease.statusDetail,
                };
            },
            acceptLease(personOneId){
                console.log(personOneId),
                LeaseRequestService.update(1,this.$route.params.id, 2)
            },
        },
        created(){
            this.getById(this.$route.params.id);
            this.getAllReceivedLease(this.$route.params.id);
        }
    }
</script>

<style scoped>

</style>
