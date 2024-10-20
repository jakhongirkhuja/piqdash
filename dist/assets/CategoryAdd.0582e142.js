import{G as S}from"./GoBackButton.8ec57f12.js";import{c as U}from"./vue-datepicker.es.17b3f44e.js";import{h as x}from"./maska.esm.cd315c5a.js";import{u as A,r as b,m as y,a as z,b as k}from"./index.esm.b21b73c4.js";import{_ as w,r as L,o,c as i,f as T,a as e,F as m,e as h,d as p,t as u,l as V,w as v,p as B,n as g,v as I,a2 as C,a3 as E}from"./index.34e73fda.js";import{s as F}from"./globalFunction.5ce06618.js";const R={setup(){return{v$:A()}},directives:{maska:x},components:{GoBackButton:S,Datepicker:U},data(){return{url:"https://api.pharmiq.uz/",icon_ru:[],icon_ru_prev:null,icon_uz:[],icon_uz_prev:null,access:0,title_ru:"",title_uz:"",added:!1,resError:!1,resSuccess:!1,resStringError:"",userInfo:null}},computed:{isDisabled:function(){if(this.v$.$touch(),this.v$.$error)return!0}},validations(){return{title_ru:{required:b,minLengthValue:y(3),maxLengthValue:z(30)},title_uz:{required:b,minLengthValue:y(3),maxLengthValue:z(30)},icon_ru:{required:k(()=>this.icon_ru.length==0)},icon_uz:{required:k(()=>this.icon_uz.length==0)}}},methods:{checkAccess(c){this.access=c.target.value},uploadFileIconRu(c){var s=c.target.files||c.dataTransfer.files;!s.length||(this.icon_ru=s[0],this.icon_ru_prev=URL.createObjectURL(s[0]))},uploadFileIconUz(c){var s=c.target.files||c.dataTransfer.files;!s.length||(this.icon_uz=s[0],this.icon_uz_prev=URL.createObjectURL(s[0]))},async requestApi(){const c={categoryName_ru:this.title_ru,categoryName_uz:this.title_uz,access:this.access},s=F(),f=Object.assign(c,s);var n=new FormData;n.append("categoryIcon_ru",this.icon_ru),n.append("categoryIcon_uz",this.icon_uz);for(const r in f)n.append(r,f[r]);try{let r=localStorage.getItem("token");const l=await fetch(this.url+"api/v1/course/category/add",{method:"POST",body:n,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+r}}),_=await l.json();window.scrollTo({top:0,behavior:"smooth"}),l.status==401?this.resStringError=_.message:_.error?typeof _.message=="object"?this.resError=_.message:this.resStringError=_.message:(this.added=!0,this.resSuccess="Course Successfully Added")}catch(r){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",r)}},submitForm(){this.v$.$touch(),!this.v$.$error&&this.requestApi()}},created(){this.userInfo=JSON.parse(localStorage.getItem("user"))}},d=c=>(C("data-v-4fb5f1ac"),c=c(),E(),c),q={class:"mt-3"},j={class:"row"},D={class:"col-md-12 grid-margin stretch-card"},N={class:"card"},O={class:"card-body"},G=d(()=>e("h4",{class:"card-title"},"Add category",-1)),Z={class:"error"},M={key:1,class:"error"},P={key:2,class:"success"},$={class:"form-group row"},J={class:"col-md-12"},H=d(()=>e("label",{class:"col-sm-3",for:"banner"},"Access",-1)),K=d(()=>e("option",{selected:"",value:"0"},"Public",-1)),Q=d(()=>e("option",{value:"1"},"Private",-1)),W=[K,Q],X={class:"col-md-6"},Y=d(()=>e("label",{class:"col-sm-3 col-form-label",for:"icon"},"Icon (\u0420\u0423)",-1)),ee=["src"],se={class:"col-md-6"},re=d(()=>e("label",{class:"col-sm-3 col-form-label",for:"icon"},"Icon (UZ)",-1)),te=["src"],oe={class:"form-group row"},ie={class:"col-md-6"},ce=d(()=>e("label",{for:"exampleInputTitleRu"},"Title (\u0420\u0423)",-1)),ne={class:"col-md-6"},le=d(()=>e("label",{for:"exampleInputTitleUZ"},"Title (UZ)",-1)),ae=["disabled"];function ue(c,s,f,n,r,l){const _=L("GoBackButton");return o(),i(m,null,[T(_),e("div",q,[e("div",j,[e("div",D,[e("div",N,[e("div",O,[G,r.resError?(o(!0),i(m,{key:0},h(r.resError,(t,a)=>(o(),i("p",Z,u(a)+" : "+u(t[0]),1))),256)):p("",!0),r.resStringError?(o(),i("p",M,u(r.resStringError),1)):p("",!0),r.resSuccess?(o(),i("p",P,u(r.resSuccess),1)):p("",!0),e("form",{class:"forms-sample",onSubmit:s[6]||(s[6]=V(t=>l.submitForm(),["prevent"]))},[e("div",$,[e("div",J,[H,v(e("select",{"onUpdate:modelValue":s[0]||(s[0]=t=>r.access=t),onChange:s[1]||(s[1]=(...t)=>l.checkAccess&&l.checkAccess(...t)),class:"form-control"},W,544),[[B,r.access]])]),e("div",X,[Y,r.icon_ru_prev?(o(),i("img",{key:0,src:r.icon_ru_prev,class:"image_prev"},null,8,ee)):p("",!0),e("input",{type:"file",id:"icon",onChange:s[2]||(s[2]=t=>l.uploadFileIconRu(t)),accept:"image/*",class:g([{"border border-danger":n.v$.icon_ru.$errors.length>0},"form-control"])},null,34),(o(!0),i(m,null,h(n.v$.icon_ru.$errors,(t,a)=>(o(),i("small",{class:"error",key:a},u(t.$message),1))),128))]),e("div",se,[re,r.icon_uz_prev?(o(),i("img",{key:0,src:r.icon_uz_prev,class:"image_prev"},null,8,te)):p("",!0),e("input",{type:"file",id:"icon",onChange:s[3]||(s[3]=t=>l.uploadFileIconUz(t)),accept:"image/*",class:g([{"border border-danger":n.v$.icon_uz.$errors.length>0},"form-control"])},null,34),(o(!0),i(m,null,h(n.v$.icon_uz.$errors,(t,a)=>(o(),i("small",{class:"error",key:a},u(t.$message),1))),128))])]),e("div",oe,[e("div",ie,[ce,v(e("input",{type:"text",class:g(["form-control",{"border border-danger":n.v$.title_ru.$errors.length>0}]),id:"exampleInputTitleRu","onUpdate:modelValue":s[4]||(s[4]=t=>r.title_ru=t)},null,2),[[I,r.title_ru]]),(o(!0),i(m,null,h(n.v$.title_ru.$errors,(t,a)=>(o(),i("small",{class:"error",key:a},u(t.$message),1))),128))]),e("div",ne,[le,v(e("input",{type:"text",class:g(["form-control",{"border border-danger":n.v$.title_uz.$errors.length>0}]),id:"exampleInputTitleUZ","onUpdate:modelValue":s[5]||(s[5]=t=>r.title_uz=t)},null,2),[[I,r.title_uz]]),(o(!0),i(m,null,h(n.v$.title_uz.$errors,(t,a)=>(o(),i("small",{class:"error",key:a},u(t.$message),1))),128))])]),r.added?p("",!0):(o(),i("button",{key:0,type:"submit",disabled:l.isDisabled,class:"btn btn-primary mr-2"},"Create",8,ae))],32)])])])])])],64)}const fe=w(R,[["render",ue],["__scopeId","data-v-4fb5f1ac"]]);export{fe as default};
