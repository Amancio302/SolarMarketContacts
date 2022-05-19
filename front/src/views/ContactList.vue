<template>
  <v-container>
    <DefaultCard title="Meus Contatos" :actions="listActions" @add="onAdd">
      <ContactBook
        :contacts="contactList"
        @delete="onDelete"
        @update="onUpdate"
      />
    </DefaultCard>
  </v-container>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import DefaultCard from "../components/cards/DefaultCard.vue";
import ContactBook from "../components/contacts/ContactBook.vue";

import { confirm } from "../components/alerts/Alerts";

import { IDefaultCardAction } from "../models/DefaultCardInterfaces";
import { IBookedPerson } from "../models/ContactBookInterfaces";

import { deletePerson, listPeople } from "../services/person/person";

interface IContactListData {
  contactList: IBookedPerson[];
  listActions: IDefaultCardAction[];
}

export default Vue.extend({
  components: { ContactBook, DefaultCard },
  data: (): IContactListData => ({
    listActions: [
      {
        name: "add",
        icon: "mdi-plus",
        xLarge: true,
      },
    ],
    contactList: [],
  }),
  created(): void {
    this.setData();
  },
  methods: {
    async setData(): Promise<void> {
      this.contactList = await this.getContactList();
    },
    async getContactList(): Promise<IBookedPerson[]> {
      const res = await listPeople();
      console.log(res);
      if (res.status === 200) {
        return res.data.map((el, i) => ({
          person: el,
          active: false,
          index: i,
        }));
      }
      return [];
    },
    onAdd(): void {
      if (
        this.contactList.length > 0 &&
        this.contactList[this.contactList.length - 1].person.id === -1
      )
        return;
      this.contactList.push({
        person: {
          id: -1,
          firstName: "",
          lastName: "",
          contacts: [],
        },
        active: true,
        index: this.contactList.length,
      });
    },
    async onDelete(index: number): Promise<void> {
      const deleteIt = await confirm();
      if (deleteIt) {
        const deleted = this.contactList.splice(index, 1)[0].person.id;
        if (deleted !== -1) {
          deletePerson(deleted);
        }
      }
    },
    onUpdate(index: number): void {
      this.contactList = this.contactList.map((el, i) => {
        if (i === index) {
          el.active = true;
        } else {
          el.active = false;
        }
        return el;
      });
    },
  },
});
</script>

<style></style>
