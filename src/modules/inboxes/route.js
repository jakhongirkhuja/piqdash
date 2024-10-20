import InboxView from './view/InboxView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/inboxes', 
        name: 'inboxes.list', 
        component:  InboxView,
        children:[
            {
                path: '',
                name: 'inboxes.all',
                component:  ()=>import ('@/modules/inboxes/view/InboxList.vue'),
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
                name: 'inboxes.add',
                component:  ()=>import ('@/modules/inboxes/view/InboxAdd.vue'),
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
                name: 'inboxes.show',
                component:  ()=>import ('@/modules/inboxes/view/InboxShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'inboxes.edit',
                component:  ()=>import ('@/modules/inboxes/view/InboxEdit.vue'),
            }
        ]
    },
    

]

export default routes;