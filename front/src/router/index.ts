import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ContactList from '../views/ContactList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'ContactList',
    component: ContactList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
