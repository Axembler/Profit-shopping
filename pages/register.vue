<template>
    <div class="main">
        <div class="form">
            <p v-show="err_blank" class="err">All fields must be filled in</p>
            <p v-show="err_repeat" class="err">Passwords must be match</p>
            
            <label v-if="err_name" class="err" for="name">Nickname {{ err_name }}</label>
            <label v-else>Nickname</label>
            <input v-model.trim="form_register.name" id="name" type="text">

            <label v-if="err_login" class="err" for="login">Login {{ err_login }}</label>
            <label v-else>Login</label>
            <input v-model.trim="form_register.login" id="login" type="text">

            <label v-if="err_password" class="err" for="password">Password {{ err_password }}</label>
            <label v-else>Password</label>
            <input v-model.trim="form_register.password" id="password" type="password">

            <label for="repeat-password">Repeat password</label>
            <input v-model.trim="form_register.repeatPassword" id="repeat-password">
        </div>
        <button @click="registration">Sign up</button>
        <button @click="reg">Sign up</button>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            err_login: null,
            err_name: null,
            err_password: null,

            err_repeat: false,
            err_blank: false,

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
            if (this.form_register.password == this.form_register.repeatPassword && this.form_register.password !== '') {
                this.err_repeat = false
                this.$axios.post('/api/user/post', this.form_register)
                .then(() => {
                    this.form_register = {
                        login: '',
                        password: '',
                        repeatPassword: '',
                        name: ''
                    }
                    this.err_login = null
                    this.err_name = null
                    this.err_password = null
                })
                .catch((err) => {
                    const error = err.response.data.err.errors

                    if (error.name) {this.err_name = error.name.message}
                    else {this.err_name = null}

					if (error.login) {this.err_login = error.login.message}
                    else {this.err_login = null}

					if (error.password) {this.err_password = error.password.message}
                    else {this.err_password = null}
                })
            } else {
                this.err_repeat = true
            }
        },
        reg() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
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
.err
	color: $err
</style>
