<template>
  <div>
    <p>【state】count的值为： {{counts}}</p>
    <p>【getter】showFooter的值为{{gettersCount}}</p>
    <p>【mutation】<button @click="getValue">count的值+6</button></p>
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
    },
    methods:{
      getValue(){
         this.$store.commit('newNum',6)
      }
    }
  }
</script>
<style scoped>
</style>
