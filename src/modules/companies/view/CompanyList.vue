
<template>
    <div class="row">
        <div class="col-md-8">
            <input type="search" @input="searchCompany" v-model="companySearch" class="form-control" placeholder="Search: PharmIq">
        </div>
        <div class="col-md-2">
          <div class="export" @click="exportComp"><i class="ti " :class="{ 'ti-export': !load, 'ti-reload anim': load }"></i> Export</div>
        </div>
        <div class="col-md-2">
            <div class="refresh" @click="refreshList"><i class="ti ti-reload"></i> refresh list</div>
        </div>
    </div>
   
   
    <div class="mt-3">
        <div class="row">
                    <div class="col-12">
                      <div class="table-responsive">
                        
                        

                        <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            
                            <th scope="col">Name</th>
                            
                            <th scope="col">City</th>
                            <th scope="col">District</th>
                            <th scope="col">Address line</th>
                           
                            <th scope="col">Created at</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="company in companies" :key="company.id">
                            
                                
                                <td>{{company.companyName}} <span>({{company.companymembers.length}})</span></td>
                               
                                <td>{{company.companyadress? (company.companyadress.city? company.companyadress.city.name_ru : '-' ) : '-' }}</td>
                                <td>{{company.companyadress? (company.companyadress.region? company.companyadress.region.name_ru : '-' ) : '-' }}</td>
                                <td>{{company.companyadress?company.companyadress.addressline1 : '-' }}</td>
                               
                                <td>{{new Date(company.created_at).toLocaleString()}}</td>
                                <td class="actions">
                                  <div href="#" @click="openTeams(company.id)" class="show text-primary cursor-pointer mr-2" ><i class="ti ti-user" data-toggle="tooltip" title="Teams"></i></div>
                                     <div href="#" @click="showCompany(company.id)" class="show text-primary cursor-pointer mr-2" ><i class="ti ti-eye" data-toggle="tooltip" title="Show"></i></div>
                                     <div href="#" v-if="userInfo && ( userInfo.role=='Creator' || userInfo.role=='Owner'  )" @click="editCompany(company.id)" class="edit cursor-pointer mr-2" ><i class="ti ti-pencil-alt" data-toggle="tooltip" title="Edit"></i></div>
                                     <div href="#" v-if="userInfo && ( userInfo.role=='Creator' || userInfo.role=='Owner'  )" data-toggle="modal" data-target="#exampleModal" @click="openmodel(company.id, company.companyName)" class="delete text-danger" ><i class="ti ti-trash" data-toggle="tooltip" title="Delete"></i></div>
                                    </td>
                            </tr>
                            
                        </tbody>
                        </table>
                      </div>
                      <Pagination :total-pages="this.last_page"
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
        <h5 class="modal-title" id="exampleModalLabel">Delete Company</h5>
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
        <h4>Are you sure you want to delete this Company?</h4>
        <h3>{{modelName}}</h3>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button v-if="submitButton" :disabled="disabled" type="button" @click="requestApiDelete" class="btn btn-primary">Delete User</button>
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
import Pagination from '@/components/Pagination.vue';
import {standartAttribute} from '@/globals/globalFunction.js';
export default {
    data() { 
        return { 
            load:false,
            disabled: false,
            modelName:'',
            modelPhone:'',
            modelCompanyId:'',
            currentPage: 1,
            last_page:1,
            total: 1,
            per_page: 1,
            companies: [],
            modelUserId: '',
            response: null,
            resError: false,
            resSuccess: false,
            resStringError: '',
            submitButton: true,
            companySearch:'',
            timerId: null,
            url: import.meta.env.VITE_APP_REST_ENDPOINT, 
            loading: true,
            userInfo:null,
        }
    },
    components: {
        CrudButton,
        Pagination
    },
    computed: {
    
    },
    methods:{

        searchCompany(){
          clearTimeout(this.timerId);
          if(this.companySearch!=''){
            this.loading = true;
              this.timerId = setTimeout(() => this.requestApi(1,this.companySearch), 3000);
          }else{
            this.loading = true;
            this.companySearch = '';
            
            localStorage.removeItem('searchCompany');
              this.timerId = setTimeout(() => this.requestApi(this.currentPage), 3000);
          }
        },
        openTeams(company_id){
          this.$router.push({ name: 'companyTeams.all', params: {'company_id': company_id}})
        },
        showCompany(company_id){
          this.$router.push({ name: 'companies.show', params: {'id': company_id}})
        },
        editCompany(company_id){
          
            this.$router.push({ name: 'companies.edit', params: {'id': company_id}})
        },
        openmodel(company_id, companyName){
            this.modelCompanyId = company_id;
            this.modelName = companyName;
            this.submitButton = true;
            this.resError = false;
            this.resSuccess = false;
            this.resStringError =  '';
             $('#exampleModal').modal('show');
        },
        showUrl(){
            console.log(import.meta.env.VITE_APP_REST_ENDPOINT);
        },
        onPageChange(page){
            console.log(page)
            this.currentPage = page;
            this.loading = true;
            
            this.requestApi(page, localStorage.getItem('searchCompany'));
            // localStorage.setItem('currentPage', page);
        },
        refreshList(){
            this.loading = true;
            localStorage.removeItem("search");
            this.companySearch = '';
            this.requestApi(1);
        },
        async exportComp(){
          
          if(!this.load){
            this.load = true;
            const inputs = {
                'export':'',
                }
            const todo =standartAttribute();
            const finalResult = Object.assign(inputs,todo);
            try {
              let token = localStorage.getItem('token');
              const response = await fetch(this.url+'api/v1/company/export', {
                method: 'POST', // или 'PUT'
                body: JSON.stringify(finalResult), // данные могут быть 'строкой' или {объектом}!
                headers: {
                "Content-Type" : "application/json",
                  "accept" : "application/json",
                  'Authorization': 'Bearer '+token, 
                  
                },
                responseType: 'blob',
              });
              const json = await response.blob();
              
              const url = window.URL.createObjectURL(new Blob([json]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `companyExport.xlsx`);
              document.body.appendChild(link);
              link.click();
              setTimeout(() => {
                this.load = false;
              }, 2000);
              
            } catch (error) {
                alert(error);
                console.error('Ошибка:', error);
            }
          }
        },
        async requestApiDelete(){
            this.disabled = true;
            const inputs = {
                'company_id':this.modelCompanyId,
                }
            const todo =standartAttribute();;
            const finalResult = Object.assign(inputs,todo);
            try {
              let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/company/delete', {
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
              this.submitButton = false;
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        requestApi(page, search=null){
          console.log(page, search);
          localStorage.setItem('currentPageCompany', page);
          this.currentPage = page;
          let newUrl = this.url+'api/v1/company/show/all?page='+page;
          if(search){
            if(search!=localStorage.getItem('searchCompany')){
              localStorage.setItem('searchCompany', search);
              newUrl= this.url+'api/v1/company/show/all?page=1&search='+search;
            }else{
              newUrl= this.url+'api/v1/company/show/all?page='+page+'&search='+search;
            }
          }
           let token = localStorage.getItem('token');
            fetch(newUrl,{
               method: 'GET', // или 'PUT'
               headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                 'Authorization': 'Bearer '+token, 
              }
            })
                .then((response) => {
                  if(response.status==401){
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href='https://go.pharmiq.uz/';
                  }
                    return response.json();

                })
                .then((data) => {
                 
                    localStorage.setItem('companyList', JSON.stringify(data))
                    this.response=data.companies;
                    this.last_page = data.companies.last_page;
                    this.total = data.companies.total;
                    this.per_page = data.companies.per_page;
                    this.companies = data.companies.data
                    
                    console.log(data.companies);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                     setTimeout(() => {
                      this.loading = false;
                    }, 1000);
                });
        }
    },
    created() {
      
        this.userInfo = JSON.parse(localStorage.getItem('user'));
            console.log(this.userInfo);
        
         const currentStoredPage = localStorage.getItem('currentPageCompany');
         this.currentPage = 1;
         if(currentStoredPage){
          
            this.currentPage  = parseInt(currentStoredPage);
            
         }
         const searchcompa = localStorage.getItem('searchCompany');  
         if(searchcompa){
           this.companySearch = searchcompa;
            this.requestApi(this.currentPage,searchcompa);
         }else{
            this.requestApi(this.currentPage);
         }
            
              
        
       
    }
}
</script>
<style >
    .notactive{
        color: red;
    }
    .export{
      float: right;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      width: fit-content;
      padding: 10px;
      color: white;
      border-radius: 15px;
      background-color: #007382;
      box-shadow: 0 0 12px rgba(0,0,0,0.3);
    }
    .anim{
      transform: rotate(0deg);
      animation-name: rotate;
      animation-duration: 0.4s;
      animation-iteration-count: infinite;
    }
    @keyframes rotate {
      0%   {transform: rotate(0deg);}
    
      100% {transform: rotate(180deg);}
    }
</style>