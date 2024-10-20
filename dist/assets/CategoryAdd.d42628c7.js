import{G as C}from"./GoBackButton.8ec57f12.js";import{c as k}from"./vue-datepicker.es.17b3f44e.js";import{h as I}from"./maska.esm.cd315c5a.js";import{u as T,b as w,r as v,m as y}from"./index.esm.b21b73c4.js";import{_ as z,r as x,o,c as a,f as B,a as e,F as _,e as h,d as p,t as u,l as E,w as f,p as A,v as S,n as b,a2 as R,a3 as V}from"./index.34e73fda.js";import{s as N}from"./globalFunction.5ce06618.js";const q={setup(){return{v$:T()}},directives:{maska:I},components:{GoBackButton:C,Datepicker:k},data(){return{url:"https://api.pharmiq.uz/",name_ru:"",name_uz:"",banner_ru:[],storeCategoryTypeChoose:1,added:!1,resError:!1,resSuccess:!1,resStringError:"",userInfo:null,storeChoose:null,store:[]}},computed:{isDisabled:function(){if(this.v$.$touch(),this.v$.$error)return!0}},validations(){return{banner_ru:{required:w(()=>this.banner_ru.length==0)},name_ru:{required:v,minLengthValue:y(3)},name_uz:{required:v,minLengthValue:y(3)}}},methods:{async requestApi(){this.added=!0;const n={name_ru:this.name_ru,name_uz:this.name_uz,global_type:this.storeCategoryTypeChoose},t=N(),g=Object.assign(n,t);var l=new FormData;l.append("icon",this.banner_ru);for(const r in g)l.append(r,g[r]);try{let r=localStorage.getItem("token");const m=await fetch(this.url+"api/v1/store/category/add",{method:"POST",body:l,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+r}}),i=await m.json();window.scrollTo({top:0,behavior:"smooth"}),m.status==401?(this.resStringError=i.message,this.added=!1):i.error?(typeof i.message=="object"?this.resError=i.message:this.resStringError=i.message,this.added=!1):this.resSuccess="Store Successfully Added"}catch(r){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",r)}},uploadFilebannerRu(n){var t=n.target.files||n.dataTransfer.files;if(!t.length){this.banner_ru=[],this.banner_ru_prev="";return}this.banner_ru=t[0],this.banner_ru_prev=URL.createObjectURL(t[0])},submitForm(){this.v$.$touch(),!this.v$.$error&&this.requestApi()}},created(){this.userInfo=JSON.parse(localStorage.getItem("user"))}},c=n=>(R("data-v-b0ef31da"),n=n(),V(),n),D={class:"mt-3"},F={class:"row"},L={class:"col-md-12 grid-margin stretch-card"},$={class:"card"},j={class:"card-body"},U=c(()=>e("h4",{class:"card-title"},"Add Category",-1)),G={class:"error"},O={key:1,class:"error"},M={key:2,class:"success"},P={class:"form-group row"},J={class:"col-md-12"},H=c(()=>e("label",{for:"exampleInputTypee"},"Global type",-1)),K=c(()=>e("option",{value:"0"},"Digital",-1)),Q=c(()=>e("option",{value:"1"},"Physical",-1)),W=[K,Q],X={class:"form-group row"},Y={class:"col-md-6"},Z=c(()=>e("label",{for:"exampleInputTitleRu"},"Name ru",-1)),ee={class:"col-md-6"},re=c(()=>e("label",{for:"exampleInputTitleRu"},"Name uz",-1)),se={class:"col-md-12"},te=c(()=>e("label",{class:"col-sm-4",for:"banner"},"Image",-1)),oe=["src"],ae=["disabled"];function ne(n,t,g,l,r,m){const i=x("GoBackButton");return o(),a(_,null,[B(i),e("div",D,[e("div",F,[e("div",L,[e("div",$,[e("div",j,[U,r.resError?(o(!0),a(_,{key:0},h(r.resError,(s,d)=>(o(),a("p",G,u(d)+" : "+u(s[0]),1))),256)):p("",!0),r.resStringError?(o(),a("p",O,u(r.resStringError),1)):p("",!0),r.resSuccess?(o(),a("p",M,u(r.resSuccess),1)):p("",!0),e("form",{class:"forms-sample",onSubmit:t[4]||(t[4]=E(s=>m.submitForm(),["prevent"]))},[e("div",P,[e("div",J,[H,f(e("select",{"onUpdate:modelValue":t[0]||(t[0]=s=>r.storeCategoryTypeChoose=s),class:"form-control"},W,512),[[A,r.storeCategoryTypeChoose]])])]),e("div",X,[e("div",Y,[Z,f(e("input",{type:"text",class:b(["form-control",{"border border-danger":l.v$.name_ru.$errors.length>0}]),placeholder:"Category Name",id:"exampleInputTitleRu","onUpdate:modelValue":t[1]||(t[1]=s=>r.name_ru=s)},null,2),[[S,r.name_ru]]),(o(!0),a(_,null,h(l.v$.name_ru.$errors,(s,d)=>(o(),a("small",{class:"error",key:d},u(s.$message),1))),128))]),e("div",ee,[re,f(e("input",{type:"text",class:b(["form-control",{"border border-danger":l.v$.name_uz.$errors.length>0}]),placeholder:"Category Name",id:"exampleInputTitleRu","onUpdate:modelValue":t[2]||(t[2]=s=>r.name_uz=s)},null,2),[[S,r.name_uz]]),(o(!0),a(_,null,h(l.v$.name_uz.$errors,(s,d)=>(o(),a("small",{class:"error",key:d},u(s.$message),1))),128))]),e("div",se,[te,n.banner_ru_prev?(o(),a("img",{key:0,src:n.banner_ru_prev,class:"image_prev"},null,8,oe)):p("",!0),e("input",{type:"file",id:"banner",onChange:t[3]||(t[3]=s=>m.uploadFilebannerRu(s)),accept:"image/*",class:b([{"border border-danger":l.v$.banner_ru.$errors.length>0},"form-control"])},null,34),(o(!0),a(_,null,h(l.v$.banner_ru.$errors,(s,d)=>(o(),a("small",{class:"error",key:d},u(s.$message),1))),128))])]),r.added?p("",!0):(o(),a("button",{key:0,type:"submit",disabled:m.isDisabled,class:"btn btn-primary mr-2"},"Create",8,ae))],32)])])])])])],64)}const _e=z(q,[["render",ne],["__scopeId","data-v-b0ef31da"]]);export{_e as default};
