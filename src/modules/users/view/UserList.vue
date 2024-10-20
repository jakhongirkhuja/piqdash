
<template>
    <div class="row">
        <div class="col-md-2">
            <CrudButton  v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" urlName="users.add" btnName="Add User"  />
        </div>
        <div class="col-md-6">
            <input type="search" @input="searchPhone" v-model="phone" class="form-control" placeholder="Search: 998991112233">
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
                            
                            <th scope="col">Phone number</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Birth date</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Role</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="user in users.filter(user => user.phonebook)" :key="user.id">
                            
                                
                                <td><span v-bind:class="{ 'notactive': !user.phonebook.status}">{{'+'+user.phonebook.phoneNumber.substring(0, 3)+' ( '+user.phonebook.phoneNumber.substring(3, 5)+' ) '+user.phonebook.phoneNumber.substring(5, 8)+'-'+user.phonebook.phoneNumber.substring(8, 10)+'-'+user.phonebook.phoneNumber.substring(10, 12)}}</span></td>
                                <td>{{user.firstName}}</td>
                                <td>{{user.lastName}}</td>
                                <td>{{user.birthDate}}</td>
                                <td>{{user.gender? 'Female' : 'Male'}}</td>
                                <td>{{user.role}}</td>
                                <td>{{new Date(user.created_at).toLocaleString()}}</td>
                                <td class="actions">
                                     <div  @click="showUser(user.user_id)" class="show text-primary mr-2 cursor-pointer" ><i class="ti ti-eye" data-toggle="tooltip" title="Show"></i></div>
                                     <div  @click="editUser(user.user_id)" class="edit mr-2 cursor-pointer" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" ><i class="ti ti-pencil-alt" data-toggle="tooltip" title="Edit"></i></div>
                                     <div  data-toggle="modal" data-target="#exampleModal cursor-pointer" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" @click="openmodel(user.user_id, user.phonebook.phoneNumber, user.firstName)" class="delete text-danger" ><i class="ti ti-trash" data-toggle="tooltip" title="Edit"></i></div>
                                        
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
        <h5 class="modal-title" id="exampleModalLabel">Delete User</h5>
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
        <h4>Are you sure you want to delete this user?</h4>
        <h4>{{modelName}}</h4>
        <h4>{{modelPhone}}</h4>  
        <p>UserId: {{modelUserId}}</p>
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
import {standartAttribute} from '@/globals/globalFunction.js'
export default {
    data() { 
        return { 
            load:false,
            disabled: false,
            modelName:'',
            modelPhone:'',
            modelUserId:'',
            currentPage: 1,
            last_page:1,
            total: 1,
            per_page: 1,
            users: [],
            response: null,
            resError: false,
            resSuccess: false,
            resStringError: '',
            submitButton: true,
            phone:'',
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
        searchPhone(){
          
          this.phone = this.phone.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
          clearTimeout(this.timerId);
          if(this.phone!=''){
            this.loading = true;
              this.timerId = setTimeout(() =>{ this.requestApi(1,this.phone)}, 2000);
          }else{
            this.loading = true;
            this.phone = '';
            localStorage.removeItem('search');
              this.timerId = setTimeout(() => this.requestApi(this.currentPage), 2000);
          }
          
          
          
        },
        showUser(user_id){
          this.$router.push({ name: 'users.show', params: {'id': user_id}})
        },
        openmodel(user_id, phoneNumber, firstName){
          
            this.modelUserId = user_id;
            this.modelName = firstName;
            this.modelPhone = phoneNumber;
            this.submitButton = true;
            this.resError = false;
            this.resSuccess = false;
            this.resStringError =  '';
             $('#exampleModal').modal('show');
        },
        showUrl(){
            console.log(import.meta.env.VITE_APP_REST_ENDPOINT);
        },
        editUser(user_id){
            this.$router.push({ name: 'users.edit', params: {'id': user_id}})
        },
        onPageChange(page){
            console.log(page)
            this.currentPage = page;
            this.loading = true;
            this.requestApi(page);
            localStorage.setItem('currentPageUser', page);
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
              const response = await fetch(this.url+'api/v1/admin/export/users', {
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
              link.setAttribute('download', `userExport.xlsx`);
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
        refreshList(){
          this.loading = true;
          localStorage.removeItem("search");
          this.phone = '';
            this.requestApi(1);
        },
        async requestApiDelete(){
            this.disabled = true;
            const inputs = {
                'user_id':this.modelUserId,
                }
            const todo =standartAttribute();;
            const finalResult = Object.assign(inputs,todo);
            try {
              let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/admin/delete/users', {
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
              this.disabled = false;
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        requestApi(page, search=null){
          localStorage.setItem('currentPageUser', page);
          this.currentPage = page;
          let newUrl = this.url+'api/v1/admin/show/users?page='+page;
          if(search){
            localStorage.setItem('search', search);
             newUrl= this.url+'api/v1/admin/show/users?page=1&search='+search;
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
                    localStorage.setItem('users', JSON.stringify(data))
                    this.response=data;
                    this.last_page = data.last_page;
                    this.total = data.total;
                    this.per_page = data.per_page;
                    this.users = data.data
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    setTimeout(() => {
                      this.loading = false;
                    }, 1000);
                });
        }
    },
    mounted() {
     
     
    },
    created() {
          this.userInfo = JSON.parse(localStorage.getItem('user'));
            console.log(this.userInfo);
        
         const currentStoredPage = localStorage.getItem('currentPageUser');
         this.currentPage = 1;
         if(currentStoredPage){
            this.currentPage  = parseInt(currentStoredPage);
         }  
       
         const searchphone = localStorage.getItem('search');  
         if(searchphone){
           this.phone = searchphone;
          
            this.requestApi(this.currentPage,searchphone);
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