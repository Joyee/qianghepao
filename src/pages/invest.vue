<template>
    <div class="nav-container">
        <div class="title">
            <h3>{{title}}</h3>
        </div>
        <list type="4"></list>
    </div>
</template>
<script>
import List from '../components/List.vue'

export default {
  name: "Invest",
  components: {
    List
  },
  data () {
    return {
      title: "投资机构"
    }
  }
}
</script>
<style scoped>
</style>