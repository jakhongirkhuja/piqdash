<template>
<GoBackButton  />
    <div>
        <div class="row mt-2">
          <div class="col-md-12">
            <div class="col-md-12">
            <p class="error" v-if="resStringError">
                      {{resStringError}}
              </p>
          </div>
          </div>
        </div>
        <div class="row" v-if="!resStringError">
          
            <div class="col-md-12">
              <div class="card" >
                
                <div class="card-body">
                  <h5 class="card-title">{{company.companyName}}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">{{companyAddress.city? companyAddress.city.name_ru : ''}}, {{companyAddress.region? companyAddress.region.name_ru : ''}}, {{companyAddress.addressline1}}</h6>
                  <h3 class="card-title pt-2">Owner</h3>
                  <p v-if="user" style="font-size:20px">{{user.firstName}} {{user.lastName}} </p>
                  <a v-if="user && user.phonebook" href="tel:{{user.phonebook? user.phonebook.phoneNumber: ''}}">{{'+'+user.phonebook.phoneNumber.substring(0, 3)+' ( '+user.phonebook.phoneNumber.substring(3, 5)+' ) '+user.phonebook.phoneNumber.substring(5, 8)+'-'+user.phonebook.phoneNumber.substring(8, 10)+'-'+user.phonebook.phoneNumber.substring(10, 12)}}</a>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-4">
              <div class="card">
                <div class="card-body">
                  <template v-if="resError" >
                  
                  <p class="error" v-for=" (value,name) in resError">
                    {{name}} : {{value[0]}}
                  </p>
                </template>
                  <p class="error" v-if="resStringError">
                      {{resStringError}}
                    </p>
                    <p class="success" v-if="resSuccess">
                      {{resSuccess}}
                    </p>
                </div>
              </div>
              <div class="card" >
                <div class="card-body">
                  <h5 class="card-title">Company Members</h5>
                    <table class="table" v-if="companyMembers.length>0">
                      <thead>
                        <tr>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">PhoneNumber</th>
                          <th scope="col">Status</th>
                          <th scope="col">Joined At</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="member in companyMembers" >
                          <td>{{member.user? member.user.firstName: ''}}</td>
                          <td >{{member.user? member.user.lastName: ''}}</td>
                          <td><a href="tel:" v-if="member.user && member.user.phonebook"> {{'+'+member.user.phonebook.phoneNumber.substring(0, 3)+' ( '+member.user.phonebook.phoneNumber.substring(3, 5)+' ) '+member.user.phonebook.phoneNumber.substring(5, 8)+'-'+member.user.phonebook.phoneNumber.substring(8, 10)+'-'+member.user.phonebook.phoneNumber.substring(10, 12)}}</a></td>
                          <td style="display:flex; align-items:center"> <label  class="switch">
                                <input type="checkbox"  :checked="member.status=='Approved'">
                                <span class="slider round" @click="statusUpdate(member.id)"></span>
                              </label>
                              </td>
                          <td>{{ new Date(member.created_at).toLocaleDateString('ru-Ru')}}</td>
                        </tr>
                        
                      </tbody>
                    </table>
                  <p v-else>Empty</p>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-4">
              <div class="card" >
                <div class="card-body">
                  <h5 class="card-title">Company History</h5>
                    <table class="table" v-if="companyMembers.length>0">
                      <thead>
                        <tr>
                          <th scope="col">Status</th>
                          <th scope="col">Name</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">PhoneNumber</th>
                          <th scope="col">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="history in companyHistory" >
                          <td>{{history.status}}</td>
                          <td>{{history.companyName}}</td>
                          <td>{{history.user? history.user.firstName: ''}}</td>
                          <td>{{history.user? history.user.lastName: ''}}</td>
                          <td><a href="tel:{{history.user.phonebook.phoneNumber}}" v-if="history.user && history.user.phonebook"> {{'+'+history.user.phonebook.phoneNumber.substring(0, 3)+' ( '+history.user.phonebook.phoneNumber.substring(3, 5)+' ) '+history.user.phonebook.phoneNumber.substring(5, 8)+'-'+history.user.phonebook.phoneNumber.substring(8, 10)+'-'+history.user.phonebook.phoneNumber.substring(10, 12)}}</a></td>
                          <td>{{ new Date(history.created_at).toLocaleDateString('ru-Ru')}}</td>
                        </tr>
                        
                      </tbody>
                    </table>
                    <p v-else>Empty</p>
                </div>
              </div>
            </div>
        </div>

    </div>
</template>
<script>
import GoBackButton from '@/components/GoBackButton.vue';
import {standartAttribute} from '@/globals/globalFunction.js'
import { ref } from 'vue';

export default {
      setup () {
        
      },
      
      components: {
        GoBackButton,
        
      },
      data() {
        return {
          url: import.meta.env.VITE_APP_REST_ENDPOINT, 
          user: {},
          company: {},
          companyAddress: {},
          companyHistory: {},
          companyMembers: {},
          resStringError: '',
          region:{},
          city:{},
        
        }
      },
      computed: {
        changeDateFormat: function(){
          const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
          let current_datetime = new Date(this.user.birthDate);
          let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
          return formatted_date;
        },
        changeDateFormatCreated: function(){
          const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
          let current_datetime = new Date(this.user.created_at);
          let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
          return formatted_date;
        }
      },
      methods: {
        changeFormat(){
          const  phonenumber = this.phoneNumber.replace(/\D/g, "");
          this.phoneNumber = '+'+phonenumber.substring(0, 3)+' ( '+phonenumber.substring(3, 5)+' ) '+phonenumber.substring(5, 8)+'-'+phonenumber.substring(8, 10)+'-'+phonenumber.substring(10, 12)
          
        },
        async statusUpdate(id) {
          let userStatus = 0;
          Object.keys(this.companyMembers).forEach((item) => {
            if(this.companyMembers[item].id == id) {
                if(this.companyMembers[item].status=='Approved'){
                  userStatus = 0;
                }else{
                  userStatus = 1;
                }
            }
        })
          const inputs = {
            'companyMember_id': id,
            'memberStatus': userStatus,
        }
        const todo2 =standartAttribute();;
         const finalResult2 = Object.assign(inputs,todo2);
      
          
         
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/company/memberStatusUpdate', {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(finalResult2), // данные могут быть 'строкой' или {объектом}!
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                'Authorization': 'Bearer '+token,
              }
            });
            const json = await response.json();
            window.scrollTo({top: 0, behavior: 'smooth'});
            const status = response.status;
            
            if(status==401){
                this.resStringError = json.message;
            }else{  
            if(json.error){
              if(typeof json.message == 'object'){
                    this.resError = json.message;
                  }else{
                    this.resStringError = json.message;
                  }
                  
            }else{
               
               
               this.resSuccess  = 'Successfully updated';
               this.requestApi();
               setTimeout(() => {
                 this.resSuccess = false;
               }, 3000);
            }
            }
            
            
            
          } catch (error) {
              // console.log(error);
              
          }
            
        },
        async requestApi(){
          
         
          try {
            let token = localStorage.getItem('token');
            const response = await fetch(this.url+'api/v1/company/show/all?company_id='+this.$route.params.id, {
              method: 'GET', // или 'PUT'
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json",
                'Authorization': 'Bearer '+token,
              }
            });
            const json = await response.json();
            console.log(json);
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(json.error){
                this.resStringError = json.message;
                  
            }else{
               this.company = json.company;
               this.companyAddress = json.companyAddress;
               this.companyHistory = json.companyHistory;
               this.companyMembers = json.companyMembers;
               this.user = json.user;
              console.log(json);
            }
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
          
        },
       
      },
      created() {
        this.requestApi();
        
       
      },
}
</script>
 <style scoped>
  
 
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>