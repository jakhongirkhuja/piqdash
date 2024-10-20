
<template>
    <div class="row">
        <div class="col-md-3">
          <GoBackButton />
           
        </div>
        <div class="col-md-6">
            <!-- <input type="search" @input="searchpin" v-model="pinsearch" class="form-control" placeholder="Search"> -->
        </div>
        <div class="col-md-3 text-center">
          
            <LanguageSwitcher />
      
        </div>
    </div>
    
    <div class="mt-3">
        <div class="row">
          <div class="col-12 mb-3" v-if="category_name!=''"><b> {{$i18n.locale=='ru'? JSON.parse(category_name.categoryName).ru :JSON.parse(category_name.categoryName).uz }}</b></div>
                    <div class="col-12">
                      <div class="order__block">
                      <draggable
                      :list="pins"
                      :disabled="!enabled"
                      item-key="pinOrder"
                      class="list-group"
                      ghost-class="ghost"
                      :move="checkMove"
                      @start="dragging = true"
                      @end="dragging = false"
                    >
                      <template #item="{ element,index }">
                        <div class="order__each list-group-item" :class="{ 'not-draggable': !enabled }">
                          <div class="ordering">{{ index }}</div>
                          <div  class="text-center">{{$i18n.locale=='ru'? JSON.parse(element.course.infos.courseTitleName).ru :JSON.parse(element.course.infos.courseTitleName).uz }} </div>
                          <div   ><i class="ti ti-menu" data-toggle="tooltip" title="Ordering"></i></div>
                        </div>
                      </template>
                    </draggable>
                  </div>
                    </div>
                    
                   <div class="col-12">
                      <div v-if="moved" class="btn btn-primary mt-4" @click="getitems">Save Order</div>
                   </div>
            </div>
    </div>
<!-- Modal -->

<div class="loading" v-if="loading">
        <img src="/loading.gif">
    </div>
</template>
<script>
import GoBackButton from '@/components/GoBackButton.vue'
import CrudButton from '@/components/CrudButton.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import Pagination from '@/components/Pagination.vue';
import {standartAttribute} from '@/globals/globalFunction.js';
import draggable from "vuedraggable";
export default {
    data() { 
        return {
            imageUrl : 'https://api.pharmiq.uz/files/pin/',
            disabled: false,
            modelName:'',
            modelUserId:'',
            currentPage: 1,
            last_page:1,
            total: 1,
            per_page: 1,
            category_name: '',
            enabled: true,
            dragging: false,
            list: [
        { name: "John", id: 0 },
        { name: "Joao", id: 1 },
        { name: "Jean", id: 2 }
      ],
            pins: [],
            response: null,
            resError: false,
            resSuccess: false,
            resStringError: '',
            submitButton: true,
            pinsearch:'',
            timerId: null,
            url: import.meta.env.VITE_APP_REST_ENDPOINT, 
            loading: true,
            moved: false,
            userInfo:null,
            sortedIndex: [],
            sortedCourses: [],
        }
    },
    components: {
        CrudButton,
        Pagination,
        GoBackButton,
        LanguageSwitcher,
        draggable
    },
    computed: {
      draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
    },
    methods:{
      getCategoryInfo(){
          let newUrl = this.url+'api/v1/course/category?category_id='+this.$route.params.id;
          
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
                    this.category_name = data;
                    
                });
        },
      async getitems(){
        this.sortedIndex = [];
        this.sortedCourses = [];
        this.pins.forEach((element,index) => {
          this.sortedIndex.push(index);
          this.sortedCourses.push(element.course_id);
            // console.log(index);
            // console.log(element.course_id);
            // console.log(element.pinOrder);
            // console.log('00000');
        });
        this.loading = true;
        await this.savePinOrder();
        console.log(this.sortedIndex);
        console.log(this.sortedCourses);
      },
      async savePinOrder() {
        this.resError =false;
        this.resSuccess =false;
        this.resStringError= '';
        this.moved = false;
        const inputs = {
          'orders': this.sortedIndex,
          'courses': this.sortedCourses,
        
        }

        const todo = standartAttribute();
        const finalResult = Object.assign(inputs, todo);

        var data = new FormData()
      
        for (const key in finalResult) {
          data.append(key, finalResult[key]);

        }
       
        try {
          let token = localStorage.getItem('token');
          const response = await fetch(this.url + 'api/v1/course/pins/'+this.$route.params.id, {
            method: 'POST',
            body: data,
            headers: {

              'Accept-Language': 'en-US,en;q=0.8',
              "accept": "application/json",
              'Authorization': 'Bearer ' + token,
            },

          });

          const json = await response.json();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const status = response.status;

          if (status == 401) {
            this.resStringError = json.message;
          } else {
            if (json.error) {


              if (typeof json.message == 'object') {
                this.resError = json.message;
              } else {
                this.resStringError = json.message;
              }
            } else {
              // this.added = true;
              this.resSuccess = 'Order Successfully Saved';
            }
          }

          this.loading = false;
        } catch (error) {
          this.loading = false;
          console.error('Ошибка:', error);
        }

        },
        add: function() {
      this.list.push({ name: "Juan " + id, id: id++ });
        },
        replace: function() {
          this.list = [{ name: "Edgard", id: id++ }];
        },
        checkMove: function(e) {
          this.moved = true;
        },
       
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
        searchpin(){
          clearTimeout(this.timerId);
          if(this.pinsearch!=''){
            this.loading = true;
              this.timerId = setTimeout(() =>{ this.requestApi(1,this.pinsearch)}, 2000);
          }else{
            this.loading = true;
              this.timerId = setTimeout(() => this.requestApi(this.currentPage), 2000);
          }
        },
        showpin(pin_id){
          this.$router.push({ name: 'pins.show', params: {'id': pin_id}})
        },
        openmodel(pin_id, firstName){
          
            this.modelUserId = pin_id;
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
        editpin(pin_id){
            this.$router.push({ name: 'pins.edit', params: {'id': pin_id}})
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
              const response = await fetch(this.url+'api/v1/pin/delete/'+this.modelUserId, {
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
          
          let newUrl = this.url+'api/v1/course/pins/'+this.$route.params.id;
          
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
                    
                    this.pins = data
                    console.log(this.pins);
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
         this.getCategoryInfo()
            this.requestApi(1);
                
        
        
       
    }
}
</script>
<style scoped >
    .order__block{
      display: block;
      position: relative;
      max-width: 500px;
    }
    .order__each{
      display: flex;
      justify-content: space-between;
      /* background: linear-gradient(#ebebeb, #eeeded); */
      
      cursor: pointer;
    }
    .ordering{
        border-right: 1px solid silver;
        padding-right: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>