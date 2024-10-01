<template>
    <div>
        <h2>排行榜</h2>
        <div class="leaderboard">
            <div class="leaderboard-header">
                <div class="header-item">角色名</div>
                <div class="header-item">学生姓名</div>
                <div class="header-item">评分</div>
            </div>
            <div v-for="(vote, index) in sortedVotes" :key="index" class="leaderboard-row">
                <div class="leaderboard-item">{{ vote.characterName }}</div>
                <div class="leaderboard-item">{{ vote.studentName }}</div>
                <div class="leaderboard-item">{{ vote.score }}</div>
            </div>
        </div>
        <button @click="reset">重新投票</button>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// 接收 props
const props = defineProps(['votes']);
const emit = defineEmits(['resetVote']);

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
/* 排行榜容器 */
.leaderboard {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 600px;
    margin: 0 auto;
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
</style>