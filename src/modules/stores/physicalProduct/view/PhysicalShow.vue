<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Show Product</h4>

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
                  <select disabled v-model="storeChoose" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.storeChoose.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <option v-for="stor in store" :key="stor.id" v-bind:value="stor.id">
                      {{ stor.storeName }}</option>
                  </select>
                  <small class="error" v-for="(error, index) of v$.storeChoose.$errors" :key="index">{{ error.$message }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Name ru</label>
                  <input disabled type="text" class="form-control capilizie" placeholder="IPHONE 14 PRO MAX"
                    v-bind:class="{ 'border border-danger': v$.name_ru.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name_ru">
                  <small class="error" v-for="(error, index) of v$.name_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Name uz</label>
                  <input disabled type="text" class="form-control capilizie" placeholder="IPHONE 14 PRO MAX UZ"
                    v-bind:class="{ 'border border-danger': v$.name_uz.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name_uz">
                  <small class="error" v-for="(error, index) of v$.name_uz.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>


                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Description ru  </label>
                  <input disabled type="text" class="form-control" 
                    v-bind:class="{ 'border border-danger': v$.descriptionText_ru.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="descriptionText_ru">
                  <small class="error" v-for="(error, index) of v$.descriptionText_ru.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleRu">Description uz  </label>
                  <input disabled type="text" class="form-control" 
                    v-bind:class="{ 'border border-danger': v$.descriptionText_uz.$errors.length > 0 }" id="exampleInputTitleUz"
                    v-model="descriptionText_uz">
                 
                </div>


                <div class="col-md-12">
                  <label class="col-sm-4" for="banner">Image</label>
                  <img style="max-height: 250px;" :src="banner_ru_prev" v-if="banner_ru_prev" class="image_prev mt-4 mb-4" />
                  
                  
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Price $</label>
                  <input disabled type="number" class="form-control" placeholder="100"
                    v-bind:class="{ 'border border-danger': v$.price.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="price">
                  <small class="error" v-for="(error, index) of v$.price.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputTitleUZ">Amount</label>
                  <input disabled type="number" class="form-control" placeholder="10"
                    v-bind:class="{ 'border border-danger': v$.amount.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="amount">
                  <small class="error" v-for="(error, index) of v$.amount.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
              </div>

              
            

            </form>
          </div>
        </div>
      </div>
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Product Orders</h4>
            <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Order Count</th>
                      <th scope="col">Order Time</th>
                      <th scope="col">Code</th>
                    </tr>
                  </thead>
                  <tbody v-if="orders.length>0">
                    <tr v-for="order in orders" :key="order.id">
                      <td>{{order.productOrderCount}}</td>
                      <td>{{order.productOrderTime}}</td>
                      <td>{{order.productCode}}</td>
                    </tr>
                  </tbody>
                </table>
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
      orders:[],
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
    submitForm() {
      this.v$.$touch();
      if (this.v$.$error) return;
      this.requestApi();
    },
    requestGetStore(){
          
          let newUrl = this.url+'api/v1/store?page=1';
            
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
    requestGetOrders(){
          
          let newUrl = this.url+'api/v1/store/product/buyProduct/show?product_id='+this.$route.params.id;
            
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
                    if(data.length>0){
                      this.orders =data;
                    }
                    
                });
        },    
    getStore(){
      let newUrl = this.url+'api/v1/store/product?product_id='+this.$route.params.id;
         
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
                      this.name_ru = JSON.parse(data.productName).ru;
                      this.name_uz =JSON.parse(data.productName).uz;
                      this.descriptionText_ru = JSON.parse(data.productDescription).ru;
                      this.descriptionText_uz =JSON.parse(data.productDescription).uz;
                      this.price = data.productCost;
                      this.amount = data.productAmount;
                      this.banner_ru_prev = this.url+'files/store/'+data.productIMG;
                      this.storeChoose = data.store_id
                    }
                    
                });
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getStore();
    this.requestGetStore();
    this.requestGetOrders();
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