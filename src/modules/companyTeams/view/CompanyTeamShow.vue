<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ title_ru }}</h4>

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
            
             
               <div class="form-group row">
                <div class="col-md-12">
                    <h5>Members</h5>
                    <div class="members mb-3" >
                      <div class="title">
                            <div class="title__name">Name</div>
                            <div class="title__phoneNumber">PhoneNumber</div>
                            <div class="title__action">Actions</div>
                        </div>
                        <template v-if="members.length>0">
                          <div class="members__each" v-for="member in members" :key="member.user_id">
                            <div class="name">{{ member.name }}</div>
                            <div class="phoneNumber">{{ member.phoneNumber }}</div>
                            <div class="remove" title="Remove From Team" @click="removeMember(member.user_id)">-</div>
                        </div>
                        </template>
                        <div class="members__not" v-else>No Members</div>
                    </div>
                   
                </div>
                <div class="col-md-12">
                  <h5>Not Alocated Employees</h5>
                  <div class="members" >
                        <div class="title">
                            <div class="title__name">Name</div>
                            <div class="title__phoneNumber">PhoneNumber</div>
                            <div class="title__action">Actions</div>
                        </div>
                        <template v-if="employees.length>0">
                            <div class="members__each" v-for="empployee in employees" :key="empployee.user_id">
                              <div class="name">{{ empployee.name }}</div>
                              <div class="phoneNumber">{{ empployee.phoneNumber }}</div>
                              <div class="add" @click="addMember(empployee.user_id)">+</div>
                          </div>
                        </template>
                        <div class="members__not" v-else>No Members</div>
                       
                    </div>
                 
                </div>
               </div>
              
            
              

            
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
      employees: [],
      members: [],
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
    async removeMember(user_id){
      const inputs = {
        'user_id': user_id,
        'team_id' : this.$route.params.team_id,
      }
    
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      
      let inside = true;
      if(inside){
        inside =false;
        try {
          let token = localStorage.getItem('token');
          const response = await fetch(this.url + 'api/v1/company/team/users/delete', {
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
          setTimeout(() => {
              inside = true;
          }, 2000);
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
              this.getCompanyTeamUsers();
              // this.added = true;
              // this.resSuccess = 'Company Team Successfully Added';
            }
          }
          

        } catch (error) {
          console.error('Ошибка:', error);
          setTimeout(() => {
              inside = true;
          }, 2000);
        }
        
      }
    },
    async addMember(user_id){
      const inputs = {
        'user_id': user_id,
        'team_id' : this.$route.params.team_id,
      }
    
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      
      let inside = true;
      if(inside){
        inside =false;
        try {
          let token = localStorage.getItem('token');
          const response = await fetch(this.url + 'api/v1/company/team/users/add', {
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
          setTimeout(() => {
              inside = true;
          }, 2000);
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
              this.getCompanyTeamUsers();
              // this.added = true;
              // this.resSuccess = 'Company Team Successfully Added';
            }
          }
          

        } catch (error) {
          console.error('Ошибка:', error);
          setTimeout(() => {
              inside = true;
          }, 2000);
        }
        
      }
    },
    async requestApi() {
      const inputs = {
        
        'company_id': this.$route.params.company_id,
        'team_id' : this.$route.params.team_id,
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
        const response = await fetch(this.url + 'api/v1/company/team/update', {
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
    getCompanyTeamUsers() {
    let newUrl = this.url + 'api/v1/company/team/users/list/'+this.$route.params.team_id;
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
          this.members = data.teamMembers;
          this.employees = data.notAlocated;
         
      });
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
    getTeam(){
      
      let newUrl = this.url + 'api/v1/company/team/show/'+this.$route.params.company_id+'?team_id='+this.$route.params.team_id;
      
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
          if(data.companyTeams){
            this.title_ru = data.companyTeams.teamName;
            this.monetized = data.companyTeams.teamType;
          }else{
            this.resStringError = 'Team not found';

          }
        });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
     
    this.getCompanyById();
      this.getTeam();
    this.getCompanyTeamUsers();
    
  },
}
</script>
<style lang="css" scoped>
h5{
  padding: 5px;
}
.title{
  display: flex;
  padding: 10px;
}
.title__name{
  width: 300px;
}
.title__phoneNumber{
  width: 200px;
}
.members{
  background-color: #0272830a;
}
.members__each{
  display: flex;
  padding: 10px;
  border-top: 1px solid #c0c0c040;
}

.members__not{
  padding: 10px;
}
.members__each .name{
  width: 300px;
  color: #027283;
}
.members__each .phoneNumber{
  width: 210px;
}
.members__each .remove, .members__each .add{
  color: #027283;
  border: 1px solid #027283;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 22px;
}
.members__each .remove{
  color: red;
  border: 1px solid red;
}
.members__each .add:hover{
  background-color: #027283;
  color: white;
  cursor: pointer;
}
.members__each .remove:hover{
  background-color: red;
  color: white;
  cursor: pointer;
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