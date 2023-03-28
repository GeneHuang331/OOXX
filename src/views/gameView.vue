<template>
  <main class="main">
    <scoreBar :score="score" :winScore="winScore"></scoreBar>
    <checkerBoard
      :key="checkerboardKey"
      :score="score"
      :isEndGame="isEndGame"
      :champion="champion"
      @addCheckerboardKey="addCheckerboardKey()"
      @addScore="addScore"
      @orderChange="orderChange"
    ></checkerBoard>
    <router-link to="/login" class="exit">
      <img src="@/assets/img/exit.svg" alt="" />
    </router-link>
    <img v-if="order == 'O'" class="o_hand" src="@/assets/img/o_hand.svg" />
    <img v-else-if="order == 'X'" class="x_hand" src="@/assets/img/x_hand.svg" />
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
      },
      order: '',
      champion: ''
    }
  },
  methods: {
    addCheckerboardKey() {
      this.checkerboardKey++
    },
    addScore(winner) {
      this.score[winner]++
    },
    orderChange(val) {
      this.order = val
    }
  },
  computed: {
    isEndGame() {
      return Object.values(this.score).some((el) => el >= this.winScore)
    }
  },
  watch: {
    isEndGame() {
      this.champion =
        this.score['O'] >= this.winScore ? 'O' : this.score['X'] >= this.winScore ? 'X' : ''
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
.exit {
  position: absolute;
  right: 30px;
  top: 120px;
  img {
    width: 80px;
  }
}
.o_hand {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-30%, 0);
  pointer-events: none;
}
.x_hand {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(30%, 0);
  pointer-events: none;
}
</style>
