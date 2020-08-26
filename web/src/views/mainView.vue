<!--  -->
<template>
  <div id="mainView w-100 h-100">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <maintabbar class="tabbar"></maintabbar>
  </div>
</template>

<script>
import maintabbar from "components/tabbar/maintabbar.vue";
export default {
  name: "mainView",
  components: {
    maintabbar,
  },
};
</script>
<style scoped></style>
