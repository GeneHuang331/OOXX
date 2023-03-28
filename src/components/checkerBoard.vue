<template>
  <div class="checkerboard">
    <div class="checkerboard__row" v-for="(item, i) in this.ooxxArr" :key="i">
      <div
        class="checkerboard__item"
        v-for="(subItem, ii) in item"
        :key="ii"
        @click.once="chess(i, ii)"
      >
        <template v-if="subItem == 'O'">
          <img src="@/assets/img/O.png" alt="" />
        </template>
        <template v-else-if="subItem == 'X'">
          <img src="@/assets/img/X.png" alt="" />
        </template>
      </div>
    </div>
  </div>

  <div class="result_mask" v-if="winner">
    <template v-if="isEndGame">
      <div class="trophy_container">
        <template v-if="champion == 'O'">
          <img class="trophy_container__winner" src="@/assets/img/O.png" alt="" />
          <img class="trophy_container__trophy" src="@/assets/img/trophy.png" alt="" />
        </template>
        <template v-else-if="champion == 'X'">
          <img class="trophy_container__winner" src="@/assets/img/X.png" alt="" />
          <img class="trophy_container__trophy" src="@/assets/img/trophy.png" alt="" />
        </template>
      </div>
      <router-link to="/login" class="exit">
        <img src="@/assets/img/exit.svg" alt="" />
      </router-link>
    </template>
    <template v-else>
      <div>
        <template v-if="winner == 'O'">
          <img src="@/assets/img/O.png" alt="" />
          <img src="@/assets/img/win.png" alt="" />
        </template>
        <template v-else-if="winner == 'X'">
          <img src="@/assets/img/X.png" alt="" />
          <img src="@/assets/img/win.png" alt="" />
        </template>
      </div>

      <button @click="reset()" class="next">
        <img src="@/assets/img/next.png" alt="" />
      </button>
    </template>
  </div>
</template>
<script>
export default {
  props: ['score', 'isEndGame', 'champion'],
  emits: ['addCheckerboardKey', 'addScore', 'orderChange'],
  data() {
    return {
      order: 'O',
      ooxxArr: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      winner: '',
      isEnd: false
    }
  },
  computed: {},
  methods: {
    judge: function (arr) {
      // 1.子陣列任一都是同一字元["O","O","O"]
      arr.forEach((el) => {
        if (
          el.every((x) => {
            return x == 'O'
          }) ||
          el.every((x) => {
            return x == 'X'
          })
        ) {
          console.log(1)
          this.winner = el[0]
        }
      })
      // 2.所有子陣列的同一索引都是同一字元["O","O","X"],["O","X","X"],["O","X","O"]
      for (let i = 0; i < 3; i++) {
        if (arr[0][i] && arr[0][i] == arr[1][i] && arr[0][i] == arr[2][i]) {
          this.winner = arr[0][i]
        }
      }
      // 3.所有陣列的索引或反過來去查該子陣列的索引對應的字元都是同一字元(斜的連線)["X","O","X"],["O","X","O"],["O","X","X"]
      if (arr[0][0] && arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]) {
        this.winner = arr[0][0]
      }
      if (arr[0][2] && arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0]) {
        this.winner = arr[0][2]
      }
    },

    chageOrder: function () {
      this.order = this.order == 'O' ? 'X' : 'O'
    },
    chess(i, ii) {
      if (this.isEnd) return
      this.ooxxArr[i][ii] = this.order
      this.judge(this.ooxxArr)
      this.chageOrder()
    },
    endGame: function () {
      this.isEnd = true
      if (this.winner !== 'draw') {
        this.addScore(this.winner)
      }
    },
    reset() {
      this.ooxxArr = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]
      this.order = 'O'
      this.winner = ''
      this.isEnd = false
      this.$emit('addCheckerboardKey')
    },
    addScore(winner) {
      this.$emit('addScore', winner)
    }
  },
  watch: {
    winner: {
      handler(val) {
        if (val == 'O' || val == 'X') {
          this.endGame()
        }
      },
      deep: true
    },
    order: {
      handler(val) {
        this.$emit('orderChange', val)
      },
      deep: true
    },
    ooxxArr: {
      handler(val) {
        let full = val.every((element) => {
          return element.every((el) => {
            return el !== ''
          })
        })
        if (full && !(this.winner == 'O' || this.winner == 'X')) {
          this.winner = 'draw'
          this.endGame()
        }
      },
      deep: true
    }
  },
  created() {
    this.$emit('orderChange', 'O')
  }
}
</script>
<style lang="scss">
.checkerboard {
  width: 50%; /* 相對與container的width */
  padding-bottom: 50%; /* 相對與container的width */
  background: url('@/assets/img/board.svg') center center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  &__row {
    position: absolute;
    left: 0;
    width: 100%;
    height: 33.333%;
    display: flex;
    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 33.33333%;
    }
    &:nth-child(3) {
      top: 66.66666%;
    }
  }
  &__item {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.result_mask {
  width: 100%;
  height: 100%;
  background: rgb(255 237 133 / 90%);
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.next {
  background: transparent;
  border: 0;
  width: 200px;
  img {
    max-width: 100%;
    margin-top: 2rem;
  }
}
.trophy_container {
  margin-right: 60px;
  &__winner {
    width: 180px;
  }
  &__trophy {
    width: 120px;
    z-index: 1;
    transform: rotate(8deg);
    position: absolute;
    right: -60px;
    bottom: 30px;
  }
}
.exit {
  width: 80px;
  img{
    width: 100%;
  }
}
</style>
