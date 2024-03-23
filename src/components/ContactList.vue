<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="contacts"
            item-key="id"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-text-field
                    v-model="searchInput"
                    @input="searchItems"
                    label="Szukaj"
                    single-line hide-details
                    class="custom-placeholder"
                >
            </v-text-field>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    size="small"
                    @click="editContact(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    size="small"
                    @click="deleteContact(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
export default {
    props: {
        contacts: Array
    },
    data() {
        return {
            search: '',
            searchInput: '',
            headers: [
                { text: 'Imię', value: 'firstName' },
                { text: 'Nazwisko', value: 'lastName' },
                { text: 'Telefon', value: 'phone' },
                { text: 'Email', value: 'email' },
                { text: 'Akcje', value: 'actions', sortable: false }
            ]
        }
    },
    methods: {
        editContact(item) {
            this.$emit('edit-contact', item);
        },
        deleteContact(item) {
            this.$emit('delete-contact', item);
        },
        searchItems() {
          this.search = this.searchInput.toLowerCase().trim()
        }
    }
}
</script>

<style>
.custom-placeholder {
    padding-left: 15px;
}
</style>
