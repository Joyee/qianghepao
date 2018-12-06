<template>
  <div class="user-center">
    <div class="user-info">
      <img :src="avatar" alt="" class="avatar">
      <h4 class="username">{{username}}</h4>
      <span>{{id}}</span>
    </div>
    <div class="tab">
      <ul class="nav">
        <li><a href="javascript:;" @click="tabIdx=0" :class="{'cur':tabIdx === 0}">我的收藏</a></li>
        <li><a href="javascript:;" @click="getMessage" :class="{'cur':tabIdx === 1}">消息</a></li>
        <li><a href="javascript:;" @click="tabIdx=2" :class="{'cur':tabIdx === 2}">设置</a></li>
      </ul>
      <div class="tab-content">
        <div v-show="tabIdx === 0" class="lists">
          <ul>
            <li v-for="(list, index) in collectInfo" :key="index" @click="goDetail(list.id)">
              <div class="card">
                <div class="card-head"><img :src="list.pic" alt=""><h4>{{list.title}}</h4>
                </div>
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
        <div v-show="tabIdx === 1" class="lists">
          <ul>
            <li v-for="(list, index) in notice" :key="index" @click="goDetail(list.id)">
              <div class="card">
                <div class="card-head"><img :src="list.pic" alt=""><h4>{{list.title}}</h4>
                </div>
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
        <div v-show="tabIdx === 2" class="set">
          <ul>
            <li>
              <div class="change-item"><img src="../assets/images/avatar.png" alt="" class="avatar_s"><h3 class="username">{{username}}</h3>
              </div>
              <button class="changeBtn" :class="!userinfoFlag ? 'unchangeBtn':'changedBtn' " @click="changeInfoEvent">{{userinfoFlag? '已修改': '修改'}}</button>
            </li>
            <li>
              <div class="change-item">安全手机{{phone}}</div>
              <button class="changeBtn" :class="!phoneFlag ? 'unchangeBtn' : 'changedBtn'" @click="changePhoneEvent">{{phoneFlag? '已绑定': '未绑定'}}</button>
            </li>
            <li>
              <div class="change-item">账号密码{{password}}</div>
              <button class="changeBtn" :class="!pwdFlag ? 'unchangeBtn' : 'changedBtn'" @click="changePasswordEvent">{{pwdFlag? '已修改': '修改'}}</button>
            </li>
            <li>
              <div class="change-item">微信号{{weixin}}</div>
              <button class="changeBtn" :class="!weixinFlag ? 'unchangeBtn' : 'changedBtn'" @click="changeWeixinEvent">{{weixinFlag? '已绑定': '未绑定'}}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mask" v-show="mask"></div>
    <div class="changeInfo form-changeUsername" v-show="changeUserinfo">
      <h3>资料修改</h3>
      <div class="form">
        <div class="section">
          <label for="">头像:</label>
          <input type="file" placeholder="上传" name="pic">
        </div>
        <div class="section">
          <label for="">用户名:</label>
          <input type="text" name="username" v-model="username">
        </div>
        <div class="section btns">
          <button class="btn-confirm" @click="submitEvent(changeType)">确定</button>
          <button class="btn-cancel" @click="cancelEvent(changeType)">取消</button>
        </div>
      </div>
    </div>
    <div class="changeInfo form-changePhone" v-show="changePhone">
      <h3>修改手机号</h3>
      <form action="">
        <div class="section">
          <label for="">手机号:</label>
          <input type="text">
        </div>
        <div class="section">
          <label for="">验证码:</label>
          <input type="text">
          <button class="send" v-if="!successSend">发送</button>
          <button class="second" v-else>{{second}}s</button>
        </div>
        <div class="section">
          <button class="btn-confirm" @click="submitEvent(changeType)">确定</button>
          <button class="btn-cancel" @click="cancelEvent(changeType)">取消</button>
        </div>
      </form>
    </div>
    <div class="changeInfo form-changeWeixin" v-show="changeWeixin">
      <h3>绑定微信号</h3>
      <form action="">
        <img src="" alt="" class="weixincode">
        <p>请用微信扫描上面二维码</p>
        <div class="section">
          <button class="btn-confirm" @click="submitEvent(changeType)">确定</button>
          <button class="btn-cancel" @click="cancelEvent(changeType)">取消</button>
        </div>
      </form>
    </div>
    <div class="changeInfo form-changeWeixin" v-show="changePassword">
      <h3>密码修改</h3>
      <form action="">
        <div class="section">
          <label for="">旧密码:</label>
          <input type="password" placeholder="请输入旧密码">
        </div>
        <div class="section">
          <label for="">新密码:</label>
          <input type="password" placeholder="请输入新密码">
        </div>
        <div class="section">
          <label for="">新密码:</label>
          <input type="password" placeholder="请确认新密码">
        </div>
        <div class="section">
          <button class="btn-confirm" @click="submitEvent(changeType)">确定</button>
          <button class="btn-cancel" @click="cancelEvent(changeType)">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "usercenter",
  data() {
    return {
      successSend: false,
      send: '60',
      changeUserinfo: false,
      changePhone: false,
      changeWeixin: false,
      changePassword: false,

      userinfoFlag: false,
      phoneFlag: false,
      pwdFlag: false,
      weixinFlag: false,
      mask: false,
      changeType: 1,

      page: 1,
      tabIdx: 0,
      notice: "",
      password: "",
      weixin: "",
      phone: Number
    };
  },
  created: function() {
    
    this.$http
      .get("/api/user/collectList?uid=" + this.id + "&page=" + this.page)
      .then(response => {
        var data = response.data;
        console.log(data);
        if (data.code === 200) {
          this.pageCount = data.data.pageSize;
          this.collectInfo = data.data.result;
        }
      });
  },
  methods: {
    changeInfoEvent: function() {
      this.changeUserinfo = true
      this.mask = true
      this.type = 1
    },
    changePhoneEvent: function() {
      this.changePhone = true
      this.mask = true
      this.type = 2
    },
    changePasswordEvent: function() {
      this.changePassword = true
      this.mask = true
      this.type = 3
    },
    changeWeixinEvent: function() {
      this.changeWeixin = true
      this.mask = true
      this.type = 4
    },
    submitEvent: function(type) { 
      switch (type) {
        case 1: //修改用户信息
          if (this.username !== "") {
            this.$http.get('')
          }
          break
        case 2:
          {

          }
      }
    },
    getMessage: function() {
      this.tabIdx = 1
      this.$http
        .get("/api/user/noticeList?uid=" + this.uid)
        .then(response => {
          var data = response.data;
          if (data.code === 200) {
            console.log(data.data.result);
            this.notice = data.data.result;
          }
        });
    }
  }
};

</script>
<style scoped>
button {
  border: none;
}

.user-center .user-info {
  background: #fff;
  overflow: hidden;
  line-height: 80px;
}

.user-info .avatar {
  float: left;
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.user-info .username {
  font-size: 30px;
  color: #666;
  float: left;
}

.tab {}

.tab .nav {
  overflow: hidden;
}

.tab .nav li {
  float: left;
  height: 60px;
  line-height: 60px;
}

.nav li a {
  color: #666;
  font-size: 14px;
}

.nav li a.cur {
  border-bottom: 1px solid #0c87ff;
  color: #0c87ff;
}

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

.set {
  padding: 0 40px 50px;
  background: #fff;
  margin: 20px;
}

.set ul li {
  border-bottom: 1px solid #cccccc;
  position: relative;
}

.set ul li:first-child {
  overflow: hidden;
  padding: 30px 0;
}

.set ul li:first-child img {
  float: left;
  width: 60px;
  height: 60px;
}

.set ul li:first-child h3 {
  float: left;
  font-size: 14px;
  color: #666;
  line-height: 60px;
  margin-left: 20px;
}

.set ul li:not(:first-child) {
  height: 90px;
  line-height: 90px;
}

.set .changeBtn {
  position: absolute;
  right: 0;
  top: 31px;
  cursor: pointer;
}

.set .unchangeBtn {
  width: 40px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  color: #fff;
  background: #0c87ff;
}

.set .changedBtn {
  font-size: 12px;
  color: #999;
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 210;
  overflow: hidden;
}

.changeInfo {
  width: 420px;
  padding: 30px 30px 140px;
  border-radius: 4px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 220;
}

.changeInfo h3 {
  font-size: 14px;
  color: #333;
  margin-bottom: 38px;
}

.changeInfo .form .section {
  height: 40px;
  line-height: 40px;
  margin-bottom: 12px;
}

.changeInfo .section label {
  font-size: 14px;
  color: #666;
  width: 100px;
  text-align: right;
  float: left;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
}

.changeInfo .section input {
  float: left;
  width: 188px;
  height: 38px;
  border: 1px solid #cccccc;
}

.changeInfo .btns {
  width: 175px;
  margin: 38px auto 0;
}

.changeInfo .btns button {
  width: 80px;
  height: 28px;
  color: #fff;
  border-radius: 4px;
  float: left;
}

.btns .btn-confirm {
  background: #0c87ff;
  margin-right: 15px;
}

.btns .btn-cancel {
  background: #999;
}

</style>
