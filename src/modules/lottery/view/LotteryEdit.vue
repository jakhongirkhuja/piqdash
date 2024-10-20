<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edit Lottery</h4>

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
                <div class="col-md-5">
                  <label for="exampleInputTitleRu">Name</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.name.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name">
                  <small class="error" v-for="(error, index) of v$.name.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-5">
                  <label for="exampleInputTitleUZ">Description</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.description.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="description">
                  <small class="error" v-for="(error, index) of v$.description.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-2">
                  <label for="exampleInputLimit">Limit</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.limit.$errors.length > 0 }" id="exampleInputLimit"
                    v-model="limit">
                  <small class="error" v-for="(error, index) of v$.limit.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-4">
                  <label for="exampleInputStartDate">Start Date</label>
                  <input type="date" v-bind:min="minDate" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.startDate.$errors.length > 0 }" id="exampleInputStartDate"
                    v-model="startDate">
                  <small class="error" v-for="(error, index) of v$.startDate.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4">
                  <label for="exampleInputEnddate">End Date</label>
                  <input type="date" v-bind:min="minDate" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.endDate.$errors.length > 0 }" id="exampleInpuEnddate"
                    v-model="endDate">
                  <small class="error" v-for="(error, index) of v$.endDate.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4">
                  <label for="exampleInputLimit">Deadline</label>
                  <input type="date" v-bind:min="minDate" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.deadline.$errors.length > 0 }" id="exampleInputLimit"
                    v-model="deadline">
                  <small class="error" v-for="(error, index) of v$.deadline.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                    <input type="search" @input="searchcourse" v-model="courseSearch" class="form-control" placeholder="Search">
                  </div>
                  <div class="col-md-12">
                    <b>{{ course_name }}</b>
                  </div>
                <div class="col-md-12">
                 
                    <div v-for="course in courses" class="items" @click="chooseCourse(course.id, JSON.parse(course.infos.courseTitleName).ru )">{{ JSON.parse(course.infos.courseTitleName).ru }}</div>
                  
                </div>
              </div>
              

              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2 mt-2">Update</button>

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
import { required, minLength, maxLength, requiredIf, integer } from '@vuelidate/validators'
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
    chooseCourse(id, name){
      this.course_id = id;
      this.course_name = name;
      this.courses = [];
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

      const inputs = {
        'lottery_id': this.$route.params.id,
        'name': this.name,
        'description': this.description,
        'limit': this.limit,
        'startDate': this.startDate,
        'endDate': this.endDate,
        'deadline': this.deadline,
        'course_id': this.course_id,

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
        const response = await fetch(this.url + 'api/v1/lottery/edit', {
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
          console.log(status);
          console.log(json.error);
          console.log(json.message);
          if (json.error) {


            if (typeof json.message == 'object') {
              this.resError = json.message;
            } else {
              this.resStringError = json.message;
            }
          } else {
            // alert('Lottery Successfully Added');
            this.added = true;
            this.resSuccess = 'Lottery Successfully Updated';
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
    checkvalue() {
      console.log(this.startDate);
    },
    getvalue() {
      console.log(this.monetized);
    },
    requestApiGetFirst(){
          
          let newUrl = this.url+'api/v1/lottery?lottery_id='+this.$route.params.id;
         
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
                    this.name = data.name;
                    this.description = data.description;
                    this.startDate = data.startDate.split(" ")[0];
                    this.endDate  = data.endDate.split(" ")[0];
                    this.deadline = data.deadline.split(" ")[0];
                    this.limit = data.limit;
                    this.course_id = data.course_id;

                    this.course_name = JSON.parse(data.course.getinfo.courseTitleName).ru;
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
.image_prev {
  
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

.items{
  cursor: pointer;
  padding: 7px;
}
.items:hover{
  background-color: #fafafa;
}
</style>
<style>
.ck-content {
    min-height: 200px;
   }
</style>