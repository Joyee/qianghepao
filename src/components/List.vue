<template>
  <div class="lists">
      <ul>
          <li v-for="(list, index) in lists" :key="index" @click="goDetail(list.id)">
              <div class="card">
                  <div class="card-head"><img :src="list.pic" alt=""><h4>{{list.title}}</h4></div>
                  <div class="card-content" v-html="list.content"></div>
                  <div class="card-bottom">
                      <div class="view">
                          <img class="icon-view" src="../assets/images/icons/icon-view.png" alt=""><span>{{list.viewNum}}</span>
                      </div>
                      <div class="like">
                          <img class="icon-like" src="../assets/images/icons/icon-like.png" alt=""><span>{{list.likeNum}}</span>
                      </div>
                  </div>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      lists: []
    };
  },
  props: ["type"],
  created: function() {
		console.log(typeof(this.type))
    this.$http.get("/api/exchange/exchangeList?type=" + this.type).then(res => {
      if (res.data.code == 200) {
        var lists = res.data.data.result;
        lists.forEach((item, index) => {
          item.pic = "http://www.qianghepao.com" + item.pic;
        });
        this.lists = lists;
      }
    });
  },
  methods: {
    goDetail: function(id) {
      let _this = this
			console.log(id)
      switch (_this.type) {
        case "1":  //交易所
          this.$router.push({ path: `/detail/${id}` }); 
          break;
        case "2":  //投资机构
          this.$router.push({ path: `/projectdetail/${id}` });
          break;
        case "4": //企业项目
          this.$router.push({ path: `/projectdetail/${id}` });
          break;
      }
    }
  }
};
</script>
<style>
.lists ul {
  overflow: hidden;
}
.lists li {
  float: left;
  width: calc((100% - 80px) / 2);
  margin: 20px;
}

@media screen and (max-width: 767px) {
  .lists li {
    width: 100%;
  }
}
/* @media screen and (min-width: 768px) and (max-width: 991px) {
  .lists li {
    width: 50%;
  }
}

@media screen and (min-width: 992px) and (max-width: 1299px) {
  .lists li {
    width: calc(100% / 3);
  }
}
@media screen and (min-width: 1300px) {
  .lists li {
    width: 25%;
  }
} */

.lists li .card {
  background: #fff;
  padding: 15px;
  border-radius: 6px;
  cursor: pointer;
}

.card-head {
  overflow: hidden;
}
.card-head img {
  width: 26px;
  height: 26px;
  float: left;
  border-radius: 4px;
}
.card-head h4 {
  float: left;
  font-size: 10px;
  color: #333;
  margin-left: 10px;
  height: 26px;
  line-height: 26px;
}

.card-content {
  font-size: 12px;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin: 10px auto 15px;
}

.card-bottom {
  font-size: 12px;
  color: #999;
  overflow: hidden;
}

.card-bottom .view {
  float: left;
}

.card-bottom .like {
  float: right;
}

.card-bottom img {
  margin-right: 4px;
}
</style>