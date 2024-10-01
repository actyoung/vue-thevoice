<template>
    <div>
        <h2>排行榜</h2>

        <!-- 烟花效果的 canvas 元素 -->
        <canvas id="fireworksCanvas" class="fireworks-canvas"></canvas>

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
import { computed, onMounted } from 'vue'

const props = defineProps(['votes']);
const emit = defineEmits(['resetVote']);

const startFireworks = () => {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const createFirework = () => {
        const x = Math.random() * canvas.width; // 随机位置
        const y = Math.random() * canvas.height * 0.5; // 让烟花在屏幕上半部分
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(x, y));
        }
    };

    const handleParticles = () => {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    };

    // 设置每隔一段时间创建烟花
    const intervalId = setInterval(createFirework, 500); // 每0.5秒生成一个烟花
    animate();

    // 烟花持续30秒后停止
    setTimeout(() => {
        clearInterval(intervalId); // 停止创建新的烟花
    }, 30000); // 持续30秒
};

// 当排行榜加载时启动烟花特效
onMounted(() => {
    startFireworks();
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
/* 烟花 canvas 样式 */
.fireworks-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    pointer-events: none;
    width: 100%;
    height: 100%;
}

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