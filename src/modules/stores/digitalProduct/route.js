import StoreView from './view/DigitalView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/digitalProduct', 
        name: 'digitalProduct.list', 
        component:  StoreView,
        children:[
            {
                path: '',
                name: 'digitalProduct.all',
                component:  ()=>import ('@/modules/stores/digitalProduct/view/DigitalList.vue'),
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
                name: 'digitalProduct.add',
                component:  ()=>import ('@/modules/stores/digitalProduct/view/DigitalAdd.vue'),
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
                name: 'digitalProduct.show',
                component:  ()=>import ('@/modules/stores/digitalProduct/view/DigitalShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'digitalProduct.edit',
                component:  ()=>import ('@/modules/stores/digitalProduct/view/DigitalEdit.vue'),
            }
        ]
    },
    

]

export default routes;