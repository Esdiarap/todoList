import {createRouter, createWebHashHistory} from "vue-router";

// import MyTodo from '../views/MyTodo.vue'
import MyTodo from "@/views/MyTodo";

const routes = [
    {
        path: '/',
        name: 'MyTodo',
        component: MyTodo
    },
    {
        path: '/dashboard',
        name: 'DashBoard',
        component: () => import('../views/DashBoard.vue')
    },
    {
        path: '/setting',
        name: 'TodoSetting',
        component: () => import('../views/TodoSetting.vue')
    },
    {
        path: '/about',
        name: 'AboutMe',
        component: () => import( '../views/AboutMe.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
