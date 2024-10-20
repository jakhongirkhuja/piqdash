import{G as k}from"./GoBackButton.8ec57f12.js";import{c as w}from"./vue-datepicker.es.17b3f44e.js";import{h as I}from"./maska.esm.cd315c5a.js";import{u as L,r as _,m as S,i as T,a as x}from"./index.esm.b21b73c4.js";import{s as E}from"./globalFunction.5ce06618.js";import{C as U,a as z,P as D}from"./ckeditor.713c8e1a.js";import{_ as q,r as V,o as n,c as a,f as j,a as o,F as h,e as p,d as b,t as u,l as C,w as g,v as f,n as y,a2 as B,a3 as A}from"./index.34e73fda.js";import"./_commonjsHelpers.712cc82f.js";import"./vue.runtime.esm-bundler.cd7c4a87.js";const F={setup(){return{v$:L()}},directives:{maska:I},components:{GoBackButton:k,Datepicker:w,ckeditor:U.component},data(){return{url:"https://api.pharmiq.uz/",name:"",description:"",startDate:null,endDate:null,minDate:"",limit:null,deadline:null,course_id:null,resSuccess:null,course_name:"",resError:[],courseSearch:"",courses:[],resStringError:"",editor:z,editorData_ru:"<p>lottery content ru</p>",editorData_uz:"<p>lottery content uz</p>",editorConfig:{}}},computed:{isDisabled:function(){if(this.v$.$touch(),console.log(this.v$.$touch()),this.v$.$error)return!0}},validations(){return{name:{required:_,minLengthValue:S(3)},description:{required:_,minLengthValue:S(3)},limit:{required:_,integer:T,maxLengthValue:x(5)},startDate:{required:_},deadline:{required:_},endDate:{required:_},course_id:{required:_}}},methods:{chooseCourse(i,e){this.course_id=i,this.course_name=e,this.courses=[]},searchcourse(){clearTimeout(this.timerId),this.courseSearch!=""&&this.courseSearch.length>3?this.timerId=setTimeout(()=>{this.requestApiSearch(1,this.courseSearch)},2e3):this.courses=[]},requestApiSearch(i,e=null){let c=this.url+"api/v1/course?page="+i;e&&(c=this.url+"api/v1/course?page=1&search="+e);let s=localStorage.getItem("token");const t={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+s})};fetch(c,t).then(l=>(l.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),l.json())).then(l=>{this.courses=l.data,console.log(this.courses),setTimeout(()=>{this.loading=!1},1e3)})},inputgetseconds(i){if(i=="ru"){document.querySelector("#video_ru").innerHTML=this.video_ru;let c=document.querySelector("#video_ru iframe");const s=new D(c);var e=this;s.getDuration().then(function(t){e.video_ru_length=t}).catch(function(t){console.log(t)})}else{document.querySelector("#video_uz").innerHTML=this.video_uz;let c=document.querySelector("#video_uz iframe");const s=new D(c);var e=this;s.getDuration().then(function(l){e.video_uz_length=l}).catch(function(l){console.log(l)})}},uploadFilebannerRu(i){var e=i.target.files||i.dataTransfer.files;!e.length||(this.banner_ru=e[0],this.banner_ru_prev=URL.createObjectURL(e[0]))},uploadFilebannerUz(i){var e=i.target.files||i.dataTransfer.files;!e.length||(this.banner_uz=e[0],this.banner_uz_prev=URL.createObjectURL(e[0]))},async requestApi(){const i={lottery_id:this.$route.params.id,name:this.name,description:this.description,limit:this.limit,startDate:this.startDate,endDate:this.endDate,deadline:this.deadline,course_id:this.course_id};console.log(i);const e=E(),c=Object.assign(i,e);var s=new FormData;for(const t in c)s.append(t,c[t]);try{let t=localStorage.getItem("token");const l=await fetch(this.url+"api/v1/lottery/edit",{method:"POST",body:s,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+t}}),m=await l.json();window.scrollTo({top:0,behavior:"smooth"});const r=l.status;r==401?this.resStringError=m.message:(console.log(r),console.log(m.error),console.log(m.message),m.error?typeof m.message=="object"?this.resError=m.message:this.resStringError=m.message:(this.added=!0,this.resSuccess="Lottery Successfully Updated"))}catch(t){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",t)}},submitForm(){this.v$.$touch(),!this.v$.$error&&this.requestApi()},checkvalue(){console.log(this.startDate)},getvalue(){console.log(this.monetized)},requestApiGetFirst(){let i=this.url+"api/v1/lottery?lottery_id="+this.$route.params.id,e=localStorage.getItem("token");const c={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+e})};fetch(i,c).then(s=>(s.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),s.json())).then(s=>{console.log(s),this.name=s.name,this.description=s.description,this.startDate=s.startDate.split(" ")[0],this.endDate=s.endDate.split(" ")[0],this.deadline=s.deadline.split(" ")[0],this.limit=s.limit,this.course_id=s.course_id,this.course_name=JSON.parse(s.course.getinfo.courseTitleName).ru,window.scrollTo({top:0,behavior:"smooth"}),setTimeout(()=>{this.loading=!1},1e3)})}},created(){const i=new Date,e=i.getFullYear(),c=String(i.getMonth()+1).padStart(2,"0"),s=String(i.getDate()).padStart(2,"0");this.minDate=`${e}-${c}-${s}`,this.requestApiGetFirst()}},v=i=>(B("data-v-77adc1ba"),i=i(),A(),i),N={class:"mt-3"},$={class:"row"},G={class:"col-md-12 grid-margin stretch-card"},R={class:"card"},O={class:"card-body"},M=v(()=>o("h4",{class:"card-title"},"Edit Lottery",-1)),H={class:"error"},J={key:1,class:"error"},P={key:2,class:"success"},Z={class:"form-group row"},K={class:"col-md-5"},Y=v(()=>o("label",{for:"exampleInputTitleRu"},"Name",-1)),Q={class:"col-md-5"},W=v(()=>o("label",{for:"exampleInputTitleUZ"},"Description",-1)),X={class:"col-md-2"},ee=v(()=>o("label",{for:"exampleInputLimit"},"Limit",-1)),te={class:"form-group row"},re={class:"col-md-4"},se=v(()=>o("label",{for:"exampleInputStartDate"},"Start Date",-1)),oe=["min"],ie={class:"col-md-4"},ne=v(()=>o("label",{for:"exampleInputEnddate"},"End Date",-1)),ae=["min"],le={class:"col-md-4"},ce=v(()=>o("label",{for:"exampleInputLimit"},"Deadline",-1)),de=["min"],ue={class:"row"},me={class:"col-md-12"},he={class:"col-md-12"},pe={class:"col-md-12"},_e=["onClick"],ge=["disabled"];function fe(i,e,c,s,t,l){const m=V("GoBackButton");return n(),a(h,null,[j(m),o("div",N,[o("div",$,[o("div",G,[o("div",R,[o("div",O,[M,t.resError?(n(!0),a(h,{key:0},p(t.resError,(r,d)=>(n(),a("p",H,u(d)+" : "+u(r[0]),1))),256)):b("",!0),t.resStringError?(n(),a("p",J,u(t.resStringError),1)):b("",!0),t.resSuccess?(n(),a("p",P,u(t.resSuccess),1)):b("",!0),o("form",{class:"forms-sample",onSubmit:e[8]||(e[8]=C(r=>l.submitForm(),["prevent"]))},[o("div",Z,[o("div",K,[Y,g(o("input",{type:"text",class:y(["form-control",{"border border-danger":s.v$.name.$errors.length>0}]),id:"exampleInputTitleRu","onUpdate:modelValue":e[0]||(e[0]=r=>t.name=r)},null,2),[[f,t.name]]),(n(!0),a(h,null,p(s.v$.name.$errors,(r,d)=>(n(),a("small",{class:"error",key:d},u(r.$message),1))),128))]),o("div",Q,[W,g(o("input",{type:"text",class:y(["form-control",{"border border-danger":s.v$.description.$errors.length>0}]),id:"exampleInputTitleUZ","onUpdate:modelValue":e[1]||(e[1]=r=>t.description=r)},null,2),[[f,t.description]]),(n(!0),a(h,null,p(s.v$.description.$errors,(r,d)=>(n(),a("small",{class:"error",key:d},u(r.$message),1))),128))]),o("div",X,[ee,g(o("input",{type:"text",class:y(["form-control",{"border border-danger":s.v$.limit.$errors.length>0}]),id:"exampleInputLimit","onUpdate:modelValue":e[2]||(e[2]=r=>t.limit=r)},null,2),[[f,t.limit]]),(n(!0),a(h,null,p(s.v$.limit.$errors,(r,d)=>(n(),a("small",{class:"error",key:d},u(r.$message),1))),128))])]),o("div",te,[o("div",re,[se,g(o("input",{type:"date",min:t.minDate,class:y(["form-control",{"border border-danger":s.v$.startDate.$errors.length>0}]),id:"exampleInputStartDate","onUpdate:modelValue":e[3]||(e[3]=r=>t.startDate=r)},null,10,oe),[[f,t.startDate]]),(n(!0),a(h,null,p(s.v$.startDate.$errors,(r,d)=>(n(),a("small",{class:"error",key:d},u(r.$message),1))),128))]),o("div",ie,[ne,g(o("input",{type:"date",min:t.minDate,class:y(["form-control",{"border border-danger":s.v$.endDate.$errors.length>0}]),id:"exampleInpuEnddate","onUpdate:modelValue":e[4]||(e[4]=r=>t.endDate=r)},null,10,ae),[[f,t.endDate]]),(n(!0),a(h,null,p(s.v$.endDate.$errors,(r,d)=>(n(),a("small",{class:"error",key:d},u(r.$message),1))),128))]),o("div",le,[ce,g(o("input",{type:"date",min:t.minDate,class:y(["form-control",{"border border-danger":s.v$.deadline.$errors.length>0}]),id:"exampleInputLimit","onUpdate:modelValue":e[5]||(e[5]=r=>t.deadline=r)},null,10,de),[[f,t.deadline]]),(n(!0),a(h,null,p(s.v$.deadline.$errors,(r,d)=>(n(),a("small",{class:"error",key:d},u(r.$message),1))),128))])]),o("div",ue,[o("div",me,[g(o("input",{type:"search",onInput:e[6]||(e[6]=(...r)=>l.searchcourse&&l.searchcourse(...r)),"onUpdate:modelValue":e[7]||(e[7]=r=>t.courseSearch=r),class:"form-control",placeholder:"Search"},null,544),[[f,t.courseSearch]])]),o("div",he,[o("b",null,u(t.course_name),1)]),o("div",pe,[(n(!0),a(h,null,p(t.courses,r=>(n(),a("div",{class:"items",onClick:d=>l.chooseCourse(r.id,JSON.parse(r.infos.courseTitleName).ru)},u(JSON.parse(r.infos.courseTitleName).ru),9,_e))),256))])]),i.added?b("",!0):(n(),a("button",{key:0,type:"submit",disabled:l.isDisabled,class:"btn btn-primary mr-2 mt-2"},"Update",8,ge))],32)])])])])])],64)}const Te=q(F,[["render",fe],["__scopeId","data-v-77adc1ba"]]);export{Te as default};
