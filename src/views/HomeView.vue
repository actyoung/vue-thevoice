<template>
  <h2>历史故事配音秀</h2>
  <el-row :gutter="20">
    <!-- 九宫格布局 -->
    <el-col :span="8" v-for="video in videos" :key="video.id" class="grid-item-col">
      <RouterLink :to="`/video/${video.id}`">
        <el-card class="grid-item" shadow="hover">
          <img :src="video.cover" class="video-cover" alt="Video cover" />
          <div style="padding: 10px;">
            <h3>{{ video.title }}</h3>
          </div>
        </el-card>
      </RouterLink>
    </el-col>
  </el-row>
</template>

<script setup>
import { useVideoStore } from '@/stores/videoStore';
import { storeToRefs } from 'pinia';

const videoStore = useVideoStore();
const { videos } = storeToRefs(videoStore);
</script>

<style scoped>
.grid-item {
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
  /* 卡片底部增加间隙 */
}

.grid-item-col {
  display: flex;
  justify-content: center;
  /* 居中显示卡片 */
  align-items: center;
  margin-bottom: 20px;
  /* 每个卡片下方有一些间距 */
}

.video-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>