<template>
  <header class="score">
    <div class="score_bar">
      <div class="score_bar_counts">
        <div
          :style="score_bar_count_width"
          class="score_bar_count"
          v-for="(item, index) in score.O"
          :key="index"
        ></div>
      </div>
      <div class="score_bar_counts">
        <div
          :style="score_bar_count_width"
          class="score_bar_count"
          v-for="(item, index) in score.X"
          :key="index"
        ></div>
      </div>
    </div>
    <img src="@/assets/img/o.png" alt="" class="score_img__o" />
    <img src="@/assets/img/x.png" alt="" class="score_img__x" />
    <img src="@/assets/img/slime_win.png" alt="" class="score_img__slime" />
  </header>
</template>
<script>
export default {
  props: ['score', 'winScore'],
  data() {
    return {
      score_bar_count_width: {
        width: `${this.winScore * 10}%`
      }
    }
  }
}
</script>
<style lang="scss">
.score {
  width: 100%;
  position: relative;
  height: 125px;
  &_bar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 640px;
    height: 56px;
    background: #2a98d1;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    &_counts {
      display: flex;
      align-items: center;
      flex: 1;
    }
    &_count {
      background: #99f7ca;
      height: 40px;
      margin: 0 4px;
      border-radius: 16px;
    }
  }
  &_img {
    &__o {
      position: absolute;
      left: 0;
    }
    &__x {
      position: absolute;
      right: 0;
    }
    &__slime {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
