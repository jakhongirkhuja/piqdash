<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Quizz</h4>

            <template v-if="resError">

              <p class="error" v-for=" (value, name) in resError">
                {{ name }} : {{ value[0] }}
              </p>
            </template>
            <p class="error" v-if="resStringError">
              {{ resStringError }}
            </p>
            <p class="success" v-if="resSuccess">
              {{ resSuccess }}
            </p>
            <form class="forms-sample" @submit.prevent="submitForm()">
              <div class="form-group row">
                <div class="col-md-12">
                  <label for="banner">Lesson</label>
                  <select v-model="lesson_id" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.lesson_id.$errors.length > 0 }">
                    <option disabled value="0">Please select one</option>
                    <option v-for="lesson in lessons" :key="lesson.id" v-bind:value="lesson.id">
                      {{ JSON.parse(lesson.lessonTitleName).ru }} ( {{ JSON.parse(lesson.lessonTitleName).uz
                      }} )</option>
                  </select>
                  <small class="error" v-for="(error, index) of v$.lesson_id.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-12 mt-2">
                  <label for="QuizType">Type</label>
                  <select class="form-control" v-model="selected" @change="onChangeQuizType($event)">
                    <template v-for="(item, key) in quizType">
                      <option  :value="item">
                        {{item}}
                      </option>
                    </template>
                   
                  </select>
                 
                </div>
                <div class="col-md-4 mt-2" v-if="selected!='without reward'">
                  <label for="Prizeiqc">Prize iqc:</label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.iqc.$errors.length > 0 }" id="Prizeiqc"
                    v-model="iqc">
                  <small class="error" v-for="(error, index) of v$.iqc.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4 mt-2" :class="{'col-md-6': selected=='without reward'}">
                  <label for="Timelimits">Time limits:</label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.limit.$errors.length > 0 }" id="Timelimits"
                    v-model="limit">
                  <small class="error" v-for="(error, index) of v$.limit.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4 mt-2" :class="{'col-md-6': selected=='without reward'}">
                  <label for="RightAnswersToPass">Right answers to pass</label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.rightAnswer.$errors.length > 0 }" id="RightAnswersToPass"
                    v-model="rightAnswer">
                  <small class="error" v-for="(error, index) of v$.rightAnswer.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-12 mt-2" v-if="selected=='with limited reward'">
                  <label for="RightAnswersToPassprizeLimit">Prize Limit</label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.prizeLimit.$errors.length > 0 }" id="RightAnswersToPassprizeLimit"
                    v-model="prizeLimit">
                  <small class="error" v-for="(error, index) of v$.prizeLimit.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>

                
              </div>
             

              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Create</button>

            </form>
          </div>
        </div>
      </div>
     
    </div>
  </div>
</template>
<script>
import GoBackButton from '@/components/GoBackButton.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, requiredIf, integer } from '@vuelidate/validators'
import { ref } from 'vue';
import { maska } from 'maska'
import { standartAttribute } from '@/globals/globalFunction.js';
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  directives: { maska },
  components: {
    GoBackButton,
    Datepicker,
   
  },
  data() {
    return {
      url: import.meta.env.VITE_APP_REST_ENDPOINT,
      lessons: [],
      order:1,
      iqc:20,
      limit: 8,
      rightAnswer:8,
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      lesson_id: 12,
      prizeLimit:10,
      selected: 'with reward',
      quizType:['without reward','with reward','with limited reward']
    }
  },
  computed: {
    isDisabled: function () {
      this.v$.$touch();

      console.log(this.v$.$touch());
      if (this.v$.$error) return true;

    }
  },
  validations() {
    return {
      lesson_id: {
        required,
      },
      iqc:{
         required,
         integer,
      },
      limit:{
         required,
         integer,
      },
      rightAnswer:{
         required,
         integer,
      },
      prizeLimit:{
          required: requiredIf(() => { return this.selected == 'with limited reward'; }),
          integer,
      },
     
    }
  },

  methods: {
    onChangeQuizType(event){
      console.log(event.target.value);
        if(event.target.value=='without reward'){
          
          this.iqc = 0;
        }
    },
    async requestApi() {

      let q = {
         "prizeIQC": this.iqc,
        "timeLimits": this.limit,
        "numberRightAnswersToPass": this.rightAnswer
      }
      let quiz = {
        'quizz':q
      }
      const inputs = {
        'lesson_id': this.lesson_id,
        'quiz': JSON.stringify(quiz),
        'type': this.selected,
        'prizeStatus': 0,
      }

      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);
      
      var data = new FormData()
      if(this.selected=='with limited reward'){
        data.append('prizeLimit',parseInt(this.prizeLimit) );
      }
      
      // data.append('lessonBanner_uz', this.banner_uz)
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/quizz/add', {
          method: 'POST',
          body: data,
          headers: {
            'Accept-Language': 'en-US,en;q=0.8',
            "accept": "application/json",
            'Authorization': 'Bearer ' + token,
          },

        });

        const json = await response.json();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const status = response.status;

        if (status == 401) {
          this.resStringError = json.message;
        } else {
          if (json.error) {


            if (typeof json.message == 'object') {
              this.resError = json.message;
            } else {
              this.resStringError = json.message;
            }
          } else {
            this.added = true;
            this.resSuccess = 'Quiz Successfully Added';
            this.$router.push({ name: 'quizzes.edit', params: {'id': json.quizz.id}, query: { adding: this.resSuccess } })
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

    },
    submitForm() {
      this.v$.$touch();
      if (this.v$.$error) return;
      this.requestApi();
    },
    getLessons() {

      let newUrl = this.url + 'api/v1/lessons?page=1&show=all';
      let token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: new Headers({
          "accept": "application/json",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),

      };
      fetch(newUrl, options)
        .then((response) => {
          if (response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'https://go.pharmiq.uz/';
          }
          return response.json();
        })
        .then((data) => {
          this.lessons = data.data;
          console.log(this.lessons);
        });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getLessons();
  },
}
</script>
<style lang="css" scoped>

</style>