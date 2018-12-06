<template>
    <div class="top-ads-container">
        <ul>
            <li v-for="(ad, index) in ads" :key="index"><div><img :src="ad.img" alt=""></div></li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "HeaderAd",
  data () {
    return {
        ads: []
    }
  },
  created: function () {
      this.$http.get('/api/banner/bannerList').then(response => {
          if (response.data.code == 200) {
              var data = response.data.data
              var ads = []
              data.forEach((item, index) => {
                  item.img = "http://www.qianghepao.com" + item.img
                  if (item.type == 1) {
                      ads.push(item)
                  }
              })
              this.ads = ads
          }
      })
  }
}
</script>
<style>
.top-ads-container {
    width: 100%;
    display: block;
}
.top-ads-container ul {
    display: block;
    width: 100%;
    list-style: none;
    overflow: hidden;
}
.top-ads-container ul li {
    float: left;
    width: calc((100% - 60px) / 4);
}

.top-ads-container ul li:not(:last-child) {
    margin-right: 20px;
}
.top-ads-container ul li img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
}
</style>