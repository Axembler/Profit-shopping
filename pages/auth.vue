<template>
	<div class="main">
		<div class="form">
			<label for="email">Email</label>
			<input v-model.trim="email" id="email" type="text">
			<small v-if="$v.email.$dirty && !$v.email.required">Email is required</small>
			<small v-else-if="$v.email.$dirty && !$v.email.email">Email should be of type exeample@hello.com</small>
			
			<label for="password">Password</label>
			<input v-model.trim="password" id="password" type="password">
			<small v-if="$v.password.$dirty && !$v.password.required">Password is required</small>
			<small v-else-if="$v.password.$dirty && !$v.password.minLength">Password is too short</small>
			<small v-else-if="$v.password.$dirty && !$v.password.maxLength">Password is too long</small>
		</div>
		<button @click="auth">Sign in</button>
		{{ user }}
	</div>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
	middleware: 'auth',
	
	data() {
		return {
			email: '',
			password: ''
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getUser'
		})
	},
	methods: {
		auth() {
			if (this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			const form_auth = {
				email: this.email,
				password: this.password
			}
			this.$axios.get('/api/user/getAuth', {params: form_auth})
			.then((res) => {
				this.$store.commit('auth/setUser', res.data)
			})
		}
	},
	validations: {
		email: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(8),
			maxLength: maxLength(32)
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
small
	width: 250px
	color: $err
</style>