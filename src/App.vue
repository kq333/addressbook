<template>
  <v-app>
    <v-toolbar color="primary" dark class="custom-toolbar" >
      <v-toolbar-title>Książka adresowa</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  @click="openAddDialog">Dodaj kontakt</v-btn>
    </v-toolbar>
    <v-content>
      <ContactList
        :contacts="contacts"
        @edit-contact="editContact"
        @delete-contact="deleteContact"
      >
      </ContactList>
    </v-content>
    <v-dialog v-model="dialog" max-width="500">
      <ContactForm
        :dialogTitle="dialogTitle"
        :editedItem="editedItem"
        @close-dialog="closeDialog"
        @save-contact="saveContact"
        @update-firstName="editedItem.firstName"
        @update-lastName="editedItem.lastName"
        @update-phone="editedItem.phone"
        @update-email="editedItem.email"
      >
      </ContactForm>
    </v-dialog>
  </v-app>
</template>

<script>
import ContactList from './components/ContactList.vue';
import ContactForm from './components/ContactForm.vue';
import contactsData from './contacts';

export default {
  components: {
    ContactList,
    ContactForm
  },
  data() {
    return {
      contacts: contactsData,
      dialog: false,
      dialogTitle: '',
      editedIndex: -1,
      editedItem: {
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      },
    }
  },

  methods: {
    openAddDialog() {
      this.editedIndex = -1;
      this.editedItem = {
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      };
      this.dialogTitle = 'Dodaj kontakt';
      this.dialog = true;
    },
    editContact(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogTitle = 'Edytuj kontakt';
      this.dialog = true;
    },
    deleteContact(item) {
  const index = this.contacts.indexOf(item);
  if (confirm('Czy na pewno chcesz usunąć ten kontakt?')) {
    this.contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
},
    closeDialog() {
      this.dialog = false;
    },

    saveContact(contact) {
  if (this.editedIndex > -1) {

    Object.assign(this.contacts[this.editedIndex], contact);
  } else {

    contact.id = this.contacts.length + 1;
    this.contacts.push(Object.assign({}, contact));
  }

  localStorage.setItem('contacts', JSON.stringify(this.contacts));
},
  },

  created() {

  const storedContacts = localStorage.getItem('contacts');
  if (storedContacts) {

    this.contacts = JSON.parse(storedContacts);
  } else {

    this.contacts = contactsData;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful:', registration);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed:', error);
        });
    });
  }
  }}

</script>
<style scoped lang="css">
.custom-toolbar {
  max-height: 65px;
}
</style>
