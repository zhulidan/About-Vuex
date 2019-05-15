<template>
  <div>
    <p>count: {{counts}}</p>
    <p>showFooter：{{gettersCount}}</p>
  </div>
</template>
<script>
  export default {
    name: "Home",
    computed: {
      counts() {
        return this.$store.state.count
      },
      gettersCount(){
        return this.$store.getters.isShow
      },
    }
  }
</script>
<style scoped>
</style>
