<template>
    <div class="main">
        <span>ADMIN PANEL</span>
        <div class="admin-form">
            <div class="action-place">
                <div class="action-place-form">
                    <span>Find user by name</span>
                    <div>
                        <label for="login">Login</label>
                        <input v-model="form_find_login.login" id="login" type="text">
                    </div>
                </div>
                <div class="action-place-form">
                    <span>Find user by login</span>
                    <div>
                        <label for="nickname">Nickname</label>
                        <input v-model="form_find_name.name" id="nickname" type="text">
                    </div>
                </div>
                <div class="action-place-form">
                    <span>Update user data</span>
                    <div>
                        <label for="old-nickname">Old nickname</label>
                        <input v-model="form_update.oldName" id="old-nickname" type="text">
                    </div>
                    <div>
                        <label for="new-nickname">New nickname</label>
                        <input v-model="form_update.newName" id="new-nickname" type="text">
                    </div>
                    <div>
                        <label for="repeat-new-nickname">Repeat new nickname</label>
                        <input v-model="form_update.repeatNewName" id="repeat-new-nickname" type="text">
                    </div>
                </div>
                <div class="action-place-form">
                    <span>Delete user</span>
                    <div>
                        <label for="delete_login">Login</label>
                        <input v-model="form_delete.login" id="delete_login" type="text">
                    </div>
                    <div>
                        <label for="delete_nickname">Nickname</label>
                        <input v-model="form_delete.name" id="delete_nickname" type="text">
                    </div>
                </div>
                <div class="action-place-form">
                    <span>Give out VIP</span>
                    <div>
                        <label for="vip_login">Login</label>
                        <input v-model="form_vip.login" id="vip_login" type="text">
                    </div>
                    <div>
                        <label for="vip_name">Nickname</label>
                        <input v-model="form_vip.name" id="vip_name" type="text">
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button @click="find_user_login" class="perform">PERFORM</button>
                <button @click="find_user_name" class="perform">PERFORM</button>
                <button @click="update_user" class="perform">PERFORM</button>
                <button @click="delete_user" class="perform">PERFORM</button>
                <button @click="vip_user" class="perform">PERFORM</button>
            </div>
            <div class="output-place">
                <span>OUTPUT</span>

                 <!-- ПОИСК ПОЛЬЗОВАТЕЛЯ -->
                <ul v-if="findUserLogin !== null" class="output">
                    <li>id: {{findUserLogin._id}}</li> 
                    <li>role: {{findUserLogin.role}}</li>
                    <li>nickname: {{findUserLogin.name}}</li> 
                    <li>login: {{findUserLogin.login}}</li>
                    <li>password: {{findUserLogin.password}}</li>
                </ul>

                <ul v-if="findUserName !== null" class="output">
                    <li>id: {{findUserName._id}}</li> 
                    <li>role: {{findUserName.role}}</li>
                    <li>nickname: {{findUserName.name}}</li> 
                    <li>login: {{findUserName.login}}</li>
                    <li>password: {{findUserName.password}}</li>
                </ul>
                
                <transition name="fade">
                    <p v-if="show"> {{ message }} </p>
                </transition>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            message: '',

            findUserLogin: null,
            findUserName: null,
            
            form_find_login: {
                login: ''
            },
            form_find_name: {
                name: ''
            },
            form_delete: {
                login: '',
                name: ''
            },
            form_update: {
                oldName: '',
                newName: '',
                repeatNewName: ''
            },
            form_vip: {
                login: '',
                name: '',
                oldRole: 'User',
                newRole: 'VIP'
            }
        }
    },
    methods: {
        find_user_login() {
            this.findUserLogin = null
            if (this.form_find_login.login !== '') {
                this.$axios.get('/api/user/getLogin', {params: this.form_find_login})
                .then((res) => this.findUserLogin = res.data)
                this.form_find_login = {
                    login: ''
                }
            }
        },
        find_user_name() {
            this.findUserName = null
            if (this.form_find_name.name !== '') {
                this.$axios.get('/api/user/getName', {params: this.form_find_name})
                .then((res) => this.findUserName = res.data)
                this.form_find_name = {
                    name: ''
                }
            }
        },
        update_user() {
            if (this.form_update.newName == this.form_update.repeatNewName && this.form_update.newName !== '') {
                this.$axios.put('/api/user/updateUser', this.form_update)
                .then((res) => {
                    this.message = res.data.message
                    this.show = true
                    setTimeout(() => {
                        this.show = false
                    }, 3000);
                })
                this.form_update = {
                    oldName: '',
                    newName: '',
                    repeatNewName: ''
                }
            }
        },
        delete_user() {
            if (this.form_delete.login !== '' && this.form_delete.name !== '') {
                this.$axios.delete('/api/user/deleteUser', {params: this.form_delete})
                .then((res) => {
                    this.show = true
                    this.message = res.data.message
                    setTimeout(() => {
                        this.show = false
                    }, 3000);
                })
                this.form_delete = {
                    login: '',
                    name: ''
                }
            }
        },
        vip_user() {
            if (this.form_vip.login !== '' && this.form_vip.name !== '') {
                this.$axios.put('/api/user/vipUser', this.form_vip)
                .then((res) => {
                    this.message = res.data.message
                    this.show = true
                    setTimeout(() => {
                        this.show = false
                    }, 3000);
                })
                this.form_vip = {
                    login: '',
                    name: ''
                }
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.main 
	display: flex 
	align-items: center 
	flex-direction: column 
	min-height: calc(100vh - 8vh - 12vh) 
	& > span 
		padding-bottom: 20px 
		font-weight: 400 
		font-size: 28px 
		letter-spacing: 0.15em 
		text-align: center

.admin-form 
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	background: rgba(255, 255, 255, 0.05)
	padding: 36px

.action-place
	display: grid
	gap: 80px
	grid-template-columns: repeat(5, 1fr)
	width: 100% 
	padding-bottom: 20px 
	& > div 
		display: grid 
		gap: 20px 
		grid-template-columns: 1fr 
		width: 100% 
	label 
		padding-bottom: 7px 
		font-size: 14px

.action-place-form 
	& > div 
		display: flex 
		flex-direction: column 
	& > span 
		font-weight: 500

.buttons 
	display: grid 
	gap: 80px 
	grid-template-columns: repeat(5, 1fr) 
	& > button 
		width: 160px 
		height: 40px 
		color: #1D1128 
		background: rgba(235, 70, 70, 0.6) 
		border: 0 
		font-size: 18px 
		text-align: center 
		font-weight: 500 
		letter-spacing: .1em

.output 
	display: flex 
	flex-direction: column 
	align-items: flex-start 
	width: 100% 
	list-style: none 
	padding: 0 
	font-size: 14px

.output-place 
	display: flex 
	flex-direction: column 
	align-items: center 
	width: 45vw 
	height: 25vh 
	background: rgba(255, 255, 255, 0.05) 
	padding: 16px 
	margin-top: 20px 
	& > span 
		text-align: center 
		border-bottom: 1px solid white 
		width: 140px 
		font-weight: 500 
		margin-bottom: 20px

input 
	width: 160px 
	height: 30px 
	font-size: 15px 
	border: 0 
	border-bottom: 1px solid white 
	background: rgba(255, 255, 255, .1) 
	color: white 
</style>
