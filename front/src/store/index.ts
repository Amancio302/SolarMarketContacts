import { ICompany } from '@/models/Company'
import { IContactMarker } from '@/models/ContactMarker'
import { ISelectItem } from '@/models/SelectItem'
import { IMarkers, IStore, IStoreCategories } from '@/models/Store'
import Vue from 'vue'
import Vuex, { mapGetters } from 'vuex'

Vue.use(Vuex)

const state: IStore = {
  companiesList: [],
  markersList: {
    PHONE: {
      id: -1,
      tag: 'PHONE',
      name: '',
      markers: []
    },
    EMAIL: {
      id: -1,
      tag: 'EMAIL',
      name: '',
      markers: []
    }
  }
}

export default new Vuex.Store({
  state,
  getters: {
    companies: function(state: IStore): ISelectItem[] {
      return state.companiesList.map(company => ({
        text: company.name,
        value: company.id
      }))
    },
    hasCompanies: function (state: IStore): boolean {
      return state.companiesList.length > 0
    },
    markersList: function(state: IStore): IMarkers {
      return state.markersList
    },
    markers: function(state: IStore, getters) {
      return {
        PHONE: {
          ...state.markersList.PHONE,
          data: getters.PHONE
        },
        EMAIL: {
          ...state.markersList.EMAIL,
          data: getters.EMAIl
        }
      }
    },
    hasMarkers: function (state: IStore, getters): boolean {
      const categories = state.markersList
      for (const category in categories) {
        const hasMarker: boolean = getters[`has${category}`]
        if (!hasMarker) return false
      }
      return true
    },
    PHONE: function(state: IStore): ISelectItem[] {
      return state.markersList.PHONE.markers.map(marker => ({ text: marker.name, value: marker.id }))
    },
    hasPHONE: function (state: IStore, getters): boolean {
      return getters.PHONE.length > 0
    },
    EMAIL: function(state: IStore): ISelectItem[] {
      return state.markersList.EMAIL.markers.map(marker => ({ text: marker.name, value: marker.id }))
    },
    hasEMAIL: function (state: IStore, getters): boolean {
      return getters.EMAIL.length > 0
    },
  },
  mutations: {
    setCompanies: function(state: IStore, payload: ICompany[]): void {
      state.companiesList = payload
    },
    setPHONEMarkers: function(state: IStore, payload: IStoreCategories): void {
      state.markersList.PHONE = payload
    },
    setEMAILMarkers: function(state: IStore, payload: IStoreCategories): void {
      state.markersList.EMAIL = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
