import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Crear from '../components/Crear.vue'
import Editar from '../components/Editar.vue'
import Listar from '../components/Listar.vue'
import Login from '../components/Login.vue'
import CrearProvincia from '../components/CrearProvincia.vue'
import ListarProvincias from '../components/ListarProvincias.vue'
import EditarProvincias from '../components/EditarProvincias.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/crear',
      name: 'Crear',
      component: Crear
    },
    {
      path: '/editar/:id',
      name: 'Editar',
      component: Editar
    },
    {
      path: '/listar',
      name: 'Listar',
      component: Listar
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/crearprov',
      name:'CrearProvincia',
      component:CrearProvincia
    },
    {
      path:'/listarprov',
      name:'ListarProvincias',
      component:ListarProvincias
    },
    {
      path:'/editarprov/:id',
      name:'EditarProvincias',
      component:EditarProvincias
    },

    
  
  ]
})

export default router
