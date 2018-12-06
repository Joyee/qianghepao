<template>
  <div id="app">
    <topNav></topNav>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import topNav from './components/TopNav/topNav'

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components: {
    topNav
  },
  created: function () {
    
  },
  mounted: function () {

  },
  methods: {
    
  }
}
</script>

<style>
</style>
