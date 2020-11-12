<template>
    <v-card>
        <v-card-title>
            Properties
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
            </v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="displayProperties"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1"
                    ref="propertiesTable">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                </template>
                <template v-slot:top>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2"
                                   v-bind="attrs"
                                   v-on="on">New Item</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.title" label="Address"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
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
                    </v-dialog>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import PropertyService from '../services/property-service';
    export default {
        name: "properties",
        data() {
            return {
                search: '',
                dialog: false,
                dialogDelete: false,
                headers: [
                    {text: 'Id', value: 'id'},
                    {text: 'Address', value: 'address'},
                    {text: 'Description', value: 'description'}
                ],
                properties: [],
                displayProperties: [],
                editedIndex: -1,
                editedItem: {
                    id: 0,
                    address: '',
                    description: ''
                },
                defaultItem: {
                    id: 0,
                    address: '',
                    description: ''
                }
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Tutorial' : 'Edit Tutorial';
            }
        },
        watch: {
            dialog(val) {
                val || this.close();
            }
        },
        methods: {
            getDisplayProperty(property) {
                return {
                    id: property.id,
                    title: property.address,
                    description: property.description
                };
            },
            retrieveProperty() {
                PropertyService.getAll()
                    .then(response => {
                        this.properties = response.data;
                        this.displayProperties = response.data.map(this.getDisplayProperty);
                    })
            },
            refreshList() {
                this.retrieveProperty();
            },
            editItem(item) {
                this.editedIndex = this.displayProperties.indexOf(item);
                this.editedItem = this.properties[this.editedIndex];
                this.dialog = true;
            },
            close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },
            save() {
                if (this.editedIndex > -1) {
                    this.properties[this.editedIndex] = this.editedItem;
                    this.displayProperties[this.editedIndex] =
                        this.getDisplayProperty(this.tutorials[this.editedIndex]);
                    PropertyService.update(this.editedItem.id, this.editedItem)
                        .then(() => {
                            this.refreshList();
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    PropertyService.create(this.editedItem)
                        .then(response => {
                            let item = response.data;
                            this.properties.push(item);
                            this.displayProperties.push(this.getDisplayProperty(item));
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                this.close();
            }
        },
        mounted() {
            this.retrieveProperty();
        }
    }
</script>

<style scoped>

</style>
