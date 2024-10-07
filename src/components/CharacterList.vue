<template>
    <div class="form-container">
        <div class="character-list">
            <div v-for="character in characters" :key="character.id" class="character-card">
                <h3 class="character-title">{{ character.name }}</h3>
                <label class="form-label">
                    评分:
                    <el-input-number v-model="votes[character.id].score" :min="0" :max="100"
                        @change="validateScore(character.id)" />
                </label>
            </div>
        </div>
        <el-button type="primary" @click="handleSubmit" class="submit-button">提交投票</el-button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

// 接收 props
const props = defineProps(['characters']);
const emit = defineEmits(['submitVote']);

// 每个角色的投票信息
const votes = ref({});

// 初始化投票数据
watch(
    () => props.characters,
    (newCharacters) => {
        newCharacters.forEach(character => {
            votes.value[character.id] = { score: 0 };
        });
    },
    { immediate: true }
);

// 验证分数是否超过100
const validateScore = (id) => {
    if (votes.value[id].score > 100) {
        votes.value[id].score = 100;
        ElMessage.error('评分不能超过100分');
    }
};

// 提交投票
const handleSubmit = () => {
    const formattedVotes = Object.values(votes.value);
    emit('submitVote', formattedVotes);
};
</script>

<style scoped>
/* 容器样式，紧凑居中 */
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* 减少高度，使元素靠上 */
    padding: 20px;
    background-color: #f5f5f5;
    margin-top: 20px;
    /* 可以微调位置 */
}

/* 角色列表容器 */
.character-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    /* 卡片之间的间距 */
    max-width: 1600px;
    /* 增加宽度到 1600px */
}

/* 卡片样式，减少外边距和填充 */
.character-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: 280px;
    /* 每个卡片的宽度 */
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 角色标题样式 */
.character-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 8px;
}

/* 标签和输入框的样式，紧凑化 */
.form-label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    width: 100%;
    text-align: left;
}

/* 提交按钮的样式 */
.submit-button {
    margin-top: 20px;
    width: 180px;
}
</style>