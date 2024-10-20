<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Lessson</h4>

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
                <div class="col-md-10">
                  <label for="banner">Courses</label>
                  <select v-model="course_id" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.course_id.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <option v-for="course in courses" :key="course.id" v-bind:value="course.id">
                      {{ JSON.parse(course.infos.courseTitleName).ru }} ( {{ JSON.parse(course.infos.courseTitleName).uz
                      }} )</option>
                  </select>
                  <small class="error" v-for="(error, index) of v$.course_id.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-2">
                  <label for="banner">Order</label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.order.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="order">
                  <small class="error" v-for="(error, index) of v$.order.$errors" :key="index">{{ error.$message
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
                  <label for="exampleInputTitleRu">Video (РУ) - {{ video_ru_length }} seconds</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.video_ru.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="video_ru" @input="inputgetseconds('ru')">
                  <small class="error" v-for="(error, index) of v$.video_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Video (UZ) - {{ video_uz_length }} seconds </label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.video_uz.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="video_uz" @input="inputgetseconds('uz')">
                  <small class="error" v-for="(error, index) of v$.video_uz.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Video Mobi (UZ)  </label>
                  <input type="text" class="form-control"
                  id="exampleInputTitleUZ"
                    v-model="video_mobi_uz" >
                 
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Video Mobi (RU)  </label>
                  <input type="text" class="form-control"
                  id="exampleInputTitleUZ"
                    v-model="video_mobi_ru" >
                 
                </div>
              </div>
              <!-- <div class="form-group row">
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Text (РУ)</label>
                  <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                  <small class="error" v-for="(error, index) of v$.video_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Text (UZ)</label>
                  <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                  <small class="error" v-for="(error, index) of v$.video_uz.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div> -->

              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Create</button>

            </form>
          </div>
        </div>
      </div>
      <div id="video_ru" style="display:none"></div>
      <div id="video_uz" style="display:none"></div>
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
      banner_ru: [],
      banner_ru_prev: null,
      banner_uz: [],
      banner_uz_prev: null,
      title_ru: '',
      title_uz: '',
      video_ru: '',
      video_uz: '',
      video_ru_length: 0,
      video_uz_length: 0,
      body_ru: '',
      startDate: null,
      endDate: null,
      body_uz: '',
      courses: [],
      order:1,
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      monetized: 0,
      price: null,
      course_id: 2,
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      video_mobi_ru: '',
      video_mobi_uz:'',
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
      course_id: {
        required,
      },
     
      video_ru: {
        required,
      },
      video_uz: {
        required,
      },
      title_ru: {
        required,
        minLengthValue: minLength(3)
      },
      title_uz: {
        required,
        minLengthValue: minLength(3)
      },
     
      order:{
         required,
         integer,
      },
     
    }
  },

  methods: {
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
    getCourses(page, search = null) {

      let newUrl = this.url + 'api/v1/course?page=' + page+'&show=all';
      if (search) {
        newUrl = this.url + 'api/v1/course?page=1&search=' + search;
      }
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

          this.courses = data.data
        });
    },
    async requestApi() {

      const inputs = {
        'course_id': this.course_id,
        'order': this.order,
        'lessonTitleName_ru': this.title_ru,
        'lessonTitleName_uz': this.title_uz,
        'video_ru': this.video_ru,
        'video_uz': this.video_uz,
        'videoLength_ru': this.video_ru_length,
        'videoLength_uz': this.video_uz_length,
        'videoLocId_uz':this.video_mobi_uz,
        'videoLocId_ru':this.video_mobi_ru,
      }

      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      // data.append('courseBanner_ru', this.banner_ru)
      // data.append('courseBanner_uz', this.banner_uz)
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/lessons/add', {
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
            this.added = true;
            this.resSuccess = 'Lesson Successfully Added';
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
    getcourses() {

      let newUrl = this.url + 'api/v1/course/course?page=1';

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
          this.courses = data.data;
          // console.log(this.courses);
        });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getCourses();

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