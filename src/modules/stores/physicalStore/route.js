import PhysicalStoreView from './view/PhysicalStoreView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/physicalStore', 
        name: 'physicalStore.list', 
        component:  PhysicalStoreView,
        children:[
            {
                path: '',
                name: 'physicalStore.all',
                component:  ()=>import ('@/modules/stores/physicalStore/view/PhysicalStoreList.vue'),
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
                name: 'physicalStore.add',
                component:  ()=>import ('@/modules/stores/physicalStore/view/PhysicalStoreAdd.vue'),
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
                name: 'physicalStore.show',
                component:  ()=>import ('@/modules/stores/physicalStore/view/PhysicalStoreShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'physicalStore.edit',
                component: ()=>import ('@/modules/stores/physicalStore/view/PhysicalStoreEdit.vue'),
            }
        ]
    },
    

]

export default routes;