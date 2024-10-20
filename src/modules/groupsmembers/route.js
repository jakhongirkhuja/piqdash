import GroupViewVue from './view/GroupView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/groupmembers', 
        name: 'groupmembers.list', 
        component:  GroupViewVue,
        children:[
            {
                path: '',
                name: 'groupmembers.all',
                component:  ()=>import ('@/modules/groups/view/GroupList.vue'),
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
                name: 'groupmembers.add',
                component:  ()=>import ('@/modules/groups/view/GroupAdd.vue'),
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
                name: 'groupmembers.show',
                component:  ()=>import ('@/modules/groups/view/GroupShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'groupmembers.edit',
                component:  ()=>import ('@/modules/groups/view/GroupEdit.vue'),
            }
        ]
    },
    

]

export default routes;