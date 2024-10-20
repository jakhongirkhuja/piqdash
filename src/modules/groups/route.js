import GroupViewVue from './view/GroupView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/groups', 
        name: 'groups.list', 
        component:  GroupViewVue,
        children:[
            {
                path: '',
                name: 'groups.all',
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
                name: 'groups.add',
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
                name: 'groups.show',
                component:  ()=>import ('@/modules/groups/view/GroupShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'groups.edit',
                component:  ()=>import ('@/modules/groups/view/GroupEdit.vue'),
            }
        ]
    },
    

]

export default routes;