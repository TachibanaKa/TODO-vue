import { createRouter, createWebHashHistory } from "vue-router";
import App from "../src/App.vue";
import Todo from "../src/components/todo.vue";

const routes = [
  { path: "/", component: Todo },
  { name: "/todo", path: "/todo", component: Todo },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;