<template>
    <div class="main">
        <div class="form">
            <label for="login">Login</label>
            <input v-model="form_auth.login" id="login" type="text">
            
            <label for="password">Password</label>
            <input v-model="form_auth.password" id="password" type="text">
        </div>
        <button @click="auth">Sign in</button>
        <button @click="test" class="test">Test</button>
        {{ user }}
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    middleware: 'auth',
    
    data() {
        return {
            findAuth: null,

            form_auth: {
                login: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser'
        })
    },
    methods: {
        auth() {
            this.findAuth = null
            try {
                if (this.form_auth.login !== '' && this.form_auth.password !== '') {
                    this.$axios.get('/api/user/getAuth', {params: this.form_auth})
                    .then((res) => {
                        this.$store.commit('auth/setUser', res.data)
                    })
                    // if (this.user !== null) {
                    //     console.log('1')
                    //     this.$router.push('/')
                    // }
                    this.form_auth = {
                        login: '',
                        password: ''
                    }
                }
            }
            catch (e) {
                console.log(e)
            }

        },
        test() {
            console.log('1')
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
.test 
	margin-top: 20px 

</style>