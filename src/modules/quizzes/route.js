import QuizViewVue from './view/QuizView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/quizzes', 
        name: 'quizzes.list', 
        component:  QuizViewVue,
        children:[
            {
                path: '',
                name: 'quizzes.all',
                component:  ()=>import ('@/modules/quizzes/view/QuizList.vue'),
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
                name: 'quizzes.add',
                component:  ()=>import ('@/modules/quizzes/view/QuizAdd.vue'),
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
                name: 'quizzes.show',
                component:  ()=>import ('@/modules/quizzes/view/QuizShow.vue'),
            },
            {
                path: 'edit/:id',
                name: 'quizzes.edit',
                component:  ()=>import ('@/modules/quizzes/view/QuizEdit.vue'),
            },
            {
                path: 'dash',
                name: 'quizzes.dash',
                component:  ()=>import ('@/modules/quizzes/view/QuizDash.vue'),
            }
            
        ]
    },
    

]

export default routes;