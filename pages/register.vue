<template>
	<div class="main">
		<div class="form">
			<!-- NICKNAME -->
			<label for="nickname">Nickname</label>
			<input type="text" id="nickname" v-model.trim="nickname">
			<small v-if="$v.nickname.$dirty && !$v.nickname.required">Nickname is required</small>
			<small v-else-if="$v.nickname.$dirty && !$v.nickname.nicknameRegex">Nickname can contain only letters, numbers and underscores</small>
			<small v-else-if="$v.nickname.$dirty && !$v.nickname.minLength">Nickname is too short</small>
			<small v-else-if="$v.nickname.$dirty && !$v.nickname.maxLength">Nickname is too long</small>

			<!-- EMAIL -->
			<label for="email">Email</label>
			<input type="text" id="email" v-model.trim="email">
			<small v-if="$v.email.$dirty && !$v.email.required">Email is required</small>
			<small v-else-if="$v.email.$dirty && !$v.email.email">Email should be of type hello@exeample.com</small>

			<!-- PASSWORD -->
			<label for="password">Password</label>
			<div class="display-flex">
				<input type="password" class="input_show" id="password" v-model.trim="password">
				<button @click="show_password" class="show">
					<img :src="`images/${this.password_eye}_eye.png`">
				</button>
			</div>
			<small v-if="$v.password.$dirty && !$v.password.required">Password is required</small>
			<small v-else-if="$v.password.$dirty && !$v.password.passwordRegex">
				Password must consist of at least 8 characters,
				must contain uppercase and lowercase letters and
				at least one digit and one special symbol
			</small>
			<small v-else-if="$v.password.$dirty && !$v.password.minLength">Password is too short</small>
			<small v-else-if="$v.password.$dirty && !$v.password.maxLength">Password is too long</small>

			<!-- REPEAT PASSWORD -->
			<label for="repeat_password">Repeat password</label>
			<div class="display-flex">
				<input type="password" class="input_show" id="repeat_password" v-model.trim="$v.repeatPassword.$model">
				<button @click="show_repeat_password" class="show">
					<img :src='`images/${this.repeat_password_eye}_eye.png`'>
				</button>
			</div>
			<small v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.required">Password is required</small>
			<small v-if="$v.repeatPassword.$error">Passwords must match</small>
		</div>
		<button @click="reg">Sign up</button>
	</div>
</template>

<script>
import { required, email, sameAs, minLength, maxLength, helpers } from 'vuelidate/lib/validators'

const nicknameRegex = helpers.regex('nicknameRegex', /^[0-9a-zA-Z\_]+$/)
const passwordRegex = helpers.regex('passwordRegex', /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_])/g)

export default {
	data() {
		return {
			nickname: '',
			email: '',
			password: '',
			repeatPassword: '',

			password_eye: 'closed',
			repeat_password_eye: 'closed'
		}
	},
	methods: {
		reg() {
			if (this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			const form_register = {
				nickname: this.nickname,
				email: this.email,
				password: this.password
			}
			this.$axios.post('/api/user/post', form_register)
			.catch((err) => {
				const error = err.response.data.err.errors
				console.log(error)
			})
		},
		show_password() {
			if (password.type ==='password') {
				password.type = 'text'
				this.password_eye = 'opened'
			}
			else {
				password.type = 'password'
				this.password_eye = 'closed'
			}
		},
		show_repeat_password() {
			if (repeat_password.type ==='password') {
				repeat_password.type = 'text'
				this.repeat_password_eye = 'opened'
			}
			else {
				repeat_password.type = 'password'
				this.repeat_password_eye = 'closed'
			}
		}
	},
	validations: {
		email: {
			required,
			email
		},
		password: {
			required,
			passwordRegex,
			minLength: minLength(8),
			maxLength: maxLength(32)
		},
		repeatPassword: {
			required,
			sameAsPassword: sameAs('password')
		},
		nickname: {
			required,
			nicknameRegex,
			minLength: minLength(4),
			maxLength: maxLength(14)
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
	justify-content: center
	padding-bottom: 50px

.show
	display: flex
	justify-content: center
	align-items: center
	border: 0
	width: 30px
	height: 30px
	img
		width: 24px
.input_show
	width: 220px
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
small
	width: 250px
	color: $err
</style>
