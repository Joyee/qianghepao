<template>
    <div class="feedback">
        <div class="title">
            <h3>问题反馈</h3>
        </div>
        <div class="feedback-container">
            <form action="" class="form">
                <div class="item">
                    <label for="" name="name">姓名:</label>
                    <input type="text" v-model="name">
                </div>
                <div class="item">
                    <label for="">手机号:</label>
                    <input type="text" name="mobile" v-model="mobile">
                </div>
                <div class="item">
                    <label for="">内容:</label>
                    <textarea name="content" id="" cols="30" rows="10" placeholder="最少10字，最多不超过200字。" v-model="content"></textarea>
                </div>
                <div class="item"><button class="submit" @click="submitBtn">提交</button></div>
            </form>
        </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "feedback",
    data () {
      return {
        name: "",
        mobile: "",
        content: ""
      };
    },
    methods: {
        submitBtn: function (event) {
          event.preventDefault();
            this.$http.post('/api/complain/complainPost', {
							name: this.name,
							mobile: this.mobile,
							content: this.content,
							user_id: this.id
						}).then((response) => {
							var data = response.data
							if (data.code == 200) {
								alert("提交成功")
								this.$router.push({path: '/exchange'})
							}
            })
        }
    },
    computed: {
      ...mapGetters(['id'])
    }
  }
</script>
<style scoped>
input, textarea, button {
    border: none;
    outline:none;
}
.feedback-container {
    padding: 0 200px;
}
.feedback-container .form {
    width: 100%;
}
.form label, .form input, .form textarea {
    display: block;
    width: 100%;
}
.form input[type="text"] {
    text-indent: 10px;
    height: 40px;
    line-height: 40px;
    box-shadow: 10px 10px 5px #f0f0f0;
    border-radius: 4px;
}

.form textarea {
    box-shadow: 10px 10px 5px #f0f0f0;
    border-radius: 4px;
    padding: 10px;
}

.submit {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #0c87ff;
    font-size: 12px;
    box-shadow: 10px 10px 5px #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
}
.item {
    margin: 20px auto;
}
</style>