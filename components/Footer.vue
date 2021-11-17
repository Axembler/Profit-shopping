<template>
      <footer>
            <h5>Made by Axembler</h5>
            <button><NuxtLink exact active-class="active" to="/register">Перейти на регистрацию</NuxtLink></button>
            <button><NuxtLink exact active-class="active" to="/auth">Перейти на авторизацию</NuxtLink></button>
            <button><NuxtLink exact active-class="active" to="/">Перейти на главную</NuxtLink></button>
            <button><NuxtLink exact active-class="active" to="/admin">Перейти на админ. панель</NuxtLink></button>
      </footer>
</template>

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