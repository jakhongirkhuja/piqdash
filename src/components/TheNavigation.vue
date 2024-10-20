<template>

  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item" id="userShow">
        <a class="nav-link" @click="this.$router.replace({ name: 'users.all' }); addActiveClass('userShow')">
          <i class="icon-head menu-icon"></i>
          <span class="menu-title">Users</span>
        </a>
      </li>

      <li class="nav-item" id="companyShow">
        <a class="nav-link" @click="this.$router.replace({ name: 'companies.all' }); addActiveClass('companyShow')">
          <i class="icon-grid menu-icon"></i>
          <span class="menu-title">Companies</span>
        </a>
      </li>
      
      <li class="nav-item" id="courseShow" v-if="user && (user.role == 'Creator' || user.role == 'Owner')">
        <a class="nav-link" data-toggle="collapse" href="#ui-basic"
          @click=" addActiveClass('courseShow')" aria-expanded="false"
          aria-controls="ui-basic">
            <i class="icon-layout menu-icon"></i>
            <span class="menu-title">Courses</span>
            <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ui-basic">
          <ul class="nav flex-column sub-menu ">
            <li class="nav-item" > 
              <a class="nav-link" data-toggle="collapse" href="#ui-basicCRUD"
                 aria-expanded="false"
                  aria-controls="ui-basicCRUD">CRUD <i class="menu-arrow" style="    color: #fff;"></i></a>
                  <div class="collapse" id="ui-basicCRUD">
                  <ul class="nav flex-column sub-menu sub-padding">
                    <li class="nav-item"> <a class="nav-link"
                        @click="this.$router.replace({ name: 'categories.all' });">Categories</a></li>
                    <li class="nav-item"> <a class="nav-link"
                        @click="this.$router.replace({ name: 'courses.all' });">Courses</a></li>
                    <li class="nav-item"> <a class="nav-link"
                        @click="this.$router.replace({ name: 'lessons.all' });">Lessons</a></li>
                    <li class="nav-item"> <a class="nav-link"
                        @click="this.$router.replace({ name: 'quizzes.all' });">Quizzes</a></li>
                  </ul>
                </div>
            </li>
            <li class="nav-item" > 
              <a class="nav-link" data-toggle="collapse" href="#ui-basicDASH"
                 aria-expanded="false"
                  aria-controls="ui-basicDASH">Dash <i class="menu-arrow" style="    color: #fff;"></i></a>
                  <div class="collapse" id="ui-basicDASH">
                  <ul class="nav flex-column sub-menu sub-padding">
                    <li class="nav-item"> <a class="nav-link"
                        @click="this.$router.replace({ name: 'quizzes.dash' });">Quizzes</a></li>
                  </ul>
                </div>
            </li>
            
          </ul>
        </div>
        
      </li>
      <li class="nav-item" id="courseShow" v-if="user && user.role == 'Analytic'">
        <a class="nav-link" @click="this.$router.replace({ name: 'courses.all' }); addActiveClass('courseShow')">
          <i class="icon-layout menu-icon"></i>
          <span class="menu-title">Courses</span>
        </a>
      </li>
      <li class="nav-item" id="GroupShow">
        <a class="nav-link" @click="this.$router.replace({ name: 'groups.all' }); addActiveClass('GroupShow')">
          <i class="icon-layers menu-icon"></i>
          <span class="menu-title">Groups for targeting</span>
        </a>
      </li>
      <li class="nav-item" id="StoreShow" v-if="user && (user.role == 'Creator' || user.role == 'Owner')">
        <a class="nav-link" data-toggle="collapse" href="#ui-basic2"
          @click=" addActiveClass('StoreShow')" aria-expanded="false"
          aria-controls="ui-basic2">
          <i class="icon-anchor menu-icon"></i>
          <span class="menu-title">Store</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ui-basic2">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'storesCategory.all' });">Category</a></li>
            <li class="nav-item"> 
              <a class="nav-link"  data-toggle="collapse" href="#ui-basicProductTypeStore"
                 aria-expanded="false"
                  aria-controls="ui-basicProductTypeStore"  >Store 
                <i class="menu-arrow" style="    color: #fff;"></i>
              </a>
              <div class="collapse" id="ui-basicProductTypeStore">
                  <ul class="nav flex-column sub-menu sub-padding">
                    <li class="nav-item"> <a class="nav-link"
                      @click="this.$router.replace({ name: 'physicalStore.all' });">Physical</a></li>
                    <li class="nav-item"> <a class="nav-link"
                      @click="this.$router.replace({ name: 'digitalStore.all' });">Digital</a></li>
                   
                  </ul>
                </div>
               
              </li>
            <li class="nav-item"> <a class="nav-link" data-toggle="collapse" href="#ui-basicProductType"
                 aria-expanded="false"
                  aria-controls="ui-basicProductType" 
                >Products <i class="menu-arrow" style="    color: #fff;"></i></a>
              
                <div class="collapse" id="ui-basicProductType">
                  <ul class="nav flex-column sub-menu sub-padding">
                    <li class="nav-item"> <a class="nav-link"
                      @click="this.$router.replace({ name: 'physicalProduct.all' });">Physical</a></li>
                    <li class="nav-item"> <a class="nav-link"
                      @click="this.$router.replace({ name: 'digitalProduct.all' });">Digital</a></li>
                   
                  </ul>
                </div>
              </li>
              <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'korzinka.all' });">Korzinka</a></li>
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'sellers.all' });">Sellers</a></li>
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'sellers.all' });">Reports (soon)</a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item" id="InboxShow" v-if="user && (user.role == 'Creator' || user.role == 'Owner')">
        <a class="nav-link" data-toggle="collapse" href="#ui-basic3"
          @click=" addActiveClass('InboxShow');" aria-expanded="false"
          aria-controls="ui-basic2">
          <i class="icon-layout menu-icon"></i>
          <span class="menu-title">Inbox</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ui-basic3">
           <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'inboxes.all' });">Inbox Message</a></li> 
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'promocodes.all' });">Promocode</a></li>
            
            
            
         </ul>
        </div>
      </li>
      <li class="nav-item" id="NewsShow" v-if="user && (user.role == 'Creator' || user.role == 'Owner')">
        <a class="nav-link" data-toggle="collapse" href="#ui-basic2N"
          @click=" addActiveClass('NewsShow')" aria-expanded="false"
          aria-controls="ui-basic2N">
          <i class="icon-book menu-icon"></i>
          <span class="menu-title">News</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ui-basic2N">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'news.all' });">News</a></li>
           
          </ul>
        </div>
      </li>
      <li class="nav-item" id="LotteryShow" v-if="user && (user.role == 'Creator' || user.role == 'Owner')">
        <a class="nav-link" data-toggle="collapse" href="#ui-basic2L"
          @click=" addActiveClass('LotteryShow')" aria-expanded="false"
          aria-controls="ui-basic2L">
          <i class="icon-book menu-icon"></i>
          <span class="menu-title">Lottery</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ui-basic2L">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'lottery.all' });">Lottery</a></li>
           
          </ul>
        </div>
      </li>
      <li class="nav-item" id="SMSShow" v-if="user && (user.role == 'Creator' || user.role == 'Owner')">
        <a class="nav-link" href="#sMSShow2" data-toggle="collapse" @click=" addActiveClass('SMSShow')" aria-expanded="false"
          aria-controls="sMSShow2">
          <i class="icon-mail menu-icon"></i>
          <span class="menu-title">Message Center</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="sMSShow2">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'sms.all' });">Dash</a></li>
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'sms.control.all' });">Control</a></li>
          </ul>
        </div>
      </li>
      
      <li class="nav-item" id="FinanceShow" v-if="user && (user.role == 'Creator' || user.role == 'Owner')">
        <a class="nav-link" href="#sFinanceShow" data-toggle="collapse" @click=" addActiveClass('FinanceShow')" aria-expanded="false"
          aria-controls="sFinanceShow">
          <i class="icon-command menu-icon"></i>
          <span class="menu-title">Finance</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="sFinanceShow">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'finance.all' });">Dash</a></li>
              <li class="nav-item"> <a class="nav-link"
                @click="this.$router.replace({ name: 'finance.removeIqc' });">Remove IQC</a></li>
          </ul>
        </div>
      </li>

    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      user: null,
    }
  },
  methods: {
    addActiveClass(id) {
      document.querySelectorAll('li.nav-item').forEach(element => {
        element.classList.remove('active');
      });
      document.querySelector('#' + id).classList.add('active');
    },
    showToken(token) {

      try {
        const url = 'https://api.pharmiq.uz/api/v1/user';
        const options = {
          method: 'GET',
          headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }),
        };

        fetch(url, options)
          .then((response) => {

            if (response.status == 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = 'https://go.pharmiq.uz/';
            }
            return response.json();
          })
          .then((json) => {
            this.user = json;


          })


      } catch (error) {
        console.error('Ошибка:', error);
      }

    }
  },
  created() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

  },
}
</script>
<style scoped >
.nav-link {
  cursor: pointer;
}
.sub-padding{
  padding: 0.25rem 0 0 1.07rem!important;
}
</style>