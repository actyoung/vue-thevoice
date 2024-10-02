<template>
    <div class="rating-view">
        <el-card class="card-container">
            <h2>给 <span class="video-title">{{ video.title }}</span> 的表演投票</h2>

            <CharacterList v-if="!submitted" :characters="characters" @submitVote="submitVote" class="character-list" />

            <LeaderBoard v-if="submitted" :votes="studentsVotes" @resetVote="resetVote" class="leaderboard" />

            <div class="button-group">
                <RouterLink :to="`/video/${video.id}`">
                    <el-button type="primary" class="action-button">返回上一页</el-button>
                </RouterLink>
                <RouterLink to="/">
                    <el-button type="success" class="action-button">返回首页</el-button>
                </RouterLink>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useVideoStore } from '@/stores/videoStore';

const route = useRoute();
const videoStore = useVideoStore();
const video = videoStore.getVideoById(route.params.id);

import { ref } from 'vue'
import CharacterList from '@/components/CharacterList.vue'
import LeaderBoard from '@/components/LeaderBoard.vue'

// 影片角色
const characters = ref(video.characters);

// 存储角色与学生投票的组合信息
const studentsVotes = ref([]);

// 提交状态
const submitted = ref(false);

// 提交投票函数
const submitVote = (studentVotes) => {
    // 将角色和对应的学生投票信息合并
    studentsVotes.value = characters.value.map((character, index) => ({
        characterName: character.name,
        studentName: studentVotes[index].studentName,
        score: studentVotes[index].score,
    }));
    submitted.value = true; // 隐藏表单并显示排行榜
};

// 重置投票状态
const resetVote = () => {
    submitted.value = false; // 显示表单，隐藏排行榜
};
</script>

<style scoped>
.rating-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
}

.card-container {
    width: 100%;
    max-width: 800px;
    padding: 30px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.video-title {
    color: #409EFF;
}

.button-group {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.action-button {
    margin: 0 10px;
}

.character-list,
.leaderboard {
    margin-top: 20px;
}
</style>