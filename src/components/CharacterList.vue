<template>
    <div>
        <div v-for="character in characters" :key="character.id" class="character">
            <h3>{{ character.name }}</h3>
            <label>
                扮演者:
                <el-input v-model="votes[character.id].studentName" style="width: 240px" placeholder="Please input" />
            </label>
            <label>
                评分:
                <el-rate v-model.number="votes[character.id].score" :colors="colors" />
            </label>
        </div>
        <button @click="handleSubmit">提交投票</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])

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