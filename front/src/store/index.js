import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companiesList: [],
    categoryList: {},
  },
  getters: {
    companies: function (state) {
      return state.companiesList;
    },
    companiesItems: function (state) {
      return state.companiesList.map((el) => ({
        value: el.id,
        text: el.name,
      }));
    },
    hasCompanies: function (state) {
      return state.companiesList.length > 0;
    },
    categories: function (state) {
      return state.categoryList;
    },
    categoriesItems: function (state, getters) {
      const res = [];
      for (const tag in getters.categories) {
        res.push({
          ...getters.categories[tag],
          contactMarkers: getters.categories[tag].contactMarkers.map(
            (marker) => ({
              value: marker.id,
              text: marker.name,
            })
          ),
        });
      }
      return res;
    },
    defaultCategoryTag: function (state) {
      return state.categoryList.PHONE?.tag;
    },
    defaultMarkerId: function (state) {
      return state.categoryList.PHONE?.contactMarkers[0].id;
    },
    hasMarkers: function (state) {
      let hasCategory = false;
      for (const i in state.categoryList) {
        hasCategory = true;
        if (state.categoryList[i].markers.length === 0) return false;
      }
      return hasCategory;
    },
  },
  mutations: {
    setCompanies: function (state, payload) {
      state.companiesList = payload;
    },
    setCategory: function (state, { category, contactMarkers }) {
      state.categoryList[category.tag] = {
        name: category.name,
        tag: category.tag,
        id: category.id,
        contactMarkers,
      };
      state.categoryList = Object.assign({}, state.categoryList);
    },
  },
  actions: {},
  modules: {},
});
