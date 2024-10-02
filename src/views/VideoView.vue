<template>
    <div class="video-page">
        <h2>{{ video.title }} 的视频信息</h2>
        <el-container class="layout-container">
            <el-main class="video-section">
                <VideoPlayer :options="videoOptions" ref="videoPlayer" />
            </el-main>
            <el-aside width="300px" class="controls-section">
                <div class="controls">
                    <div>
                        <el-button type="primary" @click="changeVideo(video.original)" class="control-button">
                            原视频
                        </el-button>
                    </div>
                    <div>
                        <el-button type="success" @click="changeVideo(video.dubbing)" class="control-button">
                            配音
                        </el-button>
                    </div>
                    <RouterLink :to="`/rating/${video.id}`">
                        <el-button type="warning" class="control-button">投票</el-button>
                    </RouterLink>
                    <RouterLink to="/">
                        <el-button type="danger" class="control-button">返回首页</el-button>
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

const videoOptions = ref({
    controls: true,
    width: 860,
    height: 486,
    sources: [video.original]
});

const videoPlayer = ref(null);

const changeVideo = (video) => {
    videoPlayer.value.setSource(video);
};
</script>

<style lang="scss" scoped>
.video-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;

    h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
    }

    .layout-container {
        display: flex;
        justify-content: space-between;
        max-width: 1200px;
        width: 100%;
    }

    .video-section {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }

    .controls-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #f0f4f5;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 10px;

        .controls {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .control-button {
            width: 100%;
            text-align: center;
        }
    }
}
</style>