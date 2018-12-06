<template>
    <div class="about">
        <div class="title">
            <h3>关于我们</h3>
        </div>
        <div class="about-container">
            <img src="../assets/images/logo-black.png" alt="" class="logo">
            <p class="des">枪和炮是集合区块链行业交易所、资讯、行情、一级市场、挖矿、投资机构、糖果、企业/项目、区块应用等多项内容的一站式区块链数据整合平台。 我们将为用户提供完整、高效、免费、真实的区块链数据，我们致力于成为用户的秘密武器，帮助你们在币圈冲锋陷阵。</p>
            <ul class="attention">
                <li>
                    <div class="code"><img src="../assets/images/xiaozhushou.jpg" alt=""></div>
                    <p>小助手</p>
                </li>
                <li>
                    <div class="code"><img src="../assets/images/gongzhonghao.jpg" alt=""></div>
                    <p>微信公众号</p>
                </li>
                <li>
                    <div class="code"><img src="../assets/images/imtoken.jpg" alt=""></div>
                    <p>Imtoken</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: "About",
  data () {
    return {
    };
  }
}
</script>
<style scoped>
.about-container .logo {
    display: block;
    width: 142px;
    height: 44px;
    margin: 30px auto 28px;
}
.des {
    font-size: 12px;
    color: #666;
    line-height: 20px;
    text-align: center;
    width: 50%;
    margin: 0 auto;
}

.about .attention {
    list-style: none;
    padding: 0;
    width: 300px;
    margin: 44px auto;
    overflow: hidden;
}
.about .attention li {
    width: 100px;
    float: left;
    text-align: center;
}
.about .attention li img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
}
.about .attention li p {
    font-size: 12px;
    color: #666;
    padding: 15px 0;
}
</style>