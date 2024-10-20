import TargetFilterView from './view/TargetFilterView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/tagetfilters', 
        name: 'targetfilters.list', 
        component:  TargetFilterView,
        children:[
            {
                path: '',
                name: 'targetfilters.all',
                component:  ()=>import ('@/modules/targetfilters/view/TargetFilterList.vue'),
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
                name: 'targetfilters.add',
                component:  ()=>import ('@/modules/targetfilters/view/TargetFilterAdd.vue'),
                beforeEnter: (to, from, next) => {
                    if(checkToken()){
                        next();
                        return;
                    }else{
                        alert('not');
                    }
                   
                }
            },
            // {
            //     path: 'show/:id',
            //     name: 'targetfilters.show',
            //     component:  ()=>import ('@/modules/targetfilters/view/targetfilterShow.vue'),
            // },
            {
                path: 'edit/:id',
                name: 'targetfilters.edit',
                component:  ()=>import ('@/modules/targetfilters/view/TargetFilterEdit.vue'),
            }
        ]
    },
    

]

export default routes;