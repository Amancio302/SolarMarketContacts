<template>
  <v-container>
    <v-row dense>
      <v-col
        cols="12"
        md="6"
        xl="3"
        v-for="contact in computedContacts"
        :key="contact.id"
      >
        <Contact
          v-bind="contact"
          @delete="onDelete(contact.index)"
          @update="onUpdate(contact.index)"
          @save="onSave(contact.index, $event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Contact from "./Contact.vue";

import { IBookedPerson } from "@/models/ContactBookInterfaces";
import { IContact } from "@/models/Contact";
import { ICompany } from "@/models/Company";

interface IComputedContact {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  company?: ICompany;
  contacts: IContact[];
  active: boolean;
  index: number;
}

export default Vue.extend({
  components: { Contact },
  name: "ContactBookComponent",
  props: {
    contacts: {
      type: Array as () => IBookedPerson[],
      default: () => [],
    },
    small: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedContacts: function (): IComputedContact[] {
      console.log("Teste", this.contacts);
      return this.contacts.map(
        ({ person, active, index }: IBookedPerson): IComputedContact => ({
          id: person.id,
          firstName: person.firstName,
          lastName: person.lastName,
          birthDate: person.birthDate,
          company: person.company,
          contacts: person.contacts,
          active,
          index,
        })
      );
    },
  },
  methods: {
    onDelete(index: number): void {
      this.$emit("delete", index);
    },
    onUpdate(index: number): void {
      this.$emit("update", index);
    },
    onSave(index: number, data: IContact): void {
      console.log(data);
      this.$emit("save", { index, data });
    },
  },
});
</script>

<style></style>
