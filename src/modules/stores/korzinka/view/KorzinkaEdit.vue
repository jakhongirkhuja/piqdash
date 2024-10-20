<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edit Barcode</h4>

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
                  <label for="banner">Stores</label>
                  <select v-model="storeChoose" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.storeChoose.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <template v-for="stor in store" :key="stor.id" v-bind:value="stor.id">
                      <option  :value="stor.id"> {{ stor.name }}</option>
                    </template>
                    
                  </select>
                  <small class="error" v-for="(error, index) of v$.storeChoose.$errors" :key="index">{{ error.$message }}</small>
                </div>
               
               
                <div class="col-md-6" v-if="importType==0">
                  <label for="barcode">Barcode </label>
                  <input type="text" class="form-control" placeholder="Barcode"
                    v-bind:class="{ 'border border-danger': v$.barcode.$errors.length > 0 }" id="barcode"
                    v-model="barcode">
                  <small class="error" v-for="(error, index) of v$.barcode.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6" v-if="importType==0">
                  <label for="facevalue">FaceValue</label>
                  <input type="number" class="form-control" placeholder="0"
                    v-bind:class="{ 'border border-danger': v$.facevalue.$errors.length > 0 }" id="facevalue"
                    v-model="facevalue">
                  <small class="error" v-for="(error, index) of v$.facevalue.$errors" :key="index">{{ error.$message
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
      name_ru: '',
      name_uz: '',
      banner_ru: null,
      price: 0,
      amount: 0,
      added: false,
      facevalue:null,
      barcode:null,
      resError: false,
      importType:0,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      descriptionText_ru:'',
      descriptionText_uz:'',
      storeChoose:null,
      store:[],
      banner_ru_prev:[]
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
     
     
      barcode: {
        
        required: requiredIf(() => { return this.importType == 0; }),
      },
      facevalue: {
        required: requiredIf(() => { return this.importType == 0; }),
        
      },
      storeChoose:{
        required
      },
     
    }
  },

  methods: {
    async requestApi() {
      this.added = true;
      const inputs = {
       
        'barcode': this.barcode,
        'facevalue': this.facevalue,
        'store_id': this.storeChoose,
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
     
     
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      // console.log(data);
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/store/korzinkabarcode/edit/'+this.$route.params.id, {
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
            this.disabled = false;
          } else {
            this.added = false;
            this.disabled = false;
            this.resSuccess = 'Barcode Successfully Updated';
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

    },
    uploadFilebannerRu(event) {
      var files = event.target.files || event.dataTransfer.files;
      // console.log(files.length);
      if (files.length==0) {
        this.banner_ru = [];
        this.banner_ru_prev = [];
        return;
        
        
      }
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        this.banner_ru.push(element);
        this.banner_ru_prev.push(URL.createObjectURL(element));

        // console.log(element);
      }
      // files.forEach(file => {
      //   this.banner_ru = file;
      //   this.banner_ru_prev = URL.createObjectURL(files[0]);
      // });
      // console.log(this.banner_ru);

    },
    submitForm() {
      this.v$.$touch();
      if (this.v$.$error) return;
      this.requestApi();
    },
    requestGetStore(){
          
        let newUrl = this.url+'api/v1/store/getStoresByType?type=digital';
          
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
                  this.store = data.data
              });
      },
      requestGetKorzinka(){
          
          let newUrl = this.url+'api/v1/store/korzinkabarcode?category_id='+this.$route.params.id;
            
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
                  if(data){
                      this.storeChoose = data.store_id;
                      this.barcode =data.barcode;
                      this.facevalue = data.facevalue;
                    }
                });
        }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.requestGetStore();
    this.requestGetKorzinka();
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