import{G as S}from"./GoBackButton.8ec57f12.js";import{c as k}from"./vue-datepicker.es.17b3f44e.js";import{h as w}from"./maska.esm.cd315c5a.js";import{u as U,r as b,m as y,a as z,b as C,i as T}from"./index.esm.b21b73c4.js";import{_ as D,r as N,o as l,c as n,f as V,a as e,F as d,e as _,d as v,t as u,w as m,p as B,n as h,v as g,a0 as R,g as E,a2 as L,a3 as j}from"./index.34e73fda.js";import{e as x}from"./exportFromJSON.de0e6beb.js";import"./globalFunction.5ce06618.js";const O={setup(){return{v$:U()}},directives:{maska:w},components:{GoBackButton:S,Datepicker:k},data(){return{url:"https://api.pharmiq.uz/",banner_ru:[],banner_ru_prev:null,banner_uz:[],banner_uz_prev:null,title_ru:"",title_uz:"",body_ru:"",startDate:null,endDate:null,body_uz:"",categories:[],added:!1,resError:!1,resSuccess:!1,resStringError:"",userInfo:null,monetized:0,price:null,category_id:null,statistics:null}},computed:{isDisabled:function(){if(this.v$.$touch(),this.v$.$error)return!0}},validations(){return{category_id:{required:b},startDate:{required:b},title_ru:{required:b,minLengthValue:y(3),maxLengthValue:z(30)},title_uz:{required:b,minLengthValue:y(3),maxLengthValue:z(30)},body_ru:{required:b,minLengthValue:y(10)},body_uz:{required:b,minLengthValue:y(10)},price:{required:C(()=>this.monetized==1),integer:T}}},methods:{downloadFile(){const i="n-"+this.title_ru,r=x.types.csv,p=this.statistics;p&&x({data:p,fileName:i,exportType:r})},uploadFilebannerRu(i){var r=i.target.files||i.dataTransfer.files;!r.length||(this.banner_ru=r[0],this.banner_ru_prev=URL.createObjectURL(r[0]))},uploadFilebannerUz(i){var r=i.target.files||i.dataTransfer.files;!r.length||(this.banner_uz=r[0],this.banner_uz_prev=URL.createObjectURL(r[0]))},submitForm(){this.v$.$touch(),this.v$.$error},checkvalue(){console.log(this.startDate)},getvalue(){console.log(this.monetized)},getCourse(){let i=this.url+"api/v1/course?id="+parseInt(this.$route.params.id),r=localStorage.getItem("token");const p={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(i,p).then(s=>(s.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),s.json())).then(s=>{Object.keys(s).length==0&&this.$router.push({name:"courses.list"}),this.category_id=s.category_id,this.monetized=s.courseMonetized==1,this.price=s.coursePrice,this.startDate=s.startDate,this.endDate=s.endDate,this.title_ru=JSON.parse(s.infos.courseTitleName).ru,this.title_uz=JSON.parse(s.infos.courseTitleName).uz,this.body_ru=JSON.parse(s.infos.courseInfo).ru,this.body_uz=JSON.parse(s.infos.courseInfo).uz,this.banner_ru_prev=this.url+"files/course/"+JSON.parse(s.infos.courseBanner).ru,this.banner_uz_prev=this.url+"files/course/"+JSON.parse(s.infos.courseBanner).uz})},getCategories(){let i=this.url+"api/v1/course/category?page=1",r=localStorage.getItem("token");const p={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(i,p).then(s=>(s.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),s.json())).then(s=>{this.categories=s.data})},getStatistics(){let i=this.url+"api/v1/course/getCourseStatistics/"+parseInt(this.$route.params.id),r=localStorage.getItem("token");const p={method:"GET",headers:new Headers({accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r})};fetch(i,p).then(s=>(s.status==401&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="https://go.pharmiq.uz/"),s.json())).then(s=>{this.statistics=s})}},created(){this.userInfo=JSON.parse(localStorage.getItem("user")),this.getCourse(),this.getCategories(),this.getStatistics()}},a=i=>(L("data-v-eaf744b9"),i=i(),j(),i),Z={class:"mt-3"},F={class:"row"},J={class:"col-md-12 grid-margin stretch-card"},q={class:"card"},G={class:"card-body"},M=a(()=>e("h4",{class:"card-title"},"Show Course",-1)),A={class:"error"},H={key:1,class:"error"},P={key:2,class:"success"},Q={class:"form-group row"},Y={class:"col-md-12"},K=a(()=>e("label",{class:"col-sm-3 col-form-label",for:"banner"},"Category",-1)),W=a(()=>e("option",{disabled:"",value:"0"},"Please select one",-1)),X=["selected","disabled","value"],$={class:"form-group row"},ee={class:"col-md-6"},te=a(()=>e("label",{for:"exampleInputTitleRu"},"Title (\u0420\u0423)",-1)),re={class:"col-md-6"},se=a(()=>e("label",{for:"exampleInputTitleUZ"},"Title (UZ)",-1)),oe={class:"form-group row"},le={class:"col-md-6"},ne=a(()=>e("label",{for:"exampleInputbodyRu"},"Body (\u0420\u0423)",-1)),ie={class:"col-md-6"},ae=a(()=>e("label",{for:"exampleInputbodyUZ"},"Body (UZ)",-1)),ce={class:"form-group row"},ue={class:"col-md-6"},de=a(()=>e("label",{class:"col-sm-3 col-form-label",for:"banner"},"banner (\u0420\u0423)",-1)),_e=["src"],pe={class:"col-md-6"},me=a(()=>e("label",{class:"col-sm-3 col-form-label",for:"banner"},"banner (UZ)",-1)),he=["src"],ge={class:"form-group row"},be={class:"col-md-6"},fe=a(()=>e("label",{for:"exampleInputstartRu"},"Start Date",-1)),ve={class:"col-md-6"},ye=a(()=>e("label",{for:"exampleInputendUZ"},"End Date ",-1)),ze={class:"form-group row"},xe={class:"col-md-6"},Ie=a(()=>e("label",{for:"exampleInputstartRu"},"Course Monetized",-1)),Se=a(()=>e("br",null,null,-1)),ke={class:"language-switcher"},we=a(()=>e("span",{class:"slider round"},null,-1)),Ue=a(()=>e("span",{class:"select-ru"},"No",-1)),Ce=a(()=>e("span",{class:"select-uz"},"Yes",-1)),Te={class:"col-md-6"},De=a(()=>e("label",{for:"exampleInputendUZ"},"Course Price ",-1)),Ne={class:"col-md-12 grid-margin stretch-card"},Ve={class:"card"},Be={class:"card-body"},Re={class:"card-title"},Ee=E("Statistics "),Le={key:0,class:"table"},je=a(()=>e("thead",null,[e("tr",null,[e("th",{scope:"col"},"#"),e("th",{scope:"col"},"User"),e("th",{scope:"col"},"Role"),e("th",{scope:"col"},"Company Name"),e("th",{scope:"col"},"Quiz Result")])],-1)),Oe={scope:"row"},Ze={key:1};function Fe(i,r,p,s,o,f){const I=N("GoBackButton");return l(),n(d,null,[V(I),e("div",Z,[e("div",F,[e("div",J,[e("div",q,[e("div",G,[M,o.resError?(l(!0),n(d,{key:0},_(o.resError,(t,c)=>(l(),n("p",A,u(c)+" : "+u(t[0]),1))),256)):v("",!0),o.resStringError?(l(),n("p",H,u(o.resStringError),1)):v("",!0),o.resSuccess?(l(),n("p",P,u(o.resSuccess),1)):v("",!0),e("div",Q,[e("div",Y,[K,m(e("select",{"onUpdate:modelValue":r[0]||(r[0]=t=>o.category_id=t),class:h(["form-control",{"border border-danger":s.v$.category_id.$errors.length>0}])},[W,(l(!0),n(d,null,_(o.categories,t=>(l(),n("option",{key:t.id,selected:o.category_id==t.id,disabled:o.category_id!=t.id,value:t.id},u(JSON.parse(t.categoryName).ru),9,X))),128))],2),[[B,o.category_id]]),(l(!0),n(d,null,_(s.v$.category_id.$errors,(t,c)=>(l(),n("small",{class:"error",key:c},u(t.$message),1))),128))])]),e("div",$,[e("div",ee,[te,m(e("input",{type:"text",class:h(["form-control",{"border border-danger":s.v$.title_ru.$errors.length>0}]),id:"exampleInputTitleRu","onUpdate:modelValue":r[1]||(r[1]=t=>o.title_ru=t)},null,2),[[g,o.title_ru]]),(l(!0),n(d,null,_(s.v$.title_ru.$errors,(t,c)=>(l(),n("small",{class:"error",key:c},u(t.$message),1))),128))]),e("div",re,[se,m(e("input",{type:"text",class:h(["form-control",{"border border-danger":s.v$.title_uz.$errors.length>0}]),id:"exampleInputTitleUZ","onUpdate:modelValue":r[2]||(r[2]=t=>o.title_uz=t)},null,2),[[g,o.title_uz]]),(l(!0),n(d,null,_(s.v$.title_uz.$errors,(t,c)=>(l(),n("small",{class:"error",key:c},u(t.$message),1))),128))])]),e("div",oe,[e("div",le,[ne,m(e("textarea",{rows:"10",type:"text",class:h(["form-control",{"border border-danger":s.v$.body_ru.$errors.length>0}]),id:"exampleInputTitleRu","onUpdate:modelValue":r[3]||(r[3]=t=>o.body_ru=t)},null,2),[[g,o.body_ru]]),(l(!0),n(d,null,_(s.v$.body_ru.$errors,(t,c)=>(l(),n("small",{class:"error",key:c},u(t.$message),1))),128))]),e("div",ie,[ae,m(e("textarea",{rows:"10",type:"text",class:h(["form-control",{"border border-danger":s.v$.body_uz.$errors.length>0}]),id:"exampleInputTitleUZ","onUpdate:modelValue":r[4]||(r[4]=t=>o.body_uz=t)},null,2),[[g,o.body_uz]]),(l(!0),n(d,null,_(s.v$.body_uz.$errors,(t,c)=>(l(),n("small",{class:"error",key:c},u(t.$message),1))),128))])]),e("div",ce,[e("div",ue,[de,o.banner_ru_prev?(l(),n("img",{key:0,src:o.banner_ru_prev,class:"image_prev"},null,8,_e)):v("",!0),e("input",{type:"file",id:"banner",onChange:r[5]||(r[5]=t=>f.uploadFilebannerRu(t)),accept:"image/*",class:"form-control"},null,32)]),e("div",pe,[me,o.banner_uz_prev?(l(),n("img",{key:0,src:o.banner_uz_prev,class:"image_prev"},null,8,he)):v("",!0),e("input",{type:"file",id:"banner",onChange:r[6]||(r[6]=t=>f.uploadFilebannerUz(t)),accept:"image/*",class:"form-control"},null,32)])]),e("div",ge,[e("div",be,[fe,m(e("input",{type:"date",class:h(["form-control",{"border border-danger":s.v$.startDate.$errors.length>0}]),id:"exampleInputstartRu","onUpdate:modelValue":r[7]||(r[7]=t=>o.startDate=t)},null,2),[[g,o.startDate]]),(l(!0),n(d,null,_(s.v$.startDate.$errors,(t,c)=>(l(),n("small",{class:"error",key:c},u(t.$message),1))),128))]),e("div",ve,[ye,m(e("input",{type:"date",class:"form-control",id:"exampleInputendUZ","onUpdate:modelValue":r[8]||(r[8]=t=>o.endDate=t)},null,512),[[g,o.endDate]])])]),e("div",ze,[e("div",xe,[Ie,Se,e("label",ke,[m(e("input",{onChange:r[9]||(r[9]=(...t)=>f.getvalue&&f.getvalue(...t)),type:"checkbox","onUpdate:modelValue":r[10]||(r[10]=t=>o.monetized=t)},null,544),[[R,o.monetized]]),we,Ue,Ce])]),e("div",Te,[De,m(e("input",{type:"number",class:h(["form-control",{"border border-danger":s.v$.price.$errors.length>0}]),id:"exampleInputendUZ","onUpdate:modelValue":r[11]||(r[11]=t=>o.price=t)},null,2),[[g,o.price]]),(l(!0),n(d,null,_(s.v$.price.$errors,(t,c)=>(l(),n("small",{class:"error",key:c},u(t.$message),1))),128))])])])])]),e("div",Ne,[e("div",Ve,[e("div",Be,[e("h4",Re,[Ee,e("div",{onClick:r[12]||(r[12]=t=>f.downloadFile()),class:"float-right btn btn-success"},"Export to excel")]),o.statistics&&o.statistics.length>0?(l(),n("table",Le,[je,e("tbody",null,[(l(!0),n(d,null,_(o.statistics,(t,c)=>(l(),n("tr",null,[e("th",Oe,u(c),1),e("td",null,u(t.user),1),e("td",null,u(t.role),1),e("td",null,u(t.companyName),1),e("td",null,u(t.quizResult),1)]))),256))])])):(l(),n("div",Ze,"Empty"))])])])])])],64)}const Qe=D(O,[["render",Fe],["__scopeId","data-v-eaf744b9"]]);export{Qe as default};
