<template>
<GoBackButton  />
    <div>
        
        <div class="row mt-2" >
          
            <div class="col-md-12">
              <div class="card" >
                
                <div class="card-body">
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
                                <label for="exampleInputUsername1">Company Name</label>
                                <input type="text" class="form-control" @input="trimFirstNameFunction" v-bind:class="{'border border-danger' : v$.companyName.$errors.length>0 }" v-model="companyName" id="exampleInputUsername1" placeholder="Company Name">
                                <small class="error" v-for="(error, index) of v$.companyName.$errors" :key="index"  >{{ error.$message }}</small>
                            </div>
                            <div class="col-md-6">
                                <label for="exampleInputLastName">Longitude</label>
                                <input type="number" class="form-control" step="any"  v-bind:class="{'border border-danger' : v$.longitude.$errors.length>0 }" v-model="longitude" id="exampleInputLastName" placeholder="Longitude">
                                <small class="error" v-for="(error, index) of v$.longitude.$errors" :key="index"  >{{ error.$message }}</small>
                            </div>
                            <div class="col-md-6">
                                <label for="exampleInputLastName">Latitude</label>
                                <input type="number" class="form-control" step="any" v-bind:class="{'border border-danger' : v$.latitude.$errors.length>0 }" v-model="latitude" id="exampleInputLastName" placeholder="Latitude">
                                <small class="error" v-for="(error, index) of v$.latitude.$errors" :key="index"  >{{ error.$message }}</small>
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col-md-4">
                                <div class="form-group">
                                   <label for="CityChoose" >City</label>
                                      <select  class="form-control" required @change="getRegions" v-bind:class="{'border border-danger' : v$.city.$errors.length>0 }" v-model="city" id="CityChoose">
                                      <template v-for="cits,index in cities" :key="cits.id"  >
                                          <option v-on:select="cits.id==city" v-if="index<14"   :value="cits.id">{{cits.name_ru}}</option>
                                      </template>
                                      
                                    
                                      </select>
                                      <small class="error" v-for="(error, index) of v$.city.$errors" :key="index"  >{{ error.$message }}</small> 
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                   <label for="RegionChoose" >Region</label>
                                      <select  class="form-control " required v-bind:class="{'border border-danger' : v$.region.$errors.length>0 }" v-model="region" id="RegionChoose">
                                      <template v-for="regi,index in regions" :key="regi.id"  >
                                          <option v-on:select="reg.id==region"   :value="regi.id">{{regi.name_ru}}</option>
                                      </template>
                                      </select>
                                      <small class="error" v-for="(error, index) of v$.region.$errors" :key="index"  >{{ error.$message }}</small> 
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="exampleInputaddressline1">Address</label>
                                <input type="text" class="form-control" step="any" v-bind:class="{'border border-danger' : v$.addressline1.$errors.length>0 }" v-model="addressline1" id="exampleInputaddressline1" placeholder="Address">
                                <small class="error" v-for="(error, index) of v$.addressline1.$errors" :key="index"  >{{ error.$message }}</small>
                            </div>
                          </div>
                          <button type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Update</button>
                      </form>
                  
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-4">
              <div class="card" >
                <div class="card-body">
                  <p class="success" v-if="resSuccessOwner">
                      {{resSuccessOwner}}
                  </p>
                  <h5 class="card-title">Company Members  ( Owner: <span v-if="user"> {{user.firstName}} {{user.lastName}} </span>)</h5>
                    <div  v-if="companyMembers.length>0">
                      <select  class="form-control" @change="getNewOwner"  v-model="owner">
                      <template v-for="member in companyMembers">
                        <option :value="member.user.hrid" v-if="member.user && member.user.phonebook" >
                          {{member.user? member.user.firstName: ''}}
                          {{member.user? member.user.lastName: ''}}, 
                          <a href="tel:" v-if="member.user && member.user.phonebook"> {{'+'+member.user.phonebook.phoneNumber.substring(0, 3)+' ( '+member.user.phonebook.phoneNumber.substring(3, 5)+' ) '+member.user.phonebook.phoneNumber.substring(5, 8)+'-'+member.user.phonebook.phoneNumber.substring(8, 10)+'-'+member.user.phonebook.phoneNumber.substring(10, 12)}}</a>
                          
                        </option>
                      </template>
                        
                      </select>
                    
                    </div>
                  <p v-else>Empty</p>
                </div>
              </div>
            </div>
        </div>

    </div>
</template>
<script>
import GoBackButton from '@/components/GoBackButton.vue';
import useVuelidate from '@vuelidate/core'
import { required,minLength, email,sameAs, maxLength } from '@vuelidate/validators'
import { ref } from 'vue';
import {standartAttribute} from '@/globals/globalFunction.js'

export default {
      setup () {
         return { v$: useVuelidate()}
      },
      components: {
        GoBackButton,
      },
      data() {
        return {
          url: import.meta.env.VITE_APP_REST_ENDPOINT, 
          companyName:'',
          longitude: '',
          latitude: '',
          addressline1: '',
          owner:null,
          city: {},
          cities: {},
          region: {},
          regions: {},
          user: {},
          company: {},
          companyAddress: {},
          companyHistory: {},
          companyMembers: {},
          resStringError: '',
          resError: false,
          resSuccess: false,
          resSuccessOwner: false,
        }
      },
      computed: {
        isDisabled: function(){
          this.v$.$touch();
          
          if (this.v$.$error) return true;
            
          },
      },
      validations () {
        return {
          companyName: { 
              required, 
              minLengthValue: minLength(6),
              maxLengthValue: maxLength(30)
            },
            city: { 
              required,
              },
            region:{
              required,
            },
            longitude:{
              regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/,
            },
            latitude:{
              regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/,
            },
          addressline1: { 
            required,
            }
        }
      },
      methods: {
        getRegions(){
          // console.log(this.city);
          this.getRegionApi(this.city)
        },
        async getNewOwner(){
          console.log(this.owner);
          const inputs = {
            'user_id': this.owner,
            'company_id': this.company.id,
          }
         
          const todo =standartAttribute();;
         const finalResult = Object.assign(inputs,todo);
      
          
         
          try {
            
            const response = await fetch(this.url+"api/v1/company/update/owner", {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(finalResult), // данные могут быть 'строкой' или {объектом}!
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                'Authorization': 'Bearer '+localStorage.getItem('token'),
              }
            });
            const json = await response.json();
            
            if(json.error){
              
              window.scrollTo({top: 0, behavior: 'smooth'});
              if(typeof json.message == 'object'){
                    this.resError = json.message;
                  }else{
                    this.resStringError = json.message;
                  }
            }else{
              this.companyMembers = json.companyMembers;
              this.user = json.user;
              this.resSuccessOwner  = 'Successfully updated';
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        submitForm () {
            this.v$.$touch();
            if (this.v$.$error) return;
            this.requestApiEdit();
        },
        trimFirstNameFunction(){
          this.companyName = this.companyName.trim();
        },
        async requestApiEdit(){
          const inputs = {
            'company_id': this.$route.params.id,
            'companyName': this.companyName,
            'city_id': this.city,
            'region_id': this.region,
            'gender': this.gender,
            'longitude':this.longitude,
            'latitude': this.latitude,
            'addressline1': this.addressline1,
        }
          // let SA = standartAttribute();
          // SA.forEach(function (value, i) {
          //     formData.append(i, value);
          // });
          const todo2 =standartAttribute();;
         const finalResult2 = Object.assign(inputs,todo2);
      
          
         
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/company/update', {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(finalResult2), // данные могут быть 'строкой' или {объектом}!
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                'Authorization': 'Bearer '+token,
              }
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

               this.company = json.company;
               this.companyName = json.company.companyName
               this.longitude = json.company.companyadress.longitude;
               this.latitude = json.company.companyadress.latitude;
               this.addressline1 = json.company.companyadress.addressline1;
               this.companyAddress = json.company.companyadress;
               this.city = json.company.companyadress.city_id;
               this.region = json.company.companyadress.region_id;
               this.getRegionApi(json.company.companyadress.city_id);
               this.resSuccess  = 'Successfully updated';
               setTimeout(() => {
                 this.resSuccess = false;
               }, 3000);
            }
            }
            
            
            
          } catch (error) {
              // console.log(error);
              
          }
        },
        async requestApi(){
          
         
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/company/show/all?company_id='+this.$route.params.id, {
              method: 'GET', // или 'PUT'
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                 'Authorization': 'Bearer '+token, 
              }
            });
            const json = await response.json();
            const status = response.status;
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(status==401){
                this.resStringError = json.message;
            }else{
                if(json.error){
                this.resStringError = json.message;
                  
                }else{
                  this.company = json.company;
                  this.companyName = json.company.companyName
                  this.longitude = json.companyAddress.longitude;
                  this.latitude = json.companyAddress.latitude;
                  this.addressline1 = json.companyAddress.addressline1;
                  this.companyAddress = json.companyAddress;
                  this.city = json.companyAddress.city_id;
                  this.region = json.companyAddress.region_id;
                  this.companyHistory = json.companyHistory;
                  this.companyMembers = json.companyMembers;
                  this.user = json.user;
                  this.getRegionApi(json.companyAddress.city_id);
                  // console.log(json);
                  }
            }
            
            
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
          
        },
        async getCityApi(){
          
         
          try {
            const response = await fetch(this.url+'api/v1/show/cities', {
              method: 'GET', // или 'PUT'
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json"
              }
            });
            const json = await response.json();
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(json.error){
                this.resStringError = json.message;
                  
            }else{
               this.cities = json;
               
              // console.log(json);
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
          
        },
        async getRegionApi(city_id){
          
         
          try {
            const response = await fetch(this.url+'api/v1/show/regions/'+city_id, {
              method: 'GET', // или 'PUT'
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json"
              }
            });
            const json = await response.json();
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(json.error){
                this.resStringError = json.message;
                  
            }else{
               this.regions = json;
                // console.log(json);
              // console.log(json);
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
          
        },
       
      },
      created() {
        this.requestApi();
        this.getCityApi();
       
      },
}
</script>