<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Show Course</h4>

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
            
              <div class="form-group row">
                <div class="col-md-12">
                  <label class="col-sm-3 col-form-label" for="banner">Category</label>
                  <select v-model="category_id" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.category_id.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <option value="special">Special</option>
                    <option v-for="category in categories" :key="category.id" v-bind:selected="category_id==category.id"  v-bind:disabled="category_id!=category.id"  v-bind:value="category.id">
                      {{ JSON.parse(category.categoryName).ru }}</option>

                  </select>
                  <small class="error" v-for="(error, index) of v$.category_id.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-12" v-if="hideGroups">
                  <label class="col-sm-3 " for="banner">Group</label>
                  <select v-model="group_id"  class="form-control"
                    v-bind:class="{ 'border border-danger': v$.group_id.$errors.length > 0 }">
                   
                    <option v-for="group in groups" :key="group.id" v-bind:value="group.id" v-bind:disabled="group_id!=group.id">
                      {{ group.groupName }}</option>

                  </select>
                  <small class="error" v-for="(error, index) of v$.group_id.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Title (РУ)</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.title_ru.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="title_ru">
                  <small class="error" v-for="(error, index) of v$.title_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Title (UZ)</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.title_uz.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="title_uz">
                  <small class="error" v-for="(error, index) of v$.title_uz.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="exampleInputbodyRu">Body (РУ)</label>
                  <textarea rows="10" type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.body_ru.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="body_ru"></textarea>
                  <small class="error" v-for="(error, index) of v$.body_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputbodyUZ">Body (UZ)</label>
                  <textarea rows="10" type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.body_uz.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="body_uz"></textarea>
                  <small class="error" v-for="(error, index) of v$.body_uz.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6">
                  <label class="col-sm-3 col-form-label" for="banner">banner (РУ)</label>
                  <img :src="banner_ru_prev" v-if="banner_ru_prev" class="image_prev" />
                  <input type="file" id="banner" v-on:change="uploadFilebannerRu($event)" accept="image/*"
                     class="form-control">
                 
                </div>
                <div class="col-md-6">
                  <label class="col-sm-3 col-form-label" for="banner">banner (UZ)</label>
                  <img :src="banner_uz_prev" v-if="banner_uz_prev" class="image_prev" />
                  <input type="file" id="banner" v-on:change="uploadFilebannerUz($event)" accept="image/*"
                    class="form-control">
                  
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="exampleInputstartRu">Start Date</label>
                  <input type="date"  class="form-control"
                    v-bind:class="{ 'border border-danger': v$.startDate.$errors.length > 0 }" id="exampleInputstartRu"
                    v-model="startDate">
                  <small class="error" v-for="(error, index) of v$.startDate.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputendUZ">End Date </label>
                  <input type="date" class="form-control" id="exampleInputendUZ" v-model="endDate">

                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="exampleInputstartRu">Course Monetized</label><br>
                  <label class="language-switcher">
                    <input @change="getvalue" type="checkbox" v-model="monetized">
                    <span class="slider round"></span>
                    <span class="select-ru">No</span>
                    <span class="select-uz">Yes</span>
                  </label>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputendUZ">Course Price </label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.price.$errors.length > 0 }" id="exampleInputendUZ"
                    v-model="price">
                  <small class="error" v-for="(error, index) of v$.price.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              

           
          </div>
        </div>
      </div>
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Statistics  <div @click="downloadFile()" class="float-right btn btn-success">Export to excel</div></h4> 
            <table class="table table-responsive" v-if="statistics && statistics.length>0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Number</th>
                  <th scope="col">Role</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Quiz Result</th>
                </tr>
              </thead>
              <tbody>
                
                  <tr v-for="stat,index in statistics">
                    <th scope="row">{{index}}</th>
                    <td>{{stat.user}}</td>
                    <td>{{stat.phoneNumber}}</td>
                    <td>{{stat.role}}</td>  
                    <td>{{stat.companyName}}</td>  
                    <td>{{stat.teamName}}</td>  
                    <td>{{stat.quizResult}}</td>  
                  </tr>
               
                
                
              </tbody>
            </table>
            <div v-else>Empty</div>
          </div>
        </div>
      </div>
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Statistics Not Passed <div @click="downloadFileNotPassed()" class="float-right btn btn-success">Export to excel</div></h4> 
            <table class="table table-responsive" v-if="statisticsNotPass && statisticsNotPass.length>0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Number</th>
                  <th scope="col">Role</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Team Name</th>
                 
                </tr>
              </thead>
              <tbody>
                
                  <tr v-for="stat,index in statisticsNotPass">
                    <th scope="row">{{index}}</th>
                    <td>{{stat.user}}</td>
                    <td>{{stat.phoneNumber}}</td>  
                    <td>{{stat.role}}</td>  
                    <td>{{stat.companyName}}</td>  
                    <td>{{stat.teamName}}</td>  
                  </tr>
               
                
                
              </tbody>
            </table>
            <div v-else>Empty</div>
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
import exportFromJSON from 'export-from-json'
import { maska } from 'maska'
import { standartAttribute } from '@/globals/globalFunction.js';

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  directives: { maska },
  components: {
    GoBackButton,
    Datepicker,

  },
  data() {
    return {
      url: import.meta.env.VITE_APP_REST_ENDPOINT,
      banner_ru: [],
      banner_ru_prev: null,
      banner_uz: [],
      banner_uz_prev: null,
      group_id: null,
      groups: [],
      title_ru: '',
      title_uz: '',
      body_ru: '',
      startDate: null,
      endDate: null,
      body_uz: '',
      categories: [],
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      monetized: 0,
      price: null,
      category_id: null,
      statistics:null,
      statisticsNotPass:null,
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
      category_id: {
        required,
      },
      startDate: {
        required,
      },

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
      body_ru: {
        required,
        minLengthValue: minLength(10),
      },
      body_uz: {
        required,
        minLengthValue: minLength(10),
      },
     
      price: {
        required: requiredIf(() => { return this.monetized == 1; }),
        integer,
      },
      group_id: {
        required: requiredIf(() => { return this.category_id == 'special'; }),
      },
      
    }
  },

  methods: {
    downloadFile(){
      const fileName = "n-"+this.title_ru;
      const exportType = exportFromJSON.types.csv;
      const data = this.statistics;
      if (data) exportFromJSON({ data, fileName, exportType });
    },
    downloadFileNotPassed(){
      const fileName = "notPassed-"+this.title_ru;
      const exportType = exportFromJSON.types.csv;
      const data = this.statisticsNotPass;
      if (data) exportFromJSON({ data, fileName, exportType });
    },
    getGroups(){
          
          let newUrl = this.url+'api/v1/groups?page=1';
          
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
                    this.groups = data.data
                   
                      // this.group_id = this.groups[0].id;
                });
        },
    uploadFilebannerRu(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.banner_ru = files[0];
      this.banner_ru_prev = URL.createObjectURL(files[0]);

    },
    uploadFilebannerUz(event) {
      var filesUz = event.target.files || event.dataTransfer.files;
      if (!filesUz.length) {
        return;
      }
      this.banner_uz = filesUz[0];
      this.banner_uz_prev = URL.createObjectURL(filesUz[0]);

    },
    submitForm() {
      this.v$.$touch();
      if (this.v$.$error) return;
      
    },
    checkvalue(){
      console.log(this.startDate);
    },
    getvalue() {
      console.log(this.monetized);
    },
    getCourse(){
      let newUrl = this.url+'api/v1/course?id='+parseInt(this.$route.params.id);
         
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
                  if(Object.keys(data).length==0){
                      this.$router.push({ name: 'courses.list' })
                    }
                    if(data.courseTypeByAccess==0){
                      this.category_id = 'special';
                      this.group_id = data.courseForGroup;
                      this.hideGroups = true;
                      this.getGroups();
                    }else{
                      this.category_id =data.category_id;
                    }
                    this.monetized = data.courseMonetized==1? true : false;
                    this.price = data.coursePrice;
                    this.startDate = data.startDate;
                    this.endDate = data.endDate;
                    this.title_ru  = JSON.parse(data.infos.courseTitleName).ru;
                    this.title_uz  = JSON.parse(data.infos.courseTitleName).uz;
                    this.body_ru  = JSON.parse(data.infos.courseInfo).ru;
                    this.body_uz  = JSON.parse(data.infos.courseInfo).uz;
                    this.banner_ru_prev = this.url+'files/course/'+JSON.parse(data.infos.courseBanner).ru;
                    this.banner_uz_prev = this.url+'files/course/'+JSON.parse(data.infos.courseBanner).uz;
                    
                });
    },
    getCategories() {

      let newUrl = this.url + 'api/v1/course/category?page=1';

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
          this.categories = data.data;
          // console.log(this.categories);
        });
    },
    getStatistics() {

        let newUrl = this.url + 'api/v1/course/getCourseStatistics/'+parseInt(this.$route.params.id);

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
            this.statistics= data;
            // console.log(this.categories);
          });
        },
      getStatisticsNot() {

let newUrl = this.url + 'api/v1/course/getCourseStatisticsNotPassed/'+parseInt(this.$route.params.id);

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
    this.statisticsNotPass= data;
    // console.log(this.categories);
  });
}
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getCourse();
    
    this.getCategories();
    this.getStatistics();
    this.getStatisticsNot();
  },
}
</script>
<style lang="css" scoped>
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