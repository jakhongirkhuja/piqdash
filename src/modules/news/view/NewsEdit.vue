<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edit News</h4>

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
                  <label class="col-sm-3 col-form-label" for="banner">Banner</label>
                  <img :src="banner_ru_prev" v-if="banner_ru_prev" class="image_prev"  width="250"/>
                  <input type="file" id="banner" v-on:change="uploadFilebannerRu($event)" accept="image/*"
                    class="form-control">
                
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
                  <label for="exampleInputTitleRu">Text (РУ)</label>
                  <ckeditor :editor="editor" v-model="editorData_ru" :config="editorConfig"></ckeditor>
                  <small class="error" v-for="(error, index) of v$.editorData_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Text (UZ)</label>
                  <ckeditor :editor="editor" v-model="editorData_uz" :config="editorConfig"></ckeditor>
                  <small class="error" v-for="(error, index) of v$.editorData_uz.$errors" :key="index">{{ error.$message
                  }}</small>
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
      banner_ru_prev: [],
      banner_uz: [],
      banner_uz_prev: [],
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
      news: [],
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
      editorData_ru: '',
      editorData_uz: '',
      disableClick: [],
      addEditor: false,
      addTag: false,
      addImg: false,
      contents:[],
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
      title_ru: {
        required,
        minLengthValue: minLength(3)
      },
      title_uz: {
        required,
        minLengthValue: minLength(3)
      },
      editorData_ru: {
        required,
        
      },
      editorData_uz: {
        required,
        
      },
     
    }
  },

  methods: {
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
    uploadFileImageRu(event, ordering) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.banner_ru[ordering] = files[0];
      this.banner_ru_prev[ordering] = URL.createObjectURL(files[0]);

    },
    uploadFileImageUz(event,ordering) {
      var filesUz = event.target.files || event.dataTransfer.files;
      if (!filesUz.length) {
        return;
      }
      this.banner_uz[ordering] = filesUz[0];
      this.banner_uz_prev[ordering] = URL.createObjectURL(filesUz[0]);

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
    getNews() {

      let newUrl = this.url + 'api/v1/news?id=' + this.$route.params.id;
     
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
            console.log(data);
            this.banner_ru_prev = 'https://api.pharmiq.uz/files/news/'+data.banner;
            this.course_id = data.course_id;
            this.title_ru = JSON.parse(data.title).ru;
            this.title_uz = JSON.parse(data.title).uz;
            
            this.editorData_ru = JSON.parse(data.content).ru;
            this.editorData_uz = JSON.parse(data.content).uz;
            
            
          // this.news = data.data
        });
    },
    async requestApi() {

const inputs = {
 
  'title_ru': this.title_ru,
  'title_uz': this.title_uz,
  'content_ru': this.editorData_ru,
  'content_uz': this.editorData_uz,
  'postedDate': new Date().toISOString().replace('T',' '),
}

const todo = standartAttribute();
const finalResult = Object.assign(inputs, todo);

var data = new FormData()
// console.log(this.banner_ru);
if(this.banner_ru.length!=0){
  data.append('banner', this.banner_ru)
}

// data.append('courseBanner_uz', this.banner_uz)
for (const key in finalResult) {
  data.append(key, finalResult[key]);

}
try {
  let token = localStorage.getItem('token');
  const response = await fetch(this.url + 'api/v1/news/edit/'+this.$route.params.id, {
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
      this.resSuccess = 'News Successfully Updated';
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
   
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getNews();

  },
}
</script>
<style lang="css" scoped>
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
<style>
.ck-content {
    min-height: 200px;
   }
</style>