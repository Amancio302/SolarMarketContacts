<template>
  <div>
    <DefaultCard
      title="Informações Pessoais"
      :actions="personActions"
      class="ma-0 pa-0"
      @menu="onMenuClick"
    >
      <v-menu
        v-model="menu.value"
        :position-x="menu.x"
        :position-y="menu.y"
        absolute
        offset-y
      >
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
      <v-form :disabled="!active" class="pa-3">
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
              ref="calendar"
              v-model="calendar.value"
              :position-x="calendar.x"
              :position-y="calendar.y"
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
                <v-btn text color="primary" @click="calendar.value = false">
                  Cancelar
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.calendar.save(value.birthDate)"
                >
                  Aceitar
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-combobox
              prepend-icon="mdi-briefcase"
              :outlined="active"
              :filled="!active"
              label="Empresa"
              v-model="selectedCompany"
              :items="companiesList"
            >
            </v-combobox>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <DefaultCard
            title="Contatos"
            :actions="contactsActions"
            :outlined="false"
            @add="onAddContact"
            v-if="value.contacts.length > 0 || active"
            class="pa-0 ma-0"
          >
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
                <v-radio-group
                  v-model="contact.contactMarker.contactCategory.tag"
                  row
                >
                  <v-radio
                    v-for="category in categoriesList"
                    :key="category.id"
                    :label="category.name"
                    :value="category.tag"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <v-select
                  prepend-icon="mdi-calendar"
                  :outlined="active"
                  :filled="!active"
                  label="Marcador"
                  v-model="contact.contactMarker.id"
                  :items="
                    categoriesList[contact.contactMarker.contactCategory.tag]
                      .contactMarkers
                  "
                >
                </v-select>
              </v-col>
            </v-row>
          </DefaultCard>
        </v-row>
        <v-row justify="end" v-if="active">
          <v-col cols="auto">
            <v-btn color="success" @click="onSave"> Salvar </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </DefaultCard>
  </div>
</template>

<script>
import DefaultCard from "@/components/cards/DefaultCard";

import { listCompanies } from "@/services/company/company";
import { listContactCategories } from "@/services/contacts/contactsCategories";

import { dateToString, stringToDate } from "@/utils/format/date";

export default {
  components: { DefaultCard },
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
      type: Object,
    },
    contacts: {
      type: Array,
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
  data: () => ({
    personActions: [
      {
        name: "menu",
        icon: "mdi-dots-vertical",
      },
    ],
    value: {
      firstName: "",
      lastName: "",
      birthDate: "",
      company: undefined,
      contacts: [],
    },
    menu: {
      value: false,
      x: 0,
      y: 0,
    },
    calendar: {
      value: false,
      x: 0,
      y: 0,
    },
    selectedCompany: undefined,
  }),
  watch: {
    active: function () {
      this.syncPerson();
    },
  },
  computed: {
    contactsActions: function () {
      return [
        {
          name: "add",
          icon: "mdi-plus",
          disabled: !this.active,
        },
      ];
    },
    computedDate: function () {
      console.log("Computed");
      return dateToString(this.value.birthDate);
    },
    companiesList: function () {
      return this.$store.getters.companiesItems;
    },
    categoriesList: function () {
      const res = {};
      this.$store.getters.categoriesItems.map((el) => {
        res[el.tag] = el;
      });
      return res;
    },
  },
  created() {
    this.setData();
  },
  methods: {
    async setData() {
      const promises = [];
      if (!this.$store.getters.hasCompanies) {
        promises.push(this.setCompanies());
      }
      if (!this.$store.getters.hasCategories) {
        promises.push(this.setCategories());
      }
      await Promise.all(promises);
      this.syncPerson();
    },
    async setCompanies() {
      const res = await listCompanies().catch((err) => err);
      if (res.status === 200) {
        this.$store.commit("setCompanies", res.data);
      }
    },
    async setCategories() {
      const res = await listContactCategories().catch((err) => err);
      if (res.status === 200) {
        res.data.map((el) => {
          this.$store.commit("setCategory", {
            category: {
              id: el.id,
              name: el.name,
              tag: el.tag,
            },
            contactMarkers: el.contactMarkers,
          });
        });
      }
    },
    syncPerson() {
      this.$nextTick(() => {
        this.value = {
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
          company: this.company?.id,
          birthDate: stringToDate(this.birthDate),
          contacts: this.contacts,
        };
        this.selectedCompany = this.selectedCompany
          ? {
              text: this.company.name,
              value: this.company.id,
            }
          : undefined;
        console.log("sync", this.value);
      });
    },
    onMenuClick(e) {
      e.preventDefault();
      this.menu.value = false;
      this.menu.x = e.clientX;
      this.menu.y = e.clientY;
      this.$nextTick(() => {
        this.menu.value = true;
      });
    },
    onAddContact() {
      this.value.contacts.push({
        id: -1,
        value: "",
        contactMarker: {
          id: this.$store.getters.defaultMarkerId,
          contactCategory: {
            tag: this.$store.getters.defaultCategoryTag,
          },
        },
        updated: false,
      });
      this.contactsActions[0].disabled = true;
    },
    onUpdate(e) {
      e.preventDefault();
      this.$emit("update", e);
    },
    onDelete(e) {
      e.preventDefault();
      this.$emit("delete", e);
    },
    onSave() {
      // Checks if person data has changed
      // Updates company data
      this.value.company =
        this.selectedCompany && this.selectedCompany.value
          ? { id: this.selectedCompany.value }
          : {
              id: -1,
              name: this.selectedCompany,
            };
      const personChanged =
        this.id !== -1 &&
        (this.value.firstName !== this.firstName ||
          this.value.lastName !== this.lastName ||
          this.value.birthDate !== this.birthDate ||
          this.value.company !== this.company);
      this.value.updated = personChanged;
      // Emits data
      this.$emit("save", this.value);
    },
  },
};
</script>

<style></style>
