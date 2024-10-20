<template>
  <GoBackButton />
  <div class="mt-3">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Group</h4>

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
               
              </div>
              <div class="form-group row">
                <div class="col-md-12">
                  <label for="exampleInputTitleRu">Group Name</label>
                  <input type="text" class="form-control"
                    v-bind:class="{ 'border border-danger': v$.name.$errors.length > 0 }" id="exampleInputTitleRu"
                    v-model="name">
                  <small class="error" v-for="(error, index) of v$.name.$errors" :key="index">{{ error.$message
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
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { standartAttribute } from '@/globals/globalFunction.js';
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  components: {
    GoBackButton,
  },
  data() {
    return {
      url: import.meta.env.VITE_APP_REST_ENDPOINT,
      name: '',
      startDate: null,
      endDate: null,
      body_uz: '',
      courses: [],
      order:1,
      added: false,
      resError: false,
      resSuccess: false,
      resStringError: '',
      userInfo: null,
      monetized: 0,
      price: null,
      course_id: 2,
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
      name: {
        required,
      },
    }
  },

  methods: {
    
    getCourses(page, search = null) {

      let newUrl = this.url + 'api/v1/course?page=' + page;
      if (search) {
        newUrl = this.url + 'api/v1/course?page=1&search=' + search;
      }
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

          this.courses = data.data
        });
    },

    async requestApi() {

      const inputs = {
        'groupName': this.name
      }

      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      // data.append('courseBanner_ru', this.banner_ru)
      // data.append('courseBanner_uz', this.banner_uz)
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
      try {
        let token = localStorage.getItem('token');
        const response = await fetch(this.url + 'api/v1/groups', {
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
            this.resSuccess = 'Group Successfully Added';
            this.requestApiT(json.group_id);
          }
        }


      } catch (error) {
        console.error('Ошибка:', error);
      }

    },
    async requestApiT(groupID) {
      
      let inputs = {
        "group_id": groupID,
        "gender": 'all',
        "ageRange": 'all',
        "roleList": 'all',
      }
      
      const todo = standartAttribute();
      const finalResult = Object.assign(inputs, todo);

      var data = new FormData()
      
      for (const key in finalResult) {
        data.append(key, finalResult[key]);

      }
     
      try {
       
        const response = await fetch(this.url + 'api/v1/targetFilter/add', {
          method: 'POST',
          body: data,
          headers: {
            'Accept-Language': 'en-US,en;q=0.8',
            "accept": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },

        });
        const json = await response.json();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const status = response.status;

        if (status == 401) {
          this.resStringError = json.message;
          this.added = false;
        } else {
          if (json.error) {
            if (typeof json.message == 'object') {
              this.resError = json.message;
            } else {
              this.resStringError = json.message;
            }
            this.added = false;
          } else {
            setTimeout(() => {
              this.$router.push({ name: 'groups.edit', params: {'id': groupID}})
            }, 2000);
            //redirect to group id
            // this.resSuccess = 'Target filter Successfully Added';
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
    checkvalue() {
      console.log(this.startDate);
    },
    getvalue() {
      console.log(this.monetized);
    },
    getcourses() {

      let newUrl = this.url + 'api/v1/course/course?page=1';

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
          this.courses = data.data;
          // console.log(this.courses);
        });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    // this.getCourses();

  },
}
</script>
<style lang="css" scoped>
.image_prev {
  width: 100%;
  margin-bottom: 20px;
}


.language-switcher {
  position: relative;
  display: inline-block;
  width: 68px;
  height: 34px;
  transition: transform 0.17s cubic-bezier(0.26, 0.48, 0.08, 0.9);
}

.language-switcher input {
  opacity: 0;
  width: 0;
  height: 0;
}

.select-ru,
.select-uz {
  position: absolute;
  font-size: 15px;
  top: 7px;
  color: #fff;
  mix-blend-mode: difference;
}

.select-ru {
  left: 6px;
}

.select-uz {
  right: 6px;
}


/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1e3470;
  box-shadow: 0 3px 34px rgba(#1e3470, .1);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 34px;
  width: 34px;
  left: 0;
  bottom: 0;
  background-color: white;
  box-shadow: 0 3px 34px rgba(#1e3470, .16);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.language-switcher input:checked+.slider {
  background-color: #1e3470;
}

.language-switcher input:focus+.slider {
  box-shadow: none;
}

.language-switcher input:checked+.slider:before {
  -webkit-transform: translateX(34px);
  -ms-transform: translateX(34px);
  transform: translateX(34px);
}

/* Rounded sliders */
.language-switcher .slider.round {
  border-radius: 34px;
}

.language-switcher .slider.round:before {
  border-radius: 50%;
}
</style>