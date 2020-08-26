<template>
  <div @click="itemclick" class="tab-bar-item">
    <div v-if="!active">
      <slot name="item-icno"></slot>
    </div>
    <div v-else>
      <slot name="active-item-icno"></slot>
    </div>
    <div :style="activestyle" :class="{ textactive: active }">
      <slot name="item-text"></slot>
    </div>
    <!-- <img src="../assets/img/首页.svg" />
    <div class="ps">首页</div>-->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      //active: false
    };
  },
  computed: {
    active() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    activestyle() {
      return this.active ? { color: this.activecolor } : {};
    },
  },
  props: {
    path: {
      type: String,
    },
    activecolor: {
      type: String,
      default: "#6fc0ff",
    },
  },
  methods: {
    itemclick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  width: 33%;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #666;
  height: 2.3077rem;
}
.tab-bar-item i {
  vertical-align: middle;
}
</style>
