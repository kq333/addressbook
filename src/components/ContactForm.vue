<template>
  <v-card>
    <v-card-title>{{ dialogTitle }}</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="editedCopy.firstName"
          label="Imię"
          :rules="firstNameRules"
        >
        </v-text-field>
        <v-text-field
          v-model="editedCopy.lastName"
          label="Nazwisko"
          :rules="lastNameRules"
        >
        </v-text-field>
        <v-text-field
          v-model="editedCopy.phone"
          label="Telefon"
          :rules="phoneRules"
        >
        </v-text-field>
        <v-text-field
          v-model="editedCopy.email"
          label="Email"
          :rules="emailRules"
        >
        </v-text-field>

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
      editedCopy: { ...this.editedItem },
      firstNameRules: [
        value => {
          if (value?.length > 3) return true
          return 'Imię musi zawierć min. 3 znaki.'
        },
      ],
      lastNameRules: [
        value => {
          if (value?.length > 3) return true
          return 'Nazwisko musi zawierć min. 3 znaki.'
        },
      ],
      phoneRules: [
        value => !!value || 'Numer tel. musi zawirać min. 9 cyfr.',
        value => /^[0-9]{9}$/.test(value) || 'Numer tel. musi zawirać min. 9 cyfr.',
      ],

      emailRules: [
        v => !!v || 'E-mail musi być podany',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail musi być poprawny',
      ],
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

      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$emit('save-contact', this.editedCopy);
        this.closeDialog();
      } else {
        console.log("Błąd Formularza.");
      }
    }
  },
};
</script>
