<template>
    <div class="home">
      <HeaderAd></HeaderAd>
      <router-view></router-view>
      <FooterAd></FooterAd>
    </div>
</template>
<script>
import HeaderAd from '@/components/HeaderAd'
import FooterAd from '@/components/FooterAd'
import Sidebar from '@/components/Sidebar'
import {mapGetters} from 'vuex'

export default {
  name: "Home",
  components: {
    HeaderAd,
    FooterAd,
    Sidebar
  },
  data () {
    return {
      
    }
  },
  created: function () {
    
  },
  mounted() {
    
  },
  methods: {
   
  },
 computed: {
  
 }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.home {
  height: 100%;
}
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