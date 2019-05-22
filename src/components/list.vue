<template>
  <div >
    <section class="joinState">
      <div class="joinStateHead">
        <p>列表</p>
        <br>
        <p>点击按钮获取列表</p>
        <button class="joinStatus" @click="invokePushItems(item)">加入收藏列</button>
        <ul v-if="arrList.length > 0">
          <li v-for="(item,index) in arrList" :key="index">
            <p>名字: {{item.productName}}</p>
            <p>价格: {{item.price}}</p>
          </li>
        </ul>
        <br>
        <br>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapState, mapGetters,mapActions } from 'vuex'
  export default {
    name:"list",
    data () {
      return {
        msg: '',
        item:{
          id:'01',
          productName: '苹果',
          price:'1.6元/斤'
        }
      }
    },
    mounted() {
      this.$store.dispatch('footerStatus/hideFooter')
    },
    computed:{

      // ...mapState({  //用mapState来获取collection.js里面的state的属性值
      //    arrList:state=>state.collection.collects
      // }),
      ...mapGetters('collection',{ //用mapGetters来获取collection.js里面的getters
        arrList:'renderCollects'
      })

    },
    methods:{
      ...mapActions('collection',[ //collection是指modules文件夹下的collection.js
        'invokePushItems'  //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
      ])
    }

  }
</script>
