<!--  -->
<template>
  <div class="container">
    <svg>
      <symbol id="line-text" viewBox="0 0 1000 300">
        <text text-anchor="middle" x="50%" y="50%" dy=".4em">Welcome</text>
      </symbol>
      <use xlink:href="#line-text" class="text" />
      <use xlink:href="#line-text" class="text" />
      <use xlink:href="#line-text" class="text" />
      <use xlink:href="#line-text" class="text" />
    </svg>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
};
</script>
<style  scoped>
* {
  padding: 0;
  margin: 0;
}

.container {
  font-size: 120px;
  font-weight: bold;
  text-transform: uppercase;
}

svg {
  position: absolute;
  width: 88%;
  height: 80%;
}

.text {
  fill: none;
  stroke-width: 5;
  stroke-dasharray: 0 240;
  stroke-dashoffset: 0;
}

.text:nth-child(4n + 1) {
  stroke: rgb(39, 135, 238);
  animation: text1 4s ease-in-out forwards;
}
.text:nth-child(4n + 2) {
  stroke: rgb(47, 169, 92);
  animation: text2 4s ease-in-out forwards;
}
.text:nth-child(4n + 3) {
  stroke: rgb(249, 189, 56);
  animation: text3 4s ease-in-out forwards;
}
.text:nth-child(4n + 4) {
  stroke: rgb(235, 61, 50);
  animation: text4 4s ease-in-out forwards;
}

@keyframes text1 {
  100% {
    stroke-dashoffset: 1000;
    stroke-dasharray: 60 180;
  }
}

@keyframes text2 {
  100% {
    stroke-dashoffset: 1060;
    stroke-dasharray: 60 180;
  }
}

@keyframes text3 {
  100% {
    stroke-dashoffset: 1120;
    stroke-dasharray: 60 180;
  }
}

@keyframes text4 {
  100% {
    stroke-dashoffset: 1180;
    stroke-dasharray: 60 180;
  }
}
</style>