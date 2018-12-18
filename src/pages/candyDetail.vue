<template>
    <div class="detail">
        <div class="title">
            <h3>糖果详情</h3>
        </div>
        <div class="detail-container">
            <h2>{{data.title}}</h2>
            <div class="about-user">
                <div class="author"><i class="czs-user-l"></i>{{data.auth}}</div>
                <div class="time"><i class="czs-time-l"></i>{{data.time}}</div>
                <div class="readnum"><i class="czs-eye-l"></i>{{data.readNum}}</div>
                <div class="share">分享 
                    <span class="weixin"><i class="czs-weixin"></i></span>
                    <span class="qq"><i class="czs-qq"></i></span>
                    <span class="weibo"><i class="czs-weibo"></i></span>
                </div>
            </div>
            <div class="detail-content" v-html="data.content"></div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    "id": String
  },
  data () {
    return {
        data: {}
    };
  },
  mounted: function () {
      this.$http.get('/api/learn/learnDetail?id=' + this.id).then(res => {
          console.log(res)
          if (res.data.code == 200) {
              var data = res.data.data
              this.data = data
          }
      })
  }
}
</script>
<style scoped>
.detail-container {
    background: #fff;
    margin: 20px;
    padding: 50px 30px;
    position: relative;
}
.detail-container h2 {
    font-size: 20px;
    color: #333;
    text-align: center;
}
.about-user {
    overflow: hidden;
    margin: 20px auto;
}
.about-user > div {
    float: left;
    font-size: 14px;
    color: #999;
}
.about-user > div:not(:last-child) {
    margin-right: 36px;
}
.share > span {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
}
.about-user > div > i {
    margin-right: 6px;
}
span.weixin {
    background: #50b674;
}
span.qq {
    background: #ea5d5c;
}
span.weibo {
    background: #30a5dd;
}

.detail-content {
    line-height: 24px;
    color: #666;
    font-size: 14px;
}
</style>