<template>
  <main class="main">
    <scoreBar :score="score" :winScore="winScore"></scoreBar>
    <checkerBoard
      :key="checkerboardKey"
      @addCheckerboardKey="addCheckerboardKey()"
      @addScore="addScore"
    ></checkerBoard>
  </main>
</template>
<script>
import checkerBoard from '@/components/checkerBoard.vue'
import scoreBar from '@/components/scoreBar.vue'
export default {
  components: { checkerBoard, scoreBar },
  data() {
    return {
      checkerboardKey: 0,
      winScore: 3,
      score: {
        O: 0,
        X: 0
      }
    }
  },
  methods: {
    addCheckerboardKey() {
      this.checkerboardKey++
    },
    addScore(winner) {
      this.score[winner]++
    }
  },
  created() {
    // console.log(this.judge(this.ooxxArr))
  }
}
</script>
<style scoped lang="scss">
.main {
  max-width: 800px;
  height: 100vh;
  width: 100vw;
  background: url('@/assets/img/slime_bg.png') center center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
