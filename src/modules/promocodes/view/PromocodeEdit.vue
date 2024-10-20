<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Update PromoCode</h4>

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
                <div class="col-md-6"></div>
                <div class="col-md-6 text-right">
                  <label for="exampleInputstartRu">Prize Type</label><br>
                  <label class="language-switcher">
                    <input type="checkbox" disabled v-model="monetized">
                    <span class="slider round"></span>
                    <span class="select-ru">iqc</span>
                    <span class="select-uz">exp</span>
                  </label>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-4">
                  <label for="exampleInputTitleRu">Promocode</label>
                  <input type="text" class="form-control capilizie" placeholder="PHARMIQ245"
                    v-bind:class="{ 'border border-danger': v$.promo.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="promo">
                  <small class="error" v-for="(error, index) of v$.promo.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4">
                  <label for="exampleInputTitleUZ">Price Amount</label>
                  <input type="text" class="form-control" placeholder="100"
                    v-bind:class="{ 'border border-danger': v$.price.$errors.length > 0 }" id="exampleInputTitleUZ"
                    v-model="price">
                  <small class="error" v-for="(error, index) of v$.price.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4">
                  <label for="exampleInputTitlewinnerUZ">Amount Of Winners</label>
                  <input type="number" class="form-control" placeholder="1"  id="exampleInputTitlewinnerUZ"
                    v-model="winner">
                 
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-6">
                  <label for="exampleInputstartRu">Start Date</label>
                  <input type="datetime-local" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.startDate.$errors.length > 0 }" id="exampleInputstartRu"
                    v-model="startDate">
                  <small class="error" v-for="(error, index) of v$.startDate.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-6">
                  <label for="exampleInputendUZ">End Date </label>
                  <input type="datetime-local" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.startDate.$errors.length > 0 }" id="exampleInputendUZ"
                    v-model="endDate">
                  <small class="error" v-for="(error, index) of v$.endDate.$errors" :key="index">{{ error.$message
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
      promo: '',
      price: null,
      startDate: null,
      endDate: null,
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      monetized: 0,
      winner:null,
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
      startDate: {
        required,
      },
      endDate: {
        required,
      },
      promo: {
        required,
        minLengthValue: minLength(3),
      },
      price: {
        required,
        integer
      },
    }
  },

  methods: {
    async requestApi() {
      
      const inputs = {
        'promocode': this.promo.toUpperCase(),
        'prizeType': this.monetized,
        'prizeAmount': this.price,
        'startDate': this.startDate.replace('T',' ')+':00',
        'endDate': this.endDate.replace('T',' ')+':00',
        'amountOfWinners': this.winner==''? null : this.winner,
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/promocode/edit/'+this.$route.params.id, {
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
            
            this.resSuccess = 'PromoCode Successfully Updated';
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
    getPromoCode(){
      let newUrl = this.url+'api/v1/promocode?promo_id='+this.$route.params.id;
         
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
                    
                    this.promo = data.promocode;
                    this.price = data.prizeAmount;
                    this.startDate = data.startDate.slice(0, -3);
                    this.endDate = data.endDate.slice(0, -3);
                    this.monetized  = data.prizeType;
                    this.winner = data.amountOfWinners;
                    
                });
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getPromoCode();
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