<template>
  <main class="main">
    <header>
      <div>O:{{ score.O }},X:{{ score.X }}</div>
    </header>
    <checkerBoard
      :key="checkerboardKey"
      @addCheckerboardKey="addCheckerboardKey()"
      @addScore="addScore"
    ></checkerBoard>
  </main>
</template>
<script>
import checkerBoard from '@/components/checkerBoard.vue'
export default {
  components: { checkerBoard },
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
  background: rgb(146, 146, 146);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
