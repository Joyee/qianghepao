<template>
    <div class="tool">
        <ul>
            <li><router-link to="/feedback"><i class="czs-write-l"></i></router-link></li>
            <li @click="backToTop" v-show="showReturnToTop"><a href="javascript:;"><i class="czs-angle-up-l"></i></a></li>
        </ul>
    </div>
</template>
<script>
import { scrollIt } from '../assets/js/scroll'
export default {
  name: "Tool",
  data() {
    return {
        showReturnToTop: false,
        pageY: 400
    };
  },
  methods: {
    currentPageYOffset () {
    // 判断滚动区域大于多少的时候显示返回顶部的按钮
        window.pageYOffset > this.pageY ? this.showReturnToTop = true : this.showReturnToTop = false;
    },
    backToTop () {
        scrollIt(0, 1500, this.transitionName, this.currentPageYOffset);
    },
		goFeedback () {
			
		}
  },
  created () {
      window.addEventListener('scroll', this.currentPageYOffset);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.currentPageYOffset)
    }
};
</script>
<style scoped>
.tool {
  width: 40px;
  position: fixed;
  right: 45px;
  bottom: 1%;
}
.tool ul > li {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: #333;
  margin-bottom: 10px;
}
.tool ul li a {
  display: block;
  color: #666;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 28px;
}
</style>