<template>
  <v-card outlined class="pa-3" height="100%">
    <v-form :disabled="!active">
      <v-row dense align="center">
        <v-col>
          <v-card-title class="ma-0 pa-0 py-2">
            Informações Pessoais
          </v-card-title>
        </v-col>
        <v-col cols="auto">
          <v-menu class="pa-0 ma-0">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon> mdi-dots-vertical </v-icon>
              </v-btn>
            </template>
            <v-list class="pa-0 ma-0">
              <v-list-item>
                <v-btn text block @click="onDelete">
                  <v-list-item-title>Deletar</v-list-item-title>
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn text block @click="onUpdate">
                  <v-list-item-title>Editar</v-list-item-title>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row dense class="pb-0 mb-0">
        <v-col cols="6">
          <v-text-field
            prepend-icon="mdi-account"
            :outlined="active"
            :filled="!active"
            label="Nome"
            v-model="value.firstName"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            prepend-icon="mdi-account-outline"
            :outlined="active"
            :filled="!active"
            label="Sobrenome"
            v-model="value.lastName"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="value.birthDate"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :outlined="active"
                :filled="!active"
                label="Aniversário"
                :value="computedDate"
              ></v-text-field>
            </template>
            <v-date-picker v-model="value.birthDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(value.birthDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-combobox
            prepend-icon="mdi-calendar"
            :outlined="active"
            :filled="!active"
            label="Empresa"
            v-model="selectedCompany"
            :items="companiesList"
          >
          </v-combobox>
        </v-col>
      </v-row>
      <div v-if="(value.contacts && value.contacts.length > 0) || active">
        <v-row dense class="pt-0 mt-0" align="center">
          <v-col>
            <h4 class="ma-0 pa-0 pb-2">Contatos</h4>
          </v-col>
          <v-col cols="auto">
            <v-btn icon @click="onAddContact">
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row dense v-for="contact in value.contacts" :key="contact.id">
          <v-col cols="12">
            <v-text-field
              prepend-icon="mdi-calendar"
              :outlined="active"
              :filled="!active"
              :label="contact.categoryName"
              v-model="contact.value"
            >
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-radio-group v-model="contact.categoryTag" row>
              <v-radio
                v-for="category in markersList"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col>
            <v-select
              prepend-icon="mdi-calendar"
              :outlined="active"
              :filled="!active"
              label="Marcador"
              v-model="contact.contactCategory"
              :items="markersList[contact.categoryTag].data"
            >
            </v-select>
          </v-col>
        </v-row>
      </div>
      <v-row no-gutters justify="end" v-if="active">
        <v-col cols="auto">
          <v-btn color="success" @click="onClick"> Salvar </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

import { IContact, IRequestContact } from "@/models/Contact";
import { ICompany } from "@/models/Company";
import { ISelectItem } from "@/models/SelectItem";

import { listCompanies } from "@/services/company/company";
import { listContactCategories } from "@/services/contacts/contactsCategories";

interface IMutableData {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: string;
  company?: ICompany;
  contacts: IRequestContact[];
}

interface IContactData {
  date: string;
  menu: boolean;
  value: IMutableData;
}

export default Vue.extend({
  name: "ContactComponent",
  props: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: [Date, String],
    },
    company: {
      type: Object as () => ICompany,
    },
    contacts: {
      type: Array as () => IContact[],
    },
    id: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data: (): IContactData => ({
    date: "",
    menu: false,
    value: {
      id: -1,
      firstName: "",
      lastName: "",
      contacts: [],
    },
  }),
  watch: {
    id: function (val, oldval) {
      console.log(val);
      this.value.id = val;
    },
    firstName: function (val, oldval) {
      this.value.firstName = val;
    },
    lastName: function (val, oldval) {
      this.value.lastName = val;
    },
    birthDate: {
      immediate: true,
      handler(val: Date, oldval: Date) {
        if (val !== oldval && val) {
          const d = val.toLocaleString();
          this.value.birthDate =
            d.slice(0, 4) + "-" + d.slice(5, 7) + "/" + d.slice(8, 10);
        }
      },
    },
    company: function (val, oldval) {
      this.value.company = val;
    },
    contacts: function (val, oldval) {
      this.value.contacts = val.map((el: IContact) =>
        this.contactToRequestContact(el)
      );
    },
  },
  computed: {
    computedDate: function (): string {
      if (!this.value.birthDate) return "";
      return (
        this.value.birthDate.slice(8, 10) +
        "/" +
        this.value.birthDate.slice(5, 7) +
        "/" +
        this.value.birthDate.slice(0, 4)
      );
    },
    companiesList: function (): ISelectItem[] {
      return this.$store.getters.companies;
    },
    markersList: function () {
      console.log(this.$store.getters.markers);
      return this.$store.getters.markers;
    },
    computedCompany: function (): string | number {
      return this.company ? this.company.id : "";
    },
    selectedCompany: {
      get(): ISelectItem | string {
        if (!this.value.company) return "";
        return {
          value: this.value.company.id,
          text: this.value.company.name,
        };
      },
      set(value: any) {
        if (value as ISelectItem) {
          this.value.company = {
            id: value.value,
            name: value.text,
          };
        } else {
          this.value.company = {
            id: -1,
            name: value,
          };
        }
      },
    },
  },
  created(): void {
    this.value = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      company: this.company,
      contacts: this.contacts.map((el) => this.contactToRequestContact(el)),
    };
    this.setData();
  },
  methods: {
    async setData() {
      await Promise.all([this.setCompanies(), this.setMarkers()]);
    },
    async setCompanies(): Promise<void> {
      if (this.$store.getters.hasCompanies) return;
      const res = await listCompanies();
      if (res.status === 200) {
        this.$store.commit("setCompanies", res.data);
      }
    },
    async setMarkers(): Promise<void> {
      if (this.$store.getters.hasMarkers) return;
      const res = await listContactCategories();
      if (res.status === 200) {
        res.data.map((category) => {
          this.$store.commit(`set${category.tag}Markers`, {
            id: category.id,
            name: category.name,
            tag: category.tag,
            markers: category.contactMarkers,
          });
        });
      }
    },
    contactToRequestContact(
      contact: IContact,
      created = false
    ): IRequestContact {
      return {
        id: contact.id,
        value: contact.value,
        contactMarker: contact.contactMarker.id,
        markerTag: contact.contactMarker.tag,
        markerName: contact.contactMarker.name,
        contactCategory: contact.contactMarker.contactCategory.id,
        categoryTag: contact.contactMarker.contactCategory.tag,
        categoryName: contact.contactMarker.contactCategory.name,
        new: created,
        modified: false,
      };
    },
    onDelete(): void {
      this.$emit("delete", this.id);
    },
    onUpdate(): void {
      this.$emit("update", this.id);
    },
    onClick(): void {
      let birthDate: Date | string | undefined = this.value.birthDate;
      if (birthDate !== undefined) {
        const d = new Date(birthDate);
        birthDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      }
      this.$emit("save", {
        ...this.value,
        birthDate,
      });
    },
    onAddContact: function (): void {
      this.value.contacts.push(
        this.contactToRequestContact(
          {
            id: -1,
            value: "",
            contactMarker: {
              name: "",
              id: -1,
              tag: "",
              contactCategory: {
                name: this.markersList.PHONE.name,
                tag: this.markersList.PHONE.tag,
                id: this.markersList.PHONE.id,
              },
            },
          },
          true
        )
      );
      console.log(this.value.contacts);
    },
  },
});
</script>

<style></style>
