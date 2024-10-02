<template>
    <div id="full-page"></div>

    <div class="leaderboard-container">
        <h2>排行榜</h2>

        <el-card class="leaderboard">
            <div class="leaderboard-header">
                <div class="header-item">角色名</div>
                <div class="header-item">扮演者</div>
                <div class="header-item">评分</div>
            </div>
            <div v-for="(vote, index) in sortedVotes" :key="index" class="leaderboard-row">
                <div class="leaderboard-item">{{ vote.characterName }}</div>
                <div class="leaderboard-item">{{ vote.studentName }}</div>
                <div class="leaderboard-item">{{ vote.score }}</div>
            </div>
        </el-card>

        <el-button type="primary" @click="reset" class="reset-button">重新投票</el-button>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useReward } from 'vue-rewards';

const props = defineProps(['votes']);
const emit = defineEmits(['resetVote']);

// 当排行榜加载时启动纸屑特效
onMounted(() => {
    const { reward } = useReward('full-page', 'confetti', {
        startVelocity: 10,
        spread: 180,
        elementCount: 100,
        zIndex: 1000,
        onAnimationComplete: () => {
            reward()
        }
    });
    reward();
});

// 按评分排序投票
const sortedVotes = computed(() => {
    return [...props.votes].sort((a, b) => b.score - a.score);
});

// 重新投票
const reset = () => {
    emit('resetVote');
};
</script>

<style scoped>
#full-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    /* 确保特效位于所有内容之上 */
    pointer-events: none;
    /* 避免特效覆盖后无法点击 */
    text-align: center;
}

/* 排行榜容器 */
.leaderboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
}

/* 卡片样式 */
.leaderboard {
    width: 100%;
    max-width: 600px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: white;
}

/* 表头样式 */
.leaderboard-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding: 10px;
    background-color: #f0f0f0;
}

/* 每一行的样式 */
.leaderboard-row {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

/* 表格项的样式 */
.leaderboard-item {
    flex: 1;
    text-align: center;
}

/* 表头项的样式 */
.header-item {
    flex: 1;
    text-align: center;
    font-weight: bold;
}

/* 重置按钮 */
.reset-button {
    margin-top: 20px;
}
</style>