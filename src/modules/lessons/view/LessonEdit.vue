<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edit Lessson</h4>

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
                      {{course.infos? JSON.parse(course.infos.courseTitleName).ru : course.id }} ( {{ course.infos? JSON.parse(course.infos.courseTitleName).uz
                      : course.id}} )</option>
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

              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Edit</button>

            </form>
          </div>
        </div>
      </div>
      <div id="video_ru" style="display:none"></div>
      <div id="video_uz" style="display:none"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            
            <h4 class="card-title">Add Content <i class="ti ti-plus addingbtn float-right"><span @click="addingEditor">Editor</span><span @click="addingTag">Tag</span><span  @click="addingImg" >Image</span></i></h4>
               <p class="error" v-if="checkEditorEror">{{checkEditorEror}}</p>
                <p class="success" v-if="checkEditorok">{{checkEditorok}}</p>
              
              <div class="form-group row" v-if="addImg" >
                <div class="col-md-6">
                  <label for="exampleInputImageRu">Image (РУ)</label>
                  
                  <img :src="banner_ru_prev[content_order]" v-if="banner_ru_prev[content_order]" class="image_prev" />
                  <input type="file" id="exampleInputImageRu" v-on:change="uploadFileImageRu($event,content_order)" accept="image/*"  class="form-control">
                  
                </div>
                 <div class="col-md-6">
                  <label for="exampleInputTagUz">Image (UZ)</label>
                  <img :src="banner_uz_prev[content_order]" v-if="banner_uz_prev[content_order]" class="image_prev" />
                  <input type="file" id="exampleInputImageRu" v-on:change="uploadFileImageUz($event,content_order)" accept="image/*"  class="form-control">
                  
                </div>
                
                <div class="col-md-12 mt-2">
                  <div  v-if="!disableClick[content_order]" class=" btn btn-primary d-block"  @click="submitImage(this, content_order, 'img')">Save</div>
                </div>
              </div>
              
              <div class="form-group row" v-if="addTag" >
                <div class="col-md-6">
                  <label for="exampleInputTagRu">Tag (РУ)</label>
                  <textarea class="form-control" v-model="editorData_ru[content_order]"  rows="5"></textarea>
                  
                </div>
                 <div class="col-md-6">
                  <label for="exampleInputTagUz">Tag (UZ)</label>
                  <textarea class="form-control" v-model="editorData_uz[content_order]"  rows="5"></textarea>
                  
                </div>
                
                <div class="col-md-12 mt-2">
                  <div  v-if="!disableClick[content_order]" class=" btn btn-primary d-block"  @click="submitContent(this, content_order, 'tag')">Save</div>
                </div>
              </div>
              
              <div class="form-group row" v-if="addEditor" >
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Text (РУ)</label>
                  <ckeditor :editor="editor" v-model="editorData_ru[content_order]" :config="editorConfig"></ckeditor>
                 
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Text (UZ)</label>
                  <ckeditor :editor="editor" v-model="editorData_uz[content_order]" :config="editorConfig"></ckeditor>
                </div>
                
                <div class="col-md-12 mt-2">
                  <div  v-if="!disableClick[content_order]" class=" btn btn-primary d-block"  @click="submitContent(this, content_order, 'text')">Save</div>
                </div>
              </div>


              <div class="form-group row" v-for="content in contents" :key="content.id">
                <template v-if="content.type=='img'">
                  <div class="col-md-6">
                  <label for="exampleInputImageRu">Image (РУ)</label>
                
                  <img :src="banner_ru_prev[content.contentOrder]" v-if="banner_ru_prev[content.contentOrder]" class="image_prev" />
                  <input type="file" id="exampleInputImageRu" v-on:change="uploadFileImageRu($event,content.contentOrder)" accept="image/*"  class="form-control">
                  
                </div>
                 <div class="col-md-6">
                  <label for="exampleInputTagUz">Image (UZ)</label>
                  <img :src="banner_uz_prev[content.contentOrder]" v-if="banner_uz_prev[content.contentOrder]" class="image_prev" />
                  <input type="file" id="exampleInputImageRu" v-on:change="uploadFileImageUz($event,content.contentOrder)" accept="image/*"  class="form-control">
                  
                </div>
                <div class="col-md-12 mt-2">
                  <div  class=" error  float-right mr-2"  @click="deleteContent(content.id)"><i class="ti ti-trash" data-toggle="tooltip" title="Delete" data-v-6c86c240=""></i></div>
                    <div  class=" success float-right mr-3"  @click="editContentImage(content.id, content.contentOrder)"><i class="ti ti-reload" data-toggle="tooltip" title="Edit" ></i></div>
                    
                </div>
                </template>
                <template v-if="content.type=='text'">
                  <div class="col-md-6">
                  <label for="exampleInputTitleRu">Text (РУ)</label>
                  <ckeditor :editor="editor" v-model="editorData_ru[content.contentOrder]" :config="editorConfig"></ckeditor>
                 
                  </div>
                  <div class="col-md-6">
                    <label for="exampleInputTitleUZ">Text (UZ)</label>
                    <ckeditor :editor="editor" v-model="editorData_uz[content.contentOrder]" :config="editorConfig"></ckeditor>
                  </div>
                  <div class="col-md-12 mt-2">
                  <div  class=" error  float-right mr-2"  @click="deleteContent(content.id)"><i class="ti ti-trash" data-toggle="tooltip" title="Delete" data-v-6c86c240=""></i></div>
                    <div  class=" success float-right mr-3"  @click="editContent(content.id, content.contentOrder)"><i class="ti ti-pencil-alt" data-toggle="tooltip" title="Edit" ></i></div>
                    
                </div>
                </template>
                <template v-if="content.type=='tag'">
                  <div class="col-md-6">
                  <label for="exampleInputTagRu">Tag (РУ)</label>
                  
                  <textarea class="form-control" v-model="editorData_ru[content.contentOrder]"  rows="5"></textarea>
                 
                  </div>
                  <div class="col-md-6">
                    <label for="exampleInputTagUZ">Tag (UZ)</label>
                    <textarea class="form-control" v-model="editorData_uz[content.contentOrder]"  rows="5"></textarea>
                  </div>
                  <div class="col-md-12 mt-2">
                  <div  class=" error  float-right mr-2"  @click="deleteContent(content.id)"><i class="ti ti-trash" data-toggle="tooltip" title="Delete" data-v-6c86c240=""></i></div>
                    <div  class=" success float-right mr-3"  @click="editContent(content.id, content.contentOrder)"><i class="ti ti-pencil-alt" data-toggle="tooltip" title="Edit" ></i></div>
                    
                </div>
                </template>
                
                
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mt-3">
        <div class="card">
            <div class="card-body">
              <div class="card-title">Extra Material</div>
              <template v-if="resErrorExtra">

                <p class="error" v-for=" (value, name) in resErrorExtra">
                  {{ name }} : {{ value[0] }}
                </p>
                </template>
                <p class="error" v-if="resStringErrorExtra">
                {{ resStringErrorExtra }}
                </p>
                <p class="success" v-if="resSuccessExtra">
                {{ resSuccessExtra }}
                </p>
              <form class="forms-sample mb-3" @submit.prevent="submitExtraFileContent()">
                <div class="row">
                  <div class="col-md-5">
                  <label for="exampleInputTitleUZ">Files ( pdf,doc,docx,txt,png,jpeg,svg) </label>
                  <input type="file" class="form-control" accept="image/*,.doc, .docx, .txt, .pdf"  v-on:change="uploadFileExtraContent($event)" >
                </div>
                <div class="col-md-5">
                  <label for="exampleInputTitleUZ">File Name </label>
                  <input type="text" class="form-control" v-model="documentName" >
                </div>
                <div class="col-md-2">
                  <label for="exampleInputTitleUZ">Action </label>
                  <input type="submit" :disabled="disableClickExtra || (extraFile==null || documentName=='')" class="btn btn-primary"  >
                </div>
                </div>
              </form>
              <template v-if="meterials.length>0 ">
                <div class="row extraMaterials border-top" v-for="meterial in meterials" :key="meterial['id']">
                  <div class="col-md-10 my-auto"><a target="_blank" :href="url+'/files/lessonExtra/'+meterial['documentURL']">{{ meterial['documentName'] }}</a></div>
                  <div class="col-md-2"><div class="btn btn-danger" @click="deleteExtraMaterial(meterial['id'])">Delete</div></div>
                </div>
              </template>
             
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
      documentName:'',
      extraFile: null,
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
      courses: [],
      order:1,
      added: false,
      resError: false,
      resErrorExtra: false,
      checkEditorEror: false,
      checkEditorok: false,
      resSuccess: false,
      resSuccessExtra: false,
      resStringError: '',
      resStringErrorExtra: '',
      userInfo: null,
      monetized: 0,
      price: null,
      course_id: 2,
      editor: ClassicEditor,
      editorData_ru: [],
      editorData_uz: [],
      disableClick: [],
      disableClickExtra : false,
      addEditor: false,
      addTag: false,
      addImg: false,
      contents:[],
      meterials: [],
      content_order:1,
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
    async editContentImage(content_id,ordering){
          const inputs = {
            "id":content_id,
          }
          
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);

          var data = new FormData();
         

          if(this.banner_ru[ordering]){
            data.append('body_ru', this.banner_ru[ordering])
          }
          if(this.banner_uz[ordering]){
            data.append('body_uz', this.banner_uz[ordering])
          }
          for (const key in finalResult) {
            data.append(key, finalResult[key]);

          }
          try {
            let token = localStorage.getItem('token');
            
            const response = await fetch(this.url + 'api/v1/lessons/content/image/edit', {
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

                  this.disableClick[ordering] =false;
          
                if (typeof json.message == 'object') {
                  this.checkEditorEror = json.message;
                } else {
                 this.checkEditorEror = json.message;
                }
              } else {
                this.checkEditorEror = false;
                this.addEditor = false;
                this.addTag = false;
                this.addImg = false;
                this.getLesson();
                this.checkEditorok = 'Lesson Content Updated';
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
    },
    async editContent(content_id,ordering){
         
          const inputs = {
            "id":content_id,
            "body_ru":this.editorData_ru[ordering],
            "body_uz":this.editorData_uz[ordering],
          }
          
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);

          var data = new FormData();
          for (const key in finalResult) {
            data.append(key, finalResult[key]);

          }
          try {
            let token = localStorage.getItem('token');
            
            const response = await fetch(this.url + 'api/v1/lessons/content/edit', {
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

                  this.disableClick[ordering] =false;
          
                if (typeof json.message == 'object') {
                  this.checkEditorEror = json.message;
                } else {
                 this.checkEditorEror = json.message;
                }
              } else {
                this.checkEditorEror = false;
                this.addEditor = false;
                this.addTag = false;
                this.addImg = false;
                this.getLesson();
                this.checkEditorok = 'Lesson Content Updated';
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
    },
    async deleteExtraMaterial(id){
      const inputs = {
            "id":id,
          }
          
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);

          var data = new FormData();
          for (const key in finalResult) {
            data.append(key, finalResult[key]);

          }
          try {
            let token = localStorage.getItem('token');
            
            const response = await fetch(this.url + 'api/v1/lessons/extraMaterial/delete/'+id, {
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
              // this.resStringError = json.message;
            } else {
              if (json.error) {

                  // this.disableClick[ordering] =false;
          
                if (typeof json.message == 'object') {
                  // this.checkEditorEror = json.message;
                } else {
                //  this.checkEditorEror = json.message;
                }
              } else {
                 this.getLesson();
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
    },
    async deleteContent(content_id){
          const inputs = {
            "id":content_id,
          }
          
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);

          var data = new FormData();
          for (const key in finalResult) {
            data.append(key, finalResult[key]);

          }
          try {
            let token = localStorage.getItem('token');
            
            const response = await fetch(this.url + 'api/v1/lessons/content/delete', {
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

                  this.disableClick[ordering] =false;
          
                if (typeof json.message == 'object') {
                  this.checkEditorEror = json.message;
                } else {
                 this.checkEditorEror = json.message;
                }
              } else {
                this.checkEditorEror = false;
                this.addEditor = false;
                this.addTag = false;
                this.addImg = false;
                this.getLesson();
                this.checkEditorok = 'Lesson Content Deleted';
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
    },
    uploadFileImageRu(event, ordering) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.banner_ru[ordering] = files[0];
      this.banner_ru_prev[ordering] = URL.createObjectURL(files[0]);

    },
    uploadFileExtraContent(event){
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.extraFile = files[0];
    },
    uploadFileImageUz(event,ordering) {
      var filesUz = event.target.files || event.dataTransfer.files;
      if (!filesUz.length) {
        return;
      }
      this.banner_uz[ordering] = filesUz[0];
      this.banner_uz_prev[ordering] = URL.createObjectURL(filesUz[0]);

    },
    async submitExtraFileContent(){
      if(this.extraFile && this.documentName!=''){
        this.disableClickExtra = true;
          const inputs = {
            "documentName":this.documentName,
            'lesson_id': parseInt(this.$route.params.id)
          }
          
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);

          var data = new FormData();
          data.append('document', this.extraFile);
          for (const key in finalResult) {
            data.append(key, finalResult[key]);

          }
          try {
            this.resSuccessExtra = '';
            let token = localStorage.getItem('token');
            const response = await fetch(this.url + 'api/v1/lessons/extraMaterial/add', {
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
              this.resStringErrorExtra = json.message;
            } else {
              if (json.error) {

                  this.disableClickExtra =false;
          
                if (typeof json.message == 'object') {
                  this.resErrorExtra = json.message;
                } else {
                 this.resErrorExtra = json.message;
                }
              } else {
                this.resSuccessExtra = 'Success';
                this.documentName = '';
                this.extraFile = null;
                this.getLesson();
              }
            }
            this.disableClickExtra = false;

          } catch (error) {
            this.disableClickExtra = false;
            console.error('Ошибка:', error);
          }

        }else{
          this.resErrorExtra = 'File not uploaded or File name not given';
          this.disableClickExtra = false;
        }

     
    },
    async submitImage(event, ordering, type){
      if(this.banner_ru[ordering] && this.banner_uz[ordering]){
          this.disableClick[ordering] =true;
          this.checkEditorEror = false;
          const inputs = {
            "type":type,
            "contentOrder":ordering,
            'lesson_id': parseInt(this.$route.params.id)
          }
          
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);

          var data = new FormData()
          data.append('body_ru', this.banner_ru[ordering])
          data.append('body_uz', this.banner_uz[ordering])
          for (const key in finalResult) {
            data.append(key, finalResult[key]);

          }
          try {
            let token = localStorage.getItem('token');
            
            const response = await fetch(this.url + 'api/v1/lessons/content/image/add', {
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

                  this.disableClick[ordering] =false;
          
                if (typeof json.message == 'object') {
                  this.checkEditorEror = json.message;
                } else {
                 this.checkEditorEror = json.message;
                }
              } else {
                this.checkEditorEror = false;
                this.addEditor = false;
                this.addTag = false;
                this.addImg = false;
                this.getLesson();
                this.checkEditorok = 'Lesson Content Successfully Added';
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }

        }else{
          this.checkEditorEror = 'All fields must be filled'
        }

     
    },
    async submitContent(event, ordering, type){
       
       
        if(this.editorData_ru[ordering] && this.editorData_uz[ordering]){
          this.disableClick[ordering] =true;
          this.checkEditorEror = false;
          let  values = [ {
              "type":type,
              "body_ru":this.editorData_ru[ordering],
              "body_uz":this.editorData_uz[ordering],
              "contentOrder":ordering
              }];

          const inputs = {
            'contents': JSON.stringify(values),
            'lesson_id': parseInt(this.$route.params.id)
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
            
            const response = await fetch(this.url + 'api/v1/lessons/content/add', {
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

                  this.disableClick[ordering] =false;
          
                if (typeof json.message == 'object') {
                  this.checkEditorEror = json.message;
                } else {
                 this.checkEditorEror = json.message;
                }
              } else {
                this.checkEditorEror = false;
                this.addEditor = false;
                this.addTag = false;
                this.addImg = false;
                this.getLesson();
                this.checkEditorok = 'Lesson Content Successfully Added';
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }

        }else{
          this.checkEditorEror = 'All fields must be filled'
        }
        
        
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
    getLesson() {

      let newUrl = this.url + 'api/v1/lessons?self=' + this.$route.params.id;
     
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
            this.order= data.order;
            this.contents = data.contents;
            if(data.contents.length>0){
              this.contents.sort((a, b) => {
                  return b.contentOrder - a.contentOrder;
              });
              this.contents.forEach(content => {
                  if(content.type =='text' || content.type =='tag' || content.type =='Таг'){
                    this.editorData_ru[content.contentOrder]  = JSON.parse(content.body).ru;
                    this.editorData_uz[content.contentOrder]  = JSON.parse(content.body).uz;
                  }
                  if(content.type=='img'){
                    this.banner_ru_prev[content.contentOrder] =this.url+'files/lessons/'+ JSON.parse(content.body).ru;
                    this.banner_uz_prev[content.contentOrder] =this.url+'files/lessons/'+ JSON.parse(content.body).uz;
                  }
                  if(this.content_order<parseInt(content.contentOrder)){
                     this.content_order = parseInt(content.contentOrder);
                  }
              });
                this.content_order ++;
            }
           
            this.video_mobi_ru = data.videoLocId && data.videoLocId!=''? JSON.parse(data.videoLocId).ru : '';
            this.video_mobi_uz = data.videoLocId && data.videoLocId!=''?  JSON.parse(data.videoLocId).uz : '';
            this.course_id = data.course_id;
            this.title_ru = JSON.parse(data.lessonTitleName).ru;
            this.title_uz = JSON.parse(data.lessonTitleName).uz;
            this.video_ru = JSON.parse(data.video).ru;
            this.video_uz = JSON.parse(data.video).uz;
            this.video_ru_length = JSON.parse(data.videoLength).ru;
            this.video_uz_length = JSON.parse(data.videoLength).uz;
            this.meterials = data.materials;
          // this.courses = data.data
        });
    },
    async requestApi() {

      const inputs = {
        'lesson_id': this.$route.params.id,
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
        const response = await fetch(this.url + 'api/v1/lessons/edit', {
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
           
            this.resSuccess = 'Lesson Successfully Updated';
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
    this.getCourses(1);
    this.getLesson();

  },
}
</script>
<style lang="css" scoped>
.extraMaterials:hover{
  cursor: pointer;
  background-color: rgba(192, 192, 192, 0.14);
}
.extraMaterials a{
  width: 100%;
  display: inline-block;
  padding: 1rem 0;
}
.extraMaterials .btn{
  margin-top: 5px;
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