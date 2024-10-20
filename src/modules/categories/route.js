import CategoryViewVue from './view/CategoryView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/categories', 
        name: 'categories.list', 
        component:  CategoryViewVue,
        children:[
            {
                path: '',
                name: 'categories.all',
                component:  ()=>import ('@/modules/categories/view/CategoryList.vue'),
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
                name: 'categories.add',
                component:  ()=>import ('@/modules/categories/view/CategoryAdd.vue'),
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
                name: 'categories.show',
                component:  ()=>import ('@/modules/categories/view/CategoryShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'categories.edit',
                component:  ()=>import ('@/modules/categories/view/CategoryEdit.vue'),
            }
        ]
    },
    

]

export default routes;