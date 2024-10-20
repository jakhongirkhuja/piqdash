import UserViewVue from './view/UserView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/users', 
        name: 'users.list', 
        component:  UserViewVue,
        children:[
            {
                path: '',
                name: 'users.all',
                component:  ()=>import ('@/modules/users/view/UserList.vue'),
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
                name: 'users.add',
                component:  ()=>import ('@/modules/users/view/UserAdd.vue'),
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
                name: 'users.show',
                component:  ()=>import ('@/modules/users/view/UserShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'users.edit',
                component:  ()=>import ('@/modules/users/view/UserEdit.vue'),
            }
        ]
    },
    

]

export default routes;