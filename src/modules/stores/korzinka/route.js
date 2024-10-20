import KorzinkaView from './view/KorzinkaView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/korzinka', 
        name: 'korzinka.list', 
        component:  KorzinkaView,
        children:[
            {
                path: '',
                name: 'korzinka.all',
                component:  ()=>import ('@/modules/stores/korzinka/view/KorzinkaList.vue'),
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
                name: 'korzinka.add',
                component:  ()=>import ('@/modules/stores/korzinka/view/KorzinkaAdd.vue'),
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
                name: 'korzinka.show',
                component:  ()=>import ('@/modules/stores/korzinka/view/KorzinkaShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'korzinka.edit',
                component: ()=>import ('@/modules/stores/korzinka/view/KorzinkaEdit.vue'),
            }
        ]
    },
    

]

export default routes;