import LessonViewVue from './view/LessonView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/lessons', 
        name: 'lessons.list', 
        component:  LessonViewVue,
        children:[
            {
                path: '',
                name: 'lessons.all',
                component:  ()=>import ('@/modules/lessons/view/LessonList.vue'),
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
                name: 'lessons.add',
                component:  ()=>import ('@/modules/lessons/view/LessonAdd.vue'),
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
                name: 'lessons.show',
                component:  ()=>import ('@/modules/lessons/view/LessonShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'lessons.edit',
                component:  ()=>import ('@/modules/lessons/view/LessonEdit.vue'),
            }
        ]
    },
    

]

export default routes;