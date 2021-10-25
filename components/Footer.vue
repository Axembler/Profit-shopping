<template>
      <footer>
            <h5>Made by Axembler</h5>
            <button @click="api()">API</button>
      </footer>
</template>

<script>
export default {
      methods: {
            api(){
                  this.$axios.get('http://localhost:3001/user')
            }
      }
}
</script>

<style scoped>
footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 8vh;
}
h5 {
      color: #d0c1d762;
      font-size: 16px;
      font-style: italic;
      font-weight: 500;
      line-height: 45px;
      letter-spacing: 0.2em;
      padding-right: 30px;
}
</style>