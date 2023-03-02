<template>
  <main>
    <button class="login" @click="login()">登入</button>
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
  max-width: 900px;
  margin: 0 auto;
  height: 100vh;
  background: url('./src/assets/img/lun.png') center center  no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .login {
    background: rgb(71, 48, 172);
    width: 150px;
    height: 50px;
    font-size: 1rem;
    color: #fff;
  }
}
</style>
