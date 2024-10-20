<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Teams to {{ companyName }}</h4>

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
              <div class="form-group row"></div>
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Team Name</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.title_ru.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="title_ru">
                  <small class="error" v-for="(error, index) of v$.title_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6 text-center">
                  <label for="exampleInputstartRu">Team Type</label><br>
                  <label class="language-switcher">
                    <input @change="getvalue" type="checkbox" v-model="monetized">
                    <span class="slider round"></span>
                    <span class="select-ru">Branch</span>
                    <span class="select-uz">Special</span>
                  </label>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-12 mt-4 " v-if="hideGroups">
                  <div id="map" style="min-width: 95%; height: 400px; overflow: hidden;" ></div>
                  <!-- <small class="error" v-for="(error, index) of v$.lat.$errors" :key="index">Select Address in Map</small> -->
                </div>
              </div>
               <div class="form-group row"  v-if="hideGroups">
                <div class="col-md-6">
                  <label class="col-sm-3 " for="banner">Cities</label>
                  <select v-model="city_id"  @change="onChangeCities($event)"   class="form-control"
                    v-bind:class="{ 'border border-danger': v$.city_id.$errors.length > 0 }">
                    <template v-for="city in cities.slice(0,14)" :key="city.id">
                      <option v-if="city"  v-bind:value="city.id">
                      {{ city.name_ru }}</option>
                    </template>
                    

                  </select>
                  <small class="error" v-for="(error, index) of v$.city_id.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label class="col-sm-3 " for="banner">Regions</label>
                  <select v-model="region_id"  class="form-control"
                    v-bind:class="{ 'border border-danger': v$.region_id.$errors.length > 0 }">
                    <template v-for="region in regions" :key="region.id">
                      <option  v-bind:value="region.id">
                      {{ region.name_ru }}</option>
                    </template>
                    

                  </select>
                  <small class="error" v-for="(error, index) of v$.region_id.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-12">
                  <label for="exampleInputLandMark">Street, house</label>
                    <input type="text" class="form-control" placeholder="Street, house"
                      v-bind:class="{ 'border border-danger': v$.storeLandmark_ru.$errors.length > 0 }" id="exampleInputLandMark"
                      v-model="storeLandmark_ru">
                    <small class="error" v-for="(error, index) of v$.storeLandmark_ru.$errors" :key="index">{{ error.$message
                    }}</small>
                </div>
               </div>
               
              
            <template v-if="companyId">
              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Create</button>
            </template>
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
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import { standartAttribute } from '@/globals/globalFunction.js';

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
      hideGroups:true,
      city_id: 14,
      region_id: 192,
      groups: [],
      companyName: '',
      companyId: 0,
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
      monetized: false,
      price: 0,
      category_id: 1,
      storeLandmark_ru : '',
      storeLandmark_uz : '',
      lat: null,
      long: null,
      cities: [],
      regions: [],
    }
  },
  computed: {
    isDisabled: function () {
      this.v$.$touch();
      if (this.v$.$error) return true;

    },
  },
  validations() {
    return {
      title_ru: {
        required,
        minLengthValue: minLength(5),
      },
      city_id: {
        required: requiredIf(() => { return this.hideGroups; }),
      },

      region_id: {
        required: requiredIf(() => { return this.hideGroups; }),
      },
      storeLandmark_ru:{
        required: requiredIf(() => { return this.hideGroups; }),
      },
    }
  },

  methods: {
    onChangeCities(event){
      this.getRegions(event.target.value);
     
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
                console.log(data);
                  this.storeLandmark_ru = '';
                  this.storeLandmark_uz = '';
                  if(data.city && data.region.id){
                    this.city_id = data.city.id;
                    this.getRegions(14, data.region.id);
                    
                  }

                  if(data.street || data.house){
                    if(data.street){
                      this.storeLandmark_ru+=data.street;
                    
                    }
                    if(data.house){
                      this.storeLandmark_ru+=' '+data.house;
                     
                    }
                  }else{
                    if(data.other){
                      this.storeLandmark_ru+=' '+data.other;
                     
                    }
                    if(data.area){
                      this.storeLandmark_ru+=' '+data.area;
                     
                    }
                    
                  }
              });
    },
    async requestApi() {


      const inputs = {
        'company_id': this.companyId,
        'teamName': this.title_ru,
        'teamType': this.monetized? 1 : 0,
      }
    
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      if(this.monetized==false){
        data.append('city_id', this.city_id);
        data.append('region_id', this.region_id);
        data.append('addressType', 1);
        data.append('addressline', this.storeLandmark_ru);
        if(this.lat && this.long){
          data.append('latitude', this.lat);
          data.append('longitude', this.long);
        }
       
      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/company/team/create', {
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
            this.resSuccess = 'Company Team Successfully Added';
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
    
    getvalue() {
      if(this.monetized){
        this.hideGroups = false;
      }else{
        this.hideGroups = true;
        this.showmap();
      }
      
    },
    getCompanyById() {
        
      let newUrl = this.url + 'api/v1/company/getCompanyId/'+this.$route.params.company_id;

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
         
          if(data!=null){
            this.companyId = data.id;
            this.companyName = data.companyName;
          }
        });
    },
    getCities(){
      let newUrl = this.url + 'api/v1/show/cities';
      let token = localStorage.getItem('token');
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
          this.cities = data;
        });
    },
    getRegions(city_id, reg_id){
      let newUrl = this.url + 'api/v1/show/regions/'+city_id;
      let token = localStorage.getItem('token');
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
          this.regions = data;
          if(reg_id){
            this.region_id = reg_id;
          }else{
            this.region_id =  data[0]!==undefined? data[0].id : null;
          }
          
        });
    },
    showmap(){
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
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
     
    if(this.$route.params.company_id==null || this.$route.params.company_id==''){
     
      
    }else{
     
      this.getCompanyById();
      this.getCities();
      this.getRegions(14);
      this.showmap();
     
    }
    
    
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
  width: 125px;
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
  width: 60px;
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
  -webkit-transform: translateX(66px);
  -ms-transform: translateX(66px);
  transform: translateX(66px);
}

/* Rounded sliders */
.language-switcher .slider.round {
  border-radius: 34px;
}

.language-switcher .slider.round:before {
  border-radius: 34px;
}
</style>