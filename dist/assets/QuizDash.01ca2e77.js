import{C as D,P as y}from"./Pagination.b8ff8fbc.js";import{L as Q}from"./LanguageSwitcher.c9c9f8e9.js";import{s as f}from"./globalFunction.5ce06618.js";import{e as z}from"./exportFromJSON.de0e6beb.js";import{_ as F,bu as q,bv as I,bw as T,bx as A,by as k,bz as C,bA as B,bB as E,r as O,o as u,c as p,a as t,t as l,f as x,F as v,e as U,d as b,a2 as P,a3 as N,h as L}from"./index.34e73fda.js";q.register(I,T,A,k,C,B);const M={data(){return{load:!1,barData:{datasets:[{data:[20,10]}],labels:["a","b"]},chartData:{labels:["1st attempt","2nd attempt","3rd attempt","4th attempt","5th attempt","5+ attempts","Non passed"],datasets:[{label:"%",backgroundColor:["#007382","#FF736E","#4DB1B1","#4B96DC","#96D2F5","#F2C94C","#f87979"],data:[],rw:0}]},chartoptions:{responsive:!0,plugins:{tooltip:{callbacks:{label:function(s){let r=s.label||"",o=Math.ceil(s.raw*s.dataset.rw/100);return r=" "+o+" Users: "+s.raw+"%",r}}}}},disabled:!1,modelName:"",modelUserId:"",currentPage:1,customTime:!1,counterMailing:0,currentFilterIndex:3,filters:["Last week","Last month","Last quarter","All time"],last_page:1,total:1,per_page:1,sms:[],response:null,resError:!1,resSuccess:!1,resStringError:"",start_dateC:new Date(new Date().setDate(new Date().getDate()-10)).toISOString().replace("T"," ").slice(0,-8),end_dateC:new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),start_date:"2022-01-01 00:00",end_date:new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),submitButton:!0,smsearch:"",timerId:null,url:"https://api.pharmiq.uz/",loading:!0,userInfo:null,totalMessage:0,attemptQuizzes:0,participantQuizzes:0,averateQuizzes:0,averateFalseQuizzes:0,avaragePerUser:0,avaragePerUserNoZero:0,restartQuizzes:0,countIqcCoursePaid:0,countIqcStore:0,iqcNotSpend:0,passingone:0,passingtwo:0,passingthree:0,passingfour:0,passingfive:0,passingfiveplus:0,passingzero:0,sumallUser:0,courseQuiz:[]}},components:{CrudButton:D,Pagination:y,LanguageSwitcher:Q,Bar:E},computed:{},props:{chartId:{type:String,default:"line-chart"},width:{type:Number,default:400},height:{type:Number,default:400},cssClasses:{default:"",type:String}},methods:{downloadFile(){const s="q-list",r=z.types.csv;let o=[];this.courseQuiz.forEach(e=>{let a={"Course Name":e.course,Attempting:e.courseQuizAttampq1,Participants:e.courseQuizparticipantsq2,Restart:e.courseQuizRestartq3,Average:e.courseQuizAverageRightq4,"Average (no correct)":e.courseQuizAverageFalseq4};o.push(a)}),o&&z({data:o,fileName:s,exportType:r})},changeFilter(s){switch(document.querySelectorAll(".filterDrop__each.active").forEach(r=>{r.classList.remove("active")}),document.querySelector("#f-"+s).classList.add("active"),this.currentFilterIndex=s,this.customTime=!1,this.end_date=new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),s){case 0:this.start_date=new Date(new Date().setDate(new Date().getDate()-7)).toISOString().replace("T"," ").slice(0,-8);break;case 1:this.start_date=new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().replace("T"," ").slice(0,-8);break;case 2:this.start_date=new Date(new Date().setMonth(new Date().getMonth()-4)).toISOString().replace("T"," ").slice(0,-8);break;case 3:this.start_date="2022-01-01 00:00";break;default:this.start_date="2022-01-01 00:00";break}this.requestApi(1)},async requestApi(s,r=null){this.loading=!0;const o={start_date:this.start_date?this.start_date.replace("T"," "):this.start_dateC,end_date:this.end_date?this.end_date.replace("T"," "):this.end_dateC},e=f(),a=Object.assign(o,e);var d=new FormData;for(const i in a)d.append(i,a[i]);try{let i=localStorage.getItem("token");const c=await fetch(this.url+"api/v1/admin/statistics/finance/date",{method:"POST",body:d,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+i}}),h=await c.json();if(window.scrollTo({top:0,behavior:"smooth"}),c.status==401)this.resStringError=h.message,this.added=!1;else if(h.error)typeof h.message=="object"?this.resError=h.message:this.resStringError=h.message,this.added=!1;else{let m=[],_=[];Object.entries(h.userGraph).map(([w,S]=entry)=>{m.push(w),_.push(S.iqc)}),this.chartData.labels=m,this.chartData.datasets=[{label:"IQC Transactins",borderColor:"red",backgroundColor:"#f87979",data:_}],window.scrollTo({top:0,behavior:"smooth"}),setTimeout(()=>{this.loading=!1},1e3)}}catch(i){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",i)}},getmodel(){console.log(this.start_date),console.log(this.end_date)},searchsm(){clearTimeout(this.timerId),this.smsearch!=""?(this.loading=!0,this.timerId=setTimeout(()=>{this.requestApi(1,this.smsearch)},2e3)):(this.loading=!0,this.timerId=setTimeout(()=>this.requestApi(this.currentPage),2e3))},showsm(s){this.$router.push({name:"sms.show",params:{id:s}})},openmodel(s,r){this.modelUserId=s,this.modelName=r,this.submitButton=!0,this.resError=!1,this.resSuccess=!1,this.resStringError="",$("#exampleModal").modal("show")},showUrl(){console.log("https://api.pharmiq.uz/")},editsm(s){this.$router.push({name:"sms.edit",params:{id:s}})},onPageChange(s){console.log(s),this.currentPage=s,this.loading=!0,this.requestApi(s),localStorage.setItem("currentPageP",s)},refreshList(){this.loading=!0,this.requestApi(1)},async getStatusesMailing(){const s={},r=f(),o=Object.assign(s,r);var e=new FormData;for(const a in o)e.append(a,o[a]);try{let a=localStorage.getItem("token");const d=await fetch(this.url+"api/v1/admin/numbers/getStatusesMailing",{method:"POST",body:e,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+a}}),i=await d.json();d.status==401?this.resStringError=i.message:i.error?typeof i.message=="object"?this.resError=i.message:this.resStringError=i.message:i.data.forEach(g=>{this.counterMailing+=g.total})}catch(a){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",a)}},getStatistics(){try{const s=this.url+"api/v1/quizz/dash";let r=localStorage.getItem("token");const o={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(s,o).then(e=>(e.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),e.json())).then(e=>{this.attemptQuizzes=e.attemptQuizzes,this.participantQuizzes=e.participantQuizzes,this.restartQuizzes=e.restartQuizzes,this.averateQuizzes=e.averateQuizzes,this.averateFalseQuizzes=e.averateFalseQuizzes,this.courseQuiz=e.courseQuiz,this.passingone=e.passingone,this.passingtwo=e.passingtwo,this.passingthree=e.passingthree,this.passingfour=e.passingfour,this.passingfive=e.passingfive,this.passingfiveplus=e.passingfiveplus,this.passingzero=e.passingzero,this.sumallUser=e.userCount,this.passingone=parseFloat(e.passingone*100/this.sumallUser).toFixed(2),this.passingtwo=parseFloat(e.passingtwo*100/this.sumallUser).toFixed(2),this.passingthree=parseFloat(e.passingthree*100/this.sumallUser).toFixed(),this.passingfour=parseFloat(e.passingfour*100/this.sumallUser).toFixed(3),this.passingfive=parseFloat(e.passingfive*100/this.sumallUser).toFixed(3),this.passingfiveplus=parseFloat(e.passingfiveplus*100/this.sumallUser).toFixed(2),this.passingzero=parseFloat(e.passingzero*100/this.sumallUser).toFixed(),this.chartData.datasets[0].rw=this.sumallUser,this.chartData.datasets[0].data=[this.passingone,this.passingtwo,this.passingthree,this.passingfour,this.passingfive,this.passingfiveplus,this.passingzero],setTimeout(()=>{this.loading=!1},1e3)})}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",s)}}},mounted(){this.$i18n.locale="ru"},created(){this.userInfo=JSON.parse(localStorage.getItem("user")),this.getStatistics()}},n=s=>(P("data-v-8d22b486"),s=s(),N(),s),R=n(()=>t("div",{class:"row"},[t("div",{class:"col-md-12 text-center"},[t("h4",null,"Total number")])],-1)),V={class:"row mt-3"},G={class:"col-md-4 mt-3 mb-lg-0 stretch-card transparent"},J={class:"card card-light-blue",style:{"background-color":"#F2C94C"}},H={class:"card-body"},Z=n(()=>t("p",{class:"mb-4"},"Attempting for the quizzes ",-1)),K={class:"fs-30 mb-2"},W={class:"col-md-4 mt-3 stretch-card transparent"},X={class:"card card-light-danger",style:{"background-color":"#007382"}},Y={class:"card-body"},j=n(()=>t("p",{class:"mb-4"},"Participants of quizzes ",-1)),tt={class:"fs-30 mb-2"},et={class:"col-md-4 mt-3 stretch-card transparent"},st={class:"card card-tale",style:{"background-color":"#FF736E"}},at={class:"card-body"},rt=n(()=>t("p",{class:"mb-4"},"Restart of quizzes",-1)),it={class:"fs-30 mb-2"},ot={class:"col-md-4 mt-3 stretch-cart trasnparent"},nt={class:"card card-tale",style:{"background-color":"#4DB1B1"}},ct={class:"card-body"},lt=n(()=>t("p",{class:"mb-4"},"Average right answers ",-1)),dt={class:"fs-30 mb-2"},ht={class:"col-md-4 mt-3 stretch-cart trasnparent"},ut={class:"card card-tale",style:{"background-color":"#4DB1B1"}},pt={class:"card-body"},gt=n(()=>t("p",{class:"mb-4"},"Average answers (not correct) ",-1)),mt={class:"fs-30 mb-2"},_t=n(()=>t("div",{class:"col-md-12"},[t("hr")],-1)),ft=n(()=>t("div",{class:"col-md-3"},null,-1)),zt={class:"col-md-6 text-center"},vt=n(()=>t("h4",{class:"text-center mt-4"},"Passing quizzes",-1)),bt={class:"col-md-3 vertical-align"},wt={class:"row"},St={class:"col-md-12"},Dt=n(()=>t("h4",{class:"text-center mt-4"},"For each course",-1)),yt={class:"table table-hover"},Qt=n(()=>t("thead",null,[t("tr",null,[t("th",{scope:"col"},"Course Name"),t("th",{scope:"col"},"Attempting"),t("th",{scope:"col"},"Participants"),t("th",{scope:"col"},"Restart"),t("th",{scope:"col"},"Average"),t("th",{scope:"col"},"Average (no correct)")])],-1)),Ft={key:0},qt={scope:"row"},It=n(()=>t("div",{class:"row"},null,-1)),Tt={key:0,class:"loading"},At=n(()=>t("img",{src:L},null,-1)),kt=[At];function Ct(s,r,o,e,a,d){const i=O("Bar");return u(),p(v,null,[R,t("div",V,[t("div",G,[t("div",J,[t("div",H,[Z,t("p",K,l(a.attemptQuizzes),1)])])]),t("div",W,[t("div",X,[t("div",Y,[j,t("p",tt,l(a.participantQuizzes),1)])])]),t("div",et,[t("div",st,[t("div",at,[rt,t("p",it,l(a.restartQuizzes),1)])])]),t("div",ot,[t("div",nt,[t("div",ct,[lt,t("p",dt,l(a.averateQuizzes),1)])])]),t("div",ht,[t("div",ut,[t("div",pt,[gt,t("p",mt,l(a.averateFalseQuizzes),1)])])]),_t,ft,t("div",zt,[vt,x(i,{id:"tooltip",chartOptions:a.chartoptions,chartData:a.chartData},null,8,["chartOptions","chartData"])]),t("div",bt,[t("div",{onClick:r[0]||(r[0]=c=>d.downloadFile()),class:"float-right btn btn-success"},"Export to excel")])]),t("div",wt,[t("div",St,[Dt,t("table",yt,[Qt,a.courseQuiz.length>0?(u(),p("tbody",Ft,[(u(!0),p(v,null,U(a.courseQuiz,c=>(u(),p("tr",{key:c.quiz_id},[t("th",qt,l(c.course),1),t("td",null,l(c.courseQuizAttampq1),1),t("td",null,l(c.courseQuizparticipantsq2),1),t("td",null,l(c.courseQuizRestartq3),1),t("td",null,l(c.courseQuizAverageRightq4),1),t("td",null,l(c.courseQuizAverageFalseq4),1)]))),128))])):b("",!0)])])]),It,a.loading?(u(),p("div",Tt,kt)):b("",!0)],64)}const Pt=F(M,[["render",Ct],["__scopeId","data-v-8d22b486"]]);export{Pt as default};
