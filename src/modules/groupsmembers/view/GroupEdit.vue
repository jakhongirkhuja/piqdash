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
                <div class="col-md-8">
                  <label for="exampleInputTitleRu">Group Name</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.name.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name">
                  <small class="error" v-for="(error, index) of v$.name.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4 pt-4" style="display:flex; align-items:center;">
                  Active
                  <label class="language-switcher ml-3 ">
                    <input @change="getvalue" type="checkbox" v-model="currentStatus">
                    <span class="slider round"></span>
                    <span class="select-ru">No</span>
                    <span class="select-uz">Yes</span>
                  </label>
                </div>
              </div>
              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Edit</button>

            </form>
          </div>
        </div>
      </div>
      
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            
            <h4 class="card-title">Add Company <i class="ti ti-plus addingbtn float-right"><span @click="addingEditor">Editor</span><span @click="addingTag">Tag</span><span  @click="addingImg" >Image</span></i></h4>
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
    ckeditor: CKEditor.component
  },
  data() {
    return {
      url: import.meta.env.VITE_APP_REST_ENDPOINT,
      name: '',
      searchCompany:'',
      currentStatus: false,
      startDate: null,
      endDate: null,
      responseCompanies:[],
      resultCompanies:[],
      body_uz: '',
      courses: [],
      order:1,
      added: false,
      resError: false,
      checkEditorEror: false,
      checkEditorok: false,
      resSuccess: false,
      resStringError: '',
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
      content_order:1,
      editorConfig: {
        // The configuration of the editor.
      }
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
      console.log(this.currentStatus);
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
      this.requestApiStatus();
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
          if(data){
            this.name = data.groupName;
            this.currentStatus = data.currentStatus;
          }
          
          // console.log(this.courses);
        });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getGroup();
    this.getResultCompanies();

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
</style>