import { createApp } from 'vue'
import App from './App.vue'

// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './registerServiceWorker'
import router from './router'
import store from './store'

//字体文件
import "../public/iconfont/iconfont.css"

// 全局样式
import "./assets/style.css"

//markdown渲染
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)
// Vue.config.productionTip = false
app.use(VueMarkdownEditor).use(ElementPlus).use(store).use(router).mount('#app')
