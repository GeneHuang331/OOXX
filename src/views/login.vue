<template>
  <main>
    <img class="logo" src="@/assets/img/logo.png" alt="logo" />
    <button class="login" @click="login()"></button>
  </main>
</template>
<script>
export default {
  methods: {
    login() {
      console.log(this.$router)
      this.$router.push({ path: '/start' })
    }
  }
}
</script>
<style lang="scss">
main {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  background: #cdf1ff url('@/assets/img/slime_small.png') bottom 60% center no-repeat;
  background-size: cover;
  position: relative;
  .logo {
    position: absolute;
    top: 0%;
    right: 0;
    width: 500px;
    @media (max-width: 767px) {
      width: 450px;
    }
  }
  .login {
    background: url('@/assets/img/text_start.png') center center no-repeat;
    background-size: contain;
    width: 338px;
    height: 150px;
    border: 0;
    position: absolute;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);
  }
}
</style>
