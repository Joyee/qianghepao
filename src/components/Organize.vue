<template>
    <div class="organization">
      <div class="lists">
        <ul>
          <li v-for="list in organ" :key="list.id">
              <div class="card">
                  <div class="card-head"><img :src="list.pic" alt=""><h4>{{list.name}}</h4></div>
                  <div class="card-content" v-html="list.detail"></div>
                  <div class="card-bottom">
                      <div class="view">
                          <img class="icon-view" src="../assets/images/icons/icon-view.png" alt=""><span>{{list.view_num}}</span>
                      </div>
                      <div class="like">
                          <img class="icon-like" src="../assets/images/icons/icon-like.png" alt=""><span>{{list.like_num}}</span>
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
  name: "Organize",
  props: ["organ"],
  data () {
    return {
      
    };
  },
  created: function () {
    console.log(this.organ)
  }
}
</script>
<style scoped>
.lists li .card {
  background: #fff;
  padding: 15px;
  border-radius: 6px;
  cursor: pointer;
}

.lists ul {
  overflow: hidden;
  margin: 0 10px;
}
.lists li {
  float: left;
  width: calc((100% - 50px) / 4);
  margin: 10px;
}

@media screen and (max-width: 767px) {
  .lists li {
    width: 100%;
  }
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