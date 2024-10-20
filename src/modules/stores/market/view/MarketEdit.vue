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
                  <label for="banner">Store Owner</label>
                  <select v-model="storeOwnerID" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.storeOwnerID.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <option v-for="storeOwner in storeOwners" :key="storeOwner.id" v-bind:value="storeOwner.phonebook?.user_id">
                      {{ storeOwner.firstName+' '+storeOwner.lastName }}</option>
                  </select>
                  <small class="error" v-for="(error, index) of v$.storeOwnerID.$errors" :key="index">{{ error.$message }}</small>
                </div>
                <div class="col-md-12">
                  <label for="exampleInputNameRu">Name</label>
                  <input type="text" class="form-control" placeholder="Store Name"
                    v-bind:class="{ 'border border-danger': v$.name.$errors.length > 0 }" id="exampleInputNameRu"
                    v-model="name">
                  <small class="error" v-for="(error, index) of v$.name.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                


                <div class="col-md-6">
                  <label for="exampleInputDescriptionRu">Description Ru</label>
                  <textarea rows="10" type="text" class="form-control" 
                    v-bind:class="{ 'border border-danger': v$.descriptionText_ru.$errors.length > 0 }" id="exampleInputDescriptionRu"
                    v-model="descriptionText_ru"></textarea>
                  <small class="error" v-for="(error, index) of v$.descriptionText_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputDescriptionUz">Description Uz</label>
                  <textarea rows="10" type="text" class="form-control" 
                    v-bind:class="{ 'border border-danger': v$.descriptionText_uz.$errors.length > 0 }" id="exampleInputDescriptionUz"
                    v-model="descriptionText_uz"></textarea>
                  <small class="error" v-for="(error, index) of v$.descriptionText_uz.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-12 mt-4 ">
                  <div id="map" style="min-width: 95%; height: 400px; overflow: hidden;"  v-bind:class="{ 'border border-danger': v$.lat.$errors.length > 0 }"></div>
                 
                  <small class="error" v-for="(error, index) of v$.lat.$errors" :key="index">Select Address in Map</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputLandMark">Street, house Ru</label>
                    <input type="text" class="form-control" placeholder="Street, house"
                      v-bind:class="{ 'border border-danger': v$.storeLandmark_ru.$errors.length > 0 }" id="exampleInputLandMark"
                      v-model="storeLandmark_ru">
                    <small class="error" v-for="(error, index) of v$.storeLandmark_ru.$errors" :key="index">{{ error.$message
                    }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputLandMarkUz">Street, house Uz</label>
                    <input type="text" class="form-control" placeholder="Street, house"
                      v-bind:class="{ 'border border-danger': v$.storeLandmark_uz.$errors.length > 0 }" id="exampleInputLandMarkUz"
                      v-model="storeLandmark_uz">
                    <small class="error" v-for="(error, index) of v$.storeLandmark_uz.$errors" :key="index">{{ error.$message
                    }}</small>
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
      descriptionText_ru:'',
      descriptionText_uz:'',
      categoryID:null,
      categories:[],
      storeOwners:[],
      storeOwnerID:null,
      storeLandmark_ru : '',
      storeLandmark_uz : '',
      lat: null,
      long: null,
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
      descriptionText_ru: {
        required,
        minLengthValue: minLength(5),
      },
      descriptionText_uz: {
        required,
        minLengthValue: minLength(5),
      },
      lat:{
        required,
      },
      long:{
        required
      },
      storeOwnerID:{
        required
      },
      name: {
        required,
        minLengthValue: minLength(3),
      },
      storeLandmark_ru:{
        required,
      },
      storeLandmark_uz:{
        required,
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
        'storeLatitude': this.lat,
        'storeLongitude': this.long,
        'storeLandmark_ru': this.storeLandmark_ru,
        'storeLandmark_uz': this.storeLandmark_uz,
        'storeDescription_ru': this.descriptionText_ru,
        'storeDescription_uz': this.descriptionText_uz,
        'storeName': this.name,
        'category_id':this.categoryID,
        'storeOwner': this.storeOwnerID
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      data.append('productIMG', this.banner_ru)
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/store/edit/'+this.$route.params.id, {
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
          
          let newUrl = this.url+'api/v1/store?store_id='+this.$route.params.id;
            
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
                    this.name = data.storeName;
                    this.lat = data.storeLatitude;
                    this.long= data.storeLongitude;
                    this.storeOwnerID = data.storeOwner;
                    this.categoryID = data.category_id;
                    this.descriptionText_ru = JSON.parse(data.storeDescription)?.ru;
                    this.descriptionText_uz = JSON.parse(data.storeDescription)?.uz;
                    this.storeLandmark_ru = JSON.parse(data.storeLandmark)?.ru;
                    this.storeLandmark_uz = JSON.parse(data.storeLandmark)?.uz;
                    
                  }
                    // this.storeOwners = data.data
                });
        }    
  },
  created() {
   
    this.requestGetcategories();
    this.requestGetStoreOwners();
    ymaps.ready(e => {
          var map = new ymaps.Map('map', {
              center: [41.311081, 69.240562],
              zoom: 11
          }, {
              searchControlProvider: 'yandex#search'
          });
         
            console.log(this.lat);
            map.events.add('click', (e) =>{
                if (!map.balloon.isOpen()) {
                 
                    var coords = e.get('coords');
                    
                    // this.lat = coords[0];
                    map.balloon.open(coords, {
                        // contentHeader:'Event!',
                        contentBody: '<p>Coordinates: ' + [
                            coords[0].toPrecision(6),
                            coords[1].toPrecision(6)
                            ].join(', ') + '</p>',
                        contentFooter:'<sup>Click again</sup>'
                    });
                 
                      this.getAddressByCoor(coords[0], coords[1]);
                   
                    
                }
                else {
                    map.balloon.close();
                }
            });

      });

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