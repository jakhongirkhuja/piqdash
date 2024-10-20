import NewsViewVue from './view/NewsView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/news', 
        name: 'news.list', 
        component:  NewsViewVue,
        children:[
            {
                path: '',
                name: 'news.all',
                component:  ()=>import ('@/modules/news/view/NewsList.vue'),
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
                name: 'news.add',
                component:  ()=>import ('@/modules/news/view/NewsAdd.vue'),
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
                name: 'news.show',
                component:  ()=>import ('@/modules/news/view/NewsShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'news.edit',
                component:  ()=>import ('@/modules/news/view/NewsEdit.vue'),
            }
        ]
    },
    

]

export default routes;