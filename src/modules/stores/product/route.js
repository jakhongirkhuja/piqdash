import StoreView from './view/StoreView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/product', 
        name: 'stores.list', 
        component:  StoreView,
        children:[
            {
                path: '',
                name: 'stores.all',
                component:  ()=>import ('@/modules/stores/product/view/StoreList.vue'),
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
                name: 'stores.add',
                component:  ()=>import ('@/modules/stores/product/view/StoreAdd.vue'),
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
                name: 'stores.show',
                component:  ()=>import ('@/modules/stores/product/view/StoreShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'stores.edit',
                component:  ()=>import ('@/modules/stores/product/view/StoreEdit.vue'),
            }
        ]
    },
    

]

export default routes;