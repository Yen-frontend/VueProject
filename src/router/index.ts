import { createRouter, createWebHashHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import Home from '../pages/Home/Home.vue'
import Login from '../pages/Login/Login.vue'
import Register from '../pages/Register/Register.vue'
import PageA from '../pages/PageA/PageA.vue'
import PageB from '../pages/PageB/PageB.vue'
import PageC from '../pages/PageC/PageC.vue'
import NotFound from '../pages/NotFound/NotFound.vue'

const router = createRouter({
  // createWebHashHistory 加#相容git page
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/page-a', component: PageA, meta: { requiresAuth: true } },
    { path: '/page-b', component: PageB, meta: { requiresAuth: true } },
    { path: '/page-c', component: PageC, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', component: NotFound, meta: { hideChrome: true } },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return
  const { data } = await supabase.auth.getSession()
  if (!data.session) return '/login'
})

export default router
