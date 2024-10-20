import{C as S,P as C}from"./Pagination.b8ff8fbc.js";import{L as k}from"./LanguageSwitcher.c9c9f8e9.js";import{s as b}from"./globalFunction.5ce06618.js";import{_ as y,bu as D,bC as T,bv as F,bw as E,bx as B,bE as Q,bA as U,bF as O,bz as M,bG as N,bD as z,r as v,o as u,c as g,a as t,F as q,e as L,d as I,n as w,f as m,t as h,g as x,a2 as R,a3 as G,h as V}from"./index.34e73fda.js";D.register(T,F,E,B,Q,U,O,M);const Z={data(){return{load:!1,chartData:{labels:[],datasets:[{data:[]}]},dataUserIqc:{labels:["0","5","5-20","20-100","100-200","200-500","500+"],datasets:[{backgroundColor:["#F2C94C","#007382","#FF736E","#4DB1B1","#4B96DC","#96D2F5","#FC756A"],data:[]}]},dataSpendIqc:{labels:["Store","Courses","Promocode","Not spend"],datasets:[{backgroundColor:["#FF736E","#4B96DC","#96D2F5","#007382"],data:[]}]},dataGainedIqc:{labels:["Quizzes","Promocode"],datasets:[{backgroundColor:["#FF736E","#4DB1B1"],data:[]}]},dataOperator:{labels:["Eskiz","PlayMobile"],datasets:[{backgroundColor:["#FF736E","#4DB1B1"],data:[]}]},chartoptions:{responsive:!0,maintainAspectRatio:!1},options:{responsive:!0,maintainAspectRatio:!1,plugins:{tooltip:{callbacks:{label:function(s){let r=s.dataset.label||"";return r=s.raw[1]+` IQC - ${s.raw[0]} Users `,r}}}}},optionsPie:{responsive:!0,maintainAspectRatio:!1,plugins:{tooltip:{callbacks:{label:function(s){let r=s.label||"",i=s.dataset.data.reduce((e,a)=>e+a,0);return r=" "+r+": "+s.raw+` IQC / ${parseInt(s.raw*100/parseInt(i))} %`,r}}}}},optionsPieUser:{responsive:!0,maintainAspectRatio:!1,plugins:{tooltip:{callbacks:{label:function(s){let r=s.label||"",i=s.dataset.data.reduce((e,a)=>e+a,0);return r=" "+r+": "+s.raw+` Users / ${parseInt(s.raw*100/parseInt(i))} %`,r}}}}},disabled:!1,modelName:"",modelUserId:"",currentPage:1,showFilter:!1,customTime:!1,counterMailing:0,currentFilterIndex:3,filters:["Last week","Last month","Last quarter","All time"],last_page:1,total:1,per_page:1,sms:[],response:null,resError:!1,resSuccess:!1,resStringError:"",start_dateC:new Date(new Date().setDate(new Date().getDate()-10)).toISOString().replace("T"," ").slice(0,-8),end_dateC:new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),start_date:"2022-01-01 00:00",end_date:new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),submitButton:!0,smsearch:"",timerId:null,url:"https://api.pharmiq.uz/",loading:!0,userInfo:null,totalMessage:0,iqcAll:0,avarageDay:0,avarageMonth:0,avaragePerUser:0,avaragePerUserNoZero:0,avarageWeek:0,countIqcCoursePaid:0,countIqcStore:0,iqcNotSpend:0,iqcPercentage1:0,iqcPercentage2:0,iqcPercentage3:0,iqcPercentage4:0,iqcPercentage5:0,iqcPercentage6:0,iqcPercentage7:0}},components:{CrudButton:S,Pagination:C,LanguageSwitcher:k,Line:N,Pie:z},computed:{},props:{chartId:{type:String,default:"line-chart"},width:{type:Number,default:400},height:{type:Number,default:400},cssClasses:{default:"",type:String}},watch:{totalMessage:function(){this.dataMailing.datasets[0].data=[this.totalMessage,this.counterMailing]}},methods:{changeFilter(s){switch(document.querySelectorAll(".filterDrop__each.active").forEach(r=>{r.classList.remove("active")}),document.querySelector("#f-"+s).classList.add("active"),this.currentFilterIndex=s,this.customTime=!1,this.end_date=new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),s){case 0:this.start_date=new Date(new Date().setDate(new Date().getDate()-7)).toISOString().replace("T"," ").slice(0,-8);break;case 1:this.start_date=new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().replace("T"," ").slice(0,-8);break;case 2:this.start_date=new Date(new Date().setMonth(new Date().getMonth()-4)).toISOString().replace("T"," ").slice(0,-8);break;case 3:this.start_date="2022-01-01 00:00";break;default:this.start_date="2022-01-01 00:00";break}this.showFilter=!1,this.requestApi(1)},async exportComp(){if(!this.load){this.load=!0;const s={export:""},r=b(),i=Object.assign(s,r);try{let e=localStorage.getItem("token");const c=await(await fetch(this.url+"api/v1/admin/export/usersAndIqc",{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer "+e},responseType:"blob"})).blob(),o=window.URL.createObjectURL(new Blob([c])),n=document.createElement("a");n.href=o,n.setAttribute("download","userIQC.xlsx"),document.body.appendChild(n),n.click(),setTimeout(()=>{this.load=!1},2e3)}catch(e){alert(e),console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",e)}}},async requestApi(s,r=null){this.loading=!0;const i={start_date:this.start_date?this.start_date.replace("T"," "):this.start_dateC,end_date:this.end_date?this.end_date.replace("T"," "):this.end_dateC},e=b(),a=Object.assign(i,e);var c=new FormData;for(const o in a)c.append(o,a[o]);try{let o=localStorage.getItem("token");const n=await fetch(this.url+"api/v1/admin/statistics/finance/date",{method:"POST",body:c,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+o}}),l=await n.json();if(window.scrollTo({top:0,behavior:"smooth"}),n.status==401)this.resStringError=l.message,this.added=!1;else if(l.error)typeof l.message=="object"?this.resError=l.message:this.resStringError=l.message,this.added=!1;else{let _=[],f=[];Object.entries(l.userGraph).map(([P,A]=entry)=>{_.push(P),f.push(A.iqc)}),this.chartData.labels=_,this.chartData.datasets=[{label:"IQC Transactins",borderColor:"red",backgroundColor:"#f87979",data:f}],window.scrollTo({top:0,behavior:"smooth"}),setTimeout(()=>{this.loading=!1},1e3)}}catch(o){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",o)}},getmodel(){console.log(this.start_date),console.log(this.end_date)},searchsm(){clearTimeout(this.timerId),this.smsearch!=""?(this.loading=!0,this.timerId=setTimeout(()=>{this.requestApi(1,this.smsearch)},2e3)):(this.loading=!0,this.timerId=setTimeout(()=>this.requestApi(this.currentPage),2e3))},showsm(s){this.$router.push({name:"sms.show",params:{id:s}})},openmodel(s,r){this.modelUserId=s,this.modelName=r,this.submitButton=!0,this.resError=!1,this.resSuccess=!1,this.resStringError="",$("#exampleModal").modal("show")},showUrl(){console.log("https://api.pharmiq.uz/")},editsm(s){this.$router.push({name:"sms.edit",params:{id:s}})},onPageChange(s){console.log(s),this.currentPage=s,this.loading=!0,this.requestApi(s),localStorage.setItem("currentPageP",s)},refreshList(){this.loading=!0,this.requestApi(1)},async getStatusesMailing(){const s={},r=b(),i=Object.assign(s,r);var e=new FormData;for(const a in i)e.append(a,i[a]);try{let a=localStorage.getItem("token");const c=await fetch(this.url+"api/v1/admin/numbers/getStatusesMailing",{method:"POST",body:e,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+a}}),o=await c.json();c.status==401?this.resStringError=o.message:o.error?typeof o.message=="object"?this.resError=o.message:this.resStringError=o.message:o.data.forEach(p=>{this.counterMailing+=p.total})}catch(a){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",a)}},getStatistics(){try{const s=this.url+"api/v1/admin/statistics/finance";let r=localStorage.getItem("token");const i={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(s,i).then(e=>(e.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),e.json())).then(e=>{console.log(e),this.avarageDay=e.avarageDay,this.avarageMonth=e.avarageMonth,this.avaragePerUser=e.avaragePerUser,this.avaragePerUserNoZero=e.avaragePerUserNoZero,this.avarageWeek=e.avarageWeek,this.countIqcCoursePaid=e.countIqcCoursePaid,this.countIqcStore=e.countIqcStore,this.iqcAll=e.iqcAll,this.iqcNotSpend=e.iqcNotSpend;let a=e.iqcPercentage1+e.iqcPercentage2+e.iqcPercentage3+e.iqcPercentage4+e.iqcPercentage5+e.iqcPercentage6+e.iqcPercentage7;this.iqcPercentage1=parseInt(e.iqcPercentage1*100/a),this.iqcPercentage2=parseInt(e.iqcPercentage2*100/a),this.iqcPercentage3=parseInt(e.iqcPercentage3*100/a),this.iqcPercentage4=parseInt(e.iqcPercentage4*100/a),this.iqcPercentage5=parseInt(e.iqcPercentage5*100/a),this.iqcPercentage6=parseInt(e.iqcPercentage6*100/a),this.iqcPercentage7=parseInt(e.iqcPercentage7*100/a),this.dataSpendIqc.datasets[0].data=[e.countIqcStore,e.countIqcCoursePaid,e.countIqcPromo,e.iqcNotSpend],this.dataGainedIqc.datasets[0].data=[e.countIqcQuiz,e.countIqcPromo],this.dataUserIqc.datasets[0].data=[e.iqcPercentage1,e.iqcPercentage2,e.iqcPercentage3,e.iqcPercentage4,e.iqcPercentage5,e.iqcPercentage6,e.iqcPercentage7];let c=[],o=[];Object.entries(e.userGraph).map(([n,l]=entry)=>{c.push(n),o.push(l.iqc)}),this.chartData.labels=c,this.chartData.datasets=[{label:"IQC Transactins",borderColor:"red",backgroundColor:"#f87979",data:o}],setTimeout(()=>{this.loading=!1},1e3)})}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",s)}}},mounted(){this.$i18n.locale="ru"},created(){this.userInfo=JSON.parse(localStorage.getItem("user")),this.getStatistics()}},d=s=>(R("data-v-be4f5847"),s=s(),G(),s),J={class:"row"},W={class:"col-md-10 text-center"},K={class:"filter"},Y={key:0,class:"filterDrop"},H=["id","onClick"],X={class:"col-md-2"},j=x(" Export"),ee={class:"row"},te={class:"col-md-12"},ae={class:"row mt-3"},se={class:"col-md-4 mt-3 mb-lg-0 stretch-card transparent"},re={class:"card card-light-blue",style:{"background-color":"#F2C94C"}},oe={class:"card-body"},ie=d(()=>t("p",{class:"mb-4"},"All transacted IQC",-1)),ce={class:"fs-30 mb-2"},ne={class:"col-md-4 mt-3 stretch-card transparent"},le={class:"card card-light-danger",style:{"background-color":"#007382"}},de={class:"card-body"},he=d(()=>t("p",{class:"mb-4"},"Av. IQC per day",-1)),pe={class:"fs-30 mb-2"},ue={class:"col-md-4 mt-3 stretch-card transparent"},ge={class:"card card-tale",style:{"background-color":"#FF736E"}},me={class:"card-body"},_e=d(()=>t("p",{class:"mb-4"},"Av. IQC per week",-1)),be={class:"fs-30 mb-2"},fe={class:"col-md-4 mt-3 stretch-card transparent"},ve={class:"card card-tale",style:{"background-color":"#4DB1B1"}},qe={class:"card-body"},Ie=d(()=>t("p",{class:"mb-4"},"Av. IQC per month",-1)),we={class:"fs-30 mb-2"},Pe={class:"col-md-4 mt-3 stretch-card transparent"},Ae={class:"card card-tale",style:{"background-color":"#4B96DC"}},Se={class:"card-body"},Ce=d(()=>t("p",{class:"mb-4"},"Av. IQC per per one user",-1)),ke={class:"fs-30 mb-2"},ye={class:"col-md-4 mt-3 stretch-card transparent"},De={class:"card card-tale",style:{"background-color":"#96D2F5"}},Te={class:"card-body"},Fe=d(()=>t("p",{class:"mb-4"},"Av. IQC per per one user > 0",-1)),Ee={class:"fs-30 mb-2"},Be={class:"row mt-4"},Qe={class:"col-md-4 text-center"},Ue=d(()=>t("h4",{class:"title mt-2"},"Amount of spend IQC ",-1)),Oe={class:"col-md-4 text-center"},Me=d(()=>t("h4",{class:"title mt-2"},"Number of IQC user have % ",-1)),Ne={class:"col-md-4 text-center"},ze=d(()=>t("h4",{class:"title mt-2"},"Number of IQC gained % ",-1)),Le={key:0,class:"loading"},xe=d(()=>t("img",{src:V},null,-1)),Re=[xe];function Ge(s,r,i,e,a,c){const o=v("Line"),n=v("Pie");return u(),g(q,null,[t("div",J,[t("div",W,[t("div",K,[t("img",{title:"Show filter",onClick:r[0]||(r[0]=l=>a.showFilter=!0),src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAz0lEQVRoge3YQQqDMBCF4Z9uvYIui3cvwVO0x3GhB9AuGkFqIxoTk7bvg9mFzEQQHgMiIvJjKsAAva0GqJNO5KECWmB8qxYoE861m2H5iKlusZs/VppvrcLe1a+c6eyZIkC/+zT8ZfaQ4eiX2GgMeFf0mRvcX9HEbh5Sjftnvyacy0vJ68fubBm+8BEiIv9DqTknQVJziPR7dmpOmn59fUrN2c6s1JwjpWYRkQUl05wk3efu4Uq/Z+9zD+9+j+xkQ+5zo/dVMs2RkqmIiMw9AeRc6n4FK62pAAAAAElFTkSuQmCC"})]),a.showFilter?(u(),g("div",Y,[(u(!0),g(q,null,L(a.filters,(l,p)=>(u(),g("div",{class:w(["filterDrop__each",{active:a.currentFilterIndex==p}]),id:"f-"+p,onClick:_=>c.changeFilter(p)},h(l),11,H))),256))])):I("",!0)]),t("div",X,[t("div",{class:"export",onClick:r[1]||(r[1]=(...l)=>c.exportComp&&c.exportComp(...l))},[t("i",{class:w(["ti",{"ti-export":!a.load,"ti-reload anim":a.load}])},null,2),j])])]),t("div",ee,[t("div",te,[m(o,{"chart-options":a.options,"chart-data":a.chartData,"chart-id":i.chartId,width:i.width,height:i.height},null,8,["chart-options","chart-data","chart-id","width","height"])])]),t("div",ae,[t("div",se,[t("div",re,[t("div",oe,[ie,t("p",ce,h(a.iqcAll),1)])])]),t("div",ne,[t("div",le,[t("div",de,[he,t("p",pe,h(a.avarageDay),1)])])]),t("div",ue,[t("div",ge,[t("div",me,[_e,t("p",be,h(a.avarageWeek),1)])])]),t("div",fe,[t("div",ve,[t("div",qe,[Ie,t("p",we,h(a.avarageMonth),1)])])]),t("div",Pe,[t("div",Ae,[t("div",Se,[Ce,t("p",ke,h(a.avaragePerUser),1)])])]),t("div",ye,[t("div",De,[t("div",Te,[Fe,t("p",Ee,h(a.avaragePerUserNoZero),1)])])])]),t("div",Be,[t("div",Qe,[Ue,m(n,{"chart-data":a.dataSpendIqc,"chart-options":a.optionsPie},null,8,["chart-data","chart-options"])]),t("div",Oe,[Me,m(n,{"chart-data":a.dataUserIqc,"chart-options":a.optionsPieUser},null,8,["chart-data","chart-options"])]),t("div",Ne,[ze,m(n,{"chart-data":a.dataGainedIqc,"chart-options":a.optionsPie},null,8,["chart-data","chart-options"])])]),a.loading?(u(),g("div",Le,Re)):I("",!0)],64)}const Ke=y(Z,[["render",Ge],["__scopeId","data-v-be4f5847"]]);export{Ke as default};
