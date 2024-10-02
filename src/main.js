import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import VueRewards from "vue-rewards";
import "video.js/dist/video-js.css";
import { useVideoStore } from './stores/videoStore';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueRewards);

const videoStore = useVideoStore();
videoStore.fetchVideos(); 

app.mount('#app')
