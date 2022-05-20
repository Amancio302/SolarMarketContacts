<template>
  <v-container>
    <DefaultCard title="Meus Contatos" :actions="listActions" @add="onAdd">
      <ContactBook
        :contacts="contactList"
        @delete="onDelete"
        @update="onUpdate"
        @save="onSave($event.index, $event.data)"
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
import { IPerson, IRequestPerson } from "../models/Person";

import {
  deletePerson,
  listPeople,
  createPerson,
} from "../services/person/person";
import { createCompany } from "../services/company/company";

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
        return res.data.map((el, i) => this.contactToBookedContact(i, el));
      }
      return [];
    },
    contactToBookedContact(index: number, person: IPerson): IBookedPerson {
      return {
        person,
        active: false,
        index,
      };
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
    async onSave(index: number, data: IRequestPerson): Promise<void> {
      if (data.id === -1) {
        // CREATE
        let companyId;
        if (!data.company) {
          // Alerta erro
        } else if (data.company?.id === -1) {
          // CREATE NEW COMPANY
          companyId = await this.createCompany(data.company.name);
          if (companyId === -1) {
            // Alerta erro
            return;
          } else {
            // Recarrega empresas
          }
        } else {
          companyId = data.company.id;
        }
        this.createPerson(index, {
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          company: companyId,
        });
      } else {
        // UPDATE
      }
    },
    async createCompany(name: string): Promise<number> {
      const res = await createCompany({ name });
      if (res.status === 200) {
        const n: number = res.data.id;
        return n;
      }
      return -1;
    },
    async createPerson(index: number, data: any): Promise<void> {
      const res = await createPerson(data);
      if (res.status === 200) {
        this.contactList[index] = this.contactToBookedContact(index, res.data);
        this.contactList = Array.from(this.contactList);
      } else {
        // Alerta erro
      }
    },
    updatePerson(index: number, data: IRequestPerson) {
      // Cu
    },
  },
});
</script>

<style></style>
