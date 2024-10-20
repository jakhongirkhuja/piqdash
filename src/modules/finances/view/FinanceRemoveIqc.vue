<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <div class="filterType">
                    <div class="filterType__text">Searcb by:</div>
                    <div class="filterType__buttons btn btn-primary" @click="searchby=0" :class="{'active':searchby==0}">PhoneNumber</div>
                    <div class="filterType__buttons btn btn-primary" @click="searchby=1"  :class="{'active':searchby==1}">Group</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <input type="search" @input="searchInput" v-model="search" class="form-control" :placeholder="searchby? search_g :search_p">
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-12">
                <template v-if="searchby==0">
                    <div class="selected" v-if="selectedPhoneNumber">{{selectedPhoneNumber}}</div>
                </template>
                <template v-else>
                    <div class="selected" v-if="selectedGroupName">{{selectedGroupName}}</div>
                </template>
                <template v-if="searchby==0">
                    <div class="list" >
                        <div class="list__each" v-for="removeIqcUs in removeIqcUser" @click="selectUserGroup(removeIqcUs.phonebook.user_id, removeIqcUs.phonebook.phoneNumber)">{{ '+'+removeIqcUs.phonebook.phoneNumber }}: {{ removeIqcUs.firstName }} {{ removeIqcUs.lastName }}</div>
                    </div>
                </template>
                <template v-else>
                    <div class="list" >
                        <div class="list__each" v-for="removeIqcUserGroup in removeIqcUserGroups" @click="selectUserGroup(removeIqcUserGroup.id, removeIqcUserGroup.groupName)"> {{ removeIqcUserGroup.groupName }}</div>
                    </div>
                </template>
               
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4">
                <input type="number" v-model="iqc" class="form-control text-center">
            </div>
            <div class="col-md-4">
                <input type="text" maxlength="5" v-model="comment" class="form-control text-center">
            </div>
            <div class="col-md-2 filterType text-center"  style="justify-content: center;">
                <span class="mr-2">Notify</span>
                <input type="checkbox" :checked="notify"   v-model="notify" class="form-control" style="position: initial; width: fit-content;">
            </div>
            <div class="col-md-2 filterType">
                <div class="btn btn-primary form-control" @click="submitRemoveForm">Submit</div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="table-responsive">
                        
                        
                        <h5>Last 20 IQC Transactions</h5>
                        <table class="table">
                        <thead class="thead-dark">
                            <tr >
                                <th scope="col">Phone number</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">IQC</th>
                                <th scope="col">Notify</th>
                                <th scope="col">Removed at</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="coulistRemovedIqcUserrse in listRemovedIqcUsers" :key="coulistRemovedIqcUserrse.id">
                                <td>{{coulistRemovedIqcUserrse.useR.phonebook.phoneNumber}}</td>
                                <td>{{ coulistRemovedIqcUserrse.useR.firstName }}</td>
                                <td>{{ coulistRemovedIqcUserrse.useR.lastName }}</td>
                                <td>{{ coulistRemovedIqcUserrse.iqcTransaction.value }}</td>   
                                <td>{{ coulistRemovedIqcUserrse.iqcTransaction.notify? 'Yes': 'No' }}</td> 
                                <td>{{new Date(coulistRemovedIqcUserrse.iqcTransaction.created_at).toLocaleString()}} </td>
                            </tr>
                            
                        </tbody>
                        </table>
                      </div>
            </div>
        </div>
    </div>
</template>
<script>
import {standartAttribute} from '@/globals/globalFunction.js'

export default {
    data() { 
        return {
            url: import.meta.env.VITE_APP_REST_ENDPOINT, 
            loading: true,
            userInfo:null,
            search:'',
            iqc:0,
            notify: false,
            searchby: 0,
            comment: 'removed',
            search_p:'Search: 998991112233',
            search_g:'Search: Target Group Name',
            removeIqcUser:[],
            selectedUserId :null,
            selectedPhoneNumber : null,
            selectedGroupId: null,
            selectedGroupName: null,
            listRemovedIqcUsers: [],
            clicked : false,
        }
    },
    components: {
       
    },
    computed: {
        
    },
    
    watch: {
      totalMessage: function(){

        this.dataMailing.datasets[0].data = [this.totalMessage, this.counterMailing ];
      }
    },
    methods:{
        searchInput(){
          
          if(this.searchby==0){
            this.search = this.search.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
            if(this.search.length>=4){
             
                this.requestApiSearch(1,this.search)
            }
          }else{
            if(this.search.length>=3){
                this.requestApiSearch(1,this.search)
            }
          }
          
          
          
          
          
        },
        selectUserGroup(id, title){
            if(this.searchby==0){
                this.selectedUserId = id;
                this.selectedPhoneNumber = title;
                this.removeIqcUser = [];
            }else{
                this.selectedGroupId = id;
                this.selectedGroupName = title;
                this.removeIqcUserGroups = [];
            }
            
        },
        async submitRemoveForm(){
            if(this.iqc==0){
              return;
            }
            if(this.selectedUserId || this.selectedGroupId){
              if(this.clicked){
                return ;
              }
              this.clicked = true;
              const inputs = {
                  'searchby' : this.searchby,
                  'selectedUserId' : this.selectedUserId,
                  'selectedGroupId': this.selectedGroupId,
                  'iqc' : this.iqc,
                  'comment': this.comment,
                  'notify': this.notify? 1 : 0,
              }
              const todo = standartAttribute();
              const finalResult = Object.assign(inputs, todo);
  
              var data = new FormData()
              
              for (const key in finalResult) {
                data.append(key, finalResult[key]);
  
              }
              try {
                let token = localStorage.getItem('token');
                const response = await fetch(this.url+'api/v1/admin/remove-iqc-users-group', {
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
                    
                     
                  }
                }
                this.clicked = false;
                this.selectedUserId = null;
                  this.selectedPhoneNumber = null;
                  this.removeIqcUser = [];
              
                  this.selectedGroupId = null;
                  this.selectedGroupName = null;
                  this.removeIqcUserGroups = [];
                  this.getRemovedIqcUsers();
              } catch (error) {
                console.error('Ошибка:', error);
                this.clicked = false;
              }

            }
        },
        requestApiSearch(page, search=null){
          let newUrl = this.url+'api/v1/admin/show/users?page=1&search='+search;
          if(this.searchby==1){
             newUrl = this.url+'api/v1/admin/show/groups?page=1&search='+search;
          }
          
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
                    
                    if(this.searchby==1){
                        this.removeIqcUserGroups=data.data;
                    }else{
                        this.removeIqcUser=data.data;
                    }
                   
                       
                    window.scrollTo({top: 0, behavior: 'smooth'});
                });
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
        async getRemovedIqcUsers(){
          let newUrl = this.url+'api/v1/admin/statistics/removed-iqc-users';
          
          
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
                    
                   this.listRemovedIqcUsers = data;
                    console.log(data);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                });
        }
       
       
    },
    mounted() {
      
      this.$i18n.locale = 'ru';
     
     
    },
    created() {
          this.userInfo = JSON.parse(localStorage.getItem('user'));
          this.getRemovedIqcUsers();
        
           
        
        
       
    }
}
</script>
<style>
    .filterType{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .filterType__text{
        margin-right: 10px;
        font-weight: bold;
    }
    .filterType__buttons{
        margin-right: 10px;
        display: inline-block;
    }
    .list{
        margin-top: 4px;
    }
    .list__each, .selected{
        background-color: white;
        font-size: 17px;
        padding: 12px;
        
    }
    .list__each:hover{
        cursor: pointer;
        background-color: rgb(231, 231, 231);
    }
</style>