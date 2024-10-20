import{C as S,P as v}from"./Pagination.b8ff8fbc.js";import{L as C}from"./LanguageSwitcher.c9c9f8e9.js";import{s as k}from"./globalFunction.5ce06618.js";import{_ as w,r as g,o as r,c as i,a as e,b as _,d as l,f as P,F as m,e as f,t as d,a2 as A,a3 as q,h as E}from"./index.34e73fda.js";const N={data(){return{imageUrl:"https://api.pharmiq.uz/files/storeCategory/",disabled:!1,modelName:"",modelUserId:"",currentPage:1,last_page:1,total:1,per_page:1,categories:[],response:null,resError:!1,resSuccess:!1,resStringError:"",submitButton:!0,categoriesearch:"",timerId:null,url:"https://api.pharmiq.uz/",loading:!0,userInfo:null}},components:{CrudButton:S,Pagination:v,LanguageSwitcher:C},computed:{},methods:{showImageUrl(s){return this.imageUrl+s},searchcategory(){clearTimeout(this.timerId),this.categoriesearch!=""?(this.loading=!0,this.timerId=setTimeout(()=>{this.requestApi(1,this.categoriesearch)},2e3)):(this.loading=!0,this.timerId=setTimeout(()=>this.requestApi(this.currentPage),2e3))},showcategory(s){},openmodel(s,c){this.disabled=!1,this.modelUserId=s,this.modelName=c,this.submitButton=!0,this.resError=!1,this.resSuccess=!1,this.resStringError="",$("#exampleModal").modal("show")},showUrl(){console.log("https://api.pharmiq.uz/")},editcategory(s){this.$router.push({name:"storesCategory.edit",params:{id:s}})},onPageChange(s){console.log(s),this.currentPage=s,this.loading=!0,this.requestApi(s),localStorage.setItem("currentPageP",s)},refreshList(){this.loading=!0,this.requestApi(1)},async requestApiDelete(){this.disabled=!0;const s={usid:this.modelUserId},c=k(),h=Object.assign(s,c);try{let u=localStorage.getItem("token");const o=await(await fetch(this.url+"api/v1/store/category/delete/"+this.modelUserId,{method:"POST",body:JSON.stringify(h),headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer "+u}})).json();o.error?typeof o.message=="object"?this.resError=o.message:this.resStringError=o.message:(this.resSuccess="Successfully Deleted",this.requestApi(1),this.submitButton=!1)}catch(u){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",u)}},requestApi(s,c=null){let h=this.url+"api/v1/store/category?page="+s,u=localStorage.getItem("token");const t={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+u})};fetch(h,t).then(o=>(o.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),o.json())).then(o=>{this.response=o,this.last_page=o.last_page,this.total=o.total,this.per_page=o.per_page,this.categories=o.data,console.log(o.data),window.scrollTo({top:0,behavior:"smooth"}),setTimeout(()=>{this.loading=!1},1e3)})}},mounted(){this.$i18n.locale="ru"},created(){this.userInfo=JSON.parse(localStorage.getItem("user"));const s=localStorage.getItem("currentPageP");s&&(this.currentPage=parseInt(s)),this.requestApi(1)}},n=s=>(A("data-v-672851e3"),s=s(),q(),s),B={class:"row"},x={class:"col-md-3"},U=n(()=>e("div",{class:"col-md-6"},null,-1)),L={class:"col-md-3 text-center"},O={class:"mt-3"},j={class:"row"},T={class:"col-12"},z={class:"table-responsive"},D={class:"table"},J=n(()=>e("thead",{class:"thead-dark"},[e("tr",null,[e("th",{scope:"col"},"Image"),e("th",{scope:"col"},"Name"),e("th",{scope:"col"},"Actions")])],-1)),M=["src"],V={class:"actions"},F=["onClick"],G=n(()=>e("i",{class:"ti ti-pencil-alt","data-toggle":"tooltip",title:"Edit"},null,-1)),H=[G],R=["onClick"],K=n(()=>e("i",{class:"ti ti-trash","data-toggle":"tooltip",title:"Edit"},null,-1)),Q=[K],W={class:"modal fade",id:"exampleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},X={class:"modal-dialog",role:"document"},Y={class:"modal-content"},Z=n(()=>e("div",{class:"modal-header"},[e("h5",{class:"modal-title",id:"exampleModalLabel"},"Delete category"),e("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[e("span",{"aria-hidden":"true"},"\xD7")])],-1)),ee={class:"modal-body text-center"},te={class:"error"},se={key:1,class:"error"},oe={key:2,class:"success"},re=n(()=>e("h4",null,"Are you sure you want to delete this category?",-1)),ae={class:"modal-footer"},ie=n(()=>e("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal"},"Close",-1)),le=["disabled"],ne={key:0,class:"loading"},ce=n(()=>e("img",{src:E},null,-1)),de=[ce];function ue(s,c,h,u,t,o){const y=g("CrudButton"),b=g("LanguageSwitcher"),I=g("Pagination");return r(),i(m,null,[e("div",B,[e("div",x,[t.userInfo&&(t.userInfo.role=="Creator"||t.userInfo.role=="Owner")?(r(),_(y,{key:0,urlName:"storesCategory.add",btnName:"Add Category"})):l("",!0)]),U,e("div",L,[P(b)])]),e("div",O,[e("div",j,[e("div",T,[e("div",z,[e("table",D,[J,e("tbody",null,[(r(!0),i(m,null,f(t.categories,a=>(r(),i("tr",{key:a.id},[e("td",null,[e("img",{src:o.showImageUrl(a.icon),alt:""},null,8,M)]),e("td",null,d(s.$i18n.locale=="ru"?JSON.parse(a.name).ru:JSON.parse(a.name).uz),1),e("td",V,[t.userInfo&&(t.userInfo.role=="Creator"||t.userInfo.role=="Owner")?(r(),i("div",{key:0,onClick:p=>o.editcategory(a.id),class:"edit mr-2 cursor-pointer"},H,8,F)):l("",!0),t.userInfo&&(t.userInfo.role=="Creator"||t.userInfo.role=="Owner")?(r(),i("div",{key:1,"data-toggle":"modal","data-target":"#exampleModal cursor-pointer",onClick:p=>o.openmodel(a.id,JSON.parse(a.name).ru),class:"delete text-danger"},Q,8,R)):l("",!0)])]))),128))])])]),t.last_page!=1?(r(),_(I,{key:0,"total-pages":this.last_page,total:this.total,"per-page":this.per_page,"current-page":t.currentPage,onPagechanged:o.onPageChange},null,8,["total-pages","total","per-page","current-page","onPagechanged"])):l("",!0)])])]),e("div",W,[e("div",X,[e("div",Y,[Z,e("div",ee,[t.resError?(r(!0),i(m,{key:0},f(t.resError,(a,p)=>(r(),i("p",te,d(p)+" : "+d(a[0]),1))),256)):l("",!0),t.resStringError?(r(),i("p",se,d(t.resStringError),1)):l("",!0),t.resSuccess?(r(),i("p",oe,d(t.resSuccess),1)):l("",!0),re,e("h4",null,d(t.modelName),1),e("p",null,"categoryId: "+d(t.modelUserId),1)]),e("div",ae,[ie,t.submitButton?(r(),i("button",{key:0,disabled:t.disabled,type:"button",onClick:c[0]||(c[0]=(...a)=>o.requestApiDelete&&o.requestApiDelete(...a)),class:"btn btn-primary"},"Delete category",8,le)):l("",!0)])])])]),t.loading?(r(),i("div",ne,de)):l("",!0)],64)}const _e=w(N,[["render",ue],["__scopeId","data-v-672851e3"]]);export{_e as default};
