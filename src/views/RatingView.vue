<template>
    <div>
        <h1>配音投票系统</h1>
        <CharacterList v-if="!submitted" :characters="characters" @submitVote="submitVote" />
        <LeaderBoard v-if="submitted" :votes="studentsVotes" @resetVote="resetVote" />
        <div>
            <RouterLink to="-1">
                <button>返回上一页</button>
            </RouterLink>
            <RouterLink to="/">
                <button>返回首页</button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CharacterList from '../components/CharacterList.vue'
import LeaderBoard from '../components/LeaderBoard.vue'

// 影片角色
const characters = ref([
    { id: 1, name: '角色1' },
    { id: 2, name: '角色2' },
    { id: 3, name: '角色3' }
]);

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