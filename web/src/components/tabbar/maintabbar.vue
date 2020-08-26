<template>
  <div>
    <TabBar>
      <TabBarItem path="/map" activecolor="#6fc0ff">
        <!-- @ 文件src地址的别名 -->
        <i slot="item-text" class="iconfont icon-tubiaozhizuomoban f-xxl"></i>
        <div class="mt-1" slot="item-text">地图</div>
      </TabBarItem>
      <TabBarItem path="/allArt">
        <i slot="item-text" class="iconfont icon-lan f-xxxl"></i>
        <div class="mt-1" slot="item-text">失物招领栏</div>
      </TabBarItem>
      <TabBarItem path="/profile">
        <i slot="item-text" class="iconfont icon-wd f-xxl"></i>
        <div class="mt-1" slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from "./TabBar.vue";
import TabBarItem from "./TabBarItem.vue";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>
