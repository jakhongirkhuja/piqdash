import CompanyTeamViewVue from './view/CompanyTeamView.vue';
import {checkToken} from '@/globals/checkToken.js';

const routes =  [
    {
        path: '/companyTeams/:company_id', 
        name: 'companyTeams.list', 
        component:  CompanyTeamViewVue,
        children:[
            {
                path: '',
                name: 'companyTeams.all',
                component:  ()=>import ('@/modules/companyTeams/view/CompanyTeamList.vue'),
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
                name: 'companyTeams.add',
                component:  ()=>import ('@/modules/companyTeams/view/CompanyTeamAdd.vue'),
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
                path: 'show/:team_id',
                name: 'companyTeams.show',
                component:  ()=>import ('@/modules/companyTeams/view/CompanyTeamShow.vue'),
            },
            {
                path: 'edit/:team_id',
                name: 'companyTeams.edit',
                component:  ()=>import ('@/modules/companyTeams/view/CompanyTeamEdit.vue'),
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