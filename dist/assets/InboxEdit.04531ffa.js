import{G as x}from"./GoBackButton.8ec57f12.js";import{c as T}from"./vue-datepicker.es.17b3f44e.js";import{h as w}from"./maska.esm.cd315c5a.js";import{u as S,r as _,m as k,b as z}from"./index.esm.b21b73c4.js";import{_ as U,r as D,o as n,c as l,f as j,a as s,F as c,e as p,d as g,t as u,l as B,w as h,v as y,n as b,p as I,a2 as E,a3 as V}from"./index.34e73fda.js";import{s as N}from"./globalFunction.5ce06618.js";const G={setup(){return{v$:S()}},directives:{maska:w},components:{GoBackButton:x,Datepicker:T},data(){return{url:"https://api.pharmiq.uz/",hideGroups:!1,group_id:null,groups:[],newspage:"",banner_ru:[],banner_ru_prev:null,banner_uz:[],banner_uz_prev:null,title_ru:"",title_uz:"",body_ru:"",startDate:null,endDate:null,body_uz:"",messageType:["Notification","Event","Gift","Webinar","Other"],messageTypeIndex:0,categories:[],promocode_id:null,promocodes:[],phonebook_id:null,phonebooks:[],added:!1,resError:!1,resSuccess:!1,resStringError:"",userInfo:null,monetized:0,price:0,category_id:1,sendby:"inbox message to LMS"}},computed:{isDisabled:function(){if(this.v$.$touch(),this.v$.$error)return!0}},validations(){return{phonebook_id:{required:_},startDate:{required:_},endDate:{required:_},sendby:{required:_},title_ru:{required:_,minLengthValue:k(3)},title_uz:{required:_,minLengthValue:k(3)},banner_ru:{required:z(()=>this.messageTypeIndex==this.messageType.length-1)},body_ru:{required:_,minLengthValue:k(10)},body_uz:{required:_,minLengthValue:k(10)}}},methods:{checkCategory(){this.hideGroups=!1,this.category_id=="special"&&(this.getGroups(),this.hideGroups=!0)},getGroups(){let i=this.url+"api/v1/groups?page=1",r=localStorage.getItem("token");const m={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(i,m).then(t=>(t.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),t.json())).then(t=>{this.groups=t.data,this.groups.length>0&&(this.group_id=this.groups[0].id)})},uploadFilebannerRu(i){var r=i.target.files||i.dataTransfer.files;!r.length||(this.banner_ru=r[0],this.banner_ru_prev=URL.createObjectURL(r[0]))},uploadFilebannerUz(i){var r=i.target.files||i.dataTransfer.files;!r.length||(this.banner_uz=r[0],this.banner_uz_prev=URL.createObjectURL(r[0]))},async requestApi(){const i={messageType:this.messageType[this.messageTypeIndex],titleName_ru:this.title_ru,titleName_uz:this.title_uz,descriptionText_ru:this.body_ru,descriptionText_uz:this.body_uz,sentBy:this.sendby,newsPage:this.newspage,promocode_id:this.promocode_id?this.promocode_id:"",phonebook_id:this.phonebook_id,startDate:this.startDate.replace("T"," ")+":00",endDate:this.endDate.replace("T"," ")+":00"},r=N(),m=Object.assign(i,r);var t=new FormData;this.banner_ru.length!=0&&t.append("messageIcon",this.banner_ru);for(const o in m)t.append(o,m[o]);try{let o=localStorage.getItem("token");const v=await fetch(this.url+"api/v1/inbox/edit/"+this.$route.params.id,{method:"POST",body:t,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+o}}),f=await v.json();window.scrollTo({top:0,behavior:"smooth"}),v.status==401?this.resStringError=f.message:f.error?typeof f.message=="object"?this.resError=f.message:this.resStringError=f.message:this.resSuccess="Inbox Successfully Updated"}catch(o){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",o)}},submitForm(){this.v$.$touch(),!this.v$.$error&&this.requestApi()},checkvalue(){console.log(this.startDate)},getvalue(){console.log(this.monetized)},getPromocode(){let i=this.url+"api/v1/promocode?page=1",r=localStorage.getItem("token");const m={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(i,m).then(t=>(t.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),t.json())).then(t=>{this.promocodes=t.data})},getPhonebooks(){let i=this.url+"api/v1/groups?page=1",r=localStorage.getItem("token");const m={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(i,m).then(t=>(t.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),t.json())).then(t=>{this.phonebooks=t.data})},getInbox(){let i=this.url+"api/v1/inbox?inbox_id="+this.$route.params.id,r=localStorage.getItem("token");const m={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(i,m).then(t=>(t.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),t.json())).then(t=>{if(t){this.title_ru=JSON.parse(t.titleName).ru,this.title_uz=JSON.parse(t.titleName).uz,this.body_ru=JSON.parse(t.descriptionText).ru,this.body_uz=JSON.parse(t.descriptionText).uz,this.sendby=t.sentBy;for(let o=0;o<this.messageType.length;o++)this.messageType[o]==t.messageType&&(this.messageTypeIndex=o);this.promocode_id=t.promocode_id,this.newsPage=t.newsPage,this.phonebook_id=t.phonebook_id,this.startDate=t.startDate.replace(" ","T").slice(0,-3),this.endDate=t.endDate.replace(" ","T").slice(0,-3),this.banner_ru_prev=this.url+"files/inboxMessage/"+t.messageIcon}})}},created(){this.userInfo=JSON.parse(localStorage.getItem("user")),this.getInbox(),this.getPromocode(),this.getPhonebooks()}},d=i=>(E("data-v-8eb2f805"),i=i(),V(),i),R={class:"mt-3"},L={class:"row"},q={class:"col-md-12 grid-margin stretch-card"},M={class:"card"},P={class:"card-body"},A=d(()=>s("h4",{class:"card-title"},"Add Inbox",-1)),C={class:"error"},O={key:1,class:"error"},F={key:2,class:"success"},Z={class:"form-group row"},J={class:"col-md-6"},H=d(()=>s("label",{for:"exampleInputTitleRu"},"Title (\u0420\u0423)",-1)),W={class:"col-md-6"},K=d(()=>s("label",{for:"exampleInputTitleUZ"},"Title (UZ)",-1)),Q={class:"form-group row"},X={class:"col-md-6"},Y=d(()=>s("label",{for:"exampleInputbodyRu"},"Body (\u0420\u0423)",-1)),$={class:"col-md-6"},ee=d(()=>s("label",{for:"exampleInputbodyUZ"},"Body (UZ)",-1)),te={class:"form-group row"},oe={class:"col-md-6"},se=d(()=>s("label",{class:"col-sm-3",for:"banner"},"Send By",-1)),re=d(()=>s("option",{value:"inbox message to LMS"},"Inbox message to LMS",-1)),ne=d(()=>s("option",{value:"Mobile notification"},"Mobile notification",-1)),le=[re,ne],ie={key:0,class:"col-md-6"},ae=d(()=>s("label",{class:"col-sm-4",for:"messageType"},"Message Type",-1)),de=["value"],ue=d(()=>s("label",{class:"col-sm-4",for:"banner"},"MssageIcon",-1)),ce=["src"],pe={class:"form-group row"},me={class:"col-md-6"},he=d(()=>s("label",{for:"exampleInputstartRu"},"Start Date",-1)),_e={class:"col-md-6"},ge=d(()=>s("label",{for:"exampleInputendUZ"},"End Date ",-1)),be={class:"form-group row"},fe={key:0,class:"col-md-6"},ye=d(()=>s("label",{class:"col-sm-12",for:"banner"},"PromoCode",-1)),ve=d(()=>s("option",{value:"0"},"Please select one if need",-1)),ke=["value"],Ie={class:"col-md-6"},xe=d(()=>s("label",{class:"col-sm-12",for:"banner"},"Group",-1)),Te=d(()=>s("option",{disabled:""},"Please select one",-1)),we=["value"],Se={class:"form-group row"},ze={class:"col-md-12"},Ue=d(()=>s("label",{for:"exampleInputTitleRu"},"NewsPage Exp( https://pharmiq.uz/ )",-1)),De=["disabled"];function je(i,r,m,t,o,v){const f=D("GoBackButton");return n(),l(c,null,[j(f),s("div",R,[s("div",L,[s("div",q,[s("div",M,[s("div",P,[A,o.resError?(n(!0),l(c,{key:0},p(o.resError,(e,a)=>(n(),l("p",C,u(a)+" : "+u(e[0]),1))),256)):g("",!0),o.resStringError?(n(),l("p",O,u(o.resStringError),1)):g("",!0),o.resSuccess?(n(),l("p",F,u(o.resSuccess),1)):g("",!0),s("form",{class:"forms-sample",onSubmit:r[12]||(r[12]=B(e=>v.submitForm(),["prevent"]))},[s("div",Z,[s("div",J,[H,h(s("input",{type:"text",class:b(["form-control",{"border border-danger":t.v$.title_ru.$errors.length>0}]),id:"exampleInputTitleRu","onUpdate:modelValue":r[0]||(r[0]=e=>o.title_ru=e)},null,2),[[y,o.title_ru]]),(n(!0),l(c,null,p(t.v$.title_ru.$errors,(e,a)=>(n(),l("small",{class:"error",key:a},u(e.$message),1))),128))]),s("div",W,[K,h(s("input",{type:"text",class:b(["form-control",{"border border-danger":t.v$.title_uz.$errors.length>0}]),id:"exampleInputTitleUZ","onUpdate:modelValue":r[1]||(r[1]=e=>o.title_uz=e)},null,2),[[y,o.title_uz]]),(n(!0),l(c,null,p(t.v$.title_uz.$errors,(e,a)=>(n(),l("small",{class:"error",key:a},u(e.$message),1))),128))])]),s("div",Q,[s("div",X,[Y,h(s("textarea",{rows:"10",type:"text",class:b(["form-control",{"border border-danger":t.v$.body_ru.$errors.length>0}]),id:"exampleInputTitleRu","onUpdate:modelValue":r[2]||(r[2]=e=>o.body_ru=e)},null,2),[[y,o.body_ru]]),(n(!0),l(c,null,p(t.v$.body_ru.$errors,(e,a)=>(n(),l("small",{class:"error",key:a},u(e.$message),1))),128))]),s("div",$,[ee,h(s("textarea",{rows:"10",type:"text",class:b(["form-control",{"border border-danger":t.v$.body_uz.$errors.length>0}]),id:"exampleInputTitleUZ","onUpdate:modelValue":r[3]||(r[3]=e=>o.body_uz=e)},null,2),[[y,o.body_uz]]),(n(!0),l(c,null,p(t.v$.body_uz.$errors,(e,a)=>(n(),l("small",{class:"error",key:a},u(e.$message),1))),128))])]),s("div",te,[s("div",oe,[se,h(s("select",{"onUpdate:modelValue":r[4]||(r[4]=e=>o.sendby=e),class:b(["form-control",{"border border-danger":t.v$.sendby.$errors.length>0}])},le,2),[[I,o.sendby]]),(n(!0),l(c,null,p(t.v$.sendby.$errors,(e,a)=>(n(),l("small",{class:"error",key:a},u(e.$message),1))),128))]),o.sendby!="Mobile notification"?(n(),l("div",ie,[ae,h(s("select",{"onUpdate:modelValue":r[5]||(r[5]=e=>o.messageTypeIndex=e),class:"form-control"},[(n(!0),l(c,null,p(o.messageType,(e,a)=>(n(),l("option",{key:a,value:a},u(e),9,de))),128))],512),[[I,o.messageTypeIndex]]),o.messageTypeIndex==o.messageType.length-1?(n(),l(c,{key:0},[ue,o.banner_ru_prev?(n(),l("img",{key:0,src:o.banner_ru_prev,class:"image_prev"},null,8,ce)):g("",!0),s("input",{type:"file",id:"banner",onChange:r[6]||(r[6]=e=>v.uploadFilebannerRu(e)),accept:"image/*",class:"form-control"},null,32)],64)):g("",!0)])):g("",!0)]),s("div",pe,[s("div",me,[he,h(s("input",{type:"datetime-local",class:b(["form-control",{"border border-danger":t.v$.startDate.$errors.length>0}]),id:"exampleInputstartRu","onUpdate:modelValue":r[7]||(r[7]=e=>o.startDate=e)},null,2),[[y,o.startDate]]),(n(!0),l(c,null,p(t.v$.startDate.$errors,(e,a)=>(n(),l("small",{class:"error",key:a},u(e.$message),1))),128))]),s("div",_e,[ge,h(s("input",{type:"datetime-local",class:b(["form-control",{"border border-danger":t.v$.endDate.$errors.length>0}]),id:"exampleInputendUZ","onUpdate:modelValue":r[8]||(r[8]=e=>o.endDate=e)},null,2),[[y,o.endDate]]),(n(!0),l(c,null,p(t.v$.endDate.$errors,(e,a)=>(n(),l("small",{class:"error",key:a},u(e.$message),1))),128))])]),s("div",be,[o.sendby!="Mobile notification"?(n(),l("div",fe,[ye,h(s("select",{"onUpdate:modelValue":r[9]||(r[9]=e=>o.promocode_id=e),class:"form-control"},[ve,(n(!0),l(c,null,p(o.promocodes,e=>(n(),l("option",{key:e.id,value:e.id},u(e.promocode),9,ke))),128))],512),[[I,o.promocode_id]])])):g("",!0),s("div",Ie,[xe,h(s("select",{"onUpdate:modelValue":r[10]||(r[10]=e=>o.phonebook_id=e),class:b(["form-control",{"border border-danger":t.v$.phonebook_id.$errors.length>0}])},[Te,(n(!0),l(c,null,p(o.phonebooks,e=>(n(),l("option",{key:e.id,value:e.id},u(e.groupName),9,we))),128))],2),[[I,o.phonebook_id]]),(n(!0),l(c,null,p(t.v$.phonebook_id.$errors,(e,a)=>(n(),l("small",{class:"error",key:a},u(e.$message),1))),128))])]),s("div",Se,[s("div",ze,[Ue,h(s("input",{type:"text",placeholder:"https://pharmiq.uz/",class:"form-control",id:"exampleInputNewsPAgeRu","onUpdate:modelValue":r[11]||(r[11]=e=>o.newspage=e)},null,512),[[y,o.newspage]])])]),o.added?g("",!0):(n(),l("button",{key:0,type:"submit",disabled:v.isDisabled,class:"btn btn-primary mr-2"},"Update",8,De))],32)])])])])])],64)}const Le=U(G,[["render",je],["__scopeId","data-v-8eb2f805"]]);export{Le as default};
