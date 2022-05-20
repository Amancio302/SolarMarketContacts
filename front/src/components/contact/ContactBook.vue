<template>
  <v-container>
    <v-row dense>
      <v-col
        cols="12"
        md="6"
        xl="3"
        v-for="contact in computedPeople"
        :key="contact.id"
      >
        <Contact
          v-bind="contact"
          @save="onSave($event, contact.index)"
          @update="onUpdate(contact.index)"
          @delete="onDelete(contact.index)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Contact from "@/components/contact/Contact";

// import { dateToString } from "@/utils/format/date";

export default {
  name: "ContactBookComponent",
  components: {
    Contact,
  },
  props: {
    people: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    computedPeople: function () {
      console.log("updating");
      return this.people
        .map(({ person, index, active }) => ({
          id: person.id,
          firstName: person.firstName,
          lastName: person.lastName,
          birthDate: person.birthDate,
          company: person.company,
          contacts: person.contacts,
          index,
          active,
        }))
        .reverse();
    },
  },
  methods: {
    onSave(value, index) {
      this.$emit("save", { value, index });
    },
    onUpdate(index) {
      this.$emit("update", index);
    },
    onDelete(index) {
      this.$emit("delete", index);
    },
  },
};
</script>

<style></style>
