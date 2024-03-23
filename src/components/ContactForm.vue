<template>
    <v-card>
      <v-card-title>{{ dialogTitle }}</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="editedCopy.firstName" label="Imię"></v-text-field>
          <v-text-field v-model="editedCopy.lastName" label="Nazwisko"></v-text-field>
          <v-text-field v-model="editedCopy.phone" label="Telefon"></v-text-field>
          <v-text-field v-model="editedCopy.email" label="Email"></v-text-field>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Anuluj</v-btn>
        <v-btn color="blue darken-1" text @click="saveContact">Zapisz</v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script>
export default {
  props: {
    dialogTitle: String,
    editedItem: Object,
  },
  data() {
    return {
      editedCopy: { ...this.editedItem }
    };
  },

  watch: {
    editedItem: {
      handler(newVal) {
        this.editedCopy = { ...newVal };
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    closeDialog() {
      this.$emit('close-dialog');
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },
    saveContact() {
      this.$emit('save-contact', this.editedCopy);
      this.closeDialog();
    }
  },
};
</script>
