module.exports = name => {
  const content =
`<template>
  <div>{{content}}</div>
</template>
<script>
  export default {
    metaInfo: {
      title: 'demo'
    },
    data() {
      return {
        content: 'Hello ${name}'
      }
    }
  }
</script>
<style scoped>
  body {
    background-color: #999;
  }
</style>`
  return content
}
