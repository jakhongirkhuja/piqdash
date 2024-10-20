import PinViewVue from './view/PinView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/pins', 
        name: 'pins.list', 
        component:  PinViewVue,
        children:[
            {
                path: ':id',
                name: 'pins.all',
                component:  ()=>import ('@/modules/pins/view/PinList.vue'),
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
                name: 'pins.add',
                component:  ()=>import ('@/modules/pins/view/PinAdd.vue'),
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
                name: 'pins.show',
                component:  ()=>import ('@/modules/pins/view/Pinshow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'pins.edit',
                component:  ()=>import ('@/modules/pins/view/PinEdit.vue'),
            }
        ]
    },
    

]

export default routes;