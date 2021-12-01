<template>
    <div class="main">
        <div class="form">
            <label v-if="err_name" class="red" for="name">Nickname {{ err_name }}</label>
            <label v-else>Nickname</label>
            <input v-model="form_register.name" id="name" type="text">

            <label v-if="err_login" class="red" for="login">Login {{ err_login }}</label>
            <label v-else>Login</label>
            <input v-model="form_register.login" id="login" type="text">

            <label v-if="err_password" class="red" for="password">Password {{ err_password }}</label>
            <label v-else>Password</label>
            <input v-model="form_register.password" id="password" type="text">

            <label for="repeat-password">Repeat password</label>
            <input v-model="form_register.repeatPassword" id="repeat-password">
        </div>
        <button @click="registration">Sign up</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            err_login: null,
            err_name: null,
            err_password: null,

            form_register: {
                login: '',
                password: '',
                repeatPassword: '',
                name: '',
                role: ''
            }
        }
    },
    methods: {
        registration(){
            if (this.form_register.password == this.form_register.repeatPassword &&
            this.form_register.password !== '' &&
            this.form_register.login !== '' &&
            this.form_register.name !== '') {
                this.$axios.post('/api/user/post', this.form_register)
                .then(() => {
                    this.form_register = {
                        login: '',
                        password: '',
                        repeatPassword: '',
                        name: ''
                    }
                })
                .catch((err) => {
                    if (err.response.data.err.errors.name) {
						this.err_name = err.response.data.err.errors.name.message
					}
					if (err.response.data.err.errors.login) {
						this.err_login = err.response.data.err.errors.login.message
					}
					if (err.response.data.err.errors.password) {
						this.err_password = err.response.data.err.errors.password.message
					}
                })
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.main
	display: flex
	justify-content: center
	align-items: center
	flex-direction: column
	min-height: calc(100vh - 8vh - 12vh)
.form
	display: grid
	gap: 10px
	grid-template-columns: repeat(1r, 1fr)
	justify-content: center
	width: 30%
	padding-bottom: 50px
input 
	width: 250px
	height: 30px
	font-size: 18px
	border: 0 
	border-bottom: 1px solid white
	background: rgba(255, 255, 255, .1)
	color: white 
button 
	width: 160px
	height: 40px
	color: #1D1128
	background: rgba(0, 220, 130, 0.7)
	border: 0
	font-size: 18px
	text-align: center
	font-weight: 500
	letter-spacing: .1em
.red
	color: $err
</style>
