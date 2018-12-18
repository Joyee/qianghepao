<template>
  <div id="app">
    <topNav></topNav>
    <div class="main-wrap">
      <div class="main">
        <Sidebar></Sidebar>
        <div class="container">
          <transition name="fade">
            <keep-alive>
              <router-view></router-view>
          </keep-alive>
          </transition>
					<router-link to="/exchange" class="back-to-home"><img src="/static/image/icon-back.png">返回首页</router-link>
        </div>
        <div class="copyright">Copyright © 2016-2018  京ICP备17020276号-1  枪和炮 完整高效的币圈聚合平台  <router-link to="/about">关于枪和炮</router-link></div>
      </div>
      <tool></tool>
    </div>
  </div>
</template>

<script>
  import topNav from '@/components/TopNav/topNav'
  import Sidebar from '@/components/Sidebar'
  import Tool from '@/components/Tool'

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components: {
    topNav,
    Sidebar,
    Tool
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
.main-wrap {
  margin-left: 230px;
}

.container {
  margin: 40px auto;
  background: #fbfbfb;
  border-radius: 4px;
  padding-bottom: 40px;
}

.main {
  padding: 50px 0;
  margin: 0 auto;
}

@media screen and (max-width: 767px) {
  .main {
    width: 580px;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .main {width: 580px;}
} 

@media screen and ( min-width: 992px ) and (max-width: 1299px) {
  .main {width: 760px;}
}
@media screen and ( min-width: 1300px ) {
  .main {width: 1080px;}
}

.copyright {
  margin: 27px 0 0;
  font-size: 12px;
  color: #c3c3c3;
}

.copyright a {
  color: #333;
}

ul, ol, li {
  list-style: none;
}

.title {
  height: 50px;
  line-height: 50px;
  color: #333333;
  font-size: 14px;
  border-bottom: 1px solid #eaeaea;
  margin: 0 20px;
}

.title h3 {
  float: left;
  border-bottom: 1px solid #333333;
  height: 50px;
}

.back-to-home {
  display: block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-size: 12px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 10px 10px 5px #f0f0f0;
  border-radius: 6px;
}
.back-to-home img {
  display: inline-block;
  width: 16px;
  height: 12px;
  vertical-align: middle;
  margin-right: 8px;
}

.card-content p:not(:first-child) {
  display: none;
}
.detail-content p img {
    width: 580px;
    height: 270px;
    display: block;
    margin: 35px auto;
}

.user-center-box {
  float: right;
  margin: 10px 30px 10px 0;
}
.user-center-box ul li {
  float: left;
  height: 24px;
  line-height: 24px;
}
.user-center-box a {
  display: block;
  font-size: 12px;
  color: #666;
  margin-left: 16px;
}
.avatar {
  display: inline-block;
  vertical-align: top;
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
</style>
