<template>
  <v-container>
    <DefaultCard
      title="Meus contatos"
      :actions="contactListActions"
      @add="onAddPerson"
    >
      <ContactBook
        :people="people"
        @save="onSaveContact"
        @update="onUpdate"
        @delete="onDelete"
      />
    </DefaultCard>
  </v-container>
</template>

<script>
import DefaultCard from "@/components/cards/DefaultCard.vue";
import ContactBook from "@/components/contact/ContactBook.vue";
import Alert from "@/components/alert/Alerts";

import { createContact, updateContact } from "@/services/contacts/contacts";
import { createCompany } from "@/services/company/company";
import {
  createPerson,
  listPeople,
  updatePerson,
} from "@/services/person/person";
import { deletePerson } from "@/services/person/person";

export default {
  name: "ContactList",
  components: {
    DefaultCard,
    ContactBook,
  },
  data: () => ({
    contactListActions: [
      {
        name: "add",
        icon: "mdi-plus",
        xLarge: true,
      },
    ],
    people: [],
  }),
  created() {
    this.setData();
  },
  methods: {
    setData() {
      this.getContactList();
    },
    async getContactList() {
      const res = await await listPeople().catch((err) => err);
      if (res.status === 200) {
        this.people = res.data.map((el, i) => this.parsePerson(el, i));
      }
    },
    parsePerson(person, index, active = false) {
      return {
        person,
        index,
        active,
      };
    },
    onUpdate(index) {
      this.activateMe(index);
    },
    activateMe(index) {
      this.people.forEach((person, i) => {
        if (i === index) person.active = true;
        else person.active = false;
      });
    },
    async onDelete(index) {
      const confirmed = await Alert.confirm();
      if (confirmed) {
        const res = await deletePerson(this.people[index].person.id);
        if (res.status === 200) {
          this.people.splice(index, 1);
          this.people.forEach((el) => {
            if (el.index > index) el.index--;
          });
        } else {
          Alert.error();
        }
      }
    },
    onAddPerson() {
      if (this.people.at(-1).person.id === -1) return;
      this.activateMe();
      this.people.push(
        this.parsePerson(
          {
            id: -1,
            firstName: "",
            lastName: "",
            company: {
              name: undefined,
              id: undefined,
            },
            contacts: [],
          },
          this.people.length,
          true
        )
      );
    },
    async onSaveContact({ value, index }) {
      console.log(value.company?.id, value);
      // Creates a Person?, a Company? and a Contact?
      // Check if company exists
      if (
        value.company &&
        value.company.id === -1 &&
        value.company.name &&
        value.company.name !== ""
      ) {
        // Creates a Company
        const created = await this.createCompany(value.company.name);
        if (created === false) {
          Alert.error();
          return;
        }
        value.company = created;
      }
      if (value.company?.id === -1) value.company = undefined;
      // Check if person exists
      if (value.id === -1) {
        // Creates person
        const created = await this.createPerson(
          value.firstName,
          value.lastName,
          value.birthDate,
          value.company?.id
        );
        if (created === false) {
          Alert.error();
          return;
        }
        value.id = created.id;
        value.firstName = created.firstName;
        value.lastName = created.lastName;
        value.birthDate = created.birthDate;
      }
      // Check if person changed
      if (value.updated) {
        // Updates person
        await this.updatePerson(
          value.id,
          value.firstName,
          value.lastName,
          value.birthDate,
          value.company?.id
        );
      }
      // Check if there are new or updated contacts
      const promises = [];
      value.contacts.map((contact) => {
        if (contact.id === -1) {
          // Creates contact
          promises.push(
            this.createContact(
              contact.value,
              contact.contactMarker.id,
              value.id
            )
          );
        }
        if (contact.updated) {
          // Updates contact
          promises.push(
            this.updateContact(
              contact.id,
              contact.value,
              contact.contactMarker.id,
              value.id
            )
          );
        }
      });
      await Promise.all(promises);
      this.people[index].person = value;
      this.people[index].active = false;
    },
    async createCompany(name) {
      const res = await createCompany({ name }).catch((err) => err);
      if (res.status === 200) {
        return res.data;
      }
      return false;
    },
    async createPerson(firstName, lastName, birthDate, company) {
      const res = await createPerson({
        firstName,
        lastName,
        birthDate,
        company,
      }).catch((err) => err);
      if (res.status === 200) {
        return res.data;
      }
      return false;
    },
    async updatePerson(id, firstName, lastName, birthDate, company) {
      const res = await updatePerson(id, {
        firstName,
        lastName,
        birthDate,
        company,
      }).catch((err) => err);
      if (res.status === 200) {
        return res.data.id;
      }
      return false;
    },
    async createContact(value, contactMarker, person) {
      const res = await createContact({ value, contactMarker, person }).catch(
        (err) => err
      );
      if (res.status === 200) {
        return res.data.id;
      }
      return false;
    },
    async updateContact(id, value, contactMarker, person) {
      const res = await updateContact(id, {
        value,
        contactMarker,
        person,
      }).catch((err) => err);
      if (res.status === 200) {
        return res.data.id;
      }
      return false;
    },
  },
};
</script>

<style></style>
