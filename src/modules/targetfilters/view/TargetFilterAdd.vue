<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Target Filter</h4>

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
                  <label class="col-sm-12 " for="banner">Group</label>
                  <select v-model="groupID"  class="form-control"
                    v-bind:class="{ 'border border-danger': v$.groupID.$errors.length > 0 }">
                    <option disabled >Please select one</option>
                    <option v-for="group in groups" :key="group.id" v-bind:value="group.id">
                      {{ group.groupName }}</option>

                  </select>
                  <small class="error" v-for="(error, index) of v$.groupID.$errors" :key="index">{{ error.$message
                  }}</small>
                
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-4 gender">
                  
                  <label for="exampleInputGenderRu">Gender</label>
                  <div class="row">
                   <div class="col-md-4">
                    <label for="all"><input id="all" type="radio" class="l-2"
                    v-model="gender" value="all">All </label>
                  
                  
                    
                   </div>
                   <div class="col-md-4">
                    <label for="man"><input id="man"  type="radio" class="l-2"
                    v-model="gender" value="0">Man </label>
                  
                  
                    
                   </div>
                   <div class="col-md-4">
                    <label for="femaile"><input  id="femaile" type="radio" class=""
                    
                    v-model="gender" value="1">Female </label>
                   </div>
                  </div>
                    
                 
                </div>
                <div class="col-md-4">
                  {{nrole}}
                  <label for="exampleInputTitleUZ">Role</label>
                  <select    multiple="multiple"  class="form-control js-example-basic-multiple">
                    <option selected value="all">All</option>
                    <option value="Employee">Employee</option>
                    <option value="Company Owner">Company Owner</option>
                  </select>
                  
                </div>
                <div class="col-md-4">
                  
                  <label for="exampleInputTitleUZ">Age</label>
                  <select v-model="age"   class="form-control" >
                    <option selected value="all">All</option>
                    <option value="0">Range</option>
                    <option value="1">Range Limits</option>
                  </select>
                  <div class="mb-2 mt-5" v-if="age==0">
                    <Slider @update="checkvalues" v-model="nage"  />
                  </div>
                  
                  <div class="mt-5" v-if="age==1"><Slider @update="checkvalues" v-model="rage"  /></div>
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
import Slider from '@vueform/slider'
import { maska } from 'maska'
import Multiselect from 'vue-multiselect'
import { standartAttribute } from '@/globals/globalFunction.js';

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  directives: { maska },
  components: {
    GoBackButton,
    Datepicker,
    Slider,
    Multiselect,
  },
  data() {
    return {
      url: import.meta.env.VITE_APP_REST_ENDPOINT,
      promo: '',
      title: '',
      gender: 'all',
      nrole: 'all',
      age:'all',
      rage:  [18, 90],
      nage:20,
      price: null,
      groupID:null,
      startDate: null,
      endDate: null,
      added: false,
      
      selectedNumbers: [],
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      monetized: 0,
      customNumbers: 0,
      numbers:0,
      groups:[],
    
    }
  },
  computed: {
    isDisabled: function () {
      this.v$.$touch();
      if (this.v$.$error) return true;

    }
  },
  mounted() {
    $('.js-example-basic-multiple').select2();
    $('.js-example-basic-multiple').change(function() {
      //var theID = $(test).val(); // works
      //var theSelection = $(test).filter(':selected').text(); // doesn't work
      
      var theSelection = $('.js-example-basic-multiple').select2('val');
      localStorage.setItem('role',theSelection);
     
      
  });
  },
  validations() {
    return {
      groupID:{
        required,
      }
    }
  },

  methods: {
    
    checkvalues(){
      if(this.nage>90){
        this.nage=90;
      }
      if(this.nage<18){
        this.nage = 18;
      }
      
    },
    
    async requestApi() {
      this.added = true;
      // let phonebooks = this.searchNumber?.replace(' ','').split(',');

      ;
      let inputs = {
        "group_id": this.groupID,
        "gender": this.gender,
        "ageRange": this.age=='all'? 'all':  (this.age==1? this.rage : this.nage ),
        "roleList": localStorage.getItem('role')? localStorage.getItem('role') : 'all',
      }
      
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/targetFilter/add', {
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
            
            this.resSuccess = 'Target filter Successfully Added';
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
                    this.response=data;
                    this.groups = data.data
                    console.log(this.groups);
                    
                });
        }
   
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getGroups();
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
.hidden{
  position: absolute;
  opacity: 0;
}
.capilizie{
  text-transform: uppercase;
}
[type="radio"]:checked, [type="radio"]:not(:checked){
  position: initial;
}
.gender input{
  margin-right: 10px;
}
input.ok::-webkit-outer-spin-button,
input.ok::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
<style src="@vueform/slider/themes/default.css"></style>