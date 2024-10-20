<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Course</h4>

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
                  <label class="col-sm-3 " for="banner">Category</label>
                  <select v-model="category_id" @change="checkCategory" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.category_id.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <option value="special">Special</option>
                    <option v-for="category in categories" :key="category.id" v-bind:value="category.id">
                      {{ JSON.parse(category.categoryName).ru }} - {{ !category.access? 'Public' : 'Private'}}</option>

                  </select>
                  <small class="error" v-for="(error, index) of v$.category_id.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-12" v-if="hideGroups">
                  <label class="col-sm-3 " for="banner">Group</label>
                  <select v-model="group_id"  class="form-control"
                    v-bind:class="{ 'border border-danger': v$.group_id.$errors.length > 0 }">
                   
                    <option v-for="group in groups" :key="group.id" v-bind:value="group.id">
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
                    v-bind:class="{ 'border border-danger': v$.banner_ru.$errors.length > 0 }" class="form-control">
                  <small class="error" v-for="(error, index) of v$.banner_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label class="col-sm-3 col-form-label" for="banner">banner (UZ)</label>
                  <img :src="banner_uz_prev" v-if="banner_uz_prev" class="image_prev" />
                  <input type="file" id="banner" v-on:change="uploadFilebannerUz($event)" accept="image/*"
                    v-bind:class="{ 'border border-danger': v$.banner_uz.$errors.length > 0 }" class="form-control">
                  <small class="error" v-for="(error, index) of v$.banner_uz.$errors" :key="index">{{ error.$message
                  }}</small>
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
                <div class="col-md-2">
                  <label for="exampleInputstartRu">Course Monetized</label><br>
                  <label class="language-switcher">
                    <input @change="getvalue" type="checkbox" v-model="monetized">
                    <span class="slider round"></span>
                    <span class="select-ru">No</span>
                    <span class="select-uz">Yes</span>
                  </label>
                </div>
                <div class="col-md-4">
                  <label for="exampleInputendUZ">Course Price </label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.price.$errors.length > 0 }" id="exampleInputendUZ"
                    v-model="price">
                  <small class="error" v-for="(error, index) of v$.price.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-2">
                  <label for="exampleInputstartRu">Course Pin</label><br>
                  <label class="language-switcher">
                    <input @change="getvaluePin" type="checkbox" v-model="pin">
                    <span class="slider round"></span>
                    <span class="select-ru">No</span>
                    <span class="select-uz">Yes</span>
                  </label>
                </div>
                <div class="col-md-4">
                  <label for="exampleInpOutendUZ">Course Order ( 0 = adding to last item ) </label>
                  <input type="number" class="form-control"  id="exampleInpOutendUZ" v-bind:class="{ 'border border-danger': v$.order.$errors.length > 0 }"  v-model="order">
                  <small class="error" v-for="(error, index) of v$.order.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Create</button>

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
import { required, minLength, maxLength, requiredIf, integer, maxValue, minValue} from '@vuelidate/validators'
import { ref } from 'vue';
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
      hideGroups:false,
      group_id: null,
      groups: [],
      banner_ru: [],
      banner_ru_prev: null,
      banner_uz: [],
      banner_uz_prev: null,
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
    
      price: 0,
      category_id: 1,
      pin: 0,
      order: 0,
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
      order:{
        required: requiredIf(() => { return this.pin==true; }),
        maxValue: maxValue(10),
        minValue: minValue(0),
      },
      title_ru: {
        required,
        minLengthValue: minLength(3),
       
      },
      title_uz: {
        required,
        minLengthValue: minLength(3),
       
      },
      body_ru: {
        required,
        minLengthValue: minLength(10),
      },
      body_uz: {
        required,
        minLengthValue: minLength(10),
      },
      banner_ru: {
        required: requiredIf(() => { return this.banner_ru.length == 0; }),
      },
      price: {
        required: requiredIf(() => { return this.monetized == 1; }),
        integer,
      },
      group_id: {
        required: requiredIf(() => { return this.category_id == 'special'; }),
      },
      banner_uz: {
        required: requiredIf(() => { return this.banner_uz.length == 0; }),
      },
    }
  },

  methods: {
    checkCategory(event){
      this.hideGroups = false;
      let findCategory = this.categories.find(item => item.id == event.target.value);
      if((findCategory && findCategory.access==true ) || this.category_id=='special'){
        this.getGroups();
        this.hideGroups = true;
      }
    },
    getGroups(){
          
      let newUrl = this.url+'api/v1/groups?page=1&show=all';
      
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
                if(this.groups.length>0){
                  this.group_id = this.groups[0].id;
                }
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
    async requestApi() {


      const inputs = {
        'courseTitleName_ru': this.title_ru,
        'courseTitleName_uz': this.title_uz,
        'courseInfo_ru': this.body_ru,
        'courseInfo_uz': this.body_uz,
        'courseMonetized': this.monetized? 1 : 0,
        'coursePrice': this.price,
        'category_id':this.category_id,
        'startDate':this.startDate,
        'endDate':this.endDate,
        'pin':this.pin,
        'order':this.order,
      }
      
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      data.append('courseBanner_ru', this.banner_ru)
      data.append('courseBanner_uz', this.banner_uz)
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      if(this.group_id){
        data.append('courseForGroup', this.group_id);
      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/course/submit/add', {
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
            // this.added = true;
            this.resSuccess = 'Course Successfully Added';
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
    checkvalue(){
      console.log(this.startDate);
    },
    getvalue() {
      console.log(this.pin);
    },
    getvaluePin() {
      console.log(this.pin);
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
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getCategories();
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