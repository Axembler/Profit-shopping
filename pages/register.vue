<template>
    <div class="main">
        <div class="form">
            <label for="login">Login</label>
            <input v-model="form_register.login" id="login" type="text">
            
            <label for="password">Password</label>
            <input v-model="form_register.password" id="password" type="text">

            <label for="repeat-password">Repeat password</label>
            <input v-model="form_register.repeatPassword" id="repeat-password" type="text">

            <label for="name">Nickname</label>
            <input v-model="form_register.name" id="name" type="text">
        </div>
        <button @click="registration">Sign up</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
            this.$axios.post('/api/user/post', this.form_register)
            this.form_register = {
                login: '',
                password: '',
                repeatPassword: '',
                name: ''
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

</style>
