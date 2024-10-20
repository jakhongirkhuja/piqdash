<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Lottery</h4>

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
            <form class="forms-sample" >
              
              <div class="form-group row">
                <div class="col-md-5">
                  <label for="exampleInputTitleRu">Name</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.name.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name" disabled>
                  <small class="error" v-for="(error, index) of v$.name.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-5">
                  <label for="exampleInputTitleUZ">Description</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.description.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="description" disabled>
                  <small class="error" v-for="(error, index) of v$.description.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-2">
                  <label for="exampleInputLimit">Limit</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.limit.$errors.length > 0 }" id="exampleInputLimit"
                    v-model="limit" disabled>
                  <small class="error" v-for="(error, index) of v$.limit.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-4">
                  <label for="exampleInputStartDate">Start Date</label>
                  <input type="date" disabled v-bind:min="minDate" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.startDate.$errors.length > 0 }" id="exampleInputStartDate"
                    v-model="startDate">
                  <small class="error" v-for="(error, index) of v$.startDate.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4">
                  <label for="exampleInputEnddate">End Date</label>
                  <input type="date" disabled v-bind:min="minDate" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.endDate.$errors.length > 0 }" id="exampleInpuEnddate"
                    v-model="endDate">
                  <small class="error" v-for="(error, index) of v$.endDate.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4">
                  <label for="exampleInputLimit">Deadline</label>
                  <input type="date" disabled v-bind:min="minDate" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.deadline.$errors.length > 0 }" id="exampleInputLimit"
                    v-model="deadline">
                  <small class="error" v-for="(error, index) of v$.deadline.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <div class="row">
                 
                  <div class="col-md-12">
                    <label for="exampleInputLimit">Course </label><br>
                    <b>{{ course_name }}</b>
                  </div>
                
              </div>
              

             
            </form>
          </div>
        </div>
      </div>
      
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
                        
                        <div class="btn btn-primary float-right mb-2" @click="downloadFile()">Export</div>

                        <table class="table">
                        <thead class="thead-dark">
                            <tr>
                              <th scope="col">Ticket</th>
                              <th scope="col">FirstName</th>
                              <th scope="col">LastName</th>
                              <th scope="col">Order</th>
                              <th scope="col">Datetime</th>
                              <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="log in logs">
                              <td>{{ log.ticket }}</td>
                              <td>{{ log.firstName }}</td>
                              <td>{{ log.lastName }}</td>
                              <td>{{ log.order }}</td>
                              <td>{{ log.datetime }}</td>
                              <td><input type='checkbox' :checked="log.hasWon" class='ios8-switch ios8-switch-lg' @change="handleChange($event,log.id, log.user_id)" :id='log.ticket'><label :for='log.ticket'></label></td>
                            </tr>
                            
                        </tbody>
                        </table>
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
import { maska } from 'maska'
import { standartAttribute } from '@/globals/globalFunction.js';
import exportFromJSON from 'export-from-json'
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
      description: '',
      startDate: null,
      endDate: null,
      minDate: '',
      limit: null,
      deadline:null,
      course_id: null,
      resSuccess:null,
      course_name:'',
      resError:[],
      courseSearch:'',
      courses:[],
      logs:[],
      exportLog:[],
      resStringError:'',
      editor: ClassicEditor,
      editorData_ru: '<p>lottery content ru</p>',
      editorData_uz: '<p>lottery content uz</p>',
      editorConfig: {

        // The configuration of the editor.
      }
    }
  },
  computed: {
    isDisabled: function () {
      this.v$.$touch();

      console.log(this.v$.$touch());
      if (this.v$.$error) return true;

    }
  },
  validations() {
    return {
     
      name: {
        required,
        minLengthValue: minLength(3)
      },
      description: {
        required,
        minLengthValue: minLength(3)
      },
      limit: {
        required,
        integer,
        maxLengthValue: maxLength(5)
      },
      startDate: {
        required,
      },
      deadline:{
        required,
      },
      endDate: {
        required,
      },
      course_id: {
        required,
      },
    }
  },

  methods: {
    handleChange(event, log_id,user_id){
      this.changeUserStatus(event.target.checked, log_id, user_id)
    },
    downloadFile(){
      const fileName = this.name;
      const exportType = exportFromJSON.types.csv;
      const data = this.exportLog;
      if (data) exportFromJSON({ data, fileName, exportType });
    },
    chooseCourse(id, name){
      this.course_id = id;
      this.course_name = name;
      this.courses = [];
    },
    async changeUserStatus(check, log_id, user_id){
      const inputs = {
       
       'lottery_log_id': log_id,
       'status': check? 1 : 0,
       'user_id': user_id,
       

       // 'postedDate': new Date().toISOString().replace('T',' '),
     }
     console.log(inputs);
     const todo = standartAttribute();
     const finalResult = Object.assign(inputs, todo);

     var data = new FormData()
     // data.append('banner', this.banner_ru)
     // data.append('courseBanner_uz', this.banner_uz)
     for (const key in finalResult) {
       data.append(key, finalResult[key]);

     }

    
     try {
       let token = localStorage.getItem('token');
       const response = await fetch(this.url + 'api/v1/lottery/updateStatus', {
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
         alert('Error');
       } else {
        
         if (json.error) {

          alert('Error');
           if (typeof json.message == 'object') {
             this.resError = json.message;
           } else {
             this.resStringError = json.message;
           }
         } else {
           
           
           alert('User Successfully Updated');
           
         }
       }


     } catch (error) {
       console.error('Ошибка:', error);
     }
    },
    searchcourse(){
          clearTimeout(this.timerId);
          
          if(this.courseSearch!='' && this.courseSearch.length>3){
          
              this.timerId = setTimeout(() =>{ this.requestApiSearch(1,this.courseSearch)}, 2000);
          }else{
           
            this.courses = [];
              // this.timerId = setTimeout(() => this.requestApiSearch(this.currentPage), 2000);
          }
        },
        requestApiSearch(page, search=null){
          
          let newUrl = this.url+'api/v1/course?page='+page;
          if(search){
             newUrl= this.url+'api/v1/course?page=1&search='+search;
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
                    
                   
                    this.courses = data.data
                    console.log(this.courses);
                   
                    setTimeout(() => {
                      this.loading = false;
                    }, 1000);
                });
        },
    inputgetseconds(lang) {
      if (lang == 'ru') {
        document.querySelector('#video_ru').innerHTML = this.video_ru;
        let iframe = document.querySelector('#video_ru iframe');
        const playernew = new Player(iframe);
        var self = this;
        playernew.getDuration().then(function (duration) {

          self.video_ru_length = duration;
          // document.querySelector('#videoLength_ru').value = duration;


          // duration = the duration of the video in seconds
        }).catch(function (error) {
          console.log(error);
          // an error occurred
        });

      } else {
        document.querySelector('#video_uz').innerHTML = this.video_uz;
        let iframe = document.querySelector('#video_uz iframe');
        const playernew = new Player(iframe);
        var self = this;
        playernew.getDuration().then(function (duration) {

          self.video_uz_length = duration;

        }).catch(function (error) {
          console.log(error);
          // an error occurred
        });
      }



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
    
    async requestApi() {

     

    },
    submitForm() {
      this.v$.$touch();
      if (this.v$.$error) return;
      this.requestApi();
    },
    checkvalue() {
      console.log(this.startDate);
    },
    getvalue() {
      console.log(this.monetized);
    },
    requestApiGetFirst(){
          
          let newUrl = this.url+'api/v1/lottery?lottery_id='+this.$route.params.id+'&logs=true';
         
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
                    
                    console.log(data);
                    if(data.lottery){
                      this.name = data.lottery.name;
                      this.description = data.lottery.description;
                      this.startDate = data.lottery.startDate.split(" ")[0];
                      this.endDate  = data.lottery.endDate.split(" ")[0];
                      this.deadline = data.lottery.deadline.split(" ")[0];
                      this.limit = data.lottery.limit;
                      this.course_id = data.lottery.course_id;
  
                      this.course_name = JSON.parse(data.lottery.course.getinfo.courseTitleName).ru;
                    }
                    this.logs = data.logs;
                    this.exportLog = data.export;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    setTimeout(() => {
                      this.loading = false;
                    }, 1000);
                });
        }
  },
  created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
    this.requestApiGetFirst();
  },
}
</script>
<style lang="css" scoped>
input[type="checkbox"].ios8-switch {
    position: absolute;
    margin: 8px 0 0 16px;    
}
input[type="checkbox"].ios8-switch + label {
    position: relative;
    padding: 5px 0 0 50px;
    line-height: 2.0em;
}
input[type="checkbox"].ios8-switch + label:before {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 40px; /* x*5 */
    height: 24px; /* x*3 */
    border-radius: 16px; /* x*2 */
    background: #fff;
    border: 1px solid #d9d9d9;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
input[type="checkbox"].ios8-switch + label:after {
    content: "";
    position: absolute;
    display: block;
    left: 0px;
    top: 0px;
    width: 24px; /* x*3 */
    height: 24px; /* x*3 */
    border-radius: 16px; /* x*2 */
    background: #fff;
    border: 1px solid #d9d9d9;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
input[type="checkbox"].ios8-switch + label:hover:after {
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
}
input[type="checkbox"].ios8-switch:checked + label:after {
    margin-left: 16px;
}
input[type="checkbox"].ios8-switch:checked + label:before {
    background: #55D069;
}
input[type="checkbox"]:not(:checked) + label:after{
  opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}
/* SMALL */

input[type="checkbox"].ios8-switch-sm {
    margin: 5px 0 0 10px;
}
input[type="checkbox"].ios8-switch-sm + label {
    position: relative;
    padding: 0 0 0 32px;
    line-height: 1.3em;
}
input[type="checkbox"].ios8-switch-sm + label:before {
    width: 25px; /* x*5 */
    height: 15px; /* x*3 */
    border-radius: 10px; /* x*2 */
}
input[type="checkbox"].ios8-switch-sm + label:after {
    width: 15px; /* x*3 */
    height: 15px; /* x*3 */
    border-radius: 10px; /* x*2 */
}
input[type="checkbox"].ios8-switch-sm + label:hover:after {
    box-shadow: 0 0 3px rgba(0,0,0,0.3);
}
input[type="checkbox"].ios8-switch-sm:checked + label:after {
    margin-left: 10px; /* x*2 */
}

/* LARGE */

input[type="checkbox"].ios8-switch-lg {
    margin: 10px 0 0 20px;
}
input[type="checkbox"].ios8-switch-lg + label {
    position: relative;
    padding: 7px 0 0 60px;
    line-height: 2.3em;
}
input[type="checkbox"].ios8-switch-lg + label:before {
    width: 50px; /* x*5 */
    height: 30px; /* x*3 */
    border-radius: 20px; /* x*2 */
}
input[type="checkbox"].ios8-switch-lg + label:after {
    width: 30px; /* x*3 */
    height: 30px; /* x*3 */
    border-radius: 20px; /* x*2 */
}
input[type="checkbox"].ios8-switch-lg + label:hover:after {
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
}
input[type="checkbox"].ios8-switch-lg:checked + label:after {
    margin-left: 20px; /* x*2 */
}


</style>
<style>
.ck-content {
    min-height: 200px;
   }
</style>