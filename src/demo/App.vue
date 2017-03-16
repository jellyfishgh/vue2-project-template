<template>
  <div>{{content}}</div>
</template>
<script>
  export default {
    metaInfo: {
      title: 'demo'
    },
    data() {
      return {
        content: 'Hello demo'
      }
    }
  }
</script>
<style scoped>
  body {
    background-color: #999;
  }
</style>