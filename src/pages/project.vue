<template>
    <div class="nav-container">
        <div class="title">
            <h3>{{title}}</h3>
        </div>
        <list type="2"></list>
    </div>
</template>
<script>
import List from '../components/List.vue'

export default {
  name: "Project",
  components: {
    List
  },
  data () {
    return {
      title: "企业项目"
    }
  }
}
</script>
<style scoped>
</style>