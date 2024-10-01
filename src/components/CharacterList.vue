<template>
    <div>
        <div v-for="character in characters" :key="character.id" class="character">
            <h3>{{ character.name }}</h3>
            <label>
                学生姓名:
                <input v-model="votes[character.id].studentName" type="text" />
            </label>
            <label>
                评分:
                <input v-model.number="votes[character.id].score" type="number" min="0" max="10" />
            </label>
        </div>
        <button @click="handleSubmit">提交投票</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

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
            votes.value[character.id] = { studentName: '', score: 0 };
        });
    },
    { immediate: true }
);

// 提交投票
const handleSubmit = () => {
    const formattedVotes = Object.values(votes.value);
    emit('submitVote', formattedVotes);
}
</script>

<style scoped>
.character {
    margin-bottom: 20px;
}
</style>