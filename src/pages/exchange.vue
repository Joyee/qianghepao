<template>
    <div class="nav-container">
        <div class="title">
            <h3>{{title}}</h3>
        </div>
        <list type="1"></list>
    </div>
</template>
<script>
import List from '../components/List.vue'

export default {
  name: "Exchange",
  components: {
    List
  },
  data () {
    return {
      title: "交易所"
    }
  }
}
</script>
<style scoped>
</style>