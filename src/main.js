// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import './assets/style.css'
import axios from 'axios'
import {Form, FormItem, Input, Button, Dialog, Message, Row, MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/perm'//依赖拦截器
import MetaInfo from 'vue-meta-info'

Vue.use(Vuex)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.component(Message)
Vue.use(Row)
Vue.prototype.$http= axios
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.use(MetaInfo)

Vue.config.productionTip = false

/* eslint-disable no-new */

var app = new Vue({
  data: {},
  el: '#app',
  router,
  store,
  render: h => h(App),
	mounted() {
		document.dispatchEvent(new Event('render-event'))
	}
})