<template>
	<div class="search">
		<el-input class="search-input" placeholder="请输入投资项目、机构、糖果等" v-model="search" type="text">
			<i slot="prefix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
		</el-input>
	</div>
</template>

<script>
	export default {
		name: "Search",
		data() {
			return {
				search: ""
			}
		},
		methods: {
			handleSearch: function () {
				this.$http.get('/api/exchange/exchangeList&key=' + this.search).then(res => {
					
				})
			},
		}
	}
</script>


<style>
	.search {
		margin: 20px 0;
	}
	.search .search-input {
		width: 400px;
	}
</style>