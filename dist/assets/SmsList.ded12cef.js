import{C as k,P as I}from"./Pagination.b8ff8fbc.js";import{L as y}from"./LanguageSwitcher.c9c9f8e9.js";import{s as v}from"./globalFunction.5ce06618.js";import{_ as C,bu as M,bC as E,bw as q,bx as x,bD as P,r as b,o as n,c as r,a as e,g as d,t as u,f as F,d as h,b as w,w as S,v as A,n as D,F as f,e as T,a2 as O,a3 as L,h as B}from"./index.34e73fda.js";M.register(E,q,x);const z={data(){return{load:!1,dataMailing:{labels:["Mailing","SMS"],datasets:[{backgroundColor:["#F2C94C","#007382"],data:[]}]},dataOperator:{labels:["Eskiz","PlayMobile"],datasets:[{backgroundColor:["#FF736E","#4DB1B1"],data:[]}]},options2:{responsive:!0,maintainAspectRatio:!1},options:{responsive:!0,maintainAspectRatio:!1},disabled:!1,modelName:"",modelUserId:"",currentPage:1,showFilter:!1,customTime:!1,counterMailing:0,currentFilterIndex:0,filters:["Total","Last month","Last Week","Today","Custom"],last_page:1,total:1,per_page:1,sms:[],response:null,resError:!1,resSuccess:!1,resStringError:"",start_dateC:new Date(new Date().setDate(new Date().getDate()-10)).toISOString().replace("T"," ").slice(0,-8),end_dateC:new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),start_date:"2022-01-01 00:00",end_date:new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),submitButton:!0,smsearch:"",timerId:null,url:"https://api.pharmiq.uz/",loading:!0,userInfo:null,totalMessage:0}},components:{CrudButton:k,Pagination:I,LanguageSwitcher:y,Pie:P},computed:{},watch:{totalMessage:function(){this.dataMailing.datasets[0].data=[this.totalMessage,this.counterMailing]}},methods:{changeFilter(a){switch(document.querySelectorAll(".filterDrop__each.active").forEach(l=>{l.classList.remove("active")}),document.querySelector("#f-"+a).classList.add("active"),this.currentFilterIndex=a,this.customTime=!1,this.end_date=new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().replace("T"," ").slice(0,-8),a){case 0:this.start_date="2022-01-01 00:00",this.requestApi(1);break;case 1:this.start_date=new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().replace("T"," ").slice(0,-8),this.requestApi(1);break;case 2:this.start_date=new Date(new Date().setDate(new Date().getDate()-7)).toISOString().replace("T"," ").slice(0,-8),this.requestApi(1);break;case 3:this.start_date=new Date(new Date().setDate(new Date().getDate())).toISOString().replace("T"," ").slice(0,-13)+"00:00",this.requestApi(1);break;case 4:this.customTime=!0;break}this.showFilter=!1},getmodel(){console.log(this.start_date),console.log(this.end_date)},searchsm(){clearTimeout(this.timerId),this.smsearch!=""?(this.loading=!0,this.timerId=setTimeout(()=>{this.requestApi(1,this.smsearch)},2e3)):(this.loading=!0,this.timerId=setTimeout(()=>this.requestApi(this.currentPage),2e3))},showsm(a){this.$router.push({name:"sms.show",params:{id:a}})},openmodel(a,l){this.modelUserId=a,this.modelName=l,this.submitButton=!0,this.resError=!1,this.resSuccess=!1,this.resStringError="",$("#exampleModal").modal("show")},showUrl(){console.log("https://api.pharmiq.uz/")},editsm(a){this.$router.push({name:"sms.edit",params:{id:a}})},onPageChange(a){console.log(a),this.currentPage=a,this.loading=!0,this.requestApi(a),localStorage.setItem("currentPageP",a)},refreshList(){this.loading=!0,this.requestApi(1)},async getStatusesMailing(){const a={},l=v(),p=Object.assign(a,l);var m=new FormData;for(const s in p)m.append(s,p[s]);try{let s=localStorage.getItem("token");const c=await fetch(this.url+"api/v1/admin/numbers/getStatusesMailing",{method:"POST",body:m,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+s}}),i=await c.json();c.status==401?this.resStringError=i.message:i.error?typeof i.message=="object"?this.resError=i.message:this.resStringError=i.message:i.data.forEach(g=>{this.counterMailing+=g.total})}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",s)}},async requestApi(a,l=null){this.loading=!0;const p={page:a,start_date:this.start_date?this.start_date.replace("T"," "):this.start_dateC,end_date:this.end_date?this.end_date.replace("T"," "):this.end_dateC},m=v(),s=Object.assign(p,m);var c=new FormData;for(const i in s)c.append(i,s[i]);try{let i=localStorage.getItem("token");const _=await fetch(this.url+"api/v1/admin/numbers/getStatuses",{method:"POST",body:c,headers:{"Accept-Language":"en-US,en;q=0.8",accept:"application/json",Authorization:"Bearer "+i}}),t=await _.json();window.scrollTo({top:0,behavior:"smooth"}),_.status==401?(this.resStringError=t.message,this.added=!1):t.error?(typeof t.message=="object"?this.resError=t.message:this.resStringError=t.message,this.added=!1):(this.response=t,this.last_page=t.data.last_page,this.total=t.data.total,this.per_page=t.data.per_page,this.sms=t.data.data,this.totalMessage==0&&(this.totalMessage=t.data.total,this.dataOperator.datasets[0].data=[t.data.total-47,47],this.load=!0),window.scrollTo({top:0,behavior:"smooth"}),setTimeout(()=>{this.loading=!1},1e3))}catch(i){console.error("\u041E\u0448\u0438\u0431\u043A\u0430:",i)}}},mounted(){this.$i18n.locale="ru",setInterval(()=>{document.querySelector(".questionmark svg").classList.add("animate"),setTimeout(()=>{document.querySelector(".questionmark svg").classList.remove("animate")},5e3)},2e3)},created(){this.userInfo=JSON.parse(localStorage.getItem("user"));const a=localStorage.getItem("currentPageP");a&&(this.currentPage=parseInt(a)),this.requestApi(1),this.getStatusesMailing()}},o=a=>(O("data-v-b76ef3e9"),a=a(),L(),a),V={class:"row"},j={class:"col-md-6"},R={class:"row"},N={class:"col-md-12 text-center"},U=o(()=>e("b",null," Total:",-1)),Q={key:0,class:"col-md-6"},J={class:"col-md-6"},G={class:"row"},K={class:"col-md-1"},Y={class:"questionmark"},Z={"data-toggle":"modal","data-target":"#exampleModal",version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"25",height:"25",viewBox:"0 0 93.936 93.936",style:{"enable-background":"new 0 0 93.936 93.936"},"xml:space":"preserve"},W=o(()=>e("g",null,[e("path",{d:`M80.179,13.758c-18.342-18.342-48.08-18.342-66.422,0c-18.342,18.341-18.342,48.08,0,66.421
                  c18.342,18.342,48.08,18.342,66.422,0C98.521,61.837,98.521,32.099,80.179,13.758z M44.144,83.117
                  c-4.057,0-7.001-3.071-7.001-7.305c0-4.291,2.987-7.404,7.102-7.404c4.123,0,7.001,3.044,7.001,7.404
                  C51.246,80.113,48.326,83.117,44.144,83.117z M54.73,44.921c-4.15,4.905-5.796,9.117-5.503,14.088l0.097,2.495
                  c0.011,0.062,0.017,0.125,0.017,0.188c0,0.58-0.47,1.051-1.05,1.051c-0.004-0.001-0.008-0.001-0.012,0h-7.867
                  c-0.549,0-1.005-0.423-1.047-0.97l-0.202-2.623c-0.676-6.082,1.508-12.218,6.494-18.202c4.319-5.087,6.816-8.865,6.816-13.145
                  c0-4.829-3.036-7.536-8.548-7.624c-3.403,0-7.242,1.171-9.534,2.913c-0.264,0.201-0.607,0.264-0.925,0.173
                  s-0.575-0.327-0.693-0.636l-2.42-6.354c-0.169-0.442-0.02-0.943,0.364-1.224c3.538-2.573,9.441-4.235,15.041-4.235
                  c12.36,0,17.894,7.975,17.894,15.877C63.652,33.765,59.785,38.919,54.73,44.921z`,fill:"#4B49AC"})],-1)),H=o(()=>e("g",null,null,-1)),X=o(()=>e("g",null,null,-1)),ee=o(()=>e("g",null,null,-1)),te=o(()=>e("g",null,null,-1)),se=o(()=>e("g",null,null,-1)),ae=o(()=>e("g",null,null,-1)),oe=o(()=>e("g",null,null,-1)),le=o(()=>e("g",null,null,-1)),ie=o(()=>e("g",null,null,-1)),ne=o(()=>e("g",null,null,-1)),re=o(()=>e("g",null,null,-1)),ce=o(()=>e("g",null,null,-1)),de=o(()=>e("g",null,null,-1)),ue=o(()=>e("g",null,null,-1)),he=o(()=>e("g",null,null,-1)),ge=[W,H,X,ee,te,se,ae,oe,le,ie,ne,re,ce,de,ue,he],pe={key:0,class:"col-md-3"},me=d(" From date "),_e=["defaultValue"],fe={key:1,class:"col-md-3"},ve=d(" To date "),be=["defaultValue","max"],we={class:"filter"},Se={key:0,class:"filterDrop"},Ae=["id","onClick"],De={class:"col-md-2"},Te={class:"mt-3"},ke={class:"row"},Ie={class:"col-12"},ye={class:"table-responsive"},Ce={class:"table"},Me=o(()=>e("thead",{class:"thead-dark"},[e("tr",null,[e("th",{scope:"col"},"Number"),e("th",{scope:"col"},"Operator"),e("th",{scope:"col"},"Content"),e("th",{scope:"col"},"Status"),e("th",{scope:"col"},"Time")])],-1)),Ee=o(()=>e("div",{class:"modal fade",id:"exampleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},[e("div",{class:"modal-dialog",role:"document"},[e("div",{class:"modal-content"},[e("div",{class:"modal-header"},[e("h5",{class:"modal-title",id:"exampleModalLabel"},"SMS INFO"),e("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[e("span",{"aria-hidden":"true"},"\xD7")])]),e("div",{class:"modal-body"},[e("b",null,"WAITING"),d(" - \u0421\u041C\u0421 \u0432 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0443; "),e("br"),e("b",null,"TRANSMTD"),d(" - \u0421\u041C\u0421 \u043F\u0435\u0440\u0435\u0434\u0430\u043D \u0441\u043E\u0442\u043E\u0432\u043E\u043C\u0443 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0443, \u043D\u043E \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u043E\u0431\u0440\u0430\u0442\u043D\u043E \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u0441\u0442\u0430\u0442\u0443\u0441 \u0441\u043C\u0441 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439; "),e("br"),e("b",null,"DELIVRD"),d(" - \u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E; "),e("br"),e("b",null,"UNDELIV"),d(" - \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E, \u043E\u0431\u044B\u0447\u043D\u043E \u043F\u0440\u0438\u0447\u0438\u043D\u043E\u0439 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0442\u043E \u0447\u0442\u043E \u0430\u0431\u043E\u043D\u0435\u043D\u0442 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430(\u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0441\u0440\u0435\u0434\u0441\u0442 \u0438\u043B\u0438 \u0434\u043E\u043B\u0433); "),e("br"),e("b",null,"EXPIRED"),d(" - \u0441\u0440\u043E\u043A \u0436\u0438\u0437\u043D\u0438 \u0441\u043C\u0441 \u0438\u0441\u0442\u0435\u043A(\u043A\u043E\u0433\u0434\u0430 \u0430\u0431\u043E\u043D\u0435\u043D\u0442 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0441\u0443\u0442\u043A\u0438 \u043D\u0435 \u0432\u044B\u0445\u043E\u0434\u0438\u043B \u043D\u0430 \u0441\u0432\u044F\u0437\u044C. \u0423 \u0431\u0438\u043B\u0430\u0439\u043D \u0435\u0441\u043B\u0438 \u0432 \u0442\u0435\u0435\u043D\u0438\u0435 \u0447\u0430\u0441\u0430); "),e("br"),e("b",null,"REJECTD"),d(" - \u043E\u0434\u0438\u043D \u0438\u0437 \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u0445 \u043F\u0440\u0438\u0447\u0438\u043D \u044D\u0442\u043E \u0442\u043E \u0447\u0442\u043E \u043D\u043E\u043C\u0435\u0440 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0447\u0435\u0440\u043D\u043E\u043C \u0441\u043F\u0438\u0441\u043A\u0435; "),e("br"),e("b",null,"DELETED"),d(" - \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0430(\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 \u043A\u043E\u0433\u0434\u0430 \u0430\u0434\u0440\u0435\u0441 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F \u0443\u043A\u0430\u0437\u0430\u043D \u043D\u0435\u0432\u0435\u0440\u043D\u043E); "),e("br"),e("br")])])])],-1)),qe={key:0,class:"loading"},xe=o(()=>e("img",{src:B},null,-1)),Pe=[xe];function Fe(a,l,p,m,s,c){const i=b("Pie"),_=b("Pagination");return n(),r(f,null,[e("div",V,[e("div",j,[e("div",R,[e("div",N,[U,d(" "+u(s.totalMessage),1)]),s.load?(n(),r("div",Q,[F(i,{"chart-data":s.dataMailing,"chart-options":s.options},null,8,["chart-data","chart-options"])])):h("",!0),e("div",J,[s.load?(n(),w(i,{key:0,"chart-data":s.dataOperator,"chart-options":s.options2},null,8,["chart-data","chart-options"])):h("",!0)])])])]),e("div",G,[e("div",K,[e("div",Y,[(n(),r("svg",Z,ge))])]),s.customTime?(n(),r("div",pe,[me,S(e("input",{type:"datetime-local",onChange:l[0]||(l[0]=t=>c.requestApi(1)),required:"",class:"form-control",defaultValue:s.start_date,"onUpdate:modelValue":l[1]||(l[1]=t=>s.start_date=t)},null,40,_e),[[A,s.start_date]])])):h("",!0),s.customTime?(n(),r("div",fe,[ve,S(e("input",{type:"datetime-local",onChange:l[2]||(l[2]=t=>c.requestApi(1)),required:"",class:"form-control",defaultValue:s.end_date,"onUpdate:modelValue":l[3]||(l[3]=t=>s.end_date=t),max:s.end_date},null,40,be),[[A,s.end_date]])])):h("",!0),e("div",{class:D(["col-md-3",{"col-md-9":!s.customTime,"col-md-3":s.customTime}])},[e("div",we,[e("img",{title:"Show filter",onClick:l[4]||(l[4]=t=>s.showFilter=!0),src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAz0lEQVRoge3YQQqDMBCF4Z9uvYIui3cvwVO0x3GhB9AuGkFqIxoTk7bvg9mFzEQQHgMiIvJjKsAAva0GqJNO5KECWmB8qxYoE861m2H5iKlusZs/VppvrcLe1a+c6eyZIkC/+zT8ZfaQ4eiX2GgMeFf0mRvcX9HEbh5Sjftnvyacy0vJ68fubBm+8BEiIv9DqTknQVJziPR7dmpOmn59fUrN2c6s1JwjpWYRkQUl05wk3efu4Uq/Z+9zD+9+j+xkQ+5zo/dVMs2RkqmIiMw9AeRc6n4FK62pAAAAAElFTkSuQmCC"})]),s.showFilter?(n(),r("div",Se,[(n(!0),r(f,null,T(s.filters,(t,g)=>(n(),r("div",{class:D(["filterDrop__each",{active:s.currentFilterIndex==g}]),id:"f-"+g,onClick:Oe=>c.changeFilter(g)},u(t),11,Ae))),256))])):h("",!0)],2),e("div",De,[e("div",{class:"btn btn-primary mt-3",onClick:l[5]||(l[5]=t=>a.$router.replace({name:"sms.add"}))},"Send SMS")])]),e("div",Te,[e("div",ke,[e("div",Ie,[e("div",ye,[e("table",Ce,[Me,e("tbody",null,[(n(!0),r(f,null,T(s.sms,t=>(n(),r("tr",null,[e("td",null,u(t==null?void 0:t.to),1),e("td",null,u(t==null?void 0:t.operator),1),e("td",null,u(t==null?void 0:t.content),1),e("td",null,u(t==null?void 0:t.status),1),e("td",null,u(t==null?void 0:t.updated_at.replace("T"," ").slice(0,-11)),1)]))),256))])])]),s.last_page!=1?(n(),w(_,{key:0,"total-pages":this.last_page,total:this.total,"per-page":this.per_page,"current-page":s.currentPage,onPagechanged:c.onPageChange},null,8,["total-pages","total","per-page","current-page","onPagechanged"])):h("",!0)])])]),Ee,s.loading?(n(),r("div",qe,Pe)):h("",!0)],64)}const je=C(z,[["render",Fe],["__scopeId","data-v-b76ef3e9"]]);export{je as default};
