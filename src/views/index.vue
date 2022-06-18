<template>
  <div class="app-container home">
    <h1>wbxyy到此一游</h1>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      // 版本号
      version: '3.5.0'
    }
  },
  methods: {
    goTarget(href) {
      window.open(href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  // background: url("../assets/images/avatar.jpg") center;
  // background: url(~@/assets/images/avatar.jpg) center;
  background: url(~@img/avatar.jpg) center;
  background-size:444px 372px;
  height: calc(100vh - 85px);
}
</style>
