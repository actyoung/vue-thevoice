<template>
    <div>
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const videoPlayer = ref(null);
const player = ref(null);

const props = defineProps({
    options: {
        type: Object,
        default: () => ({}),
    },
});

onMounted(() => {
    player.value = videojs(videoPlayer.value, props.options, function () {
        this.log('onPlayerReady', this);
    });
});

onBeforeUnmount(() => {
    if (player.value) {
        player.value.dispose();
    }
});

// 外部调用来切换视频源的方法
const setSource = (source) => {
    if (player.value) {
        player.value.src(source);  // 使用 video.js 的 src 方法更新视频源
        player.value.play();  // 自动播放新的视频源
    }
};

// 使用 defineExpose 将 setSource 方法暴露给外部
defineExpose({
    setSource
});
</script>