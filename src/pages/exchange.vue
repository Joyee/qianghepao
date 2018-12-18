<template>
    <div class="nav-container">
			<search></search>
        <div class="title">
            <h3>{{title}}</h3>
        </div>
        <list type="1"></list>
    </div>
</template>
<script>
import List from '../components/List.vue'
import Search from '../components/Search.vue'

export default {
  name: "Exchange",
  components: {
    List,
		Search
  },
	metaInfo: {
		title: '枪和炮',
		meta: [
			{
				name: 'keywords',
				content: '枪和炮, 币圈'
			},
			{
				name: 'description',
				content: '网页描述'
			}
		]
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