
<template>
    <div class="row">
        <div class="col-md-6">
          <CrudButton  v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner' ) && companyId" urlName="companyTeams.add" :btnName="'Add Team'"  />
        </div>
        <div class="col-md-6 text-right" style="padding-top:10px">
            {{ companyName }}
            <!-- <input type="search" @input="searchteam" v-model="teamsearch" class="form-control" placeholder="Search"> -->
        </div>
        <div class="col-md-3 text-center">
          
            <!-- <LanguageSwitcher /> -->
      
        </div>
    </div>
    
    <div class="mt-3">
        <div class="row">
                    <div class="col-12">
                      <div class="table-responsive">
                        <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">Team Name (Employee)</th>
                           
                            <th scope="col">Team Type</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="team in teams" :key="team.id">
                            
                           
                                
                                <td>{{team.teamName}} ({{ team.company_team_list.length }})</td>
                                <td>{{team.teamType? 'Special' : 'Branch'}}</td>
                                <td class="actions">
                                     <div  @click="showteam(team.id)" class="show text-primary mr-2 cursor-pointer" ><i class="ti ti-eye" data-toggle="tooltip" title="Show"></i></div>
                                     <div  @click="editteam(team.id)" class="edit mr-2 cursor-pointer" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" ><i class="ti ti-pencil-alt" data-toggle="tooltip" title="Edit"></i></div>
                                     <div  data-toggle="modal" data-target="#exampleModal cursor-pointer" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" @click="openmodel(team.id, team.teamName)" class="delete text-danger" ><i class="ti ti-trash" data-toggle="tooltip" title="Delete"></i></div>
                                  </td>
                            
                                
                            </tr>
                            
                        </tbody>
                        </table>
                      </div>
                      <Pagination v-if="last_page!=1" :total-pages="this.last_page"
   :total="this.total"
   :per-page="this.per_page"
   :current-page="currentPage"
   @pagechanged="onPageChange" />
                    </div>
            </div>
    </div>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete team</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-center">
        <template v-if="resError" >
                  
        <p class="error" v-for=" (value,name) in resError">
            {{name}} : {{value[0]}}
        </p>
        </template>
        <p class="error" v-if="resStringError">
            {{resStringError}}
        </p>
        <p class="success" v-if="resSuccess">
            {{resSuccess}}
        </p>
        <h4>Are you sure you want to delete this team?</h4>
        <h4>{{modelName}}</h4>
        
        <p>teamId: {{modelUserId}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button v-if="submitButton" :disabled="disabled" type="button" @click="requestApiDelete" class="btn btn-primary">Delete team</button>
      </div>
    </div>
  </div>
</div>
<div class="loading" v-if="loading">
        <img src="/loading.gif">
    </div>
</template>
<script>
import CrudButton from '@/components/CrudButton.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import Pagination from '@/components/Pagination.vue';
import {standartAttribute} from '@/globals/globalFunction.js'
export default {
    data() { 
        return {
            imageUrl : 'https://api.pharmiq.uz/files/team/',
            disabled: false,
            modelName:'',
            modelUserId:'',
            currentPage: 1,
            last_page:1,
            total: 1,
            per_page: 1,
            teams: [],
            response: null,
            resError: false,
            resSuccess: false,
            resStringError: '',
            submitButton: true,
            teamsearch:'',
            timerId: null,
            url: import.meta.env.VITE_APP_REST_ENDPOINT, 
            loading: true,
            companyName: '',
            companyId: null,
            userInfo:null,
        }
    },
    components: {
        CrudButton,
        Pagination,
        LanguageSwitcher
    },
    computed: {
        
    },
    methods:{
        checkStatus(start_at, end_at){
          let start = new Date(start_at);
          if(end_at && new Date()> end_at){
            return 'Arxived';
          }
          if(start> new Date()){
            console.log(start, new Date());
            return 'upgoing';
          }
          if(start<= new Date()){
            return 'ongoing';
          }
          return 'ongoing';
        },
        showImageUrl(url){
          return this.imageUrl+url;
        },
        searchteam(){
          clearTimeout(this.timerId);
          if(this.teamsearch!=''){
            this.loading = true;
              this.timerId = setTimeout(() =>{ this.requestApi(1,this.teamsearch)}, 2000);
          }else{
            this.loading = true;
              this.timerId = setTimeout(() => this.requestApi(this.currentPage), 2000);
          }
        },
        showteam(team_id){
          this.$router.push({ name: 'companyTeams.show', params: {'team_id': team_id}})
        },
        openmodel(team_id, firstName){
          
            this.modelUserId = team_id;
            this.modelName = firstName;
            this.submitButton = true;
            this.resError = false;
            this.resSuccess = false;
            this.resStringError =  '';
             $('#exampleModal').modal('show');
        },
        showUrl(){
            console.log(import.meta.env.VITE_APP_REST_ENDPOINT);
        },
        editteam(team_id){
            this.$router.push({ name: 'companyTeams.edit', params: {'team_id': team_id}})
        },
        
        onPageChange(page){
            console.log(page)
            this.currentPage = page;
            this.loading = true;
            this.requestApi(page);
            localStorage.setItem('currentPage', page);
        },
        refreshList(){
          this.loading = true;
            this.requestApi(1);
        },
        async requestApiDelete(){
            this.disabled = true;
            const inputs = {
                'usid':this.modelUserId,
                'team_id': this.modelUserId,
                }
            const todo =standartAttribute();;
            const finalResult = Object.assign(inputs,todo);
            try {
              let token = localStorage.getItem('token');
              console.log(this.modelUserId);
              const response = await fetch(this.url+'api/v1/company/team/delete/', {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(finalResult), // данные могут быть 'строкой' или {объектом}!
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                'Authorization': 'Bearer '+token, 
              }
            });
            const json = await response.json();
            
            if(json.error){
              
              if(typeof json.message == 'object'){
                    this.resError = json.message;
                  }else{
                    this.resStringError = json.message;
                  }
            }else{
              this.resSuccess  = 'Successfully Deleted';
              this.disabled = false;
              this.requestApi(1);
              this.submitButton = false;
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        requestApi(page, search=null){
          
          let newUrl = this.url+'api/v1/company/team/show/'+this.$route.params.company_id+'?page='+page;
          if(search){
             newUrl= this.url+'api/v1/company/team/show?page=1&search='+search;
          }
           let token = localStorage.getItem('token')
           const options = {
              method: 'GET',
              headers: new Headers({
              "accept" : "application/json",
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token, 
          }), 
             
            };
            fetch(newUrl, options)
                .then((response) => {
                  if(response.status==401){
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href='https://go.pharmiq.uz/';
                  }
                    return response.json();
                })
                .then((data) => {
                  if(data.company){
                    this.companyName = data.company.companyName;
                    this.companyId = data.company.id;
                  }
                  if(data.companyTeams){
                    this.response=data.companyTeams;
                    this.last_page = data.companyTeams.last_page;
                    this.total = data.companyTeams.total;
                    this.per_page = data.companyTeams.per_page;
                    this.teams = data.companyTeams.data;
                  }
                   
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    setTimeout(() => {
                      this.loading = false;
                    }, 1000);
                });
        }
    },
    mounted() {
      this.$i18n.locale = 'ru';
      // console.log(this.$i18n.availableLocales);
     
    },
    created() {
          this.userInfo = JSON.parse(localStorage.getItem('user'));
           
        
         const currentStoredPage = localStorage.getItem('currentPage');
         if(currentStoredPage){
            this.currentPage  = parseInt(currentStoredPage);
         }  
        
            this.requestApi(1);
                
        
        
       
    }
}
</script>
<style scoped >
    .table td img{
      width: 120px;
      height: auto;
      border-radius: 0;
    }
    th,
td {
      white-space: break-spaces;
}
</style>