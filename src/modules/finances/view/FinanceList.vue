
<template>
  <div class="row">
        <div class="col-md-10 text-center">
          <div class="filter">
            
            <img title="Show filter" @click="showFilter=true" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAz0lEQVRoge3YQQqDMBCF4Z9uvYIui3cvwVO0x3GhB9AuGkFqIxoTk7bvg9mFzEQQHgMiIvJjKsAAva0GqJNO5KECWmB8qxYoE861m2H5iKlusZs/VppvrcLe1a+c6eyZIkC/+zT8ZfaQ4eiX2GgMeFf0mRvcX9HEbh5Sjftnvyacy0vJ68fubBm+8BEiIv9DqTknQVJziPR7dmpOmn59fUrN2c6s1JwjpWYRkQUl05wk3efu4Uq/Z+9zD+9+j+xkQ+5zo/dVMs2RkqmIiMw9AeRc6n4FK62pAAAAAElFTkSuQmCC">
          </div>
            <div v-if="showFilter" class="filterDrop">
              <div class="filterDrop__each" :class="{'active': currentFilterIndex==index }" :id="'f-'+index" @click="changeFilter(index)" v-for="filter,index in filters">
                {{filter}}
              </div>
              
            </div>
        </div>
        
        <div class="col-md-2">
          <div class="export" @click="exportComp"><i class="ti " :class="{ 'ti-export': !load, 'ti-reload anim': load }"></i> Export</div>
        </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <Line
                :chart-options="options"
                :chart-data="chartData"
                :chart-id="chartId"
                
                :width="width"
                :height="height"
                
              />
      </div>
      
    </div>
    <div class="row mt-3">
          <div class="col-md-4 mt-3 mb-lg-0 stretch-card transparent">
            <div class="card card-light-blue" style="background-color: #F2C94C">
              <div class="card-body">
                <p class="mb-4">All transacted IQC</p>
                <p class="fs-30 mb-2">{{iqcAll}}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3 stretch-card transparent">
            <div class="card card-light-danger" style="background-color: #007382">
              <div class="card-body">
                <p class="mb-4">Av. IQC per day</p>
                <p class="fs-30 mb-2">{{avarageDay}}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3 stretch-card transparent">
            <div class="card card-tale" style="background-color: #FF736E">
              <div class="card-body">
                <p class="mb-4">Av. IQC per week</p>
                <p class="fs-30 mb-2">{{avarageWeek}}</p>
                
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3 stretch-card transparent">
            <div class="card card-tale" style="background-color: #4DB1B1">
              <div class="card-body">
                <p class="mb-4">Av. IQC per month</p>
                <p class="fs-30 mb-2">{{avarageMonth}}</p>
                
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3 stretch-card transparent">
            <div class="card card-tale" style="background-color: #4B96DC">
              <div class="card-body">
                <p class="mb-4">Av. IQC per per one user</p>
                <p class="fs-30 mb-2">{{avaragePerUser}}</p>
                
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3 stretch-card transparent">
            <div class="card card-tale" style="background-color: #96D2F5">
              <div class="card-body">
                <p class="mb-4">Av. IQC per per one user > 0</p>
                <p class="fs-30 mb-2">{{avaragePerUserNoZero}}</p>
                
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-4 text-center"  >
            <h4 class="title mt-2">Amount of spend IQC </h4>
            <Pie :chart-data="dataSpendIqc" :chart-options="optionsPie"  />
          </div>
          <div class="col-md-4 text-center">
            <h4 class="title mt-2">Number of IQC user have % </h4>
            <Pie :chart-data="dataUserIqc"   :chart-options="optionsPieUser"  />
          </div>
          <div class="col-md-4 text-center">
            <h4 class="title mt-2">Number of IQC gained % </h4>
            <Pie :chart-data="dataGainedIqc"   :chart-options="optionsPie"  />
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
import { Chart as ChartJS, ArcElement, Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale, } from 'chart.js'
import { Line, Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,)
export default {
    data() { 
        return {
            load : false,
            chartData: {
              labels: [ ],
              datasets: [ { data: [] } ]
            },
            dataUserIqc:{
              labels: ['0', '5','5-20','20-100','100-200','200-500','500+'],
              datasets: [
                {
                  backgroundColor: ['#F2C94C','#007382','#FF736E', '#4DB1B1','#4B96DC','#96D2F5','#FC756A'],
                  data: []
                }
                
              ],
              
            },
            dataSpendIqc : {
              labels: ['Store', 'Courses','Promocode','Not spend'],
              datasets: [
                {
                  backgroundColor: ['#FF736E', '#4B96DC','#96D2F5','#007382'],
                  data: []
                }
                
              ]
            },
            dataGainedIqc : {
              labels: ['Quizzes', 'Promocode'],
              datasets: [
                {
                  backgroundColor: ['#FF736E', '#4DB1B1'],
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
            chartoptions:{
              responsive: true,
              maintainAspectRatio: false,
            },
            options : {
              responsive: true,
              maintainAspectRatio: false,
              
              plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                         
                            let label = context.dataset.label || '';
                            label = context.raw[1]+ ` IQC - ${context.raw[0]} Users `;
                            // if (label) {
                            //     label += ': ';
                            // }
                            // if (context.parsed.y !== null) {
                            //     label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            // }
                            return label;
                        }
                    }
                }
              }
            },
            optionsPie : {
              responsive: true,
              maintainAspectRatio: false,
              
              plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                        
                            let label = context.label || '';
                            let dataTotal = context.dataset.data.reduce((a, b) => a + b, 0);
                            label = ' '+label+': '+context.raw+ ` IQC / ${parseInt(context.raw*100/parseInt(dataTotal))} %`;
                            // if (label) {
                            //     label += ': ';
                            // }
                            // if (context.parsed.y !== null) {
                            //     label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            // }
                            return label;
                        }
                    }
                }
              }
            },
            optionsPieUser : {
              responsive: true,
              maintainAspectRatio: false,
              
              plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                         
                            let label = context.label || '';
                            let dataTotal = context.dataset.data.reduce((a, b) => a + b, 0);
                            label = ' '+label+': '+context.raw+ ` Users / ${parseInt(context.raw*100/parseInt(dataTotal))} %`;
                            // if (label) {
                            //     label += ': ';
                            // }
                            // if (context.parsed.y !== null) {
                            //     label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            // }
                            return label;
                        }
                    }
                }
              }
            },
            disabled: false,
            modelName:'',
            modelUserId:'',
            currentPage: 1,
            showFilter: false,
            customTime:false,
            counterMailing:0,
            currentFilterIndex: 3,
            filters: [
              'Last week',
              'Last month',
              'Last quarter',
              'All time',
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
            iqcAll:0,
            avarageDay:0,
            avarageMonth:0,
            avaragePerUser:0,
            avaragePerUserNoZero:0,
            avarageWeek:0,
            countIqcCoursePaid:0,
            countIqcStore:0,
            iqcNotSpend:0,
            iqcPercentage1:0,
            iqcPercentage2:0,
            iqcPercentage3:0,
            iqcPercentage4:0,
            iqcPercentage5:0,
            iqcPercentage6:0,
            iqcPercentage7:0,
        }
    },
    components: {
        CrudButton,
        Pagination,
        LanguageSwitcher,
        Line,
        Pie
    },
    computed: {
        
    },
    props: {
      chartId: {
        type: String,
        default: 'line-chart'
      },
     
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      cssClasses: {
        default: '',
        type: String
      },
    // styles: {
    //   type: Object as PropType<Partial<CSSStyleDeclaration>>,
    //   default: () => {}
    // },
    // plugins: {
    //   type: Array as PropType<Plugin<'line'>[]>,
    //   default: () => []
    // }
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
            this.start_date =new Date(new Date().setDate(new Date().getDate()-7)).toISOString().replace('T',' ').slice(0,-8);
            
            // this.requestApi(1);
            break;
          case 1:
            this.start_date =new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().replace('T',' ').slice(0,-8);
            // this.requestApi(1);
            break;
          case 2:
          this.start_date =new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString().replace('T',' ').slice(0,-8);
            // this.requestApi(1);
            break;
          case 3:
              this.start_date ='2022-01-01 00:00';
            // this.requestApi(1);
            break;    
          
          default:
            this.start_date ='2022-01-01 00:00';
            break;
        
        
        }
        this.showFilter = false;   
        this.requestApi(1);
         
        // console.log(e,index);
      },
      async exportComp(){
          
          if(!this.load){
            this.load = true;
            const inputs = {
                'export':'',
                }
            const todo =standartAttribute();
            const finalResult = Object.assign(inputs,todo);
            try {
              let token = localStorage.getItem('token');
              const response = await fetch(this.url+'api/v1/admin/export/usersAndIqc', {
                method: 'POST', // или 'PUT'
                body: JSON.stringify(finalResult), // данные могут быть 'строкой' или {объектом}!
                headers: {
                "Content-Type" : "application/json",
                  "accept" : "application/json",
                  'Authorization': 'Bearer '+token, 
                  
                },
                responseType: 'blob',
              });
              const json = await response.blob();
              
              const url = window.URL.createObjectURL(new Blob([json]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `userIQC.xlsx`);
              document.body.appendChild(link);
              link.click();
              setTimeout(() => {
                this.load = false;
              }, 2000);
              
            } catch (error) {
                alert(error);
                console.error('Ошибка:', error);
            }
          }
        },
      async requestApi(page, search=null){
          this.loading = true;
         
          const inputs = {
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
              const response = await fetch(this.url+'api/v1/admin/statistics/finance/date', {
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
                  
                   
                    let array=[];
                    let valu = [];
                    Object.entries(json.userGraph).map( ([key, val] = entry) => {
                      array.push(key);
                      valu.push(val.iqc);
                    });
                    
                    this.chartData.labels = array;
                    this.chartData.datasets =[
                      
                      { label: 'IQC Transactins', borderColor:'red', backgroundColor: '#f87979','data': valu},
                      // {label: 'Companies', borderColor:'blue', backgroundColor: 'blue','data': valu2 } 
                    ];
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    setTimeout(() => {
                      this.loading = false;
                    }, 1000);
                }
              }


            } catch (error) {
              console.error('Ошибка:', error);
            }
          
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
        getStatistics(){
          let self = this;
          try {
            const url = this.url+'api/v1/admin/statistics/finance';
            let token = localStorage.getItem('token')
              const options = {
                  method: 'GET',
                  headers: new Headers({
                  "accept" : "application/json",
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+token, 
              }), 
             
            };
            // chartData: {
            //   labels: [ 'January', 'February', 'March' ],
            //   datasets: [ { data: [140, 60, 0] } ]
            // },
            fetch(url, options)
              .then((response) => {
                
                  if(response.status==401){
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href='https://go.pharmiq.uz/';
                  }
                    return response.json();
                })
              .then((json)=>{
                console.log(json);
                this.avarageDay = json.avarageDay;
                this.avarageMonth = json.avarageMonth;
                this.avaragePerUser = json.avaragePerUser;
                this.avaragePerUserNoZero = json.avaragePerUserNoZero;
                this.avarageWeek = json.avarageWeek;
                this.countIqcCoursePaid = json.countIqcCoursePaid;
                this.countIqcStore = json.countIqcStore;
                this.iqcAll = json.iqcAll;
                this.iqcNotSpend = json.iqcNotSpend;
                let sumallPie = json.iqcPercentage1+json.iqcPercentage2+
                json.iqcPercentage3+json.iqcPercentage4+json.iqcPercentage5+
                json.iqcPercentage6+json.iqcPercentage7;

                this.iqcPercentage1 = parseInt(json.iqcPercentage1*100/sumallPie);
                this.iqcPercentage2 = parseInt(json.iqcPercentage2*100/sumallPie);
                this.iqcPercentage3 = parseInt(json.iqcPercentage3*100/sumallPie);
                this.iqcPercentage4 = parseInt(json.iqcPercentage4*100/sumallPie);
                this.iqcPercentage5 = parseInt(json.iqcPercentage5*100/sumallPie);
                this.iqcPercentage6 = parseInt(json.iqcPercentage6*100/sumallPie);
                this.iqcPercentage7 = parseInt(json.iqcPercentage7*100/sumallPie);
                
                this.dataSpendIqc.datasets[0].data = [json.countIqcStore, json.countIqcCoursePaid, json.countIqcPromo, json.iqcNotSpend];
                
                
                this.dataGainedIqc.datasets[0].data = [json.countIqcQuiz,json.countIqcPromo];
                this.dataUserIqc.datasets[0].data = [json.iqcPercentage1, json.iqcPercentage2, json.iqcPercentage3,json.iqcPercentage4,json.iqcPercentage5, json.iqcPercentage6, json.iqcPercentage7];
                let array=[];
                let valu = [];
                Object.entries(json.userGraph).map( ([key, val] = entry) => {
                  array.push(key);
                  valu.push(val.iqc);
                });
                
                this.chartData.labels = array;
                this.chartData.datasets =[
                  
                  { label: 'IQC Transactins', borderColor:'red', backgroundColor: '#f87979','data': valu},
                  // {label: 'Companies', borderColor:'blue', backgroundColor: 'blue','data': valu2 } 
                ];
                setTimeout(() => {
                  this.loading = false;
                }, 1000);
                
              })
              
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
    },
    mounted() {
      
      this.$i18n.locale = 'ru';
     
     
    },
    created() {
          this.userInfo = JSON.parse(localStorage.getItem('user'));
          this.getStatistics();
        
           
        
        
       
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
.export{
      float: right;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      width: fit-content;
      padding: 10px;
      color: white;
      border-radius: 15px;
      background-color: #007382;
      box-shadow: 0 0 12px rgba(0,0,0,0.3);
    }
    .anim{
      transform: rotate(0deg);
      animation-name: rotate;
      animation-duration: 0.4s;
      animation-iteration-count: infinite;
    }
    @keyframes rotate {
      0%   {transform: rotate(0deg);}
    
      100% {transform: rotate(180deg);}
    }
</style>









