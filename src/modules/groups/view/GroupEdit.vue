<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edit Group</h4>

            <template v-if="resError">

              <p class="error" v-for=" (value, name) in resError">
                {{ name }} : {{ value[0] }}
              </p>
            </template>
            <p class="error" v-if="resStringError">
              {{ resStringError }}
            </p>
            <p class="success" v-if="resSuccess">
              {{ resSuccess }}
            </p>
            <form class="forms-sample" @submit.prevent="submitForm()">
              <div class="form-group row">
                <div class="col-md-12">
                  <label for="exampleInputTitleRu">Group Name</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.name.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name">
                  <small class="error" v-for="(error, index) of v$.name.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                
              </div>
              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Update</button>

            </form>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="row mt-2">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Target Filter</h4>

            <template v-if="resErrorT">

              <p class="error" v-for=" (value, name) in resErrorT">
                {{ name }} : {{ value[0] }}
              </p>
            </template>
            <p class="error" v-if="resStringErrorT">
              {{ resStringErrorT }}
            </p>
            <p class="success" v-if="resSuccessT">
              {{ resSuccessT }}
            </p>
            <form class="forms-sample" @submit.prevent="submitFormT()">
              
              <div class="form-group row">
                <div class="col-md-4 gender">
                  
                  <label for="exampleInputGenderRu">Gender</label>
                  <div class="row">
                   <div class="col-md-4">
                    <label for="all"><input id="all" type="radio" class="l-2"
                    v-model="gender" value="all">All </label>
                  
                  
                    
                   </div>
                   <div class="col-md-4">
                    <label for="man"><input id="man"  type="radio" class="l-2"
                    v-model="gender" value="0">Man </label>
                  
                  
                    
                   </div>
                   <div class="col-md-4">
                    <label for="femaile"><input  id="femaile" type="radio" class=""
                    
                    v-model="gender" value="1">Female </label>
                   </div>
                  </div>
                    
                 
                </div>
                <div class="col-md-4">
                  
                  <label for="exampleInputTitleUZ">Role</label>
                  <select    multiple="multiple"  class="form-control js-example-basic-multiple">
                    <option selected value="all">All</option>
                    <option value="Employee">Employee</option>
                    <option value="Company Owner">Company Owner</option>
                  </select>
                  
                </div>
                <div class="col-md-4">
                  
                  <label for="exampleInputTitleUZ">Age</label>
                  <select v-model="age"   class="form-control" >
                    <option selected value="all">All</option>
                    <option value="0">Range</option>
                    <option value="1">Range Limits</option>
                  </select>
                  <div class="mb-2 mt-5" v-if="age==0">
                    <Slider @update="checkvalues" v-model="nage"  />
                  </div>
                  
                  <div class="mt-5" v-if="age==1"><Slider @update="checkvalues" v-model="rage"  /></div>
                </div>
              </div>

             

              <button v-if="!added" type="submit"  class="btn btn-primary mr-2">Update</button>

            </form>
          </div>
        </div>
      </div>

    </div>

    <!-- <div class="row">
      <div class="col-md-4 pt-4" style="display:flex; align-items:center;  ">
              <span style="position:relative; top:-4px">Members</span>
              <label style="margin-right:15px;" class="language-switcher ml-3 ">
                <input @change="getvalue" type="checkbox" v-model="currentStatus">
                <span class="slider round"></span>
                <span class="select-ru"></span>
                <span class="select-uz"></span>
              </label>

              <span style="position:relative; top:-4px">Companies</span>
            </div>
    </div> -->
    <div class="row mt-4" >
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            
            <h4 class="card-title">Add Company </h4>
               <p class="error" v-if="checkEditorEror">{{checkEditorEror}}</p>
                <p class="success" v-if="checkEditorok">{{checkEditorok}}</p>
              
            <div class="form-group row">
               <div class="col-md-12">
                <input type="search" name="search" id="" @input="ontypSearch" v-model="searchCompany" placeholder="Search Company" class="form-control"> 
                <div class="response" v-if="responseCompanies.length>0">
                    <div class="response__each" v-for="company in responseCompanies" :key="company.id">
                      <div class="response__name">
                         {{company.companyName}}
                      </div>
                      <div class="response__actions">
                        <i class="ti ti-plus text-primary" data-toggle="tooltip" @click="requestApiAddCompanyToGroup(company.id)"  title="Add"></i>
                        <!-- <i class="ti ti-check text-success" data-toggle="tooltip"  title="Ok"></i> -->
                      </div>
                    </div>
                </div>
               </div>
               <div class="col-md-12">
                <div class="result">
                    <div class="result__each" v-for="company, index  in resultCompanies" :key="company.id">
                      <div class="result__name">
                          {{ index+1 }}. {{company.companyName}}
                      </div>
                      <div class="result__actions">
                        <i class="ti ti-trash text-danger" data-toggle="tooltip" @click="requestApiDeleteCompany(company.id)"  title="Delete"></i>
                      </div>
                    </div>
                    
                </div>  
               </div>
            </div>  
            
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            
            <h4 class="card-title">Add Members </h4>
               <p class="error" v-if="checkEditorEror">{{checkEditorEror}}</p>
                <p class="success" v-if="checkEditorok">{{checkEditorok}}</p>
              
            <div class="form-group row">
               <div class="col-md-12">
                <input type="search" name="search" id="" @input="ontypSearchPhone" v-model="searchPhoneNumber" placeholder="Search by Phone" class="form-control"> 
                <div class="response" v-if="responseMembers.length>0">
                    <div class="response__each" v-for="member in responseMembers" :key="member.id">
                      <div class="response__name">
                         {{member.phoneNumber}}
                      </div>
                      <div class="response__actions">
                        <i class="ti ti-plus text-primary" data-toggle="tooltip" @click="requestApiAddMemberToGroup(member.user_id)"  title="Add"></i>
                        <!-- <i class="ti ti-check text-success" data-toggle="tooltip"  title="Ok"></i> -->
                      </div>
                    </div>
                </div>
               </div>
               <div class="col-md-12">
                <div class="result">
                    <div class="result__each" v-for="member, index  in resultMembers" :key="member.id">
                      <div class="result__name">
                          {{ index+1 }}. {{member.user.phonebook.phoneNumber}}
                      </div>
                      <div class="result__actions">
                        <i class="ti ti-trash text-danger" data-toggle="tooltip" @click="requestApiDeleteMember(member.memberlist.id)"  title="Delete"></i>
                      </div>
                    </div>
                    
                </div>  
               </div>
            </div>  
            
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            
            <h4 class="card-title">Member Restriction</h4>
               <p class="error" v-if="checkEditorErorMR">{{checkEditorErorMR}}</p>
                <p class="success" v-if="checkEditorokMR">{{checkEditorokMR}}</p>
              
            <div class="form-group row">
               <div class="col-md-12">
                <input type="search" name="search" id="" @input="ontypSearchMemberRestrictionPhone" v-model="searchMemberRestrictionPhoneNumber" placeholder="Search by Phone" class="form-control"> 
                <div class="response" v-if="responseMembersRestring.length>0">
                    <div class="response__each" v-for="memberRestrict in responseMembersRestring" :key="memberRestrict.id">
                      <div class="response__name">
                         {{memberRestrict.phoneNumber}}
                      </div>
                      <div class="response__actions">
                        <i class="ti ti-plus text-primary" data-toggle="tooltip" @click="requestApiAddMemberRestrictionToGroup(memberRestrict.user_id)"  title="Add"></i>
                        <!-- <i class="ti ti-check text-success" data-toggle="tooltip"  title="Ok"></i> -->
                      </div>
                    </div>
                </div>
               </div>
               <div class="col-md-12">
                <div class="result" v-if="resultMembersRestrictoin.length>0">
                    <div class="result__each" v-for="memberRestring, index  in resultMembersRestrictoin" :key="memberRestring.id">
                      <div class="result__name">
                          {{ index+1 }}. {{memberRestring.memberPhone}}
                      </div>
                      <div class="result__actions">
                        <i class="ti ti-trash text-danger" data-toggle="tooltip" @click="requestApiDeleteMemberRestriction(memberRestring.id)"  title="Delete"></i>
                      </div>
                    </div>
                    
                </div>  
               </div>
            </div>  
            
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            
            <h4 class="card-title">Company Restriction</h4>
               <p class="error" v-if="checkEditorErorСR">{{checkEditorErorСR}}</p>
                <p class="success" v-if="checkEditorokCR">{{checkEditorokCR}}</p>
              
            <div class="form-group row">
               <div class="col-md-12">
                <input type="search" name="search" id="" @input="ontypSearchCompanyRestrictionPhone" v-model="searchCompanyRestrictionPhoneNumber" placeholder="Search by Company Name" class="form-control"> 
                <div class="response" v-if="responseCompanyRestring.length>0">
                    <div class="response__each" v-for="companyRestrict in responseCompanyRestring" :key="companyRestrict.id">
                      <div class="response__name">
                         {{companyRestrict.companyName}}
                      </div>
                      <div class="response__actions">
                        <i class="ti ti-plus text-primary" data-toggle="tooltip" @click="requestApiAddCompanyRestrictionToGroup(companyRestrict.id)"  title="Add"></i>
                        <!-- <i class="ti ti-check text-success" data-toggle="tooltip"  title="Ok"></i> -->
                      </div>
                    </div>
                </div>
               </div>
               <div class="col-md-12">
                <div class="result" v-if="resultCompanyRestrictoin.length>0">
                    <div class="result__each" v-for="companyRestring, index  in resultCompanyRestrictoin" :key="companyRestring.id">
                      <div class="result__name">
                          {{ index+1 }}. {{companyRestring.company.companyName}}
                      </div>
                      <div class="result__actions">
                        <i class="ti ti-trash text-danger" data-toggle="tooltip" @click="requestApiDeleteCompanyRestriction(companyRestring.id)"  title="Delete"></i>
                      </div>
                    </div>
                    
                </div>  
               </div>
            </div>  
            
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
import { required, minLength, maxLength, requiredIf, integer } from '@vuelidate/validators'
import { ref } from 'vue';
import { maska } from 'maska'
import { standartAttribute } from '@/globals/globalFunction.js';
import Player from '@vimeo/player';
import Slider from '@vueform/slider'
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  directives: { maska },
  components: {
    GoBackButton,
    Datepicker,
    Slider,
  },
  data() {
    return {
      url: import.meta.env.VITE_APP_REST_ENDPOINT,
      name: '',
      searchCompany:'',
      searchPhoneNumber: '',
      searchMemberRestrictionPhoneNumber: '',
      searchCompanyRestrictionPhoneNumber: '',
      currentStatus: false,
      startDate: null,
      endDate: null,
      responseCompanies:[],
      resultCompanies:[],
      responseMembers:[],
      responseCompanyRestring: [],
      responseMembersRestring: [],
      resultMembers: [],
      resultMembersRestrictoin:[],
      resultCompanyRestrictoin: [],
      body_uz: '',
      courses: [],
      order:1,
      added: false,
      resError: false,
      resErrorT: false,
      checkEditorEror: false,
      checkEditorErorMR: false,
      checkEditorok: false,
      checkEditorokMR: false,
      checkEditorokCR: false,
      resSuccess: false,
      resStringError: '',
      resStringErrorT: '',
      resSuccessT: false,
      userInfo: null,
      monetized: 0,
      price: null,
      course_id: 2,
      editor: ClassicEditor,
      editorData_ru: [],
      editorData_uz: [],
      disableClick: [],
      addEditor: false,
      addTag: false,
      addImg: false,
      contents:[],
      timerId: null,
      timerNumberID: null,
      content_order:1,
      editorConfig: {
        // The configuration of the editor.
      },


      groupID: parseInt(this.$route.params.id),
      gender: 'all',
      nrole: 'all',
      age:'all',
      rage:  [18, 90],
      nage:20,
      targetFilterId:null,
    }
  },
  computed: {
    isDisabled: function () {
      this.v$.$touch();

      
      if (this.v$.$error) return true;

    }
  },
  validations() {
    return {
      name: {
        required,
      },
    }
  },

  methods: {

    getvalue() {
      this.requestApiStatus();
      
    },
    addingEditor(){
      this.addEditor = true;
      this.addTag  = false;
      this.addImg = false;
    },
    addingTag(){
      this.addTag  = true;
      this.addEditor = false;
      this.addImg = false;
      
    },
    addingImg(){
      this.addImg = true;
      this.addTag  = false;
      this.addEditor = false;
      
      
    },
    ontypSearch(){
      clearTimeout(this.timerId);
      if(this.searchCompany!=''){
          this.timerId = setTimeout(() =>{this.searchCompanies();}, 2000);
      }else{
      }
      
    },
    ontypSearchPhone(){
      clearTimeout(this.timerNumberID);
      if(this.searchPhoneNumber!='' && this.searchPhoneNumber.length>3){
          this.timerNumberID = setTimeout(() =>{this.searchByPhoneNumber();}, 2000);
      }else{

      }
    },
    ontypSearchCompanyRestrictionPhone(){
      clearTimeout(this.timerNumberID);
      if(this.searchCompanyRestrictionPhoneNumber!='' && this.searchCompanyRestrictionPhoneNumber.length>3){
          this.timerNumberID = setTimeout(() =>{this.searchByCompanyRestrictionName();}, 2000);
      }else{

      }
    },
    ontypSearchMemberRestrictionPhone(){
      clearTimeout(this.timerNumberID);
      if(this.searchMemberRestrictionPhoneNumber!='' && this.searchMemberRestrictionPhoneNumber.length>3){
          this.timerNumberID = setTimeout(() =>{this.searchByMemberRestrictionPhoneNumber();}, 2000);
      }else{

      }
    },
    getResultCompanies() {

      let newUrl = this.url + 'api/v1/groups/companies/'+this.$route.params.id;
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
          this.resultCompanies = data.reverse();
          console.log(data);
        });
    },
    async getResultCompanyRestrictions(){
      let newUrl = this.url + 'api/v1/groups/companyRestriction/'+this.$route.params.id;
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
          this.resultCompanyRestrictoin = data.reverse();
          console.log(data);
        });
    },
    async getResultMembersRestrictions(){
      let newUrl = this.url + 'api/v1/groups/memberRestriction/'+this.$route.params.id;
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
          this.resultMembersRestrictoin = data.reverse();
          console.log(data);
        });
    },
    getResultMembers() {

      let newUrl = this.url + 'api/v1/groups/members/'+this.$route.params.id;
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
          this.resultMembers = data.reverse();
          console.log(data);
        });
      },
    searchByMemberRestrictionPhoneNumber(){
      let newUrl = this.url + 'api/v1/academy/phonenumber/search?s='+this.searchMemberRestrictionPhoneNumber;
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
           
            this.responseMembersRestring= data;
            
        });
    },
    searchByCompanyRestrictionName(){
      let newUrl = this.url + 'api/v1/company/search?s='+this.searchCompanyRestrictionPhoneNumber;
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
           
            this.responseCompanyRestring= data.companies;
            
        });
    }, 
    searchByPhoneNumber(){
      let newUrl = this.url + 'api/v1/academy/phonenumber/search?s='+this.searchPhoneNumber;
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
           
            this.responseMembers= data;
            
        });
    },
    searchCompanies() {

      let newUrl = this.url + 'api/v1/company/search?s='+this.searchCompany;
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
           
            this.responseCompanies= data.companies;
            
        });
    },
    async requestApi() {
      const inputs = {
        'groupName': this.name,
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);
      var data = new FormData()
      for (const key in finalResult) {
        data.append(key, finalResult[key]);
      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/groups/groupNameEdit/'+this.$route.params.id, {
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
           
            this.resSuccess = 'Group Successfully Updated';
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

    },
    async requestApiStatus() {

        const inputs = {
          'status': this.currentStatus? 1 : 0,
        }
        const todo = standartAttribute();
        const finalResult = Object.assign(inputs, todo);
        var data = new FormData()
        for (const key in finalResult) {
          data.append(key, finalResult[key]);
        }
        try {
          let token = localStorage.getItem('token');
          const response = await fetch(this.url + 'api/v1/groups/groupstatus/'+this.$route.params.id, {
            method: 'POST',
            body: data,
            headers: {
              'Accept-Language': 'en-US,en;q=0.8',
              "accept": "application/json",
              'Authorization': 'Bearer ' + token,
            },

          });

          const json = await response.json();
          // window.scrollTo({ top: 0, behavior: 'smooth' });
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
            
              // this.resSuccess = 'Group Successfully Updated';
            }
          }


        } catch (error) {
          console.error('Ошибка:', error);
        }

    },
    async requestApiAddCompanyRestrictionToGroup(company_id){
      this.checkEditorokCR = false;
      this.checkEditorErorCR = false;
          const inputs = {
            'company_id': company_id,
            'group_id': parseInt(this.$route.params.id),
          }
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);
          var data = new FormData()
          for (const key in finalResult) {
            data.append(key, finalResult[key]);
          }
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url + 'api/v1/groups/companyRestriction/add', {
              method: 'POST',
              body: data,
              headers: {
                'Accept-Language': 'en-US,en;q=0.8',
                "accept": "application/json",
                'Authorization': 'Bearer ' + token,
              },

            });

            const json = await response.json();
          
            const status = response.status;

            if (status == 401) {
              this.resStringError = json.message;
            } else {
              if (json.error) {
                if (typeof json.message == 'object') {
                  this.resError = json.message;
                } else {
                  alert(json.message);
                  // this.checkEditorErorСR = json.message;
                }
              } else {
                  console.log(json);
                  this.checkEditorokСR = 'added';
                  this.responseCompanyRestring = [];
                  this.getResultCompanyRestrictions();
                  this.getResultMembersRestrictions();
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
    },
    async requestApiAddMemberRestrictionToGroup(user_id){
      this.checkEditorokMR = false;
      this.checkEditorErorMR = false;
          const inputs = {
            'user_id': user_id,
            'group_id': parseInt(this.$route.params.id),
          }
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);
          var data = new FormData()
          for (const key in finalResult) {
            data.append(key, finalResult[key]);
          }
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url + 'api/v1/groups/memberRestriction/add', {
              method: 'POST',
              body: data,
              headers: {
                'Accept-Language': 'en-US,en;q=0.8',
                "accept": "application/json",
                'Authorization': 'Bearer ' + token,
              },

            });

            const json = await response.json();
          
            const status = response.status;

            if (status == 401) {
              this.resStringError = json.message;
            } else {
              if (json.error) {
                if (typeof json.message == 'object') {
                  this.resError = json.message;
                } else {
                  this.checkEditorErorMR = json.message;
                }
              } else {
                  console.log(json);
                  this.responseMembersRestring  = [];
                  this.checkEditorokMR = 'added';
                  this.getResultMembersRestrictions();
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
    },
    async requestApiAddMemberToGroup(user_id) {

      const inputs = {
        'user_id': user_id,
        'group_id': parseInt(this.$route.params.id),
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);
      var data = new FormData()
      for (const key in finalResult) {
        data.append(key, finalResult[key]);
      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/groups/addGroupMembers', {
          method: 'POST',
          body: data,
          headers: {
            'Accept-Language': 'en-US,en;q=0.8',
            "accept": "application/json",
            'Authorization': 'Bearer ' + token,
          },

        });

        const json = await response.json();
      
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
              console.log(json);
              this.responseMembers = [];
              this.getResultMembers();
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

      },
    async requestApiAddCompanyToGroup(company_id) {

        const inputs = {
          'company_id': company_id,
          'group_id': parseInt(this.$route.params.id),
        }
        const todo = standartAttribute();
        const finalResult = Object.assign(inputs, todo);
        var data = new FormData()
        for (const key in finalResult) {
          data.append(key, finalResult[key]);
        }
        try {
          let token = localStorage.getItem('token');
          const response = await fetch(this.url + 'api/v1/groups/addGroupCompanies', {
            method: 'POST',
            body: data,
            headers: {
              'Accept-Language': 'en-US,en;q=0.8',
              "accept": "application/json",
              'Authorization': 'Bearer ' + token,
            },

          });

          const json = await response.json();
         
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
                console.log(json);
                this.responseCompanies = [];
                this.getResultCompanies();
            }
          }


        } catch (error) {
          console.error('Ошибка:', error);
        }

        },
        async requestApiDeleteCompanyRestriction(companyRestricy_id){
          const inputs = {
          
          }
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);
          var data = new FormData()
          for (const key in finalResult) {
            data.append(key, finalResult[key]);
          }
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url + 'api/v1/groups/companyRestriction/delete/'+companyRestricy_id, {
              method: 'POST',
              body: data,
              headers: {
                'Accept-Language': 'en-US,en;q=0.8',
                "accept": "application/json",
                'Authorization': 'Bearer ' + token,
              },

            });

            const json = await response.json();
          
            const status = response.status;

            if (status == 401) {
              this.resStringError = json.message;
            } else {
              if (json.error) {
                if (typeof json.message == 'object') {
                  this.resError = json.message;
                } else {
                  this.checkEditorErorCR = json.message;
                }
              } else {
                  console.log(json);
                  this.checkEditorokCR = 'Deleted';
                  this.responseCompanyRestring = [];
                  this.getResultCompanyRestrictions();
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        async requestApiDeleteMemberRestriction(memberRestrict_id){
          const inputs = {
          
          }
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);
          var data = new FormData()
          for (const key in finalResult) {
            data.append(key, finalResult[key]);
          }
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url + 'api/v1/groups/memberRestriction/delete/'+memberRestrict_id, {
              method: 'POST',
              body: data,
              headers: {
                'Accept-Language': 'en-US,en;q=0.8',
                "accept": "application/json",
                'Authorization': 'Bearer ' + token,
              },

            });

            const json = await response.json();
          
            const status = response.status;

            if (status == 401) {
              this.resStringError = json.message;
            } else {
              if (json.error) {
                if (typeof json.message == 'object') {
                  this.resError = json.message;
                } else {
                  this.checkEditorErorMR = json.message;
                }
              } else {
                  console.log(json);
                  this.checkEditorokMR = 'Deleted';
                  this.responseMembers = [];
                  this.getResultMembersRestrictions();
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
    async requestApiDeleteMember(memberlistId){
        const inputs = {
          
        }
        const todo = standartAttribute();
        const finalResult = Object.assign(inputs, todo);
        var data = new FormData()
        for (const key in finalResult) {
          data.append(key, finalResult[key]);
        }
        try {
          let token = localStorage.getItem('token');
          const response = await fetch(this.url + 'api/v1/groups/deleteGroupMembers/'+memberlistId, {
            method: 'POST',
            body: data,
            headers: {
              'Accept-Language': 'en-US,en;q=0.8',
              "accept": "application/json",
              'Authorization': 'Bearer ' + token,
            },

          });

          const json = await response.json();
         
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
                this.getResultMembers();
            }
          }


        } catch (error) {
          console.error('Ошибка:', error);
        }
    },    
    async requestApiDeleteCompany(company_id){
      const inputs = {
          
        }
        const todo = standartAttribute();
        const finalResult = Object.assign(inputs, todo);
        var data = new FormData()
        for (const key in finalResult) {
          data.append(key, finalResult[key]);
        }
        try {
          let token = localStorage.getItem('token');
          const response = await fetch(this.url + 'api/v1/groups/deleteGroupCompany/'+company_id, {
            method: 'POST',
            body: data,
            headers: {
              'Accept-Language': 'en-US,en;q=0.8',
              "accept": "application/json",
              'Authorization': 'Bearer ' + token,
            },

          });

          const json = await response.json();
         
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
                this.getResultCompanies();
            }
          }


        } catch (error) {
          console.error('Ошибка:', error);
        }
    },    
    submitForm() {
      this.v$.$touch();
      if (this.v$.$error) return;
      this.requestApi();
      
    },
    getGroup() {

      let newUrl = this.url + 'api/v1/groups?group_id='+this.$route.params.id;

      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
          if(data.group){
            this.name = data.group.groupName;
            this.currentStatus = data.group.currentStatus;
            if(data.target){

              this.targetFilterId = data.target.id;
              if(data.target.ageRange.includes(',')){
                  this.age = 1;
                  this.rage = data.target.ageRange.split(',');
                  
                }else{
                  if(data.target.ageRange=='all'){
                    this.age = 'all';
                    
                  }else{
                    this.age = 0;
                    this.nage = data.target.ageRange;
                  }
                }
                console.log(data.target.ageRange.includes(','));  
               
                $('#mySelect2').val(['1', '2']);
                this.gender = data.target.gender==null? 'all' : (data.target.gender==false? 0 : 1);
  
                $('.js-example-basic-multiple').val(JSON.parse(data.target.roleList)).trigger('change');
            }
          }
          
          // console.log(this.courses);
        });
    },
    async requestApiT() {
      // this.added = true;
      // let phonebooks = this.searchNumber?.replace(' ','').split(',');

      ;
      let inputs = {
        "group_id": this.groupID,
        "gender": this.gender,
        "ageRange": this.age=='all'? 'all':  (this.age==1? this.rage : this.nage ),
        "roleList": localStorage.getItem('role')? localStorage.getItem('role') : 'all',
      }
      
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/targetFilter/edit/'+this.targetFilterId, {
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
          // this.added = false;
        } else {
          if (json.error) {
            if (typeof json.message == 'object') {
              this.resErrorT = json.message;
            } else {
              this.resStringErrorT = json.message;
            }
            // this.added = false;
          } else {
            
            this.resSuccessT = 'Target filter Successfully Updated';
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

    },
    submitFormT() {
      
      this.requestApiT();
    },
  },
  mounted() {
    $('.js-example-basic-multiple').select2();
    $('.js-example-basic-multiple').change(function() {
      //var theID = $(test).val(); // works
      //var theSelection = $(test).filter(':selected').text(); // doesn't work
      
      var theSelection = $('.js-example-basic-multiple').select2('val');
      localStorage.setItem('role',theSelection);
     
      
  });
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getGroup();
    this.getResultCompanies();
    this.getResultMembers();
    this.getResultMembersRestrictions();
    this.getResultCompanyRestrictions();
    
  },
}
</script>
<style lang="css" scoped>
.response{
  position: absolute;
  top: 50px;
  width: 50%;
  max-width: 100%;
  background-color: white;
  z-index: 1;
  overflow-y: auto;
  max-height: 150px;
}
.response i{
  cursor: pointer;
}
.result{
  display: block;
  margin-top: 10px;
  border: 1px dotted silver;
}
.result .result__each, .response__each{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
}
.result .result__each:hover, .response .response__each:hover{
  background-color: rgba(240, 240, 240,0.4);
}
.result .ti-trash{
  cursor: pointer;
  padding: 0 10px;
}
.addingbtn{
  background-color: #1e3470;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  transition: all 0.5s ease;
  cursor: pointer;
  overflow: hidden;
}
.addingbtn:hover{
  transform: scale(1.05);
  box-shadow: 0 0 15px silver;
  width: 220px;
  border-radius: 10px;
}
.addingbtn span{
  display: none;
  padding: 0 8px;

}
.addingbtn span:hover{
  position: relative;
  top: -2px;
}
.addingbtn:hover span{
  display: block;
}
.image_prev {
  width: 100%;
  margin-bottom: 20px;
}


.language-switcher {
  position: relative;
  display: inline-block;
  width: 68px;
  height: 34px;
  transition: transform 0.17s cubic-bezier(0.26, 0.48, 0.08, 0.9);
}

.language-switcher input {
  opacity: 0;
  width: 0;
  height: 0;
}

.select-ru,
.select-uz {
  position: absolute;
  font-size: 15px;
  top: 7px;
  color: #fff;
  mix-blend-mode: difference;
}

.select-ru {
  left: 6px;
}

.select-uz {
  right: 6px;
}


/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1e3470;
  box-shadow: 0 3px 34px rgba(#1e3470, .1);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 34px;
  width: 34px;
  left: 0;
  bottom: 0;
  background-color: white;
  box-shadow: 0 3px 34px rgba(#1e3470, .16);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.language-switcher input:checked+.slider {
  background-color: #1e3470;
}

.language-switcher input:focus+.slider {
  box-shadow: none;
}

.language-switcher input:checked+.slider:before {
  -webkit-transform: translateX(34px);
  -ms-transform: translateX(34px);
  transform: translateX(34px);
}

/* Rounded sliders */
.language-switcher .slider.round {
  border-radius: 34px;
}

.language-switcher .slider.round:before {
  border-radius: 50%;
}

[type="radio"]:checked, [type="radio"]:not(:checked){
  position: initial;
}
.gender input{
  margin-right: 10px;
}
input.ok::-webkit-outer-spin-button,
input.ok::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
<style src="@vueform/slider/themes/default.css"></style>