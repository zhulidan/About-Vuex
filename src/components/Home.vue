<template>
  <div>
    <p>【state】count的值为： {{counts}}</p>
    <p>【getter】showFooter的值为{{gettersCount}}</p>
    <p>【mutation】<button @click="getValue">count的值+6</button></p>
    <p>【action】<button @click="getShowVal">切换showFooter得值</button></p>
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
      },
      getShowVal(){
        this.gettersCount ? this.$store.dispatch('hideFooter') : this.$store.dispatch('showFooter')
      }
    }
  }
</script>
<style scoped>
</style>
