<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 48.9996px;
  align-items: center;
  background-color: #ffffff;
  justify-content: space-around;
  z-index: 100;
  width: 100%;
  box-shadow: 0px -0.5px 0px rgba(100, 100, 100, 0.1);
  padding-top: 3.0004px;
  opacity: 0.95;
}
</style>
