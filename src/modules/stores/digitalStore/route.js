import DigitalStoreView from './view/DigitalStoreView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/digitalStore', 
        name: 'digitalStore.list', 
        component:  DigitalStoreView,
        children:[
            {
                path: '',
                name: 'digitalStore.all',
                component:  ()=>import ('@/modules/stores/digitalStore/view/DigitalStoreList.vue'),
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
                name: 'digitalStore.add',
                component:  ()=>import ('@/modules/stores/digitalStore/view/DigitalStoreAdd.vue'),
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
                name: 'digitalStore.show',
                component:  ()=>import ('@/modules/stores/digitalStore/view/DigitalStoreShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'digitalStore.edit',
                component: ()=>import ('@/modules/stores/digitalStore/view/DigitalStoreEdit.vue'),
            }
        ]
    },
    

]

export default routes;