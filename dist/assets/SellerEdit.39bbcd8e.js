import{G as I}from"./GoBackButton.8ec57f12.js";import{c as j}from"./vue-datepicker.es.17b3f44e.js";import{h as E}from"./maska.esm.cd315c5a.js";import{u as N,r as v,m as U}from"./index.esm.b21b73c4.js";import{_ as q,r as A,k as B,o as a,c,f as C,a as t,F as g,e as _,d as S,t as m,l as L,w as f,p as T,n as b,v as k,m as w,a2 as D,a3 as P}from"./index.34e73fda.js";import{s as y}from"./globalFunction.5ce06618.js";const R={setup(){return{v$:N()}},directives:{maska:E},components:{GoBackButton:I,Datepicker:j},data(){return{url:"https://api.pharmiq.uz/",name:"",added:!1,resError:!1,resSuccess:!1,resStringError:"",userInfo:null,storeChoose:null,phoneNumber:"",store:[],role:0,storeSellerListId:null}},computed:{isDisabled:function(){if(this.v$.$touch(),this.v$.$error)return!0}},validations(){return{role:{required:v},name:{required:v,minLengthValue:U(3)},phoneNumber:{required:v},storeChoose:{required:v}}},methods:{async requestApiSaveStore(n){this.added=!0;const o={store_id:this.storeChoose,seller_id:n},h=y(),e=Object.assign(o,h);var s=new FormData;for(const l in e)s.append(l,e[l]);try{let l=localStorage.getItem("token");const d=await fetch(this.url+"api/v1/store/storeseller/add",{method:"POST",body:s,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+l}}),i=await d.json();window.scrollTo({top:0,behavior:"smooth"});const r=d.status;r==401?(this.resStringError=i.message,this.added=!1):i.error?(typeof i.message=="object"?this.resError=i.message:this.resStringError=i.message,this.added=!1):r==201&&(this.resSuccess="Store Successfully Updated")}catch(l){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",l)}},async requestApiDeleteStore(n){this.added=!0;const o={store_id:this.storeChoose,seller_id:n},h=y(),e=Object.assign(o,h);var s=new FormData;for(const l in e)s.append(l,e[l]);try{let l=localStorage.getItem("token");const d=await fetch(this.url+"api/v1/store/storeseller/delete/"+this.storeSellerListId,{method:"POST",body:s,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+l}}),i=await d.json();window.scrollTo({top:0,behavior:"smooth"});const r=d.status;r==401?(this.resStringError=i.message,this.added=!1):i.error?(typeof i.message=="object"?this.resError=i.message:this.resStringError=i.message,this.added=!1):r==200}catch(l){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",l)}},async requestApi(){this.added=!0;const n={sellerName:this.name,sellerPhone:this.phoneNumber.replace(/\D/g,""),role:this.role},o=y(),h=Object.assign(n,o);var e=new FormData;for(const s in h)e.append(s,h[s]);try{let s=localStorage.getItem("token");const l=await fetch(this.url+"api/v1/store/seller/edit/"+this.$route.params.id,{method:"POST",body:e,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+s}}),d=await l.json();window.scrollTo({top:0,behavior:"smooth"});const i=l.status;i==401?(this.resStringError=d.message,this.added=!1):d.error?(typeof d.message=="object"?this.resError=d.message:this.resStringError=d.message,this.added=!1):i==200?(console.log(d.storeSeller),this.storeSellerListId&&this.requestApiDeleteStore(this.storeSellerListId),this.requestApiSaveStore(d.storeSeller.id)):this.resSuccess="Update error"}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",s)}},uploadFilebannerRu(n){var o=n.target.files||n.dataTransfer.files;if(!o.length){this.banner_ru=[],this.banner_ru_prev="";return}this.banner_ru=o[0],this.banner_ru_prev=URL.createObjectURL(o[0])},submitForm(){this.v$.$touch(),!this.v$.$error&&this.requestApi()},requestGetStore(){let n=this.url+"api/v1/store?page=1",o=localStorage.getItem("token");const h={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+o})};fetch(n,h).then(e=>(e.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),e.json())).then(e=>{this.store=e.data})},getSellerInfo(){let n=this.url+"api/v1/store/seller?seller_id="+this.$route.params.id,o=localStorage.getItem("token");const h={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+o})};fetch(n,h).then(e=>(e.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),e.json())).then(e=>{e&&(this.name=e.sellerName,this.role=e.role?1:0,this.phoneNumber="+"+e.sellerPhone.substring(0,3)+" ( "+e.sellerPhone.substring(3,5)+" ) "+e.sellerPhone.substring(5,8)+"-"+e.sellerPhone.substring(8,10)+"-"+e.sellerPhone.substring(10,12),this.storeSellerListId=e.seller_store_list?e.seller_store_list.id:null,this.storeChoose=e.seller_store_list?e.seller_store_list.store_id:null),console.log(this.storeSellerListId)})}},created(){this.userInfo=JSON.parse(localStorage.getItem("user")),this.requestGetStore(),this.getSellerInfo()}},p=n=>(D("data-v-d2456a87"),n=n(),P(),n),V={class:"mt-3"},x={class:"row"},z={class:"col-md-12 grid-margin stretch-card"},O={class:"card"},F={class:"card-body"},G=p(()=>t("h4",{class:"card-title"},"Update Seller",-1)),$={class:"error"},M={key:1,class:"error"},H={key:2,class:"success"},J={class:"form-group row"},K={class:"col-md-12"},Q=p(()=>t("label",{for:"banner"},"Stores",-1)),W=p(()=>t("option",{disabled:"",value:"0"},"Please select one",-1)),X=["value"],Y={class:"col-md-6"},Z=p(()=>t("label",{for:"exampleInputTitleRu"},"Name",-1)),ee={class:"col-md-6"},se=p(()=>t("label",{for:"phonebook"},"Phone Number",-1)),re={class:"form-group row"},te={class:"col-md-12"},oe=p(()=>t("label",{class:"col-sm-3 col-form-label"},"Role",-1)),le={class:"col-sm-4 ml-3"},ne=p(()=>t("label",{for:"gender1"},"Seller",-1)),ie={class:"col-sm-5"},ae=p(()=>t("label",{for:"gender2"},"Store Owner",-1)),ce=["disabled"];function de(n,o,h,e,s,l){const d=A("GoBackButton"),i=B("maska");return a(),c(g,null,[C(d),t("div",V,[t("div",x,[t("div",z,[t("div",O,[t("div",F,[G,s.resError?(a(!0),c(g,{key:0},_(s.resError,(r,u)=>(a(),c("p",$,m(u)+" : "+m(r[0]),1))),256)):S("",!0),s.resStringError?(a(),c("p",M,m(s.resStringError),1)):S("",!0),s.resSuccess?(a(),c("p",H,m(s.resSuccess),1)):S("",!0),t("form",{class:"forms-sample",onSubmit:o[5]||(o[5]=L(r=>l.submitForm(),["prevent"]))},[t("div",J,[t("div",K,[Q,f(t("select",{"onUpdate:modelValue":o[0]||(o[0]=r=>s.storeChoose=r),class:b(["form-control",{"border border-danger":e.v$.storeChoose.$errors.length>0}])},[W,(a(!0),c(g,null,_(s.store,r=>(a(),c("option",{key:r.id,value:r.id},m(r.storeName),9,X))),128))],2),[[T,s.storeChoose]]),(a(!0),c(g,null,_(e.v$.storeChoose.$errors,(r,u)=>(a(),c("small",{class:"error",key:u},m(r.$message),1))),128))]),t("div",Y,[Z,f(t("input",{type:"text",class:b(["form-control",{"border border-danger":e.v$.name.$errors.length>0}]),placeholder:"Seller name",id:"exampleInputTitleRu","onUpdate:modelValue":o[1]||(o[1]=r=>s.name=r)},null,2),[[k,s.name]]),(a(!0),c(g,null,_(e.v$.name.$errors,(r,u)=>(a(),c("small",{class:"error",key:u},m(r.$message),1))),128))]),t("div",ee,[se,f(t("input",{type:"text",placeholder:"+998 ( 99 ) 999-99-99",class:b(["form-control",{"border border-danger":e.v$.phoneNumber.$errors.length>0}]),"onUpdate:modelValue":o[2]||(o[2]=r=>s.phoneNumber=r)},null,2),[[i,["+998 ( ## ) ###-##-##","+998 ( ## ) ###-##-##"]],[k,s.phoneNumber]]),(a(!0),c(g,null,_(e.v$.phoneNumber.$errors,(r,u)=>(a(),c("small",{class:"error",key:u},m(r.$message),1))),128))]),t("div",re,[t("div",te,[oe,(a(!0),c(g,null,_(e.v$.role.$errors,(r,u)=>(a(),c("small",{class:"error",key:u},m(r.$message),1))),128))]),t("div",le,[f(t("input",{type:"radio",id:"gender1",name:"radio-gender",checked:"",value:0,"onUpdate:modelValue":o[3]||(o[3]=r=>s.role=r)},null,512),[[w,s.role]]),ne]),t("div",ie,[f(t("input",{type:"radio",id:"gender2",name:"radio-gender",value:1,"onUpdate:modelValue":o[4]||(o[4]=r=>s.role=r)},null,512),[[w,s.role]]),ae])])]),s.added?S("",!0):(a(),c("button",{key:0,type:"submit",disabled:l.isDisabled,class:"btn btn-primary mr-2"},"Update",8,ce))],32)])])])])])],64)}const fe=q(R,[["render",de],["__scopeId","data-v-d2456a87"]]);export{fe as default};
