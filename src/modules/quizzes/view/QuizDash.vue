








<template>
    <div class="row">
        <div class="col-md-12 text-center">
            <h4>Total number</h4>
        </div>
    </div>
    <div class="row mt-3">
          <div class="col-md-4 mt-3 mb-lg-0 stretch-card transparent">
            <div class="card card-light-blue" style="background-color: #F2C94C">
              <div class="card-body">
                <p class="mb-4">Attempting for the quizzes </p>
                <p class="fs-30 mb-2">{{attemptQuizzes}}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3 stretch-card transparent">
            <div class="card card-light-danger" style="background-color: #007382">
              <div class="card-body">
                <p class="mb-4">Participants of quizzes </p>
                <p class="fs-30 mb-2">{{participantQuizzes}}</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mt-3 stretch-card transparent">
            <div class="card card-tale" style="background-color: #FF736E">
              <div class="card-body">
                <p class="mb-4">Restart of quizzes</p>
                <p class="fs-30 mb-2">{{restartQuizzes}}</p>
                
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3 stretch-cart trasnparent">
            <div class="card card-tale" style="background-color: #4DB1B1">
              <div class="card-body">
                <p class="mb-4">Average right answers </p>
                <p class="fs-30 mb-2">{{averateQuizzes}}</p>
                
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3 stretch-cart trasnparent">
            <div class="card card-tale" style="background-color: #4DB1B1">
              <div class="card-body">
                <p class="mb-4">Average answers (not correct) </p>
                <p class="fs-30 mb-2">{{averateFalseQuizzes}}</p>
                
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <hr>
          </div>
          
          <div class="col-md-3"></div>
          <div class="col-md-6 text-center" >
                <h4 class="text-center mt-4">Passing quizzes</h4> 
                <Bar
                    id="tooltip"
                    :chartOptions="chartoptions"
                    :chartData="chartData"
                />
            </div>
          <div class="col-md-3 vertical-align">
            <div @click="downloadFile()" class="float-right btn btn-success">Export to excel</div>
          </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h4 class="text-center mt-4">For each course</h4> 
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Course Name</th>
                    <th scope="col">Attempting</th>
                    <th scope="col">Participants</th>
                    <th scope="col">Restart</th>
                    <th scope="col">Average</th>
                    <th scope="col">Average (no correct)</th>
                    </tr>
                </thead>
                <tbody v-if="courseQuiz.length>0">
                    <tr v-for="course in courseQuiz" :key="course.quiz_id" >
                        <th scope="row">{{course.course}}</th>
                        <td>{{course.courseQuizAttampq1}}</td>
                        <td>{{course.courseQuizparticipantsq2}}</td>
                        <td>{{course.courseQuizRestartq3}}</td>
                        <td>{{course.courseQuizAverageRightq4}}</td>
                        <td>{{course.courseQuizAverageFalseq4}}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            
        </div>
        
      
    
   
<div class="loading" v-if="loading">
        <img src="/loading.gif">
    </div>
</template>
<script>
import CrudButton from '@/components/CrudButton.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import Pagination from '@/components/Pagination.vue';
import {standartAttribute} from '@/globals/globalFunction.js';
import exportFromJSON from 'export-from-json';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    data() { 
        return {
            load : false,
            barData: {
                datasets: [{
                    data: [20, 10],
                    }],
                    labels: ['a', 'b']
            },
           
            chartData: {
                labels: [ '1st attempt', '2nd attempt', '3rd attempt','4th attempt','5th attempt','5+ attempts','Non passed'],
                datasets: [
                    {
                        label: '%',
                        backgroundColor: ['#007382','#FF736E','#4DB1B1','#4B96DC','#96D2F5','#F2C94C','#f87979'],
                        data: [],
                        rw: 0,
                    }
                ]
            },
            
            chartoptions:{
              responsive: true,
              plugins: {
                
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            
                            let label = context.label || '';
                            let ne  = Math.ceil(context.raw * context.dataset.rw /100) ;
                            
                            label =' '+ne+' Users: '+ context.raw + '%';
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
            attemptQuizzes:0,
            participantQuizzes:0,
            averateQuizzes:0,
            averateFalseQuizzes:0,
            avaragePerUser:0,
            avaragePerUserNoZero:0,
            restartQuizzes:0,
            countIqcCoursePaid:0,
            countIqcStore:0,
            iqcNotSpend:0,
            passingone:0,
            passingtwo:0,
            passingthree:0,
            passingfour:0,
            passingfive:0,
            passingfiveplus:0,
            passingzero:0,
            sumallUser:0,
            courseQuiz:[],
        }
    },
    components: {
        CrudButton,
        Pagination,
        LanguageSwitcher,
        Bar
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
    
    methods:{
        downloadFile(){
          
            const fileName = "q-list";
            const exportType = exportFromJSON.types.csv;
            let data = [];
            this.courseQuiz.forEach(element => {
                let dat  = { 'Course Name' : element.course, 'Attempting': element.courseQuizAttampq1, 'Participants':element.courseQuizparticipantsq2,'Restart':element.courseQuizRestartq3, 'Average':element.courseQuizAverageRightq4, 'Average (no correct)': element.courseQuizAverageFalseq4};
                data.push(dat);
            });
            
            
            if (data) exportFromJSON({ data, fileName, exportType });
        },
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
       
        this.requestApi(1);
         
        // console.log(e,index);
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
            const url = this.url+'api/v1/quizz/dash';
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
                
                this.attemptQuizzes = json.attemptQuizzes;
                this.participantQuizzes = json.participantQuizzes;
                this.restartQuizzes = json.restartQuizzes;
                this.averateQuizzes = json.averateQuizzes;
                this.averateFalseQuizzes = json.averateFalseQuizzes;
                this.courseQuiz = json.courseQuiz;
                this.passingone = json.passingone;
                this.passingtwo = json.passingtwo;
                this.passingthree = json.passingthree;
                this.passingfour = json.passingfour;
                this.passingfive = json.passingfive;
                this.passingfiveplus = json.passingfiveplus;
                this.passingzero = json.passingzero;
                this.sumallUser = json.userCount;
                this.passingone = parseFloat(json.passingone*100/this.sumallUser).toFixed(2);
                this.passingtwo = parseFloat(json.passingtwo*100/this.sumallUser).toFixed(2);
                this.passingthree = parseFloat(json.passingthree*100/this.sumallUser).toFixed();
                this.passingfour = parseFloat(json.passingfour*100/this.sumallUser).toFixed(3);
                this.passingfive = parseFloat(json.passingfive*100/this.sumallUser).toFixed(3);
                this.passingfiveplus = parseFloat(json.passingfiveplus*100/this.sumallUser).toFixed(2);
                this.passingzero = parseFloat(json.passingzero*100/this.sumallUser).toFixed();
                this.chartData.datasets[0].rw = this.sumallUser;
                this.chartData.datasets[0].data = [this.passingone,this.passingtwo,this.passingthree,this.passingfour,this.passingfive,this.passingfiveplus,this.passingzero];
              
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
.vertical-align{
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    position: relative;
    top: 23px;
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