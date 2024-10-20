<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Update Message </h4>

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
                  <label for="exampleInputbodyUZ">Body</label>
                  <textarea rows="10" type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.body_uz.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="body_uz"></textarea>
                  <small class="error" v-for="(error, index) of v$.body_uz.$errors" :key="index">{{ error.$message
                  }}</small>
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
                  <label class="col-sm-12 " for="banner">Group</label>
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
              
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="">Url</label>
                  <div class="input-group">
                    <div class="resError" v-if="resGenerateErrorGenerate">{{resGenerateErrorGenerate}}</div>
                    <input type="text" class="form-control" v-model="long_url">
                    <div class="btn btn-primary ml-4" @click="generateLinkClick">{{generateLinkClickName}}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="">Generated link</label> <span v-if="generateLinkCopy" style="    display: inline-block;  background-color: #9a9797; padding: 2px 10px; border-radius: 6px; color: white;">
                    {{generateLinkCopy}}</span> 
                    <div class="resError" v-if="resGenerateError">{{resGenerateError}}</div>
                  <div class="input-group mb-3">
                    
                    <div class="input-group-prepend">
                      <span class="input-group-text" style="color:initial" id="basic-addon3">https://bit.ly/</span>
                    </div>
                    
                    <input type="text" v-model="generateLink"  @input="getvalues" class="form-control" id="basic-url" aria-describedby="basic-addon3">
                    <div class="btn btn-primary ml-4" :disabled="!generateLink" @click="updateLinkClick">Update</div>
                    
                  </div>
                 
                </div>
              </div>
              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Update</button>

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
      generateLink: null,
      newspage:'',
      banner_ru: [],
      banner_ru_prev: null,
      banner_uz: [],
      banner_uz_prev: null,
      title_ru: '',
      title_uz: '',
      resGenerateError: null,
      body_ru: '',
      startDate: null,
      endDate: null,
      body_uz: '',
      categories: [],
      generateLinkCopy:null,
      promocode_id: null,
      promocodes:[],
      phonebook_id:null,
      phonebooks:[],
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      monetized: 0,
      resGenerateErrorGenerate:null,
      generateLinkClickName : 'Generate',
      price: 0,
      bitlink_id:null,
      category_id: 1,
      sendby: 'SMS to phone Number',
      long_url:'https://go.pharmiq.uz/login',
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
      
      body_uz: {
        required,
        minLengthValue: minLength(10),
      },
     
      
    }
  },

  methods: {
    getvalues(){
      this.generateLinkCopy = 'https://bit.ly/'+this.generateLink;
    },
    async updateLinkClick(){
     

        const inputs = {
          'custom_bitlink': 'bit.ly/'+this.generateLink,
          'bitlink_id' : this.bitlink_id,
        }



        try {
          
          const response = await fetch('https://api-ssl.bitly.com/v4/custom_bitlinks', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer c901f75cdbf7109305be80438d5cfc005d12925b',
            },

          });

          const json = await response.json();
          const status = response.status;

          if (status == 200 || status == 201) {
            this.generateLinkCopy = 'https://'+json.custom_bitlink;
            this.generateLink = json.custom_bitlink.split('/').at(-1);
          } else {
            this.resGenerateErrorGenerate = json.description;
          }


        } catch (error) {
          this.resGenerateErrorGenerate = error;
        }
        
    },
    async generateLinkClick(){
      
      var urlRE= new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
      if(this.long_url.match(urlRE)){

        const inputs = {
          'long_url': this.long_url,
        }
        
       
       
        try {
          
          const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer c901f75cdbf7109305be80438d5cfc005d12925b',
            },
  
          });
  
          const json = await response.json();
          const status = response.status;
  
          if (status == 200 || status == 201) {
            this.generateLinkCopy = json.link;
            this.bitlink_id = json.id;
            this.generateLink = json.link.split('/').at(-1);
          } else {
            this.resGenerateErrorGenerate = json.description;
          }
  
  
        } catch (error) {
          this.resGenerateErrorGenerate = error;
        }
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
        'titleName_ru': 'sending sms ru',
        'titleName_uz': 'sending sms uz',
        'descriptionText_ru': 'sending boy ru',
        'descriptionText_uz': this.body_uz,
        'sentBy': this.sendby,
        'newsPage': this.newspage,
        'promocode_id':'',
        'phonebook_id':this.phonebook_id,
        'startDate': this.startDate.replace('T',' ')+':00',
        'endDate': '2070-12-01 17:05:00',
      }
      
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
     
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/inbox/edit/'+this.$route.params.id, {
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
            this.resSuccess = 'Sms Successfully Updated';
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
    getInbox() {

        let newUrl = this.url + 'api/v1/inbox?inbox_id='+this.$route.params.id;

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
            // this.phonebooks = data.data;
            if(data){
              this.title_ru = JSON.parse(data.titleName).ru;
              this.title_uz = JSON.parse(data.titleName).uz;
              this.body_ru = JSON.parse(data.descriptionText).ru;
              this.body_uz = JSON.parse(data.descriptionText).uz;
              this.sendby = data.sentBy;
              this.promocode_id = data.promocode_id;
              this.newsPage = data.newsPage;
              this.phonebook_id = data.phonebook_id;
              this.startDate = data.startDate.replace(' ','T').slice(0, -3);
              this.endDate = data.endDate.replace(' ','T').slice(0, -3);
              this.banner_ru_prev =  this.url + 'files/inboxMessage/'+data.messageIcon;
            }

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
    this.getInbox();
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
.resError{
  color: red;
}
</style>