<template>
    <div class="download">
        <div class="title">
          <h3>应用下载</h3>
        </div>
        <ul class="download-list">
            <li><div class="download-item ios"><i class="czs-apple"></i><span>IOS客户端下载</span></div><div class="code"><span></span><div></div></div></li>
            <li><div class="download-item android"><i class="czs-android"></i><span>Android客户端下载</span></div><div class="code"><span></span><div></div></div></li>
            <li><div class="download-item mac"><i class="czs-apple"></i><span>MAC客户端下载</span></div></li>
            <li><div class="download-item window"><i class="czs-microsoft"></i><span>Windows客户端下载</span></div></li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "Download",
  props: ["info"],
  data () {
    return {
        ios: "",
    };
  },
  created: function () {
      
  }
}
</script>
<style scoped>
.download {
    height: 100%;
}
.download-list {
    margin: 40px 20px 115px;
    display: flex;
}

.download-list li {
    flex: 1;
    padding: 0 10px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    position: relative;
}

.code {
    display: none;
    position: absolute;
    left: 50%;
    top: 58px;
    width: 78px;
    height: 78px;
    transform: translateX(-50%);
    padding: 15px;
    background: #fff;
}
.code div {
    background: #ddd;
    width: 100%;
    height: 100%;
}
.code span {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -20px;
    z-index: 10;
}
.download-list li .download-item {
    border-radius: 4px;
    cursor: pointer;
}

.download-list li:hover .code {
    display: block;
}
.download-list li i {
    margin-right: 5px;
}
.ios {
    background: #fb4771;
}
.android {
    background: #0c87ff;
}
.mac {
    background: #21d774;
}
.window {
    background: #ff8800;
}
</style>