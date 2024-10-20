import{C as v,P as y}from"./Pagination.b8ff8fbc.js";import{L as S}from"./LanguageSwitcher.c9c9f8e9.js";import{s as w}from"./globalFunction.5ce06618.js";import{_ as k,r as m,o as r,c as l,a as e,b as _,d as c,F as g,e as f,t as d,a2 as C,a3 as A,h as P}from"./index.34e73fda.js";const q={data(){return{imageUrl:"https://api.pharmiq.uz/files/group/",disabled:!1,modelName:"",modelUserId:"",currentPage:1,last_page:1,total:1,per_page:1,groups:[],response:null,resError:!1,resSuccess:!1,resStringError:"",submitButton:!0,groupsearch:"",timerId:null,url:"https://api.pharmiq.uz/",loading:!0,userInfo:null}},components:{CrudButton:v,Pagination:y,LanguageSwitcher:S},computed:{},methods:{checkStatus(t,i){let a=new Date(t);return i&&new Date>i?"Arxived":a>new Date?(console.log(a,new Date),"upgoing"):(a<=new Date,"ongoing")},showImageUrl(t){return this.imageUrl+t},searchgroup(){clearTimeout(this.timerId),this.groupsearch!=""?(this.loading=!0,this.timerId=setTimeout(()=>{this.requestApi(1,this.groupsearch)},2e3)):(this.loading=!0,this.timerId=setTimeout(()=>this.requestApi(this.currentPage),2e3))},showgroup(t){this.$router.push({name:"groups.show",params:{id:t}})},openmodel(t,i){this.modelUserId=t,this.modelName=i,this.submitButton=!0,this.resError=!1,this.resSuccess=!1,this.resStringError="",$("#exampleModal").modal("show")},showUrl(){console.log("https://api.pharmiq.uz/")},editgroup(t){this.$router.push({name:"groups.edit",params:{id:t}})},onPageChange(t){console.log(t),this.currentPage=t,this.loading=!0,this.requestApi(t),localStorage.setItem("currentPage",t)},refreshList(){this.loading=!0,this.requestApi(1)},async requestApiDelete(){this.disabled=!0;const t={group_id:this.modelUserId},i=w(),a=Object.assign(t,i);try{let p=localStorage.getItem("token");const o=await(await fetch(this.url+"api/v1/groups/groupDelete/"+this.modelUserId,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer "+p}})).json();o.error?typeof o.message=="object"?this.resError=o.message:this.resStringError=o.message:(this.resSuccess="Successfully Deleted",this.requestApi(1),this.submitButton=!1)}catch(p){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",p)}},requestApi(t,i=null){let a=this.url+"api/v1/groups?page="+t;i&&(a=this.url+"api/v1/groups?page=1&search="+i);let p=localStorage.getItem("token");const s={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+p})};fetch(a,s).then(o=>(o.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),o.json())).then(o=>{this.response=o,this.last_page=o.last_page,this.total=o.total,this.per_page=o.per_page,this.groups=o.data,console.log(this.groups,o),window.scrollTo({top:0,behavior:"smooth"}),setTimeout(()=>{this.loading=!1},1e3)})}},mounted(){this.$i18n.locale="ru",console.log(this.$i18n.availableLocales)},created(){this.userInfo=JSON.parse(localStorage.getItem("user"));const t=localStorage.getItem("currentPage");t&&(this.currentPage=parseInt(t)),this.requestApi(1)}},u=t=>(C("data-v-7fd506a4"),t=t(),A(),t),x={class:"row"},D={class:"col-md-3"},B=u(()=>e("div",{class:"col-md-6"},null,-1)),E=u(()=>e("div",{class:"col-md-3 text-center"},null,-1)),N={class:"mt-3"},U={class:"row"},j={class:"col-12"},L={class:"table-responsive"},T={class:"table"},O=u(()=>e("thead",{class:"thead-dark"},[e("tr",null,[e("th",{scope:"col"},"Name"),e("th",{scope:"col"},"Actions")])],-1)),z={class:"actions"},M=["onClick"],G=u(()=>e("i",{class:"ti ti-pencil-alt","data-toggle":"tooltip",title:"Edit"},null,-1)),F=[G],J=["onClick"],V=u(()=>e("i",{class:"ti ti-trash","data-toggle":"tooltip",title:"Delete"},null,-1)),H=[V],R={class:"modal fade",id:"exampleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},K={class:"modal-dialog",role:"document"},Q={class:"modal-content"},W=u(()=>e("div",{class:"modal-header"},[e("h5",{class:"modal-title",id:"exampleModalLabel"},"Delete group"),e("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[e("span",{"aria-hidden":"true"},"\xD7")])],-1)),X={class:"modal-body text-center"},Y={class:"error"},Z={key:1,class:"error"},ee={key:2,class:"success"},te=u(()=>e("h4",null,"Are you sure you want to delete this group?",-1)),se={class:"modal-footer"},oe=u(()=>e("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal"},"Close",-1)),re=["disabled"],ie={key:0,class:"loading"},le=u(()=>e("img",{src:P},null,-1)),ae=[le];function ne(t,i,a,p,s,o){const b=m("CrudButton"),I=m("Pagination");return r(),l(g,null,[e("div",x,[e("div",D,[s.userInfo&&(s.userInfo.role=="Creator"||s.userInfo.role=="Owner")?(r(),_(b,{key:0,urlName:"groups.add",btnName:"Add Group"})):c("",!0)]),B,E]),e("div",N,[e("div",U,[e("div",j,[e("div",L,[e("table",T,[O,e("tbody",null,[(r(!0),l(g,null,f(s.groups,n=>(r(),l("tr",{key:n.id},[e("td",null,d(n.groupName),1),e("td",z,[s.userInfo&&(s.userInfo.role=="Creator"||s.userInfo.role=="Owner")?(r(),l("div",{key:0,onClick:h=>o.editgroup(n.id),class:"edit mr-2 cursor-pointer"},F,8,M)):c("",!0),s.userInfo&&(s.userInfo.role=="Creator"||s.userInfo.role=="Owner")?(r(),l("div",{key:1,"data-toggle":"modal","data-target":"#exampleModal cursor-pointer",onClick:h=>o.openmodel(n.id,n.groupName),class:"delete text-danger"},H,8,J)):c("",!0)])]))),128))])])]),s.last_page!=1?(r(),_(I,{key:0,"total-pages":this.last_page,total:this.total,"per-page":this.per_page,"current-page":s.currentPage,onPagechanged:o.onPageChange},null,8,["total-pages","total","per-page","current-page","onPagechanged"])):c("",!0)])])]),e("div",R,[e("div",K,[e("div",Q,[W,e("div",X,[s.resError?(r(!0),l(g,{key:0},f(s.resError,(n,h)=>(r(),l("p",Y,d(h)+" : "+d(n[0]),1))),256)):c("",!0),s.resStringError?(r(),l("p",Z,d(s.resStringError),1)):c("",!0),s.resSuccess?(r(),l("p",ee,d(s.resSuccess),1)):c("",!0),te,e("h4",null,d(s.modelName),1),e("p",null,"groupId: "+d(s.modelUserId),1)]),e("div",se,[oe,s.submitButton?(r(),l("button",{key:0,disabled:s.disabled,type:"button",onClick:i[0]||(i[0]=(...n)=>o.requestApiDelete&&o.requestApiDelete(...n)),class:"btn btn-primary"},"Delete group",8,re)):c("",!0)])])])]),s.loading?(r(),l("div",ie,ae)):c("",!0)],64)}const he=k(q,[["render",ne],["__scopeId","data-v-7fd506a4"]]);export{he as default};
