<template>
    <div class="nav-container">
        <div class="title">
            <h3>{{title}}</h3>
        </div>
        <div class="lists">
            <ul>
                <li v-for="(list, index) in lists" :key="index" @click="goDetail(list.id)">
                    <div class="card">
                        <div class="card-head"><h4>{{list.title}}</h4></div>
                        <div class="card-content" v-html="list.content"></div>
                        <div class="card-bottom">
                            <div class="time">
                                <img class="icon-time" src="../assets/images/icons/icon-time.png" alt=""><span>{{list.time}}</span>
                            </div>
                            <div class="readnum">
                                <img class="icon-view" src="../assets/images/icons/icon-readnum.png" alt=""><span>{{list.readNum}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: "Learn",
  data () {
    return {
        title: "学习学习",
        lists: []
    };
  },
  created: function() {
    this.$http.get("/api/learn/learnList").then(res => {
      if (res.data.code == 200) {
        var learnList = res.data.data.result
        this.lists = learnList
      }
    });
  },
  methods: {
    goDetail(id){
      this.$router.push({ path: `/learnDetail/${id}` });
    }
  }
}
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

.card-bottom .readnum {
    float: right;
}

.card-bottom img {
    margin-right: 4px;
}
</style>