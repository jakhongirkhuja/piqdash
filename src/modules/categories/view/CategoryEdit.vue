<template>
    <GoBackButton  />
    <div class="mt-3">
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Edit category</h4>
                  
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
                  <form class="forms-sample" @submit.prevent="submitForm()">
                    
                    <div class="form-group row">
                      <div class="col-md-12">
                        <label class="col-sm-3 " for="banner">Access</label>
                        <select v-model="access" @change="checkAccess" class="form-control" >
                          <option selected value="0">Public</option>
                          <option value="1">Private</option>

                        </select>
                       
                      </div>
                        <div class="col-md-6">
                            <label class="col-sm-3 col-form-label" for="icon">Icon (РУ)</label>
                            <img :src="icon_ru_prev" v-if="icon_ru_prev" class="image_prev" />
                            <input type="file" id="icon" v-on:change="uploadFileIconRu($event)" accept="image/*"    class="form-control">
                            
                        </div>
                        <div class="col-md-6">
                            <label class="col-sm-3 col-form-label" for="icon">Icon (UZ)</label>
                            <img :src="icon_uz_prev" v-if="icon_uz_prev" class="image_prev" />
                            <input type="file" id="icon" v-on:change="uploadFileIconUz($event)" accept="image/*"   class="form-control">
                           
                        </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-6">
                        <label for="exampleInputTitleRu">Title (РУ)</label>
                        <input type="text" class="form-control" v-bind:class="{'border border-danger' : v$.title_ru.$errors.length>0 }" id="exampleInputTitleRu" v-model="title_ru" >
                        <small class="error" v-for="(error, index) of v$.title_ru.$errors" :key="index"  >{{ error.$message }}</small> 
                      </div>
                      <div class="col-md-6">
                        <label for="exampleInputTitleUZ">Title (UZ)</label>
                        <input type="text" class="form-control" v-bind:class="{'border border-danger' : v$.title_uz.$errors.length>0 }" id="exampleInputTitleUZ" v-model="title_uz" >
                        <small class="error" v-for="(error, index) of v$.title_uz.$errors" :key="index"  >{{ error.$message }}</small> 
                      </div>
                    </div>
                    
                    <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Edit</button>
                    
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
</template>
<script>
import GoBackButton from '@/components/GoBackButton.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import useVuelidate from '@vuelidate/core'
import { required,minLength, maxLength, requiredIf } from '@vuelidate/validators'
import { ref } from 'vue';
import { maska } from 'maska'
import {standartAttribute} from '@/globals/globalFunction.js';

export default {
      setup () {
        return { v$: useVuelidate()}
      },
      directives: { maska },
      components: {
        GoBackButton,
        Datepicker,
       
      },
      data() {
        return {
          url: import.meta.env.VITE_APP_REST_ENDPOINT, 
          icon_ru :[],
          access:0,
          icon_ru_prev : null,
          icon_uz :[],
          icon_uz_prev : null,
          title_ru : '',
          title_uz : '',
          added: false,
          resError: false,
          resSuccess: false,
          resStringError: '',
          userInfo:null,
        }
      },
      computed: {
        isDisabled: function(){
          this.v$.$touch();
          if (this.v$.$error) return true;
            
          }
      },
      validations () {
        return {
          title_ru: { 
              required, 
              minLengthValue: minLength(3),
              maxLengthValue: maxLength(30)
            },
          title_uz: { 
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(30)
            },
          // icon_ru:{
          //    required:requiredIf(()=> { return this.icon_ru.length == 0 ;}),
          // },
          // icon_uz:{
          //    required:requiredIf(()=> { return this.icon_uz.length == 0 ;}),
          // },
        }
      },
     
      methods: {
        checkAccess(event){
            this.access = event.target.value;
        },
        uploadFileIconRu(event){
          var files = event.target.files || event.dataTransfer.files;
          if (!files.length) {
            return;
          }
          this.icon_ru = files[0];
          this.icon_ru_prev = URL.createObjectURL(files[0]);
          
        },
        uploadFileIconUz(event){
          var filesUz = event.target.files || event.dataTransfer.files;
          if (!filesUz.length) {
            return;
          }
          this.icon_uz = filesUz[0];
          this.icon_uz_prev = URL.createObjectURL(filesUz[0]);
          
        },
        async requestApi(){
        
        const inputs = {
         'categoryName_ru':this.title_ru,
         'categoryName_uz': this.title_uz,
         'access':this.access,
        }
        
        const todo =standartAttribute();
        const finalResult = Object.assign(inputs,todo);
        
        var data = new FormData()
        console.log(this.icon_ru.length!=0);
        if(this.icon_ru.length!=0){
          data.append('categoryIcon_ru', this.icon_ru)
        }
        if(this.icon_uz.length!=0){
          data.append('categoryIcon_uz', this.icon_uz)
        }
        
        for (const key in finalResult) {
            data.append(key, finalResult[key]);
            
        }
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/course/category/editNew/'+this.$route.params.id, {
              method: 'POST', 
              body: data,
              headers: {
               'Accept-Language': 'en-US,en;q=0.8',
                "accept" : "application/json",
                'Authorization': 'Bearer '+token, 
              },
            
            });
            
            const json = await response.json();
            window.scrollTo({top: 0, behavior: 'smooth'});
            const status = response.status;
            
            if(status==401){
                this.resStringError = json.message;
            }else{
              if(json.error){
              
              
                if(typeof json.message == 'object'){
                      this.resError = json.message;
                    }else{
                      this.resStringError = json.message;
                    }
              }else{
                this.added = true;
                this.resSuccess  = 'Course Successfully Updated';
              }
            }
            
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
          
        },
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
                    this.access = data.access? 1 : 0;
                    this.title_ru = JSON.parse(data.categoryName).ru;
                    this.title_uz = JSON.parse(data.categoryName).uz;
                    this.icon_ru_prev = this.url+'files/category/'+JSON.parse(data.categoryIcon).ru;
                    this.icon_uz_prev = this.url+'files/category/'+JSON.parse(data.categoryIcon).uz;
                });
        },
        submitForm () {
            this.v$.$touch();
            if (this.v$.$error) return;
            this.requestApi();
          }
      },
      created() {
        this.userInfo = JSON.parse(localStorage.getItem('user'));
        this.getCategoryInfo();
      },
}
</script>
<style lang="css" scoped>
  .image_prev{
    width:100%;
    margin-bottom: 20px;
  }
</style>