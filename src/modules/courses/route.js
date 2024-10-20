import CourseViewVue from './view/CourseView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/courses', 
        name: 'courses.list', 
        component:  CourseViewVue,
        children:[
            {
                path: '',
                name: 'courses.all',
                component:  ()=>import ('@/modules/courses/view/CourseList.vue'),
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
                name: 'courses.add',
                component:  ()=>import ('@/modules/courses/view/CourseAdd.vue'),
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
                name: 'courses.show',
                component:  ()=>import ('@/modules/courses/view/CourseShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'courses.edit',
                component:  ()=>import ('@/modules/courses/view/CourseEdit.vue'),
            }
        ]
    },
    

]

export default routes;