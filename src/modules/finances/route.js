import FinanceView from './view/FinanceView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/finances', 
        name: 'finance.list', 
        component:  FinanceView,
        children:[
            {
                path: '',
                name: 'finance.all',
                component:  ()=>import ('@/modules/finances/view/FinanceList.vue'),
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
                path: 'remove-iqc',
                name: 'finance.removeIqc',
                component:  ()=>import ('@/modules/finances/view/FinanceRemoveIqc.vue'),
                beforeEnter: (to, from, next) => {
                    if(checkToken()){
                        next();
                        return;
                    }else{
                        alert('not');
                    }
                   
                }
            },
        ]
    },
    

]

export default routes;