<template>
    <h2>{{ video.title }}的视频信息</h2>
    <div class="common-layout">
        <el-container>
            <el-main>
                <div>
                    <VideoPlayer :options="videoOptions" ref="videoPlayer" />
                </div>
            </el-main>
            <el-aside width="400px">
                <!-- 控制视频源的按钮 -->
                <div class="controls">
                    <button @click="changeVideo(video.original)">原视频</button>
                    <button @click="changeVideo(video.dubbing)">配音</button>
                    <RouterLink :to="`/rating/${video.id}`">
                        <button>投票</button>
                    </RouterLink>
                    <RouterLink to="/">
                        <button>返回首页</button>
                    </RouterLink>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import VideoPlayer from '@/components/VideoPlayer.vue';
import { useRoute } from 'vue-router';
import { useVideoStore } from '@/stores/videoStore';

const route = useRoute();
const videoStore = useVideoStore();
const video = videoStore.getVideoById(route.params.id);

// 定义 videoOptions 作为响应式引用
const videoOptions = ref({
    // autoplay: true,
    controls: true,
    width: 960,
    height: 600,
    sources: [
        video.original
    ]
});

// 获取 VideoPlayer 组件的实例
const videoPlayer = ref(null);

// 用于切换视频源的函数
const changeVideo = (video) => {
    // 调用 VideoPlayer 组件中的 setSource 方法
    videoPlayer.value.setSource(video);
};
</script>
<style lang="scss">
.common-layout {

    .el-header,
    .el-footer,
    .el-main,
    .el-aside {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-header,
    .el-footer {
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary);
        text-align: center;
    }

    .el-aside {
        background-color: var(--el-color-primary-light-8);
        color: var(--el-text-color-primary);
        text-align: center;
    }

    .el-main {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-text-color-primary);
        text-align: center;

        height: 100%;
    }
}
</style>