<template>
  <main class="main">
    <header>{{ order }} turn</header>
    <div :key="checkerboardKey" class="checkerboard">
      <div class="checkerboard__row" v-for="(item, i) in this.ooxxArr" :key="i">
        <div
          class="checkerboard__item"
          v-for="(subItem, ii) in item"
          :key="ii"
          @click.once="chess(i, ii)"
        >
          {{ subItem }}
        </div>
      </div>
    </div>
    <footer>
      winnner: {{ winner }}
      <div></div>
      <button @click="reset()">Reset</button>
    </footer>
  </main>
</template>
<script>
export default {
  data() {
    return {
      checkerboardKey: 0,
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
    chess(i, ii) {
      if (this.isEnd) return
      this.ooxxArr[i][ii] = this.order
      this.judge(this.ooxxArr)
      this.chageOrder()
    },
    chageOrder: function () {
      this.order = this.order == 'O' ? 'X' : 'O'
    },
    endGame: function () {
      this.isEnd = true
      console.log(`${this.winner}贏了`)
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
      this.checkerboardKey++
    }
  },
  created() {
    // console.log(this.judge(this.ooxxArr))
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
    ooxxArr: {
      handler(val) {
        let full = val.every((element) => {
          return element.every((el) => {
            return el !== ''
          })
        })
        if (full) {
          this.winner = 'draw'
          this.endGame()
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100vw;
  background: rgb(146, 146, 146);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .checkerboard {
    width: 50%; /* 相對與container的width */
    padding-bottom: 50%; /* 相對與container的width */
    background: rgb(218, 218, 218);
  }
}
.checkerboard {
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
  }
}
</style>
