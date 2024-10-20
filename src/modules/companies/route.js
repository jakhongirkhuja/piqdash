import CompanyView from './view/CompanyView.vue';
import {checkToken} from '@/globals/checkToken.js';
const routes =  [
    {
        path: '/companies', 
        name: 'companies.list', 
        component:  CompanyView,
        children:[
            {
                path: '',
                name: 'companies.all',
                component:  ()=>import ('@/modules/companies/view/CompanyList.vue'),
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
                name: 'companies.show',
                component:  ()=>import ('@/modules/companies/view/CompanyShow.vue'),
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
                path: 'edit/:id',
                name: 'companies.edit',
                component:  ()=>import ('@/modules/companies/view/CompanyEdit.vue'),
                beforeEnter: (to, from, next) => {
                    
                    if(checkToken()){
                        next();
                        return;
                    }else{
                        alert('not');
                    }
                   
                }
            }
        ]
    },
    

]

export default routes;