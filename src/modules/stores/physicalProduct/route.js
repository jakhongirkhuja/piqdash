import StoreView from './view/PhysicalView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/physicalProduct', 
        name: 'physicalProduct.list', 
        component:  StoreView,
        children:[
            {
                path: '',
                name: 'physicalProduct.all',
                component:  ()=>import ('@/modules/stores/physicalProduct/view/PhysicalList.vue'),
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
                name: 'physicalProduct.add',
                component:  ()=>import ('@/modules/stores/physicalProduct/view/PhysicalAdd.vue'),
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
                name: 'physicalProduct.show',
                component:  ()=>import ('@/modules/stores/physicalProduct/view/PhysicalShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'physicalProduct.edit',
                component:  ()=>import ('@/modules/stores/physicalProduct/view/PhysicalEdit.vue'),
            }
        ]
    },
    

]

export default routes;