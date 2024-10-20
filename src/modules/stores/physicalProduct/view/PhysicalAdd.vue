<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Physical Store Product</h4>

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
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Name ru</label>
                  <input type="text" class="form-control capilizie" placeholder="IPHONE 14 PRO MAX"
                    v-bind:class="{ 'border border-danger': v$.name_ru.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name_ru">
                  <small class="error" v-for="(error, index) of v$.name_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Name uz</label>
                  <input type="text" class="form-control capilizie" placeholder="IPHONE 14 PRO MAX UZ"
                    v-bind:class="{ 'border border-danger': v$.name_uz.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name_uz">
                  <small class="error" v-for="(error, index) of v$.name_uz.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>


                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Description ru  </label>
                  <input type="text" class="form-control" 
                    v-bind:class="{ 'border border-danger': v$.descriptionText_ru.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="descriptionText_ru">
                  <small class="error" v-for="(error, index) of v$.descriptionText_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Description uz  </label>
                  <input type="text" class="form-control" 
                    v-bind:class="{ 'border border-danger': v$.descriptionText_uz.$errors.length > 0 }" id="exampleInputTitleUz"
                    v-model="descriptionText_uz">
                  <small class="error" v-for="(error, index) of v$.descriptionText_uz.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>


                <div class="col-md-12">
                  <label class="col-sm-4" for="banner">Image</label>
                  <img v-for="bann in banner_ru_prev" :src="bann" width="100"  class="image_prev" />
                  <input type="file" id="banner" v-on:change="uploadFilebannerRu($event)" multiple accept="image/*"
                    v-bind:class="{ 'border border-danger': v$.banner_ru.$errors.length > 0 }" class="form-control">
                  <small class="error" v-for="(error, index) of v$.banner_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Price $</label>
                  <input type="number" class="form-control" placeholder="100"
                    v-bind:class="{ 'border border-danger': v$.price.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="price">
                  <small class="error" v-for="(error, index) of v$.price.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Amount</label>
                  <input type="number" class="form-control" placeholder="10"
                    v-bind:class="{ 'border border-danger': v$.amount.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="amount">
                  <small class="error" v-for="(error, index) of v$.amount.$errors" :key="index">{{ error.$message
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
      banner_ru: [],
      price: 0,
      amount: 0,
      added: false,
      resError: false,
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
      descriptionText_ru: {
        required,
        minLengthValue: minLength(5),
      },
      descriptionText_uz: {
        required,
        minLengthValue: minLength(5),
      },
      banner_ru: {
        required: requiredIf(() => { return this.banner_ru.length == 0; }),
      },
      name_ru: {
        required,
        minLengthValue: minLength(3),
      },
      name_uz: {
        required,
        minLengthValue: minLength(3),
      },
      price: {
        required,
        integer
      },
      amount: {
        required,
        integer
      },
      storeChoose:{
        required
      }
    }
  },

  methods: {
    async requestApi() {
      this.added = true;
      const inputs = {
        'name_ru': this.name_ru.toUpperCase(),
        'name_uz': this.name_uz.toUpperCase(),
        'description_ru': this.descriptionText_ru,
        'description_uz': this.descriptionText_uz,
        'price': this.price,
        'amount': this.amount,
        'ordered': 0,
        'category_id':1,
        'store_id': this.storeChoose,
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      this.banner_ru.forEach(element => {
        data.append('img[]', element)
      });
      
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      // console.log(data);
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/store/physicalstore/products/add', {
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
            
            this.resSuccess = 'Store Successfully Added';
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
          
        let newUrl = this.url+'api/v1/getStoresByType?type=phyisical';
          
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
      }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.requestGetStore();
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