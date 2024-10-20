import{G as I}from"./GoBackButton.8ec57f12.js";import{c as x}from"./vue-datepicker.es.17b3f44e.js";import{h as z}from"./maska.esm.cd315c5a.js";import{u as T,b as w,r as f,m as S,i as k}from"./index.esm.b21b73c4.js";import{_ as U,r as C,o as n,c as a,f as E,a as t,F as d,e as m,d as v,t as u,l as A,w as b,p as B,n as g,v as y,a2 as R,a3 as V}from"./index.34e73fda.js";import{s as $}from"./globalFunction.5ce06618.js";const q={setup(){return{v$:T()}},directives:{maska:z},components:{GoBackButton:I,Datepicker:x},data(){return{url:"https://api.pharmiq.uz/",name_ru:"",name_uz:"",banner_ru:[],price:0,amount:0,added:!1,resError:!1,resSuccess:!1,resStringError:"",userInfo:null,descriptionText_ru:"",descriptionText_uz:"",storeChoose:null,store:[],banner_ru_prev:[]}},computed:{isDisabled:function(){if(this.v$.$touch(),this.v$.$error)return!0}},validations(){return{banner_ru:{required:w(()=>this.banner_ru.length==0)},name_ru:{required:f,minLengthValue:S(3)},name_uz:{required:f,minLengthValue:S(3)},price:{required:f,integer:k},amount:{required:f,integer:k},storeChoose:{required:f}}},methods:{async requestApi(){this.added=!0;const i={name_ru:this.name_ru.toUpperCase(),name_uz:this.name_uz.toUpperCase(),price:this.price,amount:this.amount,ordered:0,category_id:1,store_id:this.storeChoose},o=$(),c=Object.assign(i,o);var s=new FormData;this.banner_ru.forEach(r=>{s.append("img[]",r)});for(const r in c)s.append(r,c[r]);try{let r=localStorage.getItem("token");const h=await fetch(this.url+"api/v1/store/digitalstore/products/add",{method:"POST",body:s,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+r}}),_=await h.json();window.scrollTo({top:0,behavior:"smooth"}),h.status==401?(this.resStringError=_.message,this.added=!1):_.error?(typeof _.message=="object"?this.resError=_.message:this.resStringError=_.message,this.added=!1):this.resSuccess="Store Successfully Added"}catch(r){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",r)}},uploadFilebannerRu(i){var o=i.target.files||i.dataTransfer.files;if(o.length==0){this.banner_ru=[],this.banner_ru_prev=[];return}for(let c=0;c<o.length;c++){const s=o[c];this.banner_ru.push(s),this.banner_ru_prev.push(URL.createObjectURL(s))}},submitForm(){this.v$.$touch(),!this.v$.$error&&this.requestApi()},requestGetStore(){let i=this.url+"api/v1/getStoresByType?type=digital",o=localStorage.getItem("token");const c={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+o})};fetch(i,c).then(s=>(s.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),s.json())).then(s=>{this.store=s.data})}},created(){this.userInfo=JSON.parse(localStorage.getItem("user")),this.requestGetStore()}},p=i=>(R("data-v-1924889d"),i=i(),V(),i),j={class:"mt-3"},D={class:"row"},N={class:"col-md-12 grid-margin stretch-card"},O={class:"card"},P={class:"card-body"},F=p(()=>t("h4",{class:"card-title"},"Add Digital Store Product",-1)),G={class:"error"},L={key:1,class:"error"},M={key:2,class:"success"},Z={class:"form-group row"},H={class:"col-md-12"},X=p(()=>t("label",{for:"banner"},"Stores",-1)),J=p(()=>t("option",{disabled:"",value:"0"},"Please select one",-1)),K=["value"],Q={class:"col-md-6"},W=p(()=>t("label",{for:"exampleInputTitleRu"},"Name ru",-1)),Y={class:"col-md-6"},ee=p(()=>t("label",{for:"exampleInputTitleRu"},"Name uz",-1)),re={class:"col-md-12"},te=p(()=>t("label",{class:"col-sm-4",for:"banner"},"Image",-1)),se=["src"],oe={class:"col-md-6"},ne=p(()=>t("label",{for:"exampleInputTitleUZ"},"Price $",-1)),ae={class:"col-md-6"},le=p(()=>t("label",{for:"exampleInputTitleUZ"},"Amount",-1)),ie=["disabled"];function ue(i,o,c,s,r,h){const _=C("GoBackButton");return n(),a(d,null,[E(_),t("div",j,[t("div",D,[t("div",N,[t("div",O,[t("div",P,[F,r.resError?(n(!0),a(d,{key:0},m(r.resError,(e,l)=>(n(),a("p",G,u(l)+" : "+u(e[0]),1))),256)):v("",!0),r.resStringError?(n(),a("p",L,u(r.resStringError),1)):v("",!0),r.resSuccess?(n(),a("p",M,u(r.resSuccess),1)):v("",!0),t("form",{class:"forms-sample",onSubmit:o[6]||(o[6]=A(e=>h.submitForm(),["prevent"]))},[t("div",Z,[t("div",H,[X,b(t("select",{"onUpdate:modelValue":o[0]||(o[0]=e=>r.storeChoose=e),class:g(["form-control",{"border border-danger":s.v$.storeChoose.$errors.length>0}])},[J,(n(!0),a(d,null,m(r.store,e=>(n(),a("option",{key:e.id,value:e.id},u(e.name),9,K))),128))],2),[[B,r.storeChoose]]),(n(!0),a(d,null,m(s.v$.storeChoose.$errors,(e,l)=>(n(),a("small",{class:"error",key:l},u(e.$message),1))),128))]),t("div",Q,[W,b(t("input",{type:"text",class:g(["form-control capilizie",{"border border-danger":s.v$.name_ru.$errors.length>0}]),placeholder:"IPHONE 14 PRO MAX",id:"exampleInputTitleRu","onUpdate:modelValue":o[1]||(o[1]=e=>r.name_ru=e)},null,2),[[y,r.name_ru]]),(n(!0),a(d,null,m(s.v$.name_ru.$errors,(e,l)=>(n(),a("small",{class:"error",key:l},u(e.$message),1))),128))]),t("div",Y,[ee,b(t("input",{type:"text",class:g(["form-control capilizie",{"border border-danger":s.v$.name_uz.$errors.length>0}]),placeholder:"IPHONE 14 PRO MAX UZ",id:"exampleInputTitleRu","onUpdate:modelValue":o[2]||(o[2]=e=>r.name_uz=e)},null,2),[[y,r.name_uz]]),(n(!0),a(d,null,m(s.v$.name_uz.$errors,(e,l)=>(n(),a("small",{class:"error",key:l},u(e.$message),1))),128))]),t("div",re,[te,(n(!0),a(d,null,m(r.banner_ru_prev,e=>(n(),a("img",{src:e,width:"100",class:"image_prev"},null,8,se))),256)),t("input",{type:"file",id:"banner",onChange:o[3]||(o[3]=e=>h.uploadFilebannerRu(e)),multiple:"",accept:"image/*",class:g([{"border border-danger":s.v$.banner_ru.$errors.length>0},"form-control"])},null,34),(n(!0),a(d,null,m(s.v$.banner_ru.$errors,(e,l)=>(n(),a("small",{class:"error",key:l},u(e.$message),1))),128))]),t("div",oe,[ne,b(t("input",{type:"number",class:g(["form-control",{"border border-danger":s.v$.price.$errors.length>0}]),placeholder:"100",id:"exampleInputTitleUZ","onUpdate:modelValue":o[4]||(o[4]=e=>r.price=e)},null,2),[[y,r.price]]),(n(!0),a(d,null,m(s.v$.price.$errors,(e,l)=>(n(),a("small",{class:"error",key:l},u(e.$message),1))),128))]),t("div",ae,[le,b(t("input",{type:"number",class:g(["form-control",{"border border-danger":s.v$.amount.$errors.length>0}]),placeholder:"10",id:"exampleInputTitleUZ","onUpdate:modelValue":o[5]||(o[5]=e=>r.amount=e)},null,2),[[y,r.amount]]),(n(!0),a(d,null,m(s.v$.amount.$errors,(e,l)=>(n(),a("small",{class:"error",key:l},u(e.$message),1))),128))])]),r.added?v("",!0):(n(),a("button",{key:0,type:"submit",disabled:h.isDisabled,class:"btn btn-primary mr-2"},"Create",8,ie))],32)])])])])])],64)}const ge=U(q,[["render",ue],["__scopeId","data-v-1924889d"]]);export{ge as default};
