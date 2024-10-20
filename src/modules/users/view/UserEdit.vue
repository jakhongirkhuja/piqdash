<template>
    <GoBackButton  />
    
    <div class="mt-3">
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Edit User</h4>
                  <p class="card-description">
                    Basic information
                  </p>
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
                        <div class="col-md-6">
                            <label for="exampleInputUsername1">Enter first name</label>
                            <input type="text" class="form-control" @input="trimFirstNameFunction" v-bind:class="{'border border-danger' : v$.firstName.$errors.length>0 }" v-model="firstName" id="exampleInputUsername1" placeholder="First name">
                             <small class="error" v-for="(error, index) of v$.firstName.$errors" :key="index"  >{{ error.$message }}</small>
                        </div>
                        <div class="col-md-6">
                            <label for="exampleInputLastName">Enter last name</label>
                            <input type="text" class="form-control" @input="trimLastNameFunction" v-bind:class="{'border border-danger' : v$.firstName.$errors.length>0 }" v-model="lastName" id="exampleInputLastName" placeholder="Last name">
                             <small class="error" v-for="(error, index) of v$.lastName.$errors" :key="index"  >{{ error.$message }}</small>

                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <div class="col-md-6">
                          <label for="exampleInputBirth">Date of Birth</label>
                            <Datepicker v-model="birthDate" inputClassName="form-control" :format="format" ></Datepicker>
                            <small class="error" v-for="(error, index) of v$.birthDate.$errors" :key="index"  >{{ error.$message }}</small>    
                   
                        </div>
                        <div class="col-md-6">
                          <label for="phonebook">Phone Number</label>
                          <input type="text" placeholder="+998 ( 99 ) 999-99-99" v-maska="['+998 ( ## ) ###-##-##', '+998 ( ## ) ###-##-##']" class="form-control" v-model="phoneNumber" v-bind:class="{'border border-danger' : v$.phoneNumber.$errors.length>0 }" >
                          <small class="error" v-for="(error, index) of v$.phoneNumber.$errors" :key="index"  >{{ error.$message }}</small>  
                          <input type="checkbox" @change="check($event)" style="position:relative;  top:20px; display:block" id="numberconfirm" name="radio-confirm "   v-model="numberconfirmcheck">
                            <label for="numberconfirm">Confirmed number</label>
                        </div>
                    </div>
                    <div class="form-group row">
                         <div class="col-md-12">
                             <label class="col-sm-3 col-form-label">Choose gender</label>
                             <small class="error" v-for="(error, index) of v$.gender.$errors" :key="index"  >{{ error.$message }}</small> 
                         </div>
                          <div class="col-sm-4">
                            <input type="radio" id="gender1" name="radio-gender"   v-bind:value="0" v-model="gender">
                            <label for="gender1">Male</label>
                          </div>
                          <div class="col-sm-5">
                            <input type="radio" id="gender2" name="radio-gender" v-bind:value="1" v-model="gender">
                            <label for="gender2">Female</label>
                          </div>
                        </div>
                       
                    <div class="form-group">
                        <label for="exampleFormControlSelect1"  >Choose role</label>
                        <select :disabled="role=='Employee' || role=='Company Owner' || role=='Owner' || role=='Analytic'" class="form-control " v-bind:class="{'border border-danger' : v$.role.$errors.length>0 }" v-model="role" id="exampleFormControlSelect1">
                        <option  value="SuperAdmin">SuperAdmin</option>
                        <option value="Scout">Scout</option>
                        <option value="Creator">Creator</option>
                        <option value="Owner">Owner</option>
                        <option value="Analytic" >Analytic</option>
                        <option value="Tester">Tester</option>
                        <option value="Store Owner" v-if="userInfo && (userInfo.role=='Creator' || userInfo.role=='Owner')">Store Owner</option>
                        <option value="Employee" disabled>Employee</option>
                        <option value="Company Owner" disabled>Company Owner</option>
                        </select>
                         <small class="error" v-for="(error, index) of v$.role.$errors" :key="index"  >{{ error.$message }}</small> 
                    </div>
                    <div class="form-group">
                        <p>
                            <input checked type="radio" id="test1"  name="radio-language" value="ru" v-model="language">
                            <label for="test1">Русский</label>
                        </p>
                        <p>
                            <input type="radio" id="test2"  name="radio-language" value="uz" v-model="language">
                            <label for="test2">O'zbekcha</label>
                        </p>
                       
                    </div>    
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" v-bind:class="{'border border-danger' : v$.email.$errors.length>0 }" id="exampleInputEmail1" v-model="email" placeholder="Email">
                      <small class="error" v-for="(error, index) of v$.email.$errors" :key="index"  >{{ error.$message }}</small> 
                    </div>
                    
                    <button v-if="userInfo.role=='Creator'" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Update</button>
                    
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-12 grid-margin stretch-card" v-if="role=='Company Owner'">
              <div class="card" v-if="userInfo.role=='Owner' || userInfo.role=='Creator'">
                <div class="card-body">
                  <h4 class="card-title">Merge into Company </h4>
                  
                  <template v-if="resErrorChangeMerge" >
                  
                    <p class="error" v-for=" (value,name) in resErrorChangeMerge">
                      {{name}} : {{value[0]}}
                    </p>
                  </template>
                  <p class="error" v-if="resStringErrorChangeMerge">
                      {{resStringErrorChangeMerge}}
                    </p>
                    
                    <p class="success" v-if="resSuccessChangeMerge">
                      {{resSuccessChangeMerge}}
                    </p>
                  <form class="forms-sample" @submit.prevent="submitFormUpdateCompanyMerge()">
                    <input type="search" @input="searchCompanyMerge" v-model="companySearch2Merge" class="form-control" placeholder="Search: PharmIq">
                    <div class="results" v-if="responseMerge && responseMerge.length>0">
                        <div class="results__each" v-for="resp in responseMerge" :key="resp.id" @click="changeSearchVariableMerge(resp.id,resp.companyName)">{{resp.companyName}}</div>
                    </div>
                    <button type="submit" :disabled='isDisabledMerge' class="btn btn-primary mt-2">Merge</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-12 grid-margin stretch-card" v-if="role=='Employee'">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Change Company Member </h4>
                  <p class="card-description" v-if="company">
                    Membership: {{company.companyName}}  <span v-if="loading">| loading...</span>
                  </p>
                  <template v-if="resErrorChange" >
                  
                    <p class="error" v-for=" (value,name) in resErrorChange">
                      {{name}} : {{value[0]}}
                    </p>
                  </template>
                  <p class="error" v-if="resStringErrorChange">
                      {{resStringErrorChange}}
                    </p>
                    
                    <p class="success" v-if="resSuccessChange">
                      {{resSuccessChange}}
                    </p>
                  <form class="forms-sample" @submit.prevent="submitFormUpdateCompany()">
                    <input type="search" @input="searchCompany" v-model="companySearch2" class="form-control" placeholder="Search: PharmIq">
                    <div class="results" v-if="response && response.length>0">
                        <div class="results__each" v-for="resp in response" :key="resp.id" @click="changeSearchVariable(resp.id,resp.companyName)">{{resp.companyName}}</div>
                    </div>
                    <button type="submit" :disabled='isDisabled' class="btn btn-primary mt-2">Change</button>
                    
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
import { required,minLength, email,sameAs, maxLength } from '@vuelidate/validators'
import { ref } from 'vue';
import { maska } from 'maska'
import {standartAttribute} from '@/globals/globalFunction.js'
export default {
      setup () {
        const date = ref(new Date());
        // In case of a range picker, you'll receive [Date, Date]
        const format = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            

            return `${day}/${month}/${year}`;
        }
        const setDate = (value) => {
            date.value = value;
        }
        return { v$: useVuelidate(),  format ,setDate}
      },
      directives: { maska },
      components: {
        GoBackButton,
        Datepicker
      },
      data() {
        return {
          url: import.meta.env.VITE_APP_REST_ENDPOINT, 
          firstName :'',
          lastName :'',
          date: '',
          birthDate :'',
          gender :0,
          companySearch2:'',
          companySearch2Merge:'',
          isDisabledMerge:false,
          language :'ru',
          email :'',
          role: 'SuperAdmin',
          phoneNumber: '',
          password:'',
          confirmPassword: '',
          resError: false,
          resSuccess: false,
          resStringError: '',
          numberconfirm: false,
          userInfo:null,
          company:null,
          loading: false,
          response:null,
          responseMerge:null,
          resStringErrorChange:'',
          resStringErrorChangeMerge: '',
          resErrorChange:'',
          resErrorChangeMerge:'',
          resSuccessChange:'',
          resSuccessChangeMerge:'',
          comapnyId:null,
        }
      },
      computed: {
        checkGender(){
          
          return this.gender==0? true : false;
        },
        isDisabled: function(){
          this.v$.$touch();
          
          if (this.v$.$error) return true;
            
          },
        numberconfirmcheck: function(){
          console.log(this.numberconfirm);
            return this.numberconfirm==1? true : false;
        }  
      },
      validations () {
        return {
          firstName: { 
              required, 
              minLengthValue: minLength(1),
              maxLengthValue: maxLength(30)
            },
          lastName: { 
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(30)
            },
            phoneNumber:{
              required,
            },
          birthDate: { 
            required,
            
            },
          gender: { 
            required,
            },
          role: { 
            required,
            
            },
            
          language: { 
            required,
            },
            birthDate:{
               required,
            },
          email: { 
            email
            },
            
        }
      },
      methods: {
        check: function(e) {
          if(e.target.checked){
              this.numberconfirm = 1;
          }else{
              this.numberconfirm = 0;
          }
          
        },
        changeSearchVariableMerge(id,name){
          this.companySearch2Merge = name;
          this.responseMerge = null;
          this.comapnyId = id;
        },
        changeSearchVariable(id, name){
          this.companySearch2 = name;
          this.response = null;
          this.comapnyId = id;
          // this.submitFormUpdateCompany(id);
        },  
        async submitFormUpdateCompanyMerge(){
          this.isDisabledMerge = true;
          if(!this.comapnyId){
            return;
          }
          const inputs = {
         'user_id': this.$route.params.id,
         'company_id': this.comapnyId,
        }
        
          let todo2 =standartAttribute();
         const finalResult = Object.assign(inputs,todo2);
      
          
         
          try {
            
            let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/admin/mergeUserCompany', {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(finalResult), // данные могут быть 'строкой' или {объектом}!
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                 'Authorization': 'Bearer '+token, 
              }
            });
            const json = await response.json();
            const status = response.status;
            if(status==401){
                this.resStringErrorChangeMerge = json.message;
            }else{
              if(json.error){
                
                setTimeout(() => {
                  this.isDisabledMerge = false;
                }, 1000);
                if(typeof json.message == 'object'){
                      this.resErrorChangeMerge = json.message;
                    }else{
                      this.resStringErrorChangeMerge = json.message;
                    }
              }else{
                // this.$router.push({ name: 'users.edit', params: {'id': json.user_id.hrid}})
                this.resSuccessChangeMerge  = 'Successfully Merged';
               
              }
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        async submitFormUpdateCompany(){
          if(!this.comapnyId){
            return;
          }
          const inputs = {
         'user_id': this.$route.params.id,
         'company_id': this.comapnyId,
        }
        
          let todo2 =standartAttribute();
         const finalResult = Object.assign(inputs,todo2);
      
          
         
          try {
            
            let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/admin/updateUserCompany', {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(finalResult), // данные могут быть 'строкой' или {объектом}!
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                 'Authorization': 'Bearer '+token, 
              }
            });
            const json = await response.json();
            const status = response.status;
            if(status==401){
                this.resStringErrorChange = json.message;
            }else{
              if(json.error){
                
                
                if(typeof json.message == 'object'){
                      this.resErrorChange = json.message;
                    }else{
                      this.resStringErrorChange = json.message;
                    }
              }else{
                // this.$router.push({ name: 'users.edit', params: {'id': json.user_id.hrid}})
                this.resSuccessChange  = 'Successfully updated';
              }
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        searchCompanyMerge(){
          this.resStringErrorChangeMerge = '';
          clearTimeout(this.timerId);
          if(this.companySearch2Merge!=''){
           
              this.timerId = setTimeout(() => this.requestApiSearchMerge(1,this.companySearch2Merge), 3000);
          }
        },
        searchCompany(){
          this.resStringErrorChange = '';
          clearTimeout(this.timerId);
          if(this.companySearch2!=''){
            this.loading = true;
              this.timerId = setTimeout(() => this.requestApiSearch(1,this.companySearch2), 3000);
          }
        },
        requestApiSearchMerge(page, search=null){
          
          
          this.currentPage = page;
          let newUrl = this.url+'api/v1/company/show/all?page='+page;
          if(search){
            
             newUrl= this.url+'api/v1/company/show/all?page=1&search='+search;
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
                 
                    
                    this.responseMerge=data.companies.data;
                    console.log(this.responseMerge);
                    if(this.responseMerge.length==0){
                      this.resStringErrorChangeMerge = 'Company Name not found, please try another name';
                    }
                     setTimeout(() => {
                      // this.loading = false;
                    }, 1000);
                });
        },
        requestApiSearch(page, search=null){
          
          
          this.currentPage = page;
          let newUrl = this.url+'api/v1/company/show/all?page='+page;
          if(search){
            
             newUrl= this.url+'api/v1/company/show/all?page=1&search='+search;
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
                 
                    
                    this.response=data.companies.data;
                    console.log(this.response);
                    if(this.response.length==0){
                      this.resStringErrorChange = 'Company Name not found, please try another name';
                    }
                     setTimeout(() => {
                      this.loading = false;
                    }, 1000);
                });
        },
        changeFormat(){
          const  phonenumber = this.phoneNumber.replace(/\D/g, "");
          this.phoneNumber = '+'+phonenumber.substring(0, 3)+' ( '+phonenumber.substring(3, 5)+' ) '+phonenumber.substring(5, 8)+'-'+phonenumber.substring(8, 10)+'-'+phonenumber.substring(10, 12)
          
        },
        trimFirstNameFunction(){
          this.firstName = this.firstName.trim();
        },
        trimLastNameFunction(){
          this.lastName = this.lastName.trim();
        },
        requestApi(user_id){
          fetch(this.url+'api/v1/admin/show/users/'+user_id)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data){
                      this.company = data.company;
                      // console.log(data);
                      data = data.user;
                      this.firstName = data.firstName;
                      this.lastName = data.lastName;
                      this.birthDate = data.birthDate;
                      this.gender = data.gender;
                      if(data.phonebook){
                        this.phoneNumber = '+'+data.phonebook.phoneNumber.substring(0, 3)+' ( '+data.phonebook.phoneNumber.substring(3, 5)+' ) '+data.phonebook.phoneNumber.substring(5, 8)+'-'+data.phonebook.phoneNumber.substring(8, 10)+'-'+data.phonebook.phoneNumber.substring(10, 12);
                        this.numberconfirm = data.phonebook.status;
                      }
                     
                      this.role = data.role;
                      
                      this.language = data.language;
                      this.email = data.email?data.email.email : '';
                    }
                    
                    
                    
                });
        },
        async requestApiEdit(){
         
          const formatter = new Intl.DateTimeFormat("en-GB", { // <- re-use me
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        let br = new Date(this.birthDate);
        const result = formatter.format(br)
        // let dformat=  br.getFullYear()+'-'+ (br.getMonth()+1)+'-'+br.getDate();
        console.log(this.numberconfirm);
        const inputs = {
         'user_id': this.$route.params.id,
         'firstName': this.firstName,
         'lastName': this.lastName,
         'language': this.language,
          'gender': this.gender,
          'birthDate':result.split("/").reverse().join('-'),
          'role': this.role,
          'email': this.email,
          'numberconfirm':this.numberconfirm,
          'number': this.phoneNumber.replace(/\D/g, ""),
        }
          // let SA = standartAttribute();
          // SA.forEach(function (value, i) {
          //     formData.append(i, value);
          // });
          const todo =standartAttribute();;
         const finalResult = Object.assign(inputs,todo);
      
          
         
          try {
            
            let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/admin/update/users', {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(finalResult), // данные могут быть 'строкой' или {объектом}!
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
                // this.$router.push({ name: 'users.edit', params: {'id': json.user_id.hrid}})
                this.resSuccess  = 'Successfully updated';
              }
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
          
        },
        submitForm () {
            this.v$.$touch();
            
            if (this.v$.$error) return;
            if(this.userInfo.role=='Creator'){
              this.requestApiEdit();
            }else{
              return;
            } 
            
          }
      },
      created() {
        this.userInfo = JSON.parse(localStorage.getItem('user'));
        this.requestApi(this.$route.params.id);
        console.log(this.userInfo);
       
      },
}
</script>
<style scoped>
  .forms-sample{
    position: relative;
  }
  .results{
    position: absolute;
    background-color: white;
    width: 93%;
    top: 46px;
    left: 4px;
    height: 1;
    max-height: 156px;
    overflow-y: auto;
  }
  .results__each{
    padding: 10px 7px;
    cursor: pointer;
  }
  .results__each:hover{
    background-color: #f4f4f4;
  }
  
</style>