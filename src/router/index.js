import {createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import AuthUser from '@/views/AuthUser.vue'
import LogOutUser from '@/views/LogOutUser.vue'
import NotLoged from '@/views/NotAuth.vue'
import usersRoute from '@/modules/users/route.js'
import componiesRoute from '@/modules/companies/route.js'
import componyTeams from '@/modules/companyTeams/route.js'
import categoriesRoute from '@/modules/categories/route.js'
import coursesRoute from '@/modules/courses/route.js'
import lessonsRoute from '@/modules/lessons/route.js'
import quizzesRoute from '@/modules/quizzes/route.js'
import groupsRoute from '@/modules/groups/route.js'
import promocodesRoute from '@/modules/promocodes/route.js'
import targetFiltersRoute from '@/modules/targetfilters/route.js'
import inboxesRoute from '@/modules/inboxes/route.js'
import storesCategoryRoute from '@/modules/stores/category/route.js'
import storesProductRoute from '@/modules/stores/product/route.js'
import physicalProductRoute from '@/modules/stores/physicalProduct/route.js'
import physicalStoreViewRoute from '@/modules/stores/physicalStore/route.js'
import digitalStoreViewRoute from '@/modules/stores/digitalStore/route.js'
import digitalProductRoute from '@/modules/stores/digitalProduct/route.js'
import korzinkaRoute from '@/modules/stores/korzinka/route.js'
import storesMarketRoute from '@/modules/stores/market/route.js'
import storesSellerRoute from '@/modules/stores/seller/route.js'
import newsRoute from '@/modules/news/route.js'
import lotteryRoute from '@/modules/lottery/route.js'
import smsRoute from '@/modules/sms/route.js'
import financeRoute from '@/modules/finances/route.js'
import pinRoute from '@/modules/pins/route.js'
import "@/assets/newStyle.css"
const routes =  [
    {path: '/', name: 'Dashboard', component: Dashboard},
    {path: '/auth-user', name: 'AuthUser', component: AuthUser},
    {path: '/logout-user', name: 'LogOutUser', component: LogOutUser},
    {path: '/not-loged', name: 'NotLoged', component: NotLoged},
    
]
const router = createRouter({
    history: createWebHistory(),
   
    routes: [
        ...routes,
        ...usersRoute,
        ...componiesRoute,
        ...categoriesRoute,
        ...coursesRoute,
        ...lessonsRoute,
        ...quizzesRoute,
        ...groupsRoute,
        ...promocodesRoute,
        ...targetFiltersRoute,
        ...inboxesRoute,
        ...storesCategoryRoute,
        ...storesProductRoute,
        ...physicalStoreViewRoute,
        ...digitalStoreViewRoute,
        ...storesMarketRoute,
        ...storesSellerRoute,
        ...smsRoute,
        ...financeRoute,
        ...newsRoute,
        ...componyTeams,
        ...physicalProductRoute,
        ...digitalProductRoute,
        ...korzinkaRoute,
        ...pinRoute,
        ...lotteryRoute
        //etc. 
  
        //Note '...' here is a "spread operator" and not ellipsis
      ]
})

export default router;





