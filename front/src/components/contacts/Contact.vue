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
            :value="firstName"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            prepend-icon="mdi-account-outline"
            :outlined="active"
            :filled="!active"
            label="Sobrenome"
            :value="lastName"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
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
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
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
            label="Marcador"
            :value="computedCompany"
            :items="companiesList"
          >
          </v-combobox>
        </v-col>
      </v-row>
      <div v-if="contacts.length > 0">
        <v-row dense class="pt-0 mt-0">
          <v-col>
            <v-card-subtitle class="ma-0 pa-0 pb-2"> Contatos </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row dense v-for="contact in contacts" :key="contact.id">
          <v-col cols="6">
            <v-text-field
              prepend-icon="mdi-calendar"
              :outlined="active"
              :filled="!active"
              :label="contact.contactMarker.contactCategory.name"
              :value="contact.value"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-combobox
              prepend-icon="mdi-calendar"
              :outlined="active"
              :filled="!active"
              label="Marcador"
              :value="contact.contactMarker.tag"
              :items="markers[contact.contactMarker.contactCategory.tag]"
            >
            </v-combobox>
          </v-col>
        </v-row>
      </div>
      <v-row no-gutters justify="end" v-if="active">
        <v-col cols="auto">
          <v-btn color="success"> Salvar </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

import { IContact } from "../../models/Contact";
import { ICompany } from "../../models/Company";

interface IContactData {
  date: Date | string;
  menu: boolean;
  markers: object;
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
      type: Date,
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
    markers: {
      PHONE: [
        {
          text: "Pessoal",
          value: "PERSONAL",
        },
      ],
      EMAIL: [],
    },
  }),
  watch: {
    birthDate: {
      immediate: true,
      handler(val: Date, oldval: Date) {
        if (val !== oldval && val instanceof Date) {
          this.date = val;
        }
      },
    },
  },
  computed: {
    computedDate: function (): string {
      if (this.date instanceof Date) {
        const dateString = this.date.toLocaleString();
        return (
          dateString.slice(8, 10) +
          "/" +
          dateString.slice(5, 7) +
          "/" +
          dateString.slice(0, 4)
        );
      }
      return "";
    },
    computedCompany: function (): string | number {
      return this.company ? this.company.id : "";
    },
  },
  methods: {
    onDelete(): void {
      this.$emit("delete", this.id);
    },
    onUpdate(): void {
      this.$emit("update", this.id);
    },
  },
});
</script>

<style></style>
