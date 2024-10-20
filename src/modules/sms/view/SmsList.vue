
<template>
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12 text-center">
            <b> Total:</b> {{totalMessage}}
          </div>
          <div class="col-md-6"  v-if="load" >
            <Pie :chart-data="dataMailing" :chart-options="options"  />
          </div>
          <div class="col-md-6">
            <Pie :chart-data="dataOperator" v-if="load"  :chart-options="options2"  />
          </div>
        </div>
        
       



      </div>
      
    </div>
    <div class="row">
        <div class="col-md-1">
          <div class="questionmark">
            <svg data-toggle="modal" data-target="#exampleModal"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="25" height="25" viewBox="0 0 93.936 93.936" style="enable-background:new 0 0 93.936 93.936;"
                xml:space="preserve">
              <g>
                <path d="M80.179,13.758c-18.342-18.342-48.08-18.342-66.422,0c-18.342,18.341-18.342,48.08,0,66.421
                  c18.342,18.342,48.08,18.342,66.422,0C98.521,61.837,98.521,32.099,80.179,13.758z M44.144,83.117
                  c-4.057,0-7.001-3.071-7.001-7.305c0-4.291,2.987-7.404,7.102-7.404c4.123,0,7.001,3.044,7.001,7.404
                  C51.246,80.113,48.326,83.117,44.144,83.117z M54.73,44.921c-4.15,4.905-5.796,9.117-5.503,14.088l0.097,2.495
                  c0.011,0.062,0.017,0.125,0.017,0.188c0,0.58-0.47,1.051-1.05,1.051c-0.004-0.001-0.008-0.001-0.012,0h-7.867
                  c-0.549,0-1.005-0.423-1.047-0.97l-0.202-2.623c-0.676-6.082,1.508-12.218,6.494-18.202c4.319-5.087,6.816-8.865,6.816-13.145
                  c0-4.829-3.036-7.536-8.548-7.624c-3.403,0-7.242,1.171-9.534,2.913c-0.264,0.201-0.607,0.264-0.925,0.173
                  s-0.575-0.327-0.693-0.636l-2.42-6.354c-0.169-0.442-0.02-0.943,0.364-1.224c3.538-2.573,9.441-4.235,15.041-4.235
                  c12.36,0,17.894,7.975,17.894,15.877C63.652,33.765,59.785,38.919,54.73,44.921z" fill="#4B49AC" />
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
          </svg>
          </div>
        </div>
        <div class="col-md-3" v-if="customTime">
            From date
            <input type="datetime-local" @change="requestApi(1)" required  class="form-control" v-bind:defaultValue="start_date"  v-model="start_date">
        </div>
        <div class="col-md-3" v-if="customTime">
            To date
            <input type="datetime-local" @change="requestApi(1)" required class="form-control"  v-bind:defaultValue="end_date" v-model="end_date" v-bind:max="end_date">
            <!-- <input type="search" @input="searchsm" v-model="smsearch" class="form-control" placeholder="Search"> -->
        </div>
        <div class="col-md-3" :class="{'col-md-9': !customTime, 'col-md-3' : customTime }">
          <div class="filter">
            
            <img title="Show filter" @click="showFilter=true" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAz0lEQVRoge3YQQqDMBCF4Z9uvYIui3cvwVO0x3GhB9AuGkFqIxoTk7bvg9mFzEQQHgMiIvJjKsAAva0GqJNO5KECWmB8qxYoE861m2H5iKlusZs/VppvrcLe1a+c6eyZIkC/+zT8ZfaQ4eiX2GgMeFf0mRvcX9HEbh5Sjftnvyacy0vJ68fubBm+8BEiIv9DqTknQVJziPR7dmpOmn59fUrN2c6s1JwjpWYRkQUl05wk3efu4Uq/Z+9zD+9+j+xkQ+5zo/dVMs2RkqmIiMw9AeRc6n4FK62pAAAAAElFTkSuQmCC">
          </div>
            <div v-if="showFilter" class="filterDrop">
              <div class="filterDrop__each" :class="{'active': currentFilterIndex==index }" :id="'f-'+index" @click="changeFilter(index)" v-for="filter,index in filters">
                {{filter}}
              </div>
              
            </div>
        </div>
        <div class="col-md-2 ">
          
          <div class="btn btn-primary mt-3" @click=" $router.replace({ name: 'sms.add' })">Send SMS</div>
        </div>
        
    </div>
    
    <div class="mt-3">
        <div class="row">
                    <div class="col-12">
                      <div class="table-responsive">
                        
                        

                        <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">Number</th>
                            <th scope="col">Operator</th>
                            <th scope="col">Content</th>
                            <th scope="col">Status</th>
                            
                            <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sm in sms" >
                           
                             
                             
                                <td>{{sm?.to}}</td>
                                <td>{{sm?.operator}}</td>
                                <td>{{sm?.content}}</td>
                                <td>{{sm?.status}}</td>
                                <td>{{sm?.updated_at.replace('T',' ').slice(0,-11)}}</td>
                               
                           
                                
                            </tr>
                            
                        </tbody>
                        </table>
                      </div>
                      <Pagination v-if="last_page!=1" :total-pages="this.last_page"
   :total="this.total"
   :per-page="this.per_page"
   :current-page="currentPage"
   @pagechanged="onPageChange" />
                    </div>
            </div>
    </div>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">SMS INFO</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
          <b>WAITING</b> - СМС в ожидании отправления оператору;
          <br><b>TRANSMTD</b> - СМС передан сотовому оператору, но со стороны оператора обратно не получено статус смс сообщений;
          <br><b>DELIVRD</b> - доставлено;
          <br><b>UNDELIV</b> - недоставлено, обычно причиной может быть то что абонент блокируется со стороны оператора(недостаточно средст или долг);
          <br><b>EXPIRED</b> - срок жизни смс истек(когда абонент в течение сутки не выходил на связь. У билайн если в теение часа);
          <br><b>REJECTD</b> - один из основных причин это то что номер находится в черном списке;
          <br><b>DELETED</b> - ошибка при отправки запроса(например когда адрес отправителя указан неверно);
          <br><br>
        
      </div>
      
    </div>
  </div>
</div>
<div class="loading" v-if="loading">
        <img src="/loading.gif">
    </div>
</template>
<script>
import CrudButton from '@/components/CrudButton.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import Pagination from '@/components/Pagination.vue';
import {standartAttribute} from '@/globals/globalFunction.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)
export default {
    data() { 
        return {
            load : false,
            // imageUrl : 'https://api.pharmiq.uz/files/sm/',
            dataMailing : {
              labels: ['Mailing', 'SMS'],
              datasets: [
                {
                  backgroundColor: ['#F2C94C', '#007382'],
                  data: []
                }
                
              ]
            },
            dataOperator: {
              labels: ['Eskiz', 'PlayMobile'],
              datasets: [
                {
                  backgroundColor: ['#FF736E', '#4DB1B1'],
                  data: []
                }
                
              ]
            },
            options2:{
              responsive: true,
              maintainAspectRatio: false
            },
            options : {
              responsive: true,
              maintainAspectRatio: false
            },
            disabled: false,
            modelName:'',
            modelUserId:'',
            currentPage: 1,
            showFilter: false,
            customTime:false,
            counterMailing:0,
            currentFilterIndex: 0,
            filters: [
              'Total',
              'Last month',
              'Last Week',
              'Today',
              'Custom'
            ],
            last_page:1,
            total: 1,
            per_page: 1,
            sms: [],
            response: null,
            resError: false,
            resSuccess: false,
            resStringError: '',
            start_dateC:new Date(new Date().setDate(new Date().getDate()-10)).toISOString().replace('T',' ').slice(0,-8),
            end_dateC: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().replace('T',' ').slice(0,-8),

            start_date:'2022-01-01 00:00',
            end_date: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().replace('T',' ').slice(0,-8),
            submitButton: true,
            smsearch:'',
            timerId: null,
            url: import.meta.env.VITE_APP_REST_ENDPOINT, 
            loading: true,
            userInfo:null,
            totalMessage: 0,
        }
    },
    components: {
        CrudButton,
        Pagination,
        LanguageSwitcher,
        Pie
    },
    computed: {
        
    },
    watch: {
      totalMessage: function(){

        this.dataMailing.datasets[0].data = [this.totalMessage, this.counterMailing ];
      }
    },
    methods:{
      changeFilter(index){
        document.querySelectorAll('.filterDrop__each.active').forEach(element => {
            element.classList.remove('active');
        });
        document.querySelector('#f-'+index).classList.add('active');
        this.currentFilterIndex = index;
        this.customTime = false;
        this.end_date = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().replace('T',' ').slice(0,-8);
        switch (index) {
          case 0:
            this.start_date ='2022-01-01 00:00';
            this.requestApi(1);
            break;
          case 1:
            this.start_date =new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().replace('T',' ').slice(0,-8);
            this.requestApi(1);
            break;
          case 2:
            this.start_date =new Date(new Date().setDate(new Date().getDate()-7)).toISOString().replace('T',' ').slice(0,-8);
            this.requestApi(1);
            break;
          case 3:
            this.start_date =new Date(new Date().setDate(new Date().getDate())).toISOString().replace('T',' ').slice(0,-13)+'00:00';
            this.requestApi(1);
            break;    
          case 4:
            this.customTime = true;
            break;      
          default:
            break;
        
        
        }
        this.showFilter = false;    
        // console.log(e,index);
      },
      getmodel(){
        console.log(this.start_date);
        console.log(this.end_date);
      },  
        searchsm(){
          clearTimeout(this.timerId);
          if(this.smsearch!=''){
            this.loading = true;
              this.timerId = setTimeout(() =>{ this.requestApi(1,this.smsearch)}, 2000);
          }else{
            this.loading = true;
              this.timerId = setTimeout(() => this.requestApi(this.currentPage), 2000);
          }
        },
        showsm(sm_id){
          this.$router.push({ name: 'sms.show', params: {'id': sm_id}})
        },
        openmodel(sm_id, firstName){
          
            this.modelUserId = sm_id;
            this.modelName = firstName;
            this.submitButton = true;
            this.resError = false;
            this.resSuccess = false;
            this.resStringError =  '';
             $('#exampleModal').modal('show');
        },
        showUrl(){
            console.log(import.meta.env.VITE_APP_REST_ENDPOINT);
        },
        editsm(sm_id){
            this.$router.push({ name: 'sms.edit', params: {'id': sm_id}})
        },
        
        onPageChange(page){
            console.log(page)
            this.currentPage = page;
            this.loading = true;
            this.requestApi(page);
            localStorage.setItem('currentPageP', page);
        },
        refreshList(){
          this.loading = true;
            this.requestApi(1);
        },
        
        async getStatusesMailing(){
          
         
          const inputs = {
            
            }
            const todo = standartAttribute();
            const finalResult = Object.assign(inputs, todo);

            var data = new FormData()
            
            for (const key in finalResult) {
              data.append(key, finalResult[key]);

            }
            try {
              let token = localStorage.getItem('token');
              const response = await fetch(this.url+'api/v1/admin/numbers/getStatusesMailing', {
                method: 'POST',
                body: data,
                headers: {
                  'Accept-Language': 'en-US,en;q=0.8',
                  "accept": "application/json",
                  'Authorization': 'Bearer ' + token,
                },

              });
              const json = await response.json();
              
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
                  
                    let jsonmail = json.data;
                    
                    jsonmail.forEach(element => {
                      this.counterMailing +=element.total;
                    });
                    
                    
                    
                   
                }
              }


            } catch (error) {
              console.error('Ошибка:', error);
            }
          
        },
        async requestApi(page, search=null){
          this.loading = true;
         
          const inputs = {
            'page': page,
            'start_date' : this.start_date? this.start_date.replace('T',' ') : this.start_dateC,
            'end_date' : this.end_date? this.end_date.replace('T',' ') : this.end_dateC,
            }
            const todo = standartAttribute();
            const finalResult = Object.assign(inputs, todo);

            var data = new FormData()
            
            for (const key in finalResult) {
              data.append(key, finalResult[key]);

            }
            try {
              let token = localStorage.getItem('token');
              const response = await fetch(this.url+'api/v1/admin/numbers/getStatuses', {
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
                  
                    this.response=json;
                    this.last_page = json.data.last_page;
                    this.total = json.data.total;
                    this.per_page = json.data.per_page;
                    this.sms = json.data.data
                    if(this.totalMessage==0){
                      this.totalMessage = json.data.total;
                      this.dataOperator.datasets[0].data = [json.data.total-47, 47];
                      this.load  =true;
                    }
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    setTimeout(() => {
                      this.loading = false;
                    }, 1000);
                }
              }


            } catch (error) {
              console.error('Ошибка:', error);
            }
          
        }
    },
    mounted() {
      // alert(this.end_date);
      this.$i18n.locale = 'ru';
      // console.log(this.$i18n.availableLocales);
      setInterval(() => {
          document.querySelector('.questionmark svg').classList.add('animate');
          setTimeout(() => {
            document.querySelector('.questionmark svg').classList.remove('animate');
          }, 5000);
      }, 2000);
     
    },
    created() {
          this.userInfo = JSON.parse(localStorage.getItem('user'));
           
        
         const currentStoredPage = localStorage.getItem('currentPageP');
         if(currentStoredPage){
            this.currentPage  = parseInt(currentStoredPage);
         }  
       
            this.requestApi(1);
            this.getStatusesMailing();    
        
        
       
    }
}
</script>
<style scoped >
    .table td img{
      width: 200px;
      height: auto;
      border-radius: 0;
    }
    th,
td {
      white-space: break-spaces;
}
input[type="datetime-local"]::-webkit-clear-button {
    -webkit-appearance: none;
    display: none;
    -webkit-appearance: none; 
    appearance: none;
 }
 .questionmark{
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
 }
 .questionmark svg{
    cursor: pointer;
 }
 .questionmark svg.animate{
  animation: tilt-n-move-shaking 0.15s infinite;
 }
 .questionmark svg:hover{
  transform: scale(1.1);
 }
 .filter{
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
 }
 .filter img{
  width: 35px;
 }
 .filter img:hover{
  transform: scale(1.1);
 }
 @keyframes tilt-n-move-shaking {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(2px, 2px) rotate(2deg); }
  50% { transform: translate(0, 0) rotate(0eg); }
  75% { transform: translate(-2px, 2px) rotate(-2deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
.filterDrop{
  display: block;
  position: absolute;
  top: 0;
  background-color: white;
  width: 110px;
  z-index: 1;
}
.filterDrop__each{
  padding: 10px 7px;
  cursor: pointer;
  border-bottom: 1px solid #4c49ac;
}
.filterDrop__each.active, .filterDrop__each:hover{
  background-color: #4c49ac;
  color: white;
}
</style>