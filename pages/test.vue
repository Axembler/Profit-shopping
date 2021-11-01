<template>
    <div class="main">
        <div class="form">
            <label for="login">Логин</label>
            <input v-model="form.login" id="login" type="text">
            
            <label for="password">Пароль</label>
            <input v-model="form.password" id="password" type="text">

            <label for="repeat-password">Повтор пароля</label>
            <input v-model="form.repeatPassword" id="repeat-password" type="text">

            <label for="name">Никнейм</label>
            <input v-model="form.name" id="name" type="text">
        </div>
        <button @click="registration()">Зарегистрироваться</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                login: '',
                password: '',
                repeatPassword: '',
                name: ''
            }
        }
    },
    methods: {
        registration(){
            this.$axios.post('/api/user/post', this.form)
            this.form = {
                login: '',
                password: '',
                repeatPassword: '',
                name: ''
            }
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.form {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(1r, 1fr);
    justify-content: center;
    width: 30%;
    padding-bottom: 50px;
}
input {
    width: 250px;
    height: 30px;
    font-size: 18px;
}
</style>
