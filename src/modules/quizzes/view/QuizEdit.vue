<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edit Quizz</h4>

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
                <div class="col-md-4"  v-if="selected!='without reward'">
                  <label for="Prizeiqc">Prize iqc:</label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.iqc.$errors.length > 0 }" id="Prizeiqc"
                    v-model="iqc">
                  <small class="error" v-for="(error, index) of v$.iqc.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4" :class="{'col-md-6': selected=='without reward'}">
                  <label for="Timelimits">Time limits:</label>
                  <input type="number" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.limit.$errors.length > 0 }" id="Timelimits"
                    v-model="limit">
                  <small class="error" v-for="(error, index) of v$.limit.$errors" :key="index">{{ error.$message
                  }}</small>
                </div>
                <div class="col-md-4" :class="{'col-md-6': selected=='without reward'}">
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
             

              <button v-if="!added" type="submit" :disabled='isDisabled' class="btn btn-primary mr-2">Edit</button>

            </form>
          </div>
        </div>
      </div>
     
    </div>
    <div class="row"  id="questionSection">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            
            <h4 class="card-title">Questions <i class="ti ti-plus addingbtn float-right"><span @click="addingQuestion">Question</span></i></h4>
            <p class="error" v-if="checkEditorEror">{{checkEditorEror}}</p>
            <p class="success" v-if="checkEditorok">{{checkEditorok}}</p>
            <template v-if="showAddQuestion">
             
            <div class="form-group row" v-for="(question, questionIdx) of questions" :key="questionIdx">
            
              <div class="col-md-6">
                  <label for="">Question Ru</label>
                  <input type="text" name="" v-model="question.question_ru" class="form-control" id="">
                 
              </div>
              <div class="col-md-6">
                  <label for="">Question Uz</label>
                  <input type="text" name="" v-model="question.question_uz"  class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                  <label for="">Text One Ru</label>
                  <input type="text" name="" v-model="question.questionTextOne_ru"  class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                  <label for="">Text One Uz</label>
                  <input type="text" name="" v-model="question.questionTextOne_uz" class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                  <label for="">Text Two Ru</label>
                  <input type="text" name="" v-model="question.questionTextTwo_ru" class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                  <label for="">Text Two Uz</label>
                  <input type="text" name="" v-model="question.questionTextTwo_uz" class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                
                  <label  for="banner">Image</label>
                
                  <input type="file" id="banner" v-on:change="uploadFilebannerRu($event)" accept="image/*"
                    class="form-control">
                 
               
              </div>
              <div class="col-md-6 mt-1">
                <label for="banner">Question Type</label>
               
                <select @change="getChangenewQuestion(question)" v-model="question.questionType" class="form-control">
                 <template v-for="questtypes in questionType" >
                    <option v-bind:value="questtypes"> {{ questtypes }}</option>
                 </template>
                </select>
              </div>
              <div class="col-md-12">
                <hr>
              </div>
              <div class="col-md-12">
                <table class="table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">{{ question.questionType==questionType[0] || question.questionType==questionType[1]? 'Variant Ru' : 'Keywords Ru' }} </th>
                          <th scope="col">{{ question.questionType==questionType[0] || question.questionType==questionType[1]? 'Variant Uz' : 'Keywords Uz' }}</th>
                          <th v-if="question.questionType==questionType[0] || question.questionType==questionType[1] " scope="col">Checkbox</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="question.questionType==questionType[2] || question.questionType==questionType[3]">
                          <tr>
                            <td scope="row">1</td>
                            <td  v-if="question.questionType==questionType[2] || question.questionType==questionType[3]" ><input class="form-control" v-model="variants[0].variantKeywords_ru" @input="variants[0].variantKeywords_ru = variants[0].variantKeywords_ru.replace(/\s/g, '')" type="text"></td>
                            <td  v-if="question.questionType==questionType[2] || question.questionType==questionType[3]"><input class="form-control" v-model="variants[0].variantKeywords_uz"  @input="variants[0].variantKeywords_uz = variants[0].variantKeywords_uz.replace(/\s/g, '')" type="text"></td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr  v-for="(variant, variantIdx) of variants" :key="variantIdx">
                            <td scope="row">{{variantIdx+1}}</td>
                            <td v-if="question.questionType==questionType[0] || question.questionType==questionType[1] "><input class="form-control" v-model="variant.variantText_ru" type="text"></td>
                            <td v-if="question.questionType==questionType[0] || question.questionType==questionType[1]"  ><input class="form-control" v-model="variant.variantText_uz"  type="text"></td>
                            <td v-if="question.questionType==questionType[0] || question.questionType==questionType[1] " >
                              <label class="container2">
                                <input type="radio"  v-model="variant.rightAnswer" v-bind:value="true"  :name="question.questionType==questionType[0]? 'radio' : ''">
                                <span class="checkmark"></span>
                              </label>
                            </td>
                          </tr>
                        </template>
                        
                        <tr v-if="question.questionType==questionType[0] || question.questionType==questionType[1] ">
                          <td colspan="4" class="text-center"><i @click="addvariant" class="ti ti-plus addingbtn addvariant"><span >Add variant</span></i></td>
                        </tr>
                      </tbody>
                    </table>
              </div>
            </div>
            <button class="btn btn-primary" @click.prevent="submitQuestions">Submit</button>
            </template>

            
            <div class="form-group row resp" v-for="(quesres, questionResIdx) of questionsResponse" :key="questionResIdx">
            
              <div class="col-md-6">
                  <label for="">Question Ru</label>
                  <input type="text" name="" v-model="quesres.question_ru" class="form-control" id="">
                 
              </div>
              <div class="col-md-6">
                  <label for="">Question Uz</label>
                  <input type="text" name="" v-model="quesres.question_uz"  class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                  <label for="">Text One Ru</label>
                  <input type="text" name="" v-model="quesres.questionTextOne_ru"  class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                  <label for="">Text One Uz</label>
                  <input type="text" name="" v-model="quesres.questionTextOne_uz" class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                  <label for="">Text Two Ru</label>
                  <input type="text" name="" v-model="quesres.questionTextTwo_ru" class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                  <label for="">Text Two Uz</label>
                  <input type="text" name="" v-model="quesres.questionTextTwo_uz" class="form-control" id="">
              </div>
              <div class="col-md-6 mt-1">
                
                  <label  for="banner">Image</label>
                  <img v-if="quesres.questionIMG" :src="url+'files/questions/'+quesres.questionIMG" width="150">
                  <input type="file" id="banner" v-on:change="uploadFilebannerUpdate($event,quesres.question_id)" accept="image/*"
                    class="form-control">
                 
               
              </div>
              <div class="col-md-6 mt-1">
               
                <label for="banner">Question Type</label>
                <select @change="getChange(quesres)" v-model="quesres.questionType" class="form-control">
                 <template v-for="questtypes in questionType" >
                    <option v-bind:value="questtypes"> {{ questtypes }}</option>
                 </template>
                </select>
              </div>
              <div class="col-md-12">
                <hr>
              </div>
              <div class="col-md-12">
                <table class="table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">{{ quesres.questionType==questionType[0] || quesres.questionType==questionType[1]? 'Variant Ru' : 'Keywords Ru' }} </th>
                          <th scope="col">{{ quesres.questionType==questionType[0] || quesres.questionType==questionType[1]? 'Variant Uz' : 'Keywords Uz' }}</th>
                          <th v-if="quesres.questionType==questionType[0] || quesres.questionType==questionType[1] " scope="col">Checkbox</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template  v-if="quesres.questionType==questionType[2] || quesres.questionType==questionType[3]">
                          <template v-for="(variantRes, variantResIdx) of quesres.variants" :key="variantResIdx">
                            <tr v-if="variantResIdx<1">
                         
                         
                                <td scope="row">1</td>
                                
                                <td   ><input class="form-control" v-model="variantRes.variantKeywords_ru" @input="variantRes.variantKeywords_ru = variantRes.variantKeywords_ru.replace(/\s/g, '')" type="text"></td>
                                <td  ><input class="form-control" v-model="variantRes.variantKeywords_uz" @input="variantRes.variantKeywords_uz = variantRes.variantKeywords_uz.replace(/\s/g, '')"  type="text"></td>
                              
                            <td v-if="variantRes.variant_id">
                              <i class="ti ti-trash" style="color:red" data-toggle="tooltip" title="Remove"  @click.prevent="deleteVariantRes(quesres.question_id, variantRes.variant_id)" ></i>
                            </td>
                            </tr>
                          </template>
                          
                        </template>
                        <template v-else>
                          <tr  v-for="(variantRes, variantResIdx) of quesres.variants" :key="variantResIdx">
                         
                         
                            <td scope="row">{{variantResIdx+1}}</td>
                            <td v-if="quesres.questionType==questionType[0] || quesres.questionType==questionType[1] "><input class="form-control" v-model="variantRes.variantText_ru" type="text"></td>
                            <td v-if="quesres.questionType==questionType[0] || quesres.questionType==questionType[1]"  ><input class="form-control" v-model="variantRes.variantText_uz"  type="text"></td>
                            <td  v-if="quesres.questionType==questionType[2] || quesres.questionType==questionType[3]" ><input class="form-control" v-model="variantRes.variantKeywords_ru" @input="variantRes.variantKeywords_ru = variantRes.variantKeywords_uz.replace(/\s/g, '')" type="text"></td>
                            <td  v-if="quesres.questionType==questionType[2] || quesres.questionType==questionType[3]"><input class="form-control" v-model="variantRes.variantKeywords_uz" @input="variantRes.variantKeywords_uz = variantRes.variantKeywords_uz.replace(/\s/g, '')"  type="text"></td>
                          
                          
                          
                          <td v-if="quesres.questionType==questionType[0] || quesres.questionType==questionType[1] ">
                            <label class="container2" :for="'cont'+variantResIdx+questionResIdx">
                              <input type="radio" :id="'cont'+variantResIdx+questionResIdx"  v-model="variantRes.rightAnswer" @click="changeAnswer(quesres.question_id, variantRes.variant_id,quesres.questionType )" v-bind:checked="variantRes.rightAnswer==true" :value="true"  :name="quesres.questionType==questionType[0]? 'p'+questionResIdx+'n' : ''">
                              <span class="checkmark"></span>
                            </label>
                          </td>
                          <td v-if="variantRes.variant_id">
                            <i class="ti ti-trash" style="color:red" data-toggle="tooltip" title="Remove"  @click.prevent="deleteVariantRes(quesres.question_id, variantRes.variant_id)" ></i>
                          </td>
                        </tr>
                        </template>
                        
                        <tr v-if="quesres.questionType==questionType[0] || quesres.questionType==questionType[1] || quesres.variants.length==0">
                          <td colspan="4" class="text-center"><i @click="addvariantRes(quesres.question_id)" class="ti ti-plus addingbtn addvariant"><span >Add variant</span></i></td>
                        </tr>
                      </tbody>
                    </table>
              </div>
              <div class="editbuttons" >
                <p v-if="checkEditorErorRes[quesres.question_id]" class="danger">{{checkEditorErorRes[quesres.question_id]}}</p>
                <p v-if="checkEditorOkRes[quesres.question_id]" class="ok">{{checkEditorOkRes[quesres.question_id]}}</p>
                
                <i class="ti ti-reload" data-toggle="tooltip" title="Edit"  @click.prevent="submitQuestionsRes(quesres.question_id)" ></i>
                <i class="ti ti-trash" data-toggle="tooltip" title="Remove"  @click.prevent="deleteQuestionsRes(quesres.question_id)" ></i>
              </div> 
              
            </div>
           
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import GoBackButton from '@/components/GoBackButton.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, requiredIf, integer } from '@vuelidate/validators'
import { maska } from 'maska'
import { standartAttribute } from '@/globals/globalFunction.js'
import { enIE } from 'date-fns/locale'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  directives: { maska },
  components: {
    GoBackButton,
   
  },
  data() {
    return {
      url: import.meta.env.VITE_APP_REST_ENDPOINT,
      
      showAddQuestion: false,
      lessons: [],
      order:1,
      iqc:20,
      prizeStatus:0,
      limit: 8,
      rightAnswer:8,
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      quiz:null,
      lesson_id: 12,
      prizeLimit:10,
      selected: 'with reward',
      quizType:['without reward','with reward','with limited reward'],
      checkEditorEror:false,
      checkEditorok:false,
      countQuestion:1,
      checkEditorErorRes: [],
      checkEditorOkRes: [],
      updatedImage: [],
      questionType: [
            'single','multiple','filltheblank','gapfill',
          ],
      selectedQuestionType: 'single',    
      questionsResponse: [ 
        { 
          question_id:0,
          question_ru: "",
          question_uz: "",
          questionTextOne_ru: "",
          questionTextOne_uz: "",
          questionTextTwo_ru: "",
          questionTextTwo_uz: "",
          questionImg: null,
          
          questionType: 'single',
          questionIMG: null,
          variants: [ 
            { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false,
              variantKeywords_ru:'',
              variantKeywords_uz:'',
            } 
          ] 
        } 
       ],
      questions: [ 
        { 
          question_ru: "",
          question_uz: "",
          questionTextOne_ru: "",
          questionTextOne_uz: "",
          questionTextTwo_ru: "",
          questionTextTwo_uz: "",
          questionIMG: null,
          questionType: 'single',
        } 
      ],
      variants: [ 
            { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false,
              variantKeywords_ru:'',
              variantKeywords_uz:'',
            },
            { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false,
              variantKeywords_ru:'',
              variantKeywords_uz:'',
            },
            { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false,
              variantKeywords_ru:'',
              variantKeywords_uz:'',
            },
        ]
    }
  },
  computed: {
    isDisabled: function () {
      this.v$.$touch();

      
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
    getChangenewQuestion(res){
      if(res.questionType=='filltheblank' || res.questionType=='gapfill'){
        if (this.variants.length >= 2) {
          this.variants.splice(1, this.variants.length-1);
        }
      }
    },
    getChange(res){
      console.log(res);
      if(res.questionType=='filltheblank' || res.questionType=='gapfill'){
        if (res.variants.length >= 2) {
          res.variants.splice(1, res.variants.length-1);
        }
      }
     
    },
    uploadFilebannerRu(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.questions[0].questionIMG = files[0];
    },
    uploadFilebannerUpdate(event,index) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.updatedImage[index]= files[0];
      console.log(this.updatedImage, index);
    },

    removeSpaces(modelPath) {
      const modelPathArray = modelPath.split('.'); // Split the model path by dots
      let model = this.$data;
      
      // Traverse through the object using the path
      for (const key of modelPathArray) {
        model = model[key];
      }
      
      // Update the model with spaces removed
      model = model.replace(/\s/g, '');
    },
    onChangeQuizType(event){
      console.log(event.target.value);
        if(event.target.value=='without reward'){
          
          this.iqc = 0;
        }
    },
    addvariantRes(questionId){
      
      let variantss= 
            { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false,
              variantKeywords_ru:'',
              variantKeywords_uz:'',
            } 
      this.questionsResponse.forEach(question => {
        if(question.question_id==questionId){
           
            question.variants.push(variantss);
        }
      });
        
    },
    changeAnswer(questionId, variantId, questionType){
      this.questionsResponse.forEach(question => {
          if(question.question_id==questionId){
            question.variants.forEach(element => {
              if(questionType=='single'){
                if(element.variant_id == variantId){
                  element.rightAnswer = true;
                }else{
                  element.rightAnswer = false;
                }
              }else{
                if(element.variant_id == variantId){
                  element.rightAnswer = !element.rightAnswer;
                }
              }
                
            });
          }
          
          
          });
    },
    async deleteVariantRes(questionId, variantId){
        const inputs = {
              'variant_id' :variantId,
            }
        const todo = standartAttribute();
        const finalResult = Object.assign(inputs, todo);
        var data = new FormData()
        // data.append('lessonBanner_ru', this.banner_ru)
        // data.append('lessonBanner_uz', this.banner_uz)
        for (const key in finalResult) {
          data.append(key, finalResult[key]);

        }
        try {
          let token = localStorage.getItem('token');
          const response = await fetch(this.url + 'api/v1/quizz/variants/delete', {
            method: 'POST',
            body: data,
            headers: {
              'Accept-Language': 'en-US,en;q=0.8',
              "accept": "application/json",
              'Authorization': 'Bearer ' + token,
            },

          });

          const json = await response.json();
        
          const status = response.status;

          if (status == 401) {
            this.checkEditorErorRes[questionId] = json.message;
          } else {
            if (json.error) {


              if (typeof json.message == 'object') {
                this.checkEditorErorRes[questionId] = json.message;
              } else {
                this.checkEditorErorRes[questionId] = json.message;
              }
            } else {
              // this.cleardate();
              this.checkEditorErorRes[questionId] = false;
              this.checkEditorOkRes[questionId] = 'Variant Successfully Deleted';
              setTimeout(() => {
                  this.questionsResponse.forEach(question => {
                    question.variants.forEach(element => {
                        if(element.variant_id == variantId){
                          question.variants.filter(item => item !== element)
                        }
                    });
                   
                    });
              }, 2000);
            }
          }


        } catch (error) {
          console.error('Ошибка:', error);
        }
    },  
    
    async submitQuestionsRes(questionId){
      let question = false;
      this.questionsResponse.forEach(function(question2)  {
        if(question2.question_id==questionId){
            question = question2;
        }
      });
      console.log(question);
      if(question.question_ru=='' || question.question_uz=='' ){
                this.checkEditorErorRes[questionId] = 'Question fields must be filled';
                return;
            }
            let insideCheck = false;
            
            question.variants.forEach(vari => {
                if(vari.variantText_ru && vari.variantText_uz && vari.rightAnswer){
                    insideCheck = true;
                    console.log(vari.variantText_ru,vari.rightAnswer);
                }
            });
            if((question.questionType=='single' || question.questionType=='multiple') && !insideCheck){
              this.checkEditorErorRes[questionId] = 'At least one answer fields must be filled and marked right answer';
              return;
            }

            this.checkEditorErorRes[questionId] = [];
            let notEmptyVariant= [];
            question.variants.forEach(vari => {
                  if((question.questionType=='single' || question.questionType=='multiple')){
                    if(vari.variantText_ru || vari.variantText_uz){
                      notEmptyVariant.push(vari);
                    }
                  }else{
                    notEmptyVariant.push(vari);
                  }
                  
              });
            let quiz_add = {
                question :question,
                variants : notEmptyVariant
            }
            console.log(quiz_add);
            const inputs = {
              'question_id' :questionId,
              'question' : JSON.stringify(quiz_add),
            }
            const todo = standartAttribute();
            const finalResult = Object.assign(inputs, todo);
            
            var data = new FormData();
            
            if(this.updatedImage[questionId]){
              data.append('questionIMG', this.updatedImage[questionId]);
            }
             
            
          
            // data.append('lessonBanner_uz', this.banner_uz)
            for (const key in finalResult) {
              data.append(key, finalResult[key]);

            }
            try {
              let token = localStorage.getItem('token');
              const response = await fetch(this.url + 'api/v1/quizz/questions/edit', {
                method: 'POST',
                body: data,
                headers: {
                  'Accept-Language': 'en-US,en;q=0.8',
                  "accept": "application/json",
                  'Authorization': 'Bearer ' + token,
                },

              });

              const json = await response.json();
            
              const status = response.status;

              if (status == 401) {
                this.checkEditorErorRes[questionId] = json.message;
              } else {
                if (json.error) {


                  if (typeof json.message == 'object') {
                    this.checkEditorErorRes[questionId] = json.message;
                  } else {
                    this.checkEditorErorRes[questionId] = json.message;
                  }
                } else {
                  // this.cleardate();
                  this.checkEditorErorRes[questionId] = false;
                  this.checkEditorOkRes[questionId] = 'Question Successfully Updated';
                 
                }
              }


            } catch (error) {
              console.error('Ошибка:', error);
            }
        

       
     
    },
    async deleteQuestionsRes(questionId){
      const inputs = {
          'question_id' :questionId,
        }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);
      var data = new FormData()
      // data.append('lessonBanner_ru', this.banner_ru)
      // data.append('lessonBanner_uz', this.banner_uz)
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/quizz/questions/delete', {
          method: 'POST',
          body: data,
          headers: {
            'Accept-Language': 'en-US,en;q=0.8',
            "accept": "application/json",
            'Authorization': 'Bearer ' + token,
          },

        });

        const json = await response.json();
       
        const status = response.status;

        if (status == 401) {
          this.checkEditorErorRes[questionId] = json.message;
        } else {
          if (json.error) {


            if (typeof json.message == 'object') {
              this.checkEditorErorRes[questionId] = json.message;
            } else {
              this.checkEditorErorRes[questionId] = json.message;
            }
          } else {
            // this.cleardate();
            this.checkEditorErorRes[questionId] = false;
            this.checkEditorOkRes[questionId] = 'Question Successfully Deleted';
            setTimeout(() => {
                this.questionsResponse.forEach(question => {
                  if(question.question_id==questionId){
                      
                      this.questionsResponse = this.questionsResponse.filter(item => item !== question)
                  }
                  });
            }, 2000);
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }
    },
    addingQuestion(){
      this.questions[0].questionType = 'single';
      this.showAddQuestion = true;
      
    },
    addvariant(){
      let variant = { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false,
              variantKeywords_ru:'',
              variantKeywords_uz:'',
      };
      this.variants.push(variant);
    },
    cleardate(){
        this.questions = [ 
        { 
          question_ru: "",
          question_uz: "",
          questionTextOne_ru: "",
          questionTextOne_uz: "",
          questionTextTwo_ru: "",
          questionTextTwo_uz: ""
        } 
      ];
      this.variants = false;
      this.variants = [ 
            { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false
            },
            { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false
            },
            { 
              variantText_ru: "",
              variantText_uz: "",
              rightAnswer: false
            },
        ];
    },
    async submitQuestions(){
      
      document.getElementById('questionSection').scrollIntoView({behavior: "smooth"});
        if(this.questions[0].question_ru=='' || this.questions[0].question_uz=='' ){
            this.checkEditorEror = 'Question fields must be filled';
            window.scrollTo({ top: currentContentHeight-100, behavior: 'smooth' });
            return;
        }
        let insideCheck = false;
        this.variants.forEach(vari => {
            if(vari.variantText_ru && vari.variantText_uz && vari.rightAnswer){
                insideCheck = true;
            }
        });
        if(!insideCheck){
          if(this.questions[0].questionType=='single' || this.questions[0].questionType=='multiple'){
              this.checkEditorEror = 'At least one answer fields must be filled and marked right answer';
            return;
          }
          
        }
        
        this.checkEditorEror = false;

       let notEmptyVariant= [];
       this.variants.forEach(vari => {
       
            if(this.questions[0].questionType=='filltheblank' || this.questions[0].questionType=='gapfill'){
                notEmptyVariant.push(vari);
            }else{
              if(vari.variantText_ru || vari.variantText_uz){
                notEmptyVariant.push(vari);
              }
            }
            
        });
        // console.log(this.variants);
        // console.log(notEmptyVariant,this.variants);
       let quiz_add = {
          question :this.questions[0],
          variants : notEmptyVariant
       }
       console.log(quiz_add);
       const inputs = {
        'lesson_id': this.lesson_id,
        'quizz_id': this.$route.params.id,
        'question' : JSON.stringify(quiz_add),
        'questionType': this.type,
        
      }
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);
      var data = new FormData()
      if(this.questions[0].questionIMG){
        data.append('questionIMG', this.questions[0].questionIMG);
      }
     
      // data.append('lessonBanner_uz', this.banner_uz)
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      
      try {
        this.checkEditorEror = false;
        this.checkEditorok= false;
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/quizz/questions/add', {
          method: 'POST',
          body: data,
          headers: {
            'Accept-Language': 'en-US,en;q=0.8',
            "accept": "application/json",
            'Authorization': 'Bearer ' + token,
          },

        });

        const json = await response.json();
       
        const status = response.status;

        if (status == 401) {
          this.resStringError = json.message;
           window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          if (json.error) {


            if (typeof json.message == 'object') {
              this.checkEditorEror = json.message;
            } else {
              this.checkEditorEror = json.message;
            }
          } else {
            this.cleardate();
            this.showAddQuestion = false;
            this.checkEditorok = 'Question Successfully Added';
            setTimeout(() => {
              this.checkEditorok= false;
            }, 3000);
            this.getQuizz();
          }
        }
        

      } catch (error) {
        console.error('Ошибка:', error);
      }
      // console.log(this.question_ru, this.question_uz, this.variantText_ru, this.variantText_uz)
    },
    async requestApi() {

      this.resSuccess = false;
      this.resError =false;
      this.resStringError = '';
      const inputs = {
        'lesson_id': this.lesson_id,
        'quiz_id': this.$route.params.id,
        'prizeIQC':this.iqc,
        'numberRightAnswersToPass':this.rightAnswer,
        'timeLimits':this.limit,
        'type': this.selected,
        'prizeStatus': this.prizeStatus,
      }

      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);
      
      var data = new FormData()
      if(this.selected=='with limited reward'){
        data.append('prizeLimit',parseInt(this.prizeLimit) );
      }
      // data.append('lessonBanner_ru', this.banner_ru)
      // data.append('lessonBanner_uz', this.banner_uz)
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/quizz/edit', {
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
            this.resSuccess = 'Quiz Successfully Edited';
            
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
          
        });
    },
    getQuizz(){
      let newUrl = this.url + 'api/v1/quizz?self='+this.$route.params.id;
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
          this.iqc = data.prizeIQC;
          this.limit=data.timeLimits;
          this.rightAnswer = data.numberRightAnswersToPass;
          this.lesson_id = data.lesson_id;
          this.questionsResponse = [];
          this.prizeLimit = data.prizeLimit;
          this.prizeStatus= data.prizeStatus==false? 0  : 1;
          this.selected = data.type;
          data.questions.forEach(element => {
            let sortedVariant = [];
            element.variants.forEach(item => {
              let newvariants = {
                  variant_id : item.id,
                  variantText_ru: JSON.parse(item.variantText).ru,
                  variantText_uz: JSON.parse(item.variantText).uz,
                  rightAnswer: item.rightAnswer,
                  variantKeywords_ru: item.keyWords? JSON.parse(item.keyWords).ru : '',
                  variantKeywords_uz: item.keyWords? JSON.parse(item.keyWords).uz : '',
              }
              sortedVariant.push(newvariants);
            });
            
            let newQuestion = {
              question_id: element.id,
              question_ru: JSON.parse(element.question).ru,
              question_uz: JSON.parse(element.question).uz,
              questionTextOne_ru: JSON.parse(element.questionTextOne).ru,
              questionTextOne_uz: JSON.parse(element.questionTextOne).uz,
              questionTextTwo_ru: JSON.parse(element.questionTextTwo).ru,
              questionTextTwo_uz: JSON.parse(element.questionTextTwo).uz,
              questionIMG: element.questionIMG,
              questionType: element.questionType,
              variants: sortedVariant,
              
            }
            
            this.questionsResponse.push(newQuestion);

          });
          this.questionsResponse.reverse();
          console.log(this.questionsResponse);
          // console.log(this.quiz);
        });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.getLessons();
    this.getQuizz();
    if(this.$route.query.adding){
      this.resSuccess  = this.$route.query.adding;
      setTimeout(() => {
         this.resSuccess = false;
      }, 5000);
    }
  },
}
</script>
<style lang="css" scoped>
.resp{
  
  padding: 10px 0;
}
.resp:hover{
  background-color: rgba(246, 246, 246, 0.432);
}
.editbuttons{
  display: flex;
  width: 95%;
  align-items: center;
  justify-content: flex-end;
}
.editbuttons p.danger{
  color: red;
}
.editbuttons p.ok{
  color: blue;
}
.editbuttons i{
  display: block;
  padding: 15px;

  transition: all 0.5s ease;
}
.editbuttons i.ti{
  color: blue;
}
.editbuttons i.ti-trash{
  color: red;
}
.editbuttons i:hover{
  transform: rotate(25deg);
}
.addvariant{
  
  margin: 0 auto;
}
.addingbtn{
  background-color: #1e3470;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  transition: all 0.5s ease;
  cursor: pointer;
  overflow: hidden;
}
.addingbtn:hover{
  transform: scale(1.05);
  box-shadow: 0 0 15px silver;
  width: 120px;
  border-radius: 10px;
}
.addingbtn span{
  display: none;
  padding: 0 8px;

}
.addingbtn span:hover{
  position: relative;
  top: -2px;
}
.addingbtn:hover span{
  display: block;
}
.container2 {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container2 input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container2:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container2 input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container2 input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container2 .checkmark:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}
</style>
