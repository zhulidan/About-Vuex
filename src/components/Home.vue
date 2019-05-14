<template>
  <div>
    {{counts}}
  </div>
</template>
<script>
  export default {
    name: "Home",
    computed: {
      counts() {
        return this.$store.state.count
      }
    }
  }
</script>
<style scoped>
</style>
