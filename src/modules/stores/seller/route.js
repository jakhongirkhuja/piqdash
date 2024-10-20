import SellerView from './view/SellerView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/seller', 
        name: 'sellers.list', 
        component:  SellerView,
        children:[
            {
                path: '',
                name: 'sellers.all',
                component:  ()=>import ('@/modules/stores/seller/view/SellerList.vue'),
                beforeEnter: (to, from, next) => {
                    
                    if(checkToken()){
                        next();
                        return;
                    }else{
                        alert('not');
                    }
                   
                }
            },
            {
                path: 'add',
                name: 'sellers.add',
                component:  ()=>import ('@/modules/stores/seller/view/SellerAdd.vue'),
                beforeEnter: (to, from, next) => {
                    if(checkToken()){
                        next();
                        return;
                    }else{
                        alert('not');
                    }
                   
                }
            },
            {
                path: 'show/:id',
                name: 'sellers.show',
                component:  ()=>import ('@/modules/stores/seller/view/SellerShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'sellers.edit',
                component:  ()=>import ('@/modules/stores/seller/view/SellerEdit.vue'),
            }
        ]
    },
    

]

export default routes;