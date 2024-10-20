import{G as N}from"./GoBackButton.8ec57f12.js";import{c as j}from"./vue-datepicker.es.17b3f44e.js";import{h as A}from"./maska.esm.cd315c5a.js";import{u as E,r as v,m as I}from"./index.esm.b21b73c4.js";import{_ as B,r as C,k as q,o as a,c as n,f as T,a as r,F as _,e as f,d as b,t as m,l as U,w as g,p as V,n as S,v as y,m as k,a2 as x,a3 as D}from"./index.34e73fda.js";import{s as w}from"./globalFunction.5ce06618.js";const R={setup(){return{v$:E()}},directives:{maska:A},components:{GoBackButton:N,Datepicker:j},data(){return{url:"https://api.pharmiq.uz/",name:"",added:!1,resError:!1,resSuccess:!1,resStringError:"",userInfo:null,storeChoose:null,phoneNumber:"",store:[],role:0}},computed:{isDisabled:function(){if(this.v$.$touch(),this.v$.$error)return!0}},validations(){return{role:{required:v},name:{required:v,minLengthValue:I(3)},phoneNumber:{required:v},storeChoose:{required:v}}},methods:{async requestApiSaveStore(l){this.added=!0;const o={store_id:this.storeChoose,seller_id:l},p=w(),t=Object.assign(o,p);var e=new FormData;for(const i in t)e.append(i,t[i]);try{let i=localStorage.getItem("token");const d=await fetch(this.url+"api/v1/store/storeseller/add",{method:"POST",body:e,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+i}}),c=await d.json();window.scrollTo({top:0,behavior:"smooth"});const s=d.status;s==401?(this.resStringError=c.message,this.added=!1):c.error?(typeof c.message=="object"?this.resError=c.message:this.resStringError=c.message,this.added=!1):s==201&&(this.resSuccess="Store Successfully Added")}catch(i){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",i)}},async requestApi(){this.added=!0;const l={sellerName:this.name,sellerPhone:this.phoneNumber.replace(/\D/g,""),role:this.role},o=w(),p=Object.assign(l,o);var t=new FormData;for(const e in p)t.append(e,p[e]);try{let e=localStorage.getItem("token");const i=await fetch(this.url+"api/v1/store/seller/add",{method:"POST",body:t,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+e}}),d=await i.json();window.scrollTo({top:0,behavior:"smooth"});const c=i.status;c==401?(this.resStringError=d.message,this.added=!1):d.error?(typeof d.message=="object"?this.resError=d.message:this.resStringError=d.message,this.added=!1):c==201?(console.log(d.storeseller),this.requestApiSaveStore(d.storeseller.id)):this.resSuccess="Save error"}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",e)}},uploadFilebannerRu(l){var o=l.target.files||l.dataTransfer.files;if(!o.length){this.banner_ru=[],this.banner_ru_prev="";return}this.banner_ru=o[0],this.banner_ru_prev=URL.createObjectURL(o[0])},submitForm(){this.v$.$touch(),!this.v$.$error&&this.requestApi()},requestGetStore(){let l=this.url+"api/v1/store?page=1",o=localStorage.getItem("token");const p={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+o})};fetch(l,p).then(t=>(t.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),t.json())).then(t=>{this.store=t.data})}},created(){this.userInfo=JSON.parse(localStorage.getItem("user")),this.requestGetStore()}},h=l=>(x("data-v-8d355a1b"),l=l(),D(),l),F={class:"mt-3"},G={class:"row"},L={class:"col-md-12 grid-margin stretch-card"},O={class:"card"},z={class:"card-body"},P=h(()=>r("h4",{class:"card-title"},"Add Seller",-1)),$={class:"error"},M={key:1,class:"error"},H={key:2,class:"success"},J={class:"form-group row"},K={class:"col-md-12"},Q=h(()=>r("label",{for:"banner"},"Stores",-1)),W=h(()=>r("option",{disabled:"",value:"0"},"Please select one",-1)),X=["value"],Y={class:"col-md-6"},Z=h(()=>r("label",{for:"exampleInputTitleRu"},"Name",-1)),ee={class:"col-md-6"},se=h(()=>r("label",{for:"phonebook"},"Phone Number",-1)),re={class:"form-group row"},oe={class:"col-md-12"},te=h(()=>r("label",{class:"col-sm-3 col-form-label"},"Role",-1)),ae={class:"col-sm-4 ml-3"},ne=h(()=>r("label",{for:"gender1"},"Seller",-1)),le={class:"col-sm-5"},ie=h(()=>r("label",{for:"gender2"},"Store Owner",-1)),de=["disabled"];function ce(l,o,p,t,e,i){const d=C("GoBackButton"),c=q("maska");return a(),n(_,null,[T(d),r("div",F,[r("div",G,[r("div",L,[r("div",O,[r("div",z,[P,e.resError?(a(!0),n(_,{key:0},f(e.resError,(s,u)=>(a(),n("p",$,m(u)+" : "+m(s[0]),1))),256)):b("",!0),e.resStringError?(a(),n("p",M,m(e.resStringError),1)):b("",!0),e.resSuccess?(a(),n("p",H,m(e.resSuccess),1)):b("",!0),r("form",{class:"forms-sample",onSubmit:o[5]||(o[5]=U(s=>i.submitForm(),["prevent"]))},[r("div",J,[r("div",K,[Q,g(r("select",{"onUpdate:modelValue":o[0]||(o[0]=s=>e.storeChoose=s),class:S(["form-control",{"border border-danger":t.v$.storeChoose.$errors.length>0}])},[W,(a(!0),n(_,null,f(e.store,s=>(a(),n("option",{key:s.id,value:s.id},m(s.storeName),9,X))),128))],2),[[V,e.storeChoose]]),(a(!0),n(_,null,f(t.v$.storeChoose.$errors,(s,u)=>(a(),n("small",{class:"error",key:u},m(s.$message),1))),128))]),r("div",Y,[Z,g(r("input",{type:"text",class:S(["form-control",{"border border-danger":t.v$.name.$errors.length>0}]),placeholder:"Seller name",id:"exampleInputTitleRu","onUpdate:modelValue":o[1]||(o[1]=s=>e.name=s)},null,2),[[y,e.name]]),(a(!0),n(_,null,f(t.v$.name.$errors,(s,u)=>(a(),n("small",{class:"error",key:u},m(s.$message),1))),128))]),r("div",ee,[se,g(r("input",{type:"text",placeholder:"+998 ( 99 ) 999-99-99",class:S(["form-control",{"border border-danger":t.v$.phoneNumber.$errors.length>0}]),"onUpdate:modelValue":o[2]||(o[2]=s=>e.phoneNumber=s)},null,2),[[c,["+998 ( ## ) ###-##-##","+998 ( ## ) ###-##-##"]],[y,e.phoneNumber]]),(a(!0),n(_,null,f(t.v$.phoneNumber.$errors,(s,u)=>(a(),n("small",{class:"error",key:u},m(s.$message),1))),128))]),r("div",re,[r("div",oe,[te,(a(!0),n(_,null,f(t.v$.role.$errors,(s,u)=>(a(),n("small",{class:"error",key:u},m(s.$message),1))),128))]),r("div",ae,[g(r("input",{type:"radio",id:"gender1",name:"radio-gender",checked:"",value:0,"onUpdate:modelValue":o[3]||(o[3]=s=>e.role=s)},null,512),[[k,e.role]]),ne]),r("div",le,[g(r("input",{type:"radio",id:"gender2",name:"radio-gender",value:1,"onUpdate:modelValue":o[4]||(o[4]=s=>e.role=s)},null,512),[[k,e.role]]),ie])])]),e.added?b("",!0):(a(),n("button",{key:0,type:"submit",disabled:i.isDisabled,class:"btn btn-primary mr-2"},"Create",8,de))],32)])])])])])],64)}const ge=B(R,[["render",ce],["__scopeId","data-v-8d355a1b"]]);export{ge as default};
