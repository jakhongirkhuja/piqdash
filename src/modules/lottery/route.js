import LotteryViewVue from './view/LotteryView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/lottery', 
        name: 'lottery.list', 
        component:  LotteryViewVue,
        children:[
            {
                path: '',
                name: 'lottery.all',
                component:  ()=>import ('@/modules/lottery/view/LotteryList.vue'),
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
                name: 'lottery.add',
                component:  ()=>import ('@/modules/lottery/view/LotteryAdd.vue'),
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
                name: 'lottery.show',
                component:  ()=>import ('@/modules/lottery/view/LotteryShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'lottery.edit',
                component:  ()=>import ('@/modules/lottery/view/LotteryEdit.vue'),
            }
        ]
    },
    

]

export default routes;