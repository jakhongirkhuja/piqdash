
<template>
  <div class="container-scroller">
    <HeaderNav ref="theHeaderNavRef"  />
    <div class="container-fluid page-body-wrapper">
      <TheSideBar />
      <TheNavigation ref="theNavigationRef" />
      <div class="main-panel">
        <div class="content-wrapper">
          
          <router-view @NewType_1="getToken"></router-view>
        </div>
        <TheFooter />


      </div>
    </div>
  </div>


</template>
<script>
import TheNavigation from '@/components/TheNavigation.vue';
import TheSideBar from '@/components/TheSideBar.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import TheFooter from '@/components/Footer.vue';

export default {
  components: { TheNavigation, TheSideBar, HeaderNav, TheFooter },
  methods: {
    getToken(token){
      this.$refs.theNavigationRef.showToken(token);
      this.$refs.theHeaderNavRef.showToken(token);  
    }
  },
}
</script>
