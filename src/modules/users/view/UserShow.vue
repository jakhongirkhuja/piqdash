<template>
<GoBackButton />
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
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                 <div class="card-body">
                  <h4 class="card-title">{{user.firstName}} {{user.lastName}}</h4>
                 
                  <p class="card-description float-right">{{changeDateFormat}}</p>
                  
                  <p style="font-size:20px" v-if="user.phonebook">{{'+'+user.phonebook.phoneNumber.substring(0, 3)+' ( '+user.phonebook.phoneNumber.substring(3, 5)+' ) '+user.phonebook.phoneNumber.substring(5, 8)+'-'+user.phonebook.phoneNumber.substring(8, 10)+'-'+user.phonebook.phoneNumber.substring(10, 12)}}</p>
                  <p v-if="user.email" class="card-description">{{user.email.email}}</p>
                  <p v-if="user.email" class="card-description role">{{user.role}}</p>
                   <h4 class="card-title float-left">Registered at</h4>
                   <h4 class="card-title float-right">{{changeDateFormatCreated}}</h4>
                  <template v-if="resError" >
                  
                    <p class="error" v-for=" (value,name) in resError">
                      {{name}} : {{value[0]}}
                    </p>
                  </template>
                 
                  <p class="success" v-if="resSuccess">
                    {{resSuccess}}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                 <div class="card-body">
                  <h4 class="card-title">Company <span class="card-description h6">( {{user.role}} )</span></h4>
                  <p style="font-size:20px" v-if="company">{{company.companyName}}</p>
                  <div>
                    {{city? city.name_ru : ''}}
                    {{region? region.name_ru : ''}}
                      {{companyAdress? companyAdress.addressline1 : ''}}
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="col-md-7 grid-margin stretch-card">
              <div class="card">
                 <div class="card-body">
                  <h4 class="card-title">IQC <span class="card-description h3">( {{iqc? iqc.amountofIQC : 0}} )</span></h4>
                  <p class="card-title">History</p>
                  <table class="table">
                      <thead>
                        <tr>
                          <th scope="col" >Get</th>
                          <th scope="col">For</th>
                          <th scope="col">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="transaction in iqcTransction" :key="transaction.id">
                          <tr v-if="transaction.value!=0">
                            <th scope="row">{{transaction.valueType? '+' : '-'}} {{transaction.value}}</th>
                            <td>{{ IQCServiceName(transaction.serviceName) }} </td>
                            <td>{{new Date(transaction.created_at).getFullYear() + '-' + (new Date(transaction.created_at).getMonth()+1) + '-'
                                + new Date(transaction.created_at).getDate() + ' ' + new Date(transaction.created_at).getHours() + ':' + new Date(transaction.created_at).getMinutes() + ':' 
                                + new Date(transaction.created_at).getSeconds()}}
                            </td>
                            
                          </tr>
                        </template>
                        
                      </tbody>
                    </table>
                  
                </div>
              </div>
            </div>
            <div class="col-md-5 grid-margin stretch-card">
              <div class="card">
                 <div class="card-body">
                  <h4 class="card-title">Groups <span class="card-description h3">( {{groups.length}} )</span></h4>
                  <p v-for="grop,index in groups" :key="grop">{{ index+1 }}) {{ grop }}</p>
                </div>
              </div>
            </div>
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                 <div class="card-body">
                  <h4 class="card-title">Course Passed  ({{courseLog.length}})</h4>
                  <table class="table" style="width: 100%;">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Course Name</th>
                            <th scope="col">Time Passed</th>
                            <th scope="col">Passed</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="course in courseLog" :key="course.id">
                             <tr v-if="course.course.getinfo">
                                <th scope="row">{{JSON.parse(course.course.getinfo.courseTitleName).ru}}</th>
                                <td>{{new Date(course.updated_at).getFullYear() + '-' + (new Date(course.updated_at).getMonth()+1) + '-'
                                  + new Date(course.updated_at).getDate() + ' ' + new Date(course.updated_at).getHours() + ':' + new Date(course.updated_at).getMinutes() + ':' 
                                  + new Date(course.updated_at).getSeconds()}}
                              </td>
                              <td>{{ courseProggress(course, course.course)}} %</td>
                                <!-- <td> {{course.totalContent!=0 ? Math.round((course.progress / course.totalContent) * 100): 0}} %</td> -->
                                
                              </tr>
                          </template>
                         
                          
                        </tbody>
                      </table>

                  
                </div>
              </div>
            </div>
        </div>

    </div>
</template>
<script>
import GoBackButton from '@/components/GoBackButton.vue';
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
          user: {
            firstName :'',
            lastName :'',
            date: '',
            birthDate :'',
            gender :0,
            language :'ru',
            email :'',
            role: '',
            phoneNumber: '',
          },
          company: {},
          companyAdress: {},
          courseLog: {},
          iqc: 0,
          iqcTransction: {},
          groups: [],
          savedCourse:{},
          resStringError: '',
          region:{},
          city:{},
          resError: false,
          resSuccess: false,
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
        courseProggress(course, courseEach){
          let userId = course.user_id;
         
          if(course.status){
            return '100';
          }else{
           
            if(courseEach){
              
              courseEach.lessons.forEach(lesson => {
               
                  if(lesson.specificlessonlog){
                    lesson.specificlessonlog.forEach(lo => {
                      console.log(lo.user_id);
                      if(lo.user_id==userId) return '100';
                    });
                    
                  }
              });
            }
            if(course.totalContent!=0){
              if(course.progress>=course.totalContent){
                return '100';
              }
            }
            // if(course.totalContent!=0)
            // course.totalContent!=0 ? Math.round((course.progress / course.totalContent) * 100): 0
          } 

          // console.log(course);
          // if(courseEach){
          //   courseEach.lessons.forEach(lesson => {
          //       if(lesson.specificlessonlog && lesson.specificlessonlog.user_id==userId) return '100';
          //   });
          // }
          return '0';
        },
        IQCServiceName(name){
          let serviceName = '';
          switch (name) {
            case 'quiz':
              serviceName = 'Passing the test';
              break;
            case 'reflink':
              serviceName = 'My referral link';
              break;
            case 'promoCode':
              serviceName = 'PromoCode';
              break;
            case 'storeProductDigital':
              serviceName = 'Store';
              break;
            case 'storeProduct':
              serviceName = 'Store';
              break;
            case 'quest':
              serviceName = 'Quest';
              break;
            case 'removed':
              serviceName = 'Removed';
              break;
            case 'course':
              serviceName = 'Course buy';
              break;
            case 'ref link':
              serviceName = 'Ref link';
              break; 
            default:
              break;
          }
          return  serviceName;
        },
        changeFormat(){
          const  phonenumber = this.phoneNumber.replace(/\D/g, "");
          this.phoneNumber = '+'+phonenumber.substring(0, 3)+' ( '+phonenumber.substring(3, 5)+' ) '+phonenumber.substring(5, 8)+'-'+phonenumber.substring(8, 10)+'-'+phonenumber.substring(10, 12)
          
        },
        async requestApi(){
          
         
          try {
            const response = await fetch(this.url+'api/v1/admin/show/users/'+this.$route.params.id, {
              method: 'GET', // или 'PUT'
              headers: {
               "Content-Type" : "application/json",
                "accept" : "application/json"
              }
            });
            const json = await response.json();
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(json.error){
                this.resStringError = json.message;
                  
            }else{
               this.user = json.user;
               this.company = json.company;
               this.companyAdress = json.companyAdress;
               this.courseLog = json.courseLog;
               this.iqc = json.iqc;
               this.iqcTransction = json.iqcTransction;
               this.savedCourse = json.savedCourse;
               this.city  = json.city;
               this.groups = json.groups;
               this.region  = json.region;
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