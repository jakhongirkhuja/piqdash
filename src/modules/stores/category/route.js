import StoreCategoryView from './view/CategoryView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/category', 
        name: 'storesCategory.list', 
        component:  StoreCategoryView,
        children:[
            {
                path: '',
                name: 'storesCategory.all',
                component:  ()=>import ('@/modules/stores/category/view/CategoryList.vue'),
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
                name: 'storesCategory.add',
                component:  ()=>import ('@/modules/stores/category/view/CategoryAdd.vue'),
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
                name: 'storesCategory.show',
                component:  ()=>import ('@/modules/stores/category/view/CategoryShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'storesCategory.edit',
                component:  ()=>import ('@/modules/stores/category/view/CategoryEdit.vue'),
            }
        ]
    },
    

]

export default routes;