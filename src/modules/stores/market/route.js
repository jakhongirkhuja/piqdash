import MarketView from './view/MarketView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/stores/market', 
        name: 'markets.list', 
        component:  MarketView,
        children:[
            {
                path: '',
                name: 'markets.all',
                component:  ()=>import ('@/modules/stores/market/view/MarketList.vue'),
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
                name: 'markets.add',
                component:  ()=>import ('@/modules/stores/market/view/MarketAdd.vue'),
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
                name: 'markets.show',
                component:  ()=>import ('@/modules/stores/market/view/MarketShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'markets.edit',
                component: ()=>import ('@/modules/stores/market/view/MarketEdit.vue'),
            }
        ]
    },
    

]

export default routes;