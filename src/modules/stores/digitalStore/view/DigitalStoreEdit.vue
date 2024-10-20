<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Update Store</h4>

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
                  <label for="banner">Category</label>
                  <select v-model="categoryID" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.categoryID.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <option v-for="category in categories" :key="category.id" v-bind:value="category.id">
                      {{ JSON.parse(category.name).ru }}</option>
                  </select>
                  <small class="error" v-for="(error, index) of v$.categoryID.$errors" :key="index">{{ error.$message }}</small>
                </div>
                
                <div class="col-md-6">
                  <label for="exampleInputNameRu">Name</label>
                  <input type="text" class="form-control" placeholder="Store Name"
                    v-bind:class="{ 'border border-danger': v$.name.$errors.length > 0 }" id="exampleInputNameRu"
                    v-model="name">
                  <small class="error" v-for="(error, index) of v$.name.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-12">
                  <label class="col-sm-4" for="banner">Logo</label>
                  <img :src="banner_ru_prev" width="400"  class="image_prev" />
                  <input type="file" id="banner" v-on:change="uploadFilebannerRu($event)"  accept="image/*"
                        class="form-control">
                  
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
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, requiredIf, integer } from '@vuelidate/validators'
import { ref } from 'vue';
import { maska } from 'maska'
import { standartAttribute } from '@/globals/globalFunction.js';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  directives: { maska },
  components: {
    GoBackButton,
    Datepicker,
    yandexMap, ymapMarker,
  },
  data() {
    return {
      url: import.meta.env.VITE_APP_REST_ENDPOINT,
      name: '',
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      categoryID:null,
      categories:[],
      banner_ru_prev:null,
      banner_ru: null,
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
        minLengthValue: minLength(3),
      },
      categoryID:{
        required
      }
    }
  },

  methods: {
    async requestApi() {
      this.added = true;
      const inputs = {
        'name': this.name,
        'category_id':this.categoryID,
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      if(this.banner_ru){
       
          data.append('logo', this.banner_ru)
        
      }
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/store/digitalstore/edit/'+this.$route.params.id, {
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
          this.added = false;
        } else {
          if (json.error) {
            if (typeof json.message == 'object') {
              this.resError = json.message;
            } else {
              this.resStringError = json.message;
            }
            this.added = false;
          } else {
            
            this.resSuccess = 'Store Successfully Updated';
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

    },
    uploadFilebannerRu(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        this.banner_ru = [];
        this.banner_ru_prev = '';
        return;
      }
      this.banner_ru = files[0];
      this.banner_ru_prev = URL.createObjectURL(files[0]);

    },
    getAddressByCoor(lat,long){
          this.lat = lat;
          this.long = long;
          let newUrl = this.url+'api/v1/getAdressByCoor?lat='+lat+'&long='+long;
          
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
                  localcategoryage.removeItem('token');
                  localcategoryage.removeItem('user');
                  window.location.href='https://go.pharmiq.uz/';
                }
                  return response.json();
              })
              .then((data) => {
                this.storeLandmark_ru = ''
                  this.storeLandmark_uz = ''
                  if(data.street || data.house){
                    if(data.street){
                      this.storeLandmark_ru+=data.street;
                      this.storeLandmark_uz+=data.street;
                    }
                    if(data.house){
                      this.storeLandmark_ru+=' '+data.house;
                      this.storeLandmark_uz+=' '+data.house;
                    }
                  }else{
                    if(data.other){
                      this.storeLandmark_ru+=' '+data.other;
                      this.storeLandmark_uz+=' '+data.other;
                    }
                    if(data.area){
                      this.storeLandmark_ru+=' '+data.area;
                      this.storeLandmark_uz+=' '+data.area;
                    }
                    
                  }
                  

                  
              });
    },
    submitForm() {
      this.v$.$touch();
      if (this.v$.$error) return;
      this.requestApi();
    },
    requestGetcategories(){
          
        let newUrl = this.url+'api/v1/store/category?page=1';
          
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
                  localcategoryage.removeItem('token');
                  localcategoryage.removeItem('user');
                  window.location.href='https://go.pharmiq.uz/';
                }
                  return response.json();
              })
              .then((data) => {
                  this.categories = data.data
              });
      },
      requestGetStoreOwners(){
          
          let newUrl = this.url+'api/v1/store/storeOwner';
            
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
                    localcategoryage.removeItem('token');
                    localcategoryage.removeItem('user');
                    window.location.href='https://go.pharmiq.uz/';
                  }
                    return response.json();
                })
                .then((data) => {
                    this.storeOwners = data.data
                });
        },
        async getStoreAbout(){
          
          let newUrl = this.url+'api/v1/store/digitalstore?store_id='+this.$route.params.id;
            
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
                    localcategoryage.removeItem('token');
                    localcategoryage.removeItem('user');
                    window.location.href='https://go.pharmiq.uz/';
                  }
                    return response.json();
                })
                .then((data) => {
                  
                  if(data){
                    this.name = data.name;
                    this.categoryID = data.category_id;
                    
                    this.banner_ru_prev = this.url+'files/digitalStores/'+data.logo;
                  }
                    // this.storeOwners = data.data
                });
        }    
  },
  created() {
   
    this.requestGetcategories();
    

    this.getStoreAbout();  
  },
}
</script>
<style lang="css" scoped>

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
  .capilizie{
    text-transform: uppercase;
  }
</style>