import "./styles.scss";
import { createApp } from "vue";
import Router from "./Router.vue";
import HomeComponent from "./pages/home/Home.vue";
import ProjectComponent from "./pages/project/Project.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: HomeComponent,
  },
  {
    path: "/project/:id",
    component: ProjectComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(Router).use(router).use(createPinia()).mount("#app");
