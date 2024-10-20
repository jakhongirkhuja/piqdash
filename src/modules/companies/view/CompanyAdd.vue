<template>
    <GoBackButton  />
    
    <div class="mt-3">
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Add User</h4>
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
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-6">
                          <label for="phonebook">Password</label>
                          <input type="password" placeholder="********" class="form-control" v-model="password" v-bind:class="{'border border-danger' : v$.password.$errors.length>0 }" >
                          <small class="error" v-for="(error, index) of v$.password.$errors" :key="index"  >{{ error.$message}}</small>  
                        </div>
                        <div class="col-md-6">
                          <label for="phonebook">Password repeat</label>
                          <input type="password" placeholder="********" class="form-control" v-model="confirmPassword" v-bind:class="{'border border-danger' : v$.password.$errors.length>0 }" >
                          <small class="error" v-for="(error, index) of v$.confirmPassword.$errors" :key="index"  >{{ error.$message }}</small>  
                        </div>
                    </div>
                    <div class="form-group row">
                         <div class="col-md-12">
                             <label class="col-sm-3 col-form-label">Choose gender</label>
                             <small class="error" v-for="(error, index) of v$.gender.$errors" :key="index"  >{{ error.$message }}</small> 
                         </div>
                          <div class="col-sm-4">
                            <input type="radio" id="gender1" name="radio-gender" checked  v-bind:value="0" v-model="gender">
                            <label for="gender1">Male</label>
                          </div>
                          <div class="col-sm-5">
                            <input type="radio" id="gender2" name="radio-gender" v-bind:value="1" v-model="gender">
                            <label for="gender2">Female</label>
                          </div>
                        </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1"  >Choose role</label>
                        <select class="form-control " v-bind:class="{'border border-danger' : v$.role.$errors.length>0 }" v-model="role" id="exampleFormControlSelect1">
                        <option  value="SuperAdmin">SuperAdmin</option>
                       
                        <option value="Scout">Scout</option>
                        <option value="Creators">Creators</option>
                        <option value="SuperAdmin">SuperAdmin</option>
                        <option value="Tester">Tester</option>
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
                    
                    <button type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Create</button>
                    
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
          language :'ru',
          email :'',
          role: 'SuperAdmin',
          phoneNumber: '',
          password:'',
          confirmPassword: '',
          resError: false,
          resSuccess: false,
          resStringError: '',
        }
      },
      computed: {
        checkGender(){
          console.log(this.gender);
          return this.gender==0? true : false;
        },
        isDisabled: function(){
          this.v$.$touch();
          if (this.v$.$error) return true;
            
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
            password: { 
              required, 
              minLength: minLength(8),
            },
            confirmPassword: { 
              required, 
              sameAsPassword: sameAs("password") },
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
        async requestApi(){
          const formatter = new Intl.DateTimeFormat("en-GB", { // <- re-use me
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        let br = new Date(this.birthDate);
        const result = formatter.format(br)
        // let dformat=  br.getFullYear()+'-'+ (br.getMonth()+1)+'-'+br.getDate();
       
        const inputs = {
         'email':this.email,
         'firstName': this.firstName,
         'lastName': this.lastName,
         'language': this.language,
          'gender': this.gender,
          'birthDate':result.split("/").reverse().join('-'),
          'role': this.role,
          'passwd': this.password,
          'number': this.phoneNumber.replace(/\D/g, ""),
        }
          // let SA = standartAttribute();
          // SA.forEach(function (value, i) {
          //     formData.append(i, value);
          // });
          const todo =standartAttribute();;
         const finalResult = Object.assign(inputs,todo);
      
          
         
          try {
            const response = await fetch(this.url+'api/v1/admin/add/user', {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(finalResult), // данные могут быть 'строкой' или {объектом}!
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json"
              }
            });
            const json = await response.json();
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(json.error){
              
              console.log(typeof json.message == 'object');
              if(typeof json.message == 'object'){
                    this.resError = json.message;
                  }else{
                    this.resStringError = json.message;
                  }
            }else{
              this.$router.push({ name: 'users.edit', params: {'id': json.user_id.hrid}})
              // this.resSuccess  = 'Successfully updated';
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
          
        },
        submitForm () {
            this.v$.$touch();
            if (this.v$.$error) return;
            this.requestApi();
          }
      },
      created() {
        
        
       
      },
}
</script>