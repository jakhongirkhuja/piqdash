import SmsView from './view/SmsView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/sms', 
        name: 'sms.list', 
        component:  SmsView,
        children:[
            {
                path: '',
                name: 'sms.all',
                component:  ()=>import ('@/modules/sms/view/SmsList.vue'),
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
                path: 'control',
                name: 'sms.control.all',
                component:  ()=>import ('@/modules/sms/view/SmsControlList.vue'),
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
                name: 'sms.add',
                component:  ()=>import ('@/modules/sms/view/SmsAdd.vue'),
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
                name: 'sms.show',
                component:  ()=>import ('@/modules/sms/view/SmsShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'sms.edit',
                component:  ()=>import ('@/modules/sms/view/SmsEdit.vue'),
            }
        ]
    },
    

]

export default routes;