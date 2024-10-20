import PromocodeView from './view/PromocodeView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/promocodes', 
        name: 'promocodes.list', 
        component:  PromocodeView,
        children:[
            {
                path: '',
                name: 'promocodes.all',
                component:  ()=>import ('@/modules/promocodes/view/PromocodeList.vue'),
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
                name: 'promocodes.add',
                component:  ()=>import ('@/modules/promocodes/view/PromocodeAdd.vue'),
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
                name: 'promocodes.show',
                component:  ()=>import ('@/modules/promocodes/view/PromocodeShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'promocodes.edit',
                component:  ()=>import ('@/modules/promocodes/view/PromocodeEdit.vue'),
            }
        ]
    },
    

]

export default routes;