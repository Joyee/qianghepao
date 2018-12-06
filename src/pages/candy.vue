<template>
    <div class="nav-container">
        <div class="title">
            <h3>{{title}}</h3>
        </div>
        <div class="lists">
          <ul>
            <li v-for="(list, index) in lists" :key="index">
              <div class="card" @click="goDetail(list.id)">
                  <div class="card-head"><h4>{{list.title}}</h4></div>
                  <div class="card-content" v-html="list.content"></div>
                  <div class="card-bottom">
                      <div class="time">
                          <img class="icon-time" src="../assets/images/icons/icon-time.png" alt=""><span>{{list.time}}</span>
                      </div>
                      <div class="getnum">
                          <img class="icon-view" src="../assets/images/icons/icon-readnum.png" alt=""><span>{{list.get_num}}</span>
                      </div>
                      <div class="activity"><span>正在进行</span></div>
                  </div>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: "Candy",
  data() {
    return {
      lists: [],
      title: "糖果大全"
    };
  },
  created: function() {
    this.$http.get("/api/candy/candyList").then(res => {
      if (res.data.code == 200) {
        this.lists = res.data.data.result;
      }
    });
  },
  methods: {
    goDetail: function (id) {
      this.$router.push({path: `/detail/${id}`})
    }
  }
};
</script>
<style scoped>
.nav-container {
  background: #fbfbfb;
  border-radius: 4px;
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

.lists ul {
  overflow: hidden;
}
.lists li {
  float: left;
  width: 25%;
  padding-left: 20px;
  padding-right: 20px;
  margin: 20px 0;
}

@media screen and (max-width: 767px) {
  .lists li {
    width: 50%;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .lists li {
    width: 50%;
  }
}

@media screen and (min-width: 992px) and (max-width: 1299px) {
  .lists li {
    width: 50%;
  }
}
@media screen and (min-width: 1300px) {
  .lists li {
    width: 25%;
  }
}

.lists li .card {
  background: #fff;
  padding: 15px;
  border-radius: 6px;
  cursor: pointer;
}

.card-head {
  overflow: hidden;
}

.card-head h4 {
  float: left;
  font-size: 10px;
  color: #333;
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

.card-bottom .time {
  float: left;
}

.card-bottom .getnum {
  float: left;
  margin-left: 20px;
}

.card-bottom img {
  margin-right: 4px;
}

.card-bottom .activity span {
  float: right;
  background: #0c87ff;
  color: #fff;
  padding: 0 5px;
  height: 20px;
  line-height: 20px;
  border-radius: 4px;
}
</style>