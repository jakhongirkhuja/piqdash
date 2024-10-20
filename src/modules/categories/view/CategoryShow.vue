<template>
    <GoBackButton  />
    <div class="mt-3">
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Edit category</h4>
                  
                  <template v-if="resError" >
                  
                    <p class="error" v-for=" (value,name) in resError">
                      {{name}} : {{value[0]}}
                    </p>
                  </template>
                  <p class="error" v-if="resStringError">
                      {{resStringError}}
                    </p>
                    <p class="success" v-if="resSuccess">
                      {{resSuccess}}
                    </p>
                  <form class="forms-sample" @submit.prevent="submitForm()">
                    
                    <div class="form-group row">
                        <div class="col-md-6">
                            <label class="col-sm-3 col-form-label" for="icon">Icon (РУ)</label>
                            <img :src="icon_ru_prev" v-if="icon_ru_prev" class="image_prev" />
                        </div>
                        <div class="col-md-6">
                            <label class="col-sm-3 col-form-label" for="icon">Icon (UZ)</label>
                            <img :src="icon_uz_prev" v-if="icon_uz_prev" class="image_prev" />
                        </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-6">
                        <label for="exampleInputTitleRu">Title (РУ)</label>
                         <div  class="bg-size">{{title_ru}}</div>
                      </div>
                      <div class="col-md-6">
                        <label for="exampleInputTitleUZ">Title (UZ)</label>
                         <div class="bg-size">{{title_uz}}</div>
                      </div>
                    </div>
                    
                    
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
</template>
<script>
import GoBackButton from '@/components/GoBackButton.vue'

export default {
      components: {
        GoBackButton,
       
      },
      data() {
        return {
          url: import.meta.env.VITE_APP_REST_ENDPOINT, 
          icon_ru :[],
          icon_ru_prev : null,
          icon_uz :[],
          icon_uz_prev : null,
          title_ru : '',
          title_uz : '',
          added: false,
          resError: false,
          resSuccess: false,
          resStringError: '',
          userInfo:null,
        }
      },
     
      methods: {
        
        getCategoryInfo(){
          let newUrl = this.url+'api/v1/course/category?category_id='+this.$route.params.id;
          
           let token = localStorage.getItem('token')
           const options = {
              method: 'GET',
              headers: new Headers({
              "accept" : "application/json",
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token, 
          }), 
             
            };
            fetch(newUrl, options)
                .then((response) => {
                  if(response.status==401){
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href='https://go.pharmiq.uz/';
                  }
                    return response.json();
                })
                .then((data) => {
                    this.title_ru = JSON.parse(data.categoryName).ru;
                    this.title_uz = JSON.parse(data.categoryName).uz;
                    this.icon_ru_prev = this.url+'files/category/'+JSON.parse(data.categoryIcon).ru;
                    this.icon_uz_prev = this.url+'files/category/'+JSON.parse(data.categoryIcon).uz;
                });
        },
      },
      created() {
        this.userInfo = JSON.parse(localStorage.getItem('user'));
        this.getCategoryInfo();
      },
}
</script>
<style lang="css" scoped>
  .image_prev{
    width:100%;
    margin-bottom: 20px;
  }
  .bg-size{
    font-size: 20px;
  }
</style>