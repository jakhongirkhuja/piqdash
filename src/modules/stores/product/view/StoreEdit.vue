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
                <div class="col-md-12">
                  <label for="banner">Stores</label>
                  <select v-model="storeChoose" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.storeChoose.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <option v-for="stor in store" :key="stor.id" v-bind:value="stor.id">
                      {{ stor.storeName }}</option>
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


                <div class="col-md-12 ">
                  <label class="col-sm-4" for="banner">Image</label>
                  <div class="banner">
                    <template v-if="typeof banner_ru_prev === 'string' ">
                    <div><img   :src="banner_ru_prev" v-if="banner_ru_prev" class="image_prev" /></div>
                  </template>
                  <template v-else>
                    <template v-for="bann, index  in banner_ru_prev" >
                      <div  v-bind:id="'s-'+index">
                        <img style="max-height: 250px;" :src="bann" width="100"  class="image_prev" /><span v-if="banner_ru_prev.length>1" @click="removeImage(index,bann)">remove</span>
                      </div>
                    </template>
                   
                  </template>
                </div>
                  <input multiple type="file" id="banner" v-on:change="uploadFilebannerRu($event)" accept="image/*"
                     class="form-control">
                  
                </div>
                <div class="col-md-12">
                  <div class="row mt-3">
                  <div class="col-md-4">
                    <label for="exampleInputTitleUZ">Price $</label>
                    <input type="number" class="form-control" placeholder="100"
                      v-bind:class="{ 'border border-danger': v$.price.$errors.length > 0 }" id="exampleInputTitleUZ"
                      v-model="price">
                    <small class="error" v-for="(error, index) of v$.price.$errors" :key="index">{{ error.$message
                    }}</small>
                  </div>
                  <div class="col-md-4">
                    <label for="exampleInputTitleUZ">IQC</label>
                    <input type="number" class="form-control" placeholder="100"
                      v-bind:class="{ 'border border-danger': v$.price.$errors.length > 0 }" id="exampleInputTitleUZ"
                      v-model="priceIQC">
                    <small class="error" v-for="(error, index) of v$.price.$errors" :key="index">{{ error.$message
                    }}</small>
                  </div>
                  <div class="col-md-4">
                    <label for="exampleInputTitleUZ">Amount</label>
                    <input type="number" class="form-control" placeholder="10"
                      v-bind:class="{ 'border border-danger': v$.amount.$errors.length > 0 }" id="exampleInputTitleUZ"
                      v-model="amount">
                    <small class="error" v-for="(error, index) of v$.amount.$errors" :key="index">{{ error.$message
                    }}</small>
                  </div>

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
      priceIQC: 0,
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
      priceIQC: {
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
    async removeImage(index,image){
      let imageName = image.split('/').slice(-1)[0];
      if(imageName){
        var result = confirm("Want to delete Image?");
        if (result) {
          const inputs = {
            'imageName': imageName,
            
          }
          const todo = standartAttribute();
          const finalResult = Object.assign(inputs, todo);

          var data = new FormData()
          
          for (const key in finalResult) {
            data.append(key, finalResult[key]);

          }
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url + 'api/v1/store/product/deleteImage/'+this.$route.params.id, {
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
                document.querySelector('#s-'+index).remove();
                this.resSuccess = 'Image Successfully Deleted';
              }
            }


          } catch (error) {
            console.error('Ошибка:', error);
          }
        }
      }
    },
    async requestApi() {
      this.added = true;
      const inputs = {
        'productName_ru': this.name_ru.toUpperCase(),
        'productName_uz': this.name_uz.toUpperCase(),
        'productDescription_ru': this.descriptionText_ru,
        'productDescription_uz': this.descriptionText_uz,
        'productCost': this.price,
        'productAmount': this.amount,
        'category_id':1,
        'store_id': this.storeChoose,
        'iqc': this.priceIQC,
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      if(this.banner_ru.length!=0){
        this.banner_ru.forEach(element => {
          data.append('productIMG[]', element)
        });
      }
      
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/store/product/edit/'+this.$route.params.id, {
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
                      this.priceIQC  = data.iqc;
                        try {
                          
                          JSON.parse(`${data.productIMG}`).forEach(element => {
                          this.banner_ru_prev.push(this.url+'files/store/'+element)
                          // console.log( JSON.parse(`${data.productIMG}`).isArray);
                        });
                        } catch (error) {
                        //  console.log(error);
                          this.banner_ru_prev =  this.url+'files/store/'+data.productIMG;
                        }
                          
                      
                        
                     
                      
                      
                      this.storeChoose = data.store_id
                    }
                    
                });
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getStore();
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
.banner{
  display: flex;
}
.banner div{
  position: relative;
}
.banner div span{
  display: none;
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255,255,255,0.7);
  font-weight: bold;
  cursor: pointer;
  border: 1px solid grey;
}
.banner div:hover span{
  display: flex;
}
.banner img{
  position: relative;
}
</style>