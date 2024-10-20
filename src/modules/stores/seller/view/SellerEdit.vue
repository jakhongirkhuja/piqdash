<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Update Seller</h4>

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
                  <label for="exampleInputTitleRu">Name</label>
                  <input type="text" class="form-control" placeholder="Seller name"
                    v-bind:class="{ 'border border-danger': v$.name.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name">
                  <small class="error" v-for="(error, index) of v$.name.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                          <label for="phonebook">Phone Number</label>
                          <input type="text" placeholder="+998 ( 99 ) 999-99-99" v-maska="['+998 ( ## ) ###-##-##', '+998 ( ## ) ###-##-##']" class="form-control" v-model="phoneNumber" v-bind:class="{'border border-danger' : v$.phoneNumber.$errors.length>0 }" >
                          <small class="error" v-for="(error, index) of v$.phoneNumber.$errors" :key="index"  >{{ error.$message }}</small>  
                  </div>
                


                  <div class="form-group row">
                         <div class="col-md-12">
                             <label class="col-sm-3 col-form-label">Role</label>
                             <small class="error" v-for="(error, index) of v$.role.$errors" :key="index"  >{{ error.$message }}</small> 
                         </div>
                          <div class="col-sm-4 ml-3">
                            <input type="radio" id="gender1" name="radio-gender" checked  v-bind:value="0" v-model="role">
                            <label for="gender1">Seller</label>
                          </div>
                          <div class="col-sm-5">
                            <input type="radio" id="gender2" name="radio-gender" v-bind:value="1" v-model="role">
                            <label for="gender2">Store Owner</label>
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
      name: '',
      
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      storeChoose:null,
      phoneNumber: '',
      store:[],
      role: 0,
      storeSellerListId:null,
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
     
     
      role: { 
            required,
            },
      name: {
        required,
        minLengthValue: minLength(3),
      },
      phoneNumber:{
            required,
        },
      storeChoose:{
        required
      }
    }
  },

  methods: {
    async requestApiSaveStore(seller_id) {
      this.added = true;
      const inputs = {
        'store_id': this.storeChoose,
        'seller_id': seller_id,
        
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/store/storeseller/add', {
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
            if(status==201){
              this.resSuccess = 'Store Successfully Updated';
            }
            
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

    },
    async requestApiDeleteStore(seller_id) {
      this.added = true;
      const inputs = {
        'store_id': this.storeChoose,
        'seller_id': seller_id,
        
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/store/storeseller/delete/'+this.storeSellerListId, {
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
            if(status==200){
              // this.resSuccess = 'Store Successfully Updated';
            }
            
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

    },
    async requestApi() {
      this.added = true;
      const inputs = {
        'sellerName': this.name,
        'sellerPhone': this.phoneNumber.replace(/\D/g, ""),
        'role': this.role,
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/store/seller/edit/'+this.$route.params.id, {
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
            if(status==200){
              console.log(json.storeSeller);
              if(this.storeSellerListId){
                this.requestApiDeleteStore(this.storeSellerListId);
              }
              this.requestApiSaveStore(json.storeSeller.id);
            }else{
              this.resSuccess = 'Update error';
            }
            
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
      getSellerInfo(){
          
          let newUrl = this.url+'api/v1/store/seller?seller_id='+this.$route.params.id;
            
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
                      this.name = data.sellerName;
                      this.role =data.role? 1 : 0;
                      this.phoneNumber = '+'+data.sellerPhone.substring(0, 3)+' ( '+data.sellerPhone.substring(3, 5)+' ) '+data.sellerPhone.substring(5, 8)+'-'+data.sellerPhone.substring(8, 10)+'-'+data.sellerPhone.substring(10, 12);
                      this.storeSellerListId = data.seller_store_list? data.seller_store_list.id : null;
                      this.storeChoose = data.seller_store_list? data.seller_store_list.store_id : null;
                    }
                    console.log(this.storeSellerListId);
                });
        },  
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    
    this.requestGetStore();
    this.getSellerInfo();
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