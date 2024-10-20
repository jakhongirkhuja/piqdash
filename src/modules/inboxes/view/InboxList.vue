
<template>
  <div class="row">
      <div class="col-md-3">
        
          <CrudButton  v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" urlName="inboxes.add" :btnName="'Add Inbox'"  />
      </div>
      <div class="col-md-6">
          <!-- <input type="search" @input="searchinbox" v-model="inboxesearch" class="form-control" placeholder="Search"> -->
      </div>
      <div class="col-md-3 text-center">
        
          <LanguageSwitcher />
    
      </div>
  </div>
  
  <div class="mt-3">
      <div class="row">
                  <div class="col-12">
                    <div class="table-responsive">
                      
                      

                      <table class="table">
                      <thead class="thead-dark">
                          <tr>
                          <th scope="col">Banner</th>
                          <th scope="col" style="width:120px; overflow: hidden;">Title</th>
                          <th scope="col">Start</th>
                          <th scope="col">End</th>
                          
                          
                          <th scope="col">Send By</th>
                          <th scope="col">Type</th>
                          <th scope="col">Target</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="inbox in inboxes" :key="inbox.id">
                          <template v-if="inbox">
                            <td ><img :src="showImageUrl(inbox.messageIcon)" alt=""  width="80"> </td>
                              <td style="width:120px; overflow: hidden;">{{$i18n.locale=='ru'? JSON.parse(inbox.titleName).ru :JSON.parse(inbox.titleName).uz }} </td>
                              <td>{{inbox.startDate}}</td>
                              <td>{{inbox.endDate}}</td>
                              <td>{{inbox.sentBy}} <span v-if="(inbox.sentBy=='SMS to phone Number' && inbox.used)">✓</span></td>
                              <td>{{inbox.messageType}}</td>
                              <td>{{ inbox.targetName }}</td>
                              <td>{{checkStatus(inbox.startDate, inbox.endDate)}}</td>
                              <td class="actions">
                                   <!-- <div  @click="showinbox(inbox.id)" class="show text-primary mr-2 cursor-pointer" ><i class="ti ti-eye" data-toggle="tooltip" title="Show"></i></div> -->
                                   <div  @click="editinbox(inbox.id)" class="edit mr-2 cursor-pointer" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" ><i class="ti ti-pencil-alt" data-toggle="tooltip" title="Edit"></i></div>
                                   <div  data-toggle="modal" data-target="#exampleModal cursor-pointer" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" @click="openmodel(inbox.id, JSON.parse(inbox.titleName).ru)" class="delete text-danger" ><i class="ti ti-trash" data-toggle="tooltip" title="Edit"></i></div>
                                </td>
                          </template>
                              
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
      <h5 class="modal-title" id="exampleModalLabel">Delete inbox</h5>
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
      <h4>Are you sure you want to delete this inbox?</h4>
      <h4>{{modelName}}</h4>
      
      <p>inboxId: {{modelUserId}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button v-if="submitButton" :disabled="disabled" type="button" @click="requestApiDelete" class="btn btn-primary">Delete inbox</button>
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
          imageUrl : 'https://api.pharmiq.uz/files/inboxMessage/',
          disabled: false,
          modelName:'',
          modelUserId:'',
          currentPage: 1,
          last_page:1,
          total: 1,
          per_page: 1,
          inboxes: [],
          response: null,
          resError: false,
          resSuccess: false,
          resStringError: '',
          submitButton: true,
          inboxesearch:'',
          timerId: null,
          url: import.meta.env.VITE_APP_REST_ENDPOINT, 
          loading: true,
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
        let end = new Date(end_at);
        if(end && new Date()> end){
          return 'Deactived';
        }
        if(start> new Date()){
          
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
      searchinbox(){
        clearTimeout(this.timerId);
        if(this.inboxesearch!=''){
          this.loading = true;
            this.timerId = setTimeout(() =>{ this.requestApi(1,this.inboxesearch)}, 2000);
        }else{
          this.loading = true;
            this.timerId = setTimeout(() => this.requestApi(this.currentPage), 2000);
        }
      },
      showinbox(inbox_id){
        this.$router.push({ name: 'inboxes.show', params: {'id': inbox_id}})
      },
      openmodel(inbox_id, firstName){
        
          this.modelUserId = inbox_id;
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
      editinbox(inbox_id){
          this.$router.push({ name: 'inboxes.edit', params: {'id': inbox_id}})
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
              }
          const todo =standartAttribute();;
          const finalResult = Object.assign(inputs,todo);
          try {
            let token = localStorage.getItem('token');
            console.log(this.modelUserId);
            const response = await fetch(this.url+'api/v1/inbox/delete/'+this.modelUserId, {
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
        
        let newUrl = this.url+'api/v1/inbox?page='+page;
        if(search){
           newUrl= this.url+'api/v1/inbox?page=1&search='+search;
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
                  
                  this.response=data;
                  this.last_page = data.last_page;
                  this.total = data.total;
                  this.per_page = data.per_page;
                  this.inboxes = data.data
                  console.log(data.data);
                  window.scrollTo({top: 0, behavior: 'smooth'});
                  setTimeout(() => {
                    this.loading = false;
                  }, 1000);
              });
      }
  },
  mounted() {
    this.$i18n.locale = 'ru';
    console.log(this.$i18n.availableLocales);
   
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
    width: 80px;
    height: auto;
    border-radius: 0;
  }
  th,
td {
    white-space: break-spaces;
}
</style>