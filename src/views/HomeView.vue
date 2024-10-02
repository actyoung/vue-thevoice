<template>
  <div class="title-container">
    <h2 class="page-title">历史故事配音秀</h2>
    <span class="subtitle">教师：吴老师</span>
  </div>
  <el-row :gutter="20">
    <!-- 九宫格布局 -->
    <el-col :span="8" v-for="video in videos" :key="video.id" class="grid-item-col">
      <RouterLink :to="`/video/${video.id}`">
        <el-card class="grid-item" shadow="hover">
          <img :src="video.cover" class="video-cover" alt="Video cover" />
          <div class="video-info">
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
/* 标题和副标题容器 */
.title-container {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 40px;
}

/* 主标题样式 */
.page-title {
  font-size: 24px;
  color: #333;
}

/* 副标题样式 */
.subtitle {
  font-size: 16px;
  color: #666;
}

/* 卡片项容器样式 */
.grid-item-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

/* 卡片样式 */
.grid-item {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

/* 悬停时的动画效果 */
.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* 视频封面样式 */
.video-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* 视频信息样式 */
.video-info {
  padding: 10px;
  text-align: center;
}

/* 标题样式 */
.video-info h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}
</style>