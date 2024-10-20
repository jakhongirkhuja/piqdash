
<template>
    <div class="row">
        <div class="col-md-3">
          
            <CrudButton  v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" urlName="stores.add" :btnName="'Add Product'"  />
        </div>
        <div class="col-md-6">
            <!-- <input type="search" @input="searchstore" v-model="storesearch" class="form-control" placeholder="Search"> -->
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
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            
                            <th scope="col">Price</th>
                            <th scope="col">IQC</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Store</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="store in stores" :key="store.id">
                           
                             
                                <td><img width="20" v-for="img in store.productIMG.replace('[','').replace(']','').split(',')" :src="showImageUrl(img)" alt=""></td>
                                <td> {{$i18n.locale=='ru'? JSON.parse(store.productName).ru :JSON.parse(store.productName).uz }}</td>
                                <td>{{store.productCost}} $</td>
                                <td>{{store.iqc}}</td>
                                <td>{{store.productAmount}}</td>
                                <td>{{store.store?.storeName}}</td>
                                <td class="actions">
                                     <div  @click="showstore(store.id)" class="show text-primary mr-2 cursor-pointer" ><i class="ti ti-eye" data-toggle="tooltip" title="Show"></i></div>
                                     <div  @click="editstore(store.id)" class="edit mr-2 cursor-pointer" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" ><i class="ti ti-pencil-alt" data-toggle="tooltip" title="Edit"></i></div>
                                     <div  data-toggle="modal" data-target="#exampleModal cursor-pointer" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')" @click="openmodel(store.id, JSON.parse(store.productName).ru)" class="delete text-danger" ><i class="ti ti-trash" data-toggle="tooltip" title="Edit"></i></div>
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
        <h5 class="modal-title" id="exampleModalLabel">Delete store</h5>
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
        <h4>Are you sure you want to delete this store?</h4>
        <h4>{{modelName}}</h4>
        
        <p>storeId: {{modelUserId}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button v-if="submitButton" :disabled="disabled" type="button" @click="requestApiDelete" class="btn btn-primary">Delete store</button>
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
            imageUrl : 'https://api.pharmiq.uz/files/store/',
            disabled: false,
            modelName:'',
            modelUserId:'',
            currentPage: 1,
            last_page:1,
            total: 1,
            per_page: 1,
            stores: [],
            response: null,
            resError: false,
            resSuccess: false,
            resStringError: '',
            submitButton: true,
            storesearch:'',
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
       showImageUrl(url){
          return this.imageUrl+url.replace('"','').replace('"','');
        },
        searchstore(){
          clearTimeout(this.timerId);
          if(this.storesearch!=''){
            this.loading = true;
              this.timerId = setTimeout(() =>{ this.requestApi(1,this.storesearch)}, 2000);
          }else{
            this.loading = true;
              this.timerId = setTimeout(() => this.requestApi(this.currentPage), 2000);
          }
        },
        showstore(store_id){
          this.$router.push({ name: 'stores.show', params: {'id': store_id}})
        },
        openmodel(store_id, firstName){
          
            this.modelUserId = store_id;
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
        editstore(store_id){
            this.$router.push({ name: 'stores.edit', params: {'id': store_id}})
        },
        
        onPageChange(page){
            console.log(page)
            this.currentPage = page;
            this.loading = true;
            this.requestApi(page);
            localStorage.setItem('currentPageP', page);
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
             
              const response = await fetch(this.url+'api/v1/store/product/delete/'+this.modelUserId, {
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
              this.requestApi(1);
              this.submitButton = false;
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        requestApi(page, search=null){
          
          let newUrl = this.url+'api/v1/store/product?page='+page;
            
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
                    this.stores = data.data
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
      // console.log(this.$i18n.availableLocales);
     
    },
    created() {
          this.userInfo = JSON.parse(localStorage.getItem('user'));
           
        
         const currentStoredPage = localStorage.getItem('currentPageP');
         if(currentStoredPage){
            this.currentPage  = parseInt(currentStoredPage);
         }  
       
            this.requestApi(1);
                
        
        
       
    }
}
</script>
<style scoped >
    .table td img{
      width: 40px;
      height: auto;
      border-radius: 0;
    }
    th,
td {
      white-space: break-spaces;
}
</style>