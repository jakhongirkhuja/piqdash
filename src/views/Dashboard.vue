<template >
<!-- <iframe  src="https://store.pharmiq.uz" style="display:none;" @load="logoutFromPharm" id="iframe"></iframe> -->
    <div class="row"  >
      <div class="col-md-6 grid-margin stretch-card">
        
        <div class="card tale-bg">
          
          <div class="card-people mt-auto">
            <p class="mb-4 ml-5">User Registered</p>
            <Line
                :chart-options="chartOptions"
                :chart-data="chartData"
                :chart-id="chartId"
                :dataset-id-key="datasetIdKey"
                :plugins="plugins"
                :css-classes="cssClasses"
                :styles="styles"
                :width="width"
                :height="height"
              />
          </div>
        </div>
      </div>
      <div class="col-md-6 grid-margin stretch-card">
        
        <div class="card tale-bg">
          
          <div class="card-people mt-auto">
            <p class="mb-4 ml-5">Company Registered</p>
            <Line
                :chart-options="chartOptions"
                :chart-data="chartData2"
                :chart-id="chartId2"
                :dataset-id-key="datasetIdKey"
                :plugins="plugins"
                :css-classes="cssClasses"
                :styles="styles"
                :width="width"
                :height="height"
              />
          </div>
        </div>
      </div>
      <div class="col-md-12 grid-margin transparent">
       
        <div class="row">
          <div class="col-md-4 mb-4 mb-lg-0 stretch-card transparent">
            <div class="card card-light-blue">
              <div class="card-body">
                <p class="mb-4">Companies</p>
                <p class="fs-30 mb-2">{{companies}}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 stretch-card transparent">
            <div class="card card-light-danger">
              <div class="card-body">
                <p class="mb-4">Courses</p>
                <p class="fs-30 mb-2">{{courses}}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 stretch-card transparent">
            <div class="card card-tale">
              <div class="card-body">
                <p class="mb-4">Employees</p>
                <p class="fs-30 mb-2">{{employees}}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div id="map" style="min-width: 100%; height: 400px"></div>
      </div>
      <div class="col-md-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
            <p class="card-title">Last 10 Registered Users</p>
            <a  @click="this.$router.push({ name: 'users.all' })" class="text-info">View all</a>
            </div>
              <table class="table" v-if="userslast.length>0">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">PhoneNumber</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in userslast" >
                    <td>{{member.firstName}}</td>
                    <td >{{ member.lastName}}</td>
                    <td><a href="tel:" v-if="member && member.phonebook"> {{'+'+member.phonebook.phoneNumber.substring(0, 3)+' ( '+member.phonebook.phoneNumber.substring(3, 5)+' ) '+member.phonebook.phoneNumber.substring(5, 8)+'-'+member.phonebook.phoneNumber.substring(8, 10)+'-'+member.phonebook.phoneNumber.substring(10, 12)}}</a></td>
                    </tr>
                  
                </tbody>
              </table>
            <p v-else>Empty</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
            <p class="card-title">Last 10 Registered Componies</p>
            <a @click="this.$router.push({ name: 'companies.all' })" class="text-info">View all</a>
            </div>
            <table class="table" v-if="companiesLast.length>0">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Created at</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="company in companiesLast" >
                    <td>{{company.companyName}}</td>
                    <td>{{ new Date(company.created_at).toLocaleDateString('ru-Ru')}}</td>
                    </tr>
                  
                </tbody>
              </table>
            <p v-else>Empty</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="loading"  v-if="loading">
        <img src="/loading.gif">
    </div>
</template>
<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import { Line } from 'vue-chartjs'
import { Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
   } from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale)
export default {
    setup() {
      const settings = {
          apiKey: '',
          lang: 'ru_RU',
          coordorder: 'latlong',
          enterprise: false,
          version: '2.1'
        }
      return {
        settings
      }
    },
    data() { 
        return { 
          urlend: import.meta.env.VITE_APP_REST_ENDPOINT,
          chartData: {
              labels: [ ],
              datasets: [ { data: [] } ]
            },
            chartData2: {
              labels: [ ],
              datasets: [ { data: [] } ]
            },
            chartOptions: {
              responsive: true,
              maintainAspectRatio: false
            },
            weather: null,
            lat : 41.311081,
            long: 69.240562,
            employees:0,
            owners:0,
            companies:0,
            courses: 0,
            coor:{},
            companiesLast: {},
            userslast:{},
            loading: true,
             coords: [
              54.82896654088406,
              39.831893822753904,
            ],
            
        }
    },
    components: {
        yandexMap, ymapMarker, Line
    },
    computed: {
    
    },
    props: {
      chartId: {
        type: String,
        default: 'line-chart'
      },
      chartId2: {
        type: String,
        default: 'line-chart2'
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
      
        getCoordinate(){
          
          navigator.geolocation.getCurrentPosition((position) => {
          
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
        });
          
          
        },
        getWeather(){
          
          try {
            const url = 'https://weatherdbi.herokuapp.com/data/weather/'+this.lat+','+this.long;

            const options = {
              method: 'GET',
             
            };

            fetch(url, options)
              .then(res => res.json())
              .then(json =>this.weather= json)
              .catch(err => console.error('error:' + err));
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        getStatistics(){
          let self = this;
          try {
            const url = this.urlend+'api/v1/admin/statistics';
            const options = {
              method: 'GET',
              headers: new Headers({
              'Authorization': 'Bearer '+localStorage.getItem('token'), 
              'Content-Type': 'application/json'
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
                this.companies = json.companies;
                this.employees = json.employees;
                this.owners = json.owners;
                this.courses = json.courses;
                this.userslast = json.usersLast;
                this.companiesLast = json.companiesLast;
                this.coor = json.coor;
                let array=[];
                let array2 = [];
                let valu = [];
                let valu2=[];
                let values = Object.entries(json.phonebooks).map( ([key, val] = entry) => {
                  array.push(key);
                  valu.push(val.length);
                });
                Object.entries(json.companystat).map( ([key, val] = entry) => {
                  // array.indexOf(key) === -1 ? array.push(key) : console.log("This item already exists");
                  array2.push(key);
                  valu2.push(val.length);
                });
                // alert(array2)
                this.chartData.labels = array;
                this.chartData.datasets =[
                  
                  { label: 'Users', borderColor:'red', backgroundColor: '#f87979','data': valu},
                  // {label: 'Companies', borderColor:'blue', backgroundColor: 'blue','data': valu2 } 
                ];
                this.chartData2.labels = array2;
                this.chartData2.datasets =[
                  
                  // { label: 'Users', borderColor:'red', backgroundColor: '#f87979','data': valu},
                  {label: 'Companies', borderColor:'blue', backgroundColor: 'blue','data': valu2 } 
                ];
                // console.log(array,valu);
                localStorage.setItem('user', JSON.stringify(json.user));
                if(json.user){
                  if(json.user.role =='Employee' ||  json.user.role =='Company Owner'){
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href='https://go.pharmiq.uz/';
                  }
                }

                 ymaps.ready(function () {
                    var map = new ymaps.Map('map', {
                        center: [41.311081, 69.240562],
                        zoom: 11
                    }, {
                        searchControlProvider: 'yandex#search'
                    });
                    json.coor.forEach(element => {
                       let lat = element.latitude;
                       let long = element.longitude;
                        if(element.latitude>60){
                          long = element.latitude;
                          lat = element.longitude;
                        }
                        map.geoObjects
                          .add(
                            new ymaps.Placemark([lat, long], {
                            hintContent: element.companyName,
                            balloonContent: element.companyName
                          })
                          )
                    });
                   


                });
                setTimeout(() => {
                  this.loading = false;
                }, 1000);
                
              })
              .catch(function(err) {
                self.$router.replace({name: "NotLoged"});
                
                
                console.error('error:' + err)
              
              });
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
        },
        
        logoutFromPharm() {
                    // let targetDomains = 'https://store.pharmiq.uz';
                    // let iframe = document.querySelector('#iframe');
                   
                        // const iWindow = iframe.contentWindow;
                        // if (iWindow) {
                        //     iWindow.postMessage(localStorage.getItem('token'), targetDomains);
                        // }
                       
            }
    },
    created() {
      
      //  this.getCoordinate();
      //  this.getWeather();
        this.getStatistics();
        // this.logoutFromPharm();
       
    }
}
</script>