<template>
    <div class="main">
        <div class="form">
            <label for="login">Login</label>
            <input v-model="form.login" id="login" type="text">
            
            <label for="password">Password</label>
            <input v-model="form.password" id="password" type="text">

            <label for="repeat-password">Repeat password</label>
            <input v-model="form.repeatPassword" id="repeat-password" type="text">

            <label for="name">Nickname</label>
            <input v-model="form.name" id="name" type="text">
        </div>
        <button @click="registration()">Sign up</button>
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
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 8vh - 12vh);
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
    border: 0;
    border-bottom: 1px solid white;
    background: rgba(255, 255, 255, .1);
    color: white;
}
button {
    width: 180px;
    height: 30px;
    font-size: 16px;
}
</style>
