<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Inbox</h4>

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
                  <label class="col-sm-3 " for="banner">Send By</label>
                  <select v-model="sendby"  class="form-control"
                    v-bind:class="{ 'border border-danger': v$.sendby.$errors.length > 0 }">
                    <option value="inbox message to LMS">Inbox message to LMS</option>
                    <option value="Mobile notification">Mobile notification</option>
                    
                  </select>
                  <small class="error" v-for="(error, index) of v$.sendby.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6" v-if="sendby!='Mobile notification'">
                  <label class="col-sm-4" for="messageType">Message Type</label>
                  <select v-model="messageTypeIndex"  class="form-control">
                    
                    <option v-for="messageTp, index in messageType" :key="index" v-bind:value="index">
                      {{messageTp }}</option>
                  </select>
                    <template v-if="messageTypeIndex==messageType.length-1">
                        <label class="col-sm-4" for="banner">Message Icon</label>
                        <img :src="banner_ru_prev" v-if="banner_ru_prev" class="image_prev" />
                        <input type="file" id="banner" v-on:change="uploadFilebannerRu($event)" accept="image/*"
                          v-bind:class="{ 'border border-danger': v$.banner_ru.$errors.length > 0 }" class="form-control">
                        <small class="error" v-for="(error, index) of v$.banner_ru.$errors" :key="index">{{ error.$message
                        }}</small>
                    </template>
                 
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="exampleInputstartRu">Start Date</label>
                  <input type="datetime-local"  class="form-control"
                    v-bind:class="{ 'border border-danger': v$.startDate.$errors.length > 0 }" id="exampleInputstartRu"
                    v-model="startDate">
                  <small class="error" v-for="(error, index) of v$.startDate.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputendUZ">End Date </label>
                  <input type="datetime-local" class="form-control" v-bind:class="{ 'border border-danger': v$.endDate.$errors.length > 0 }" id="exampleInputendUZ" v-model="endDate">
                  <small class="error" v-for="(error, index) of v$.endDate.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6" v-if="!newspage && sendby!='Mobile notification'">
                  <label class="col-sm-12 " for="banner">PromoCode</label>
                  <select v-model="promocode_id"  class="form-control">
                    <option value="0">Please select one if need</option>
                    <option v-for="promocode in promocodes" :key="promocode.id" v-bind:value="promocode.id">
                      {{ promocode.promocode }}</option>
                  </select>
                </div>
                <div  :class="{ 'col-md-12' :newspage , 'col-md-6' :!newspage}">
                  <label class="col-sm-12 "  for="banner">Group</label>
                  <select v-model="phonebook_id"  class="form-control"
                    v-bind:class="{ 'border border-danger': v$.phonebook_id.$errors.length > 0 }">
                    <option disabled >Please select one</option>
                    <option v-for="group in phonebooks" :key="group.id" v-bind:value="group.id">
                      
                      {{group.groupName}}
                    </option>

                  </select>
                  <small class="error" v-for="(error, index) of v$.phonebook_id.$errors" :key="index">{{ error.$message
                  }}</small>
                
                </div>
              </div>
              <div class="form-group row" v-if="!promocode_id && sendby!='Mobile notification'">
                <div class="col-md-12">
                  <label for="exampleInputTitleRu">NewsPage Exp( https://pharmiq.uz/ )</label>
                  <input type="text" placeholder="https://pharmiq.uz/" class="form-control" id="exampleInputNewsPAgeRu"
                    v-model="newspage">
                 
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
import { required, minLength, maxLength, requiredIf, integer } from '@vuelidate/validators'
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
      newspage:'',
      banner_ru: [],
      banner_ru_prev: null,
      banner_uz: [],
      mobileNotificationIsActive : false,
      banner_uz_prev: null,
      title_ru: '',
      title_uz: '',
      body_ru: '',
      startDate: null,
      endDate: null,
      body_uz: '',
      categories: [],
      promocode_id: null,
      
      promocodes:[],
      messageType:[
          'Notification',
          'Event',
          'Gift',
          'Webinar',
          'Other'
      ],
      messageTypeIndex: 0,
      phonebook_id:null,
      phonebooks:[],
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      monetized: 0,
      price: 0,
      category_id: 1,
      sendby: 'inbox message to LMS'
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
     
      phonebook_id:{
        required,
      },
      startDate: {
        required,
      },
      endDate: {
        required,
      },
      sendby:{
        required,
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
        required: requiredIf(() => { return this.messageTypeIndex == this.messageType.length-1; }),
      },
      
    }
  },

  methods: {
    checkCategory(){
      this.hideGroups = false;
      if(this.category_id=='special'){
        this.getGroups();
        this.hideGroups = true;
      }
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
        'messageType' : this.messageType[this.messageTypeIndex],
        'titleName_ru': this.title_ru,
        'titleName_uz': this.title_uz,
        'descriptionText_ru': this.body_ru,
        'descriptionText_uz': this.body_uz,
        'sentBy': this.sendby,
        'newsPage': this.newspage,
        'promocode_id':this.promocode_id? this.promocode_id : '',
        'phonebook_id':this.phonebook_id,
        'startDate': this.startDate.replace('T',' ')+':00',
        'endDate': this.endDate.replace('T',' ')+':00',
      }
      
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      data.append('messageIcon', this.banner_ru)
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/inbox/add', {
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
            this.resSuccess = 'Inbox Successfully Added';
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
      console.log(this.monetized);
    },
    getPromocode() {

      let newUrl = this.url + 'api/v1/promocode?page=1';

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
          this.promocodes = data.data;
          // console.log(this.categories);
        });
    },
    getPhonebooks() {

    let newUrl = this.url + 'api/v1/groups?page=1';

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
        this.phonebooks = data.data;
       
      });
    }
  },
  
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getPromocode();
    this.getPhonebooks();
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