<template>
	<div class="main">
		<span>ADMIN PANEL</span>
		<div class="admin-form">
			<div class="display-flex flex-column align-center">
				<span class="find_span">Find a user by his</span>
				<div class="display-flex">
					<div class="display-flex flex-column find_area">
						<label class="admin_label" for="login">Login</label>
						<div class="display-flex">
							<input v-model="form_find_login.login" id="login" type="text">
							<button @click="find_user_login" class="loupe"><img src="~/static/images/loupe.png"></button>
						</div>
					</div>
					<div class="display-flex flex-column">
						<label class="admin_label" for="name">Nickname</label>
						<div class="display-flex">
							<input v-model="form_find_name.name" id="name" type="text">
							<button @click="find_user_name" class="loupe"><img src="~/static/images/loupe.png"></button>
						</div>
					</div>
				</div>
			</div>
			<div class="admin-func">
				<div class="display-flex flex-column align-center">
					<span class="admin-func_span">Give out VIP</span>
					<div class="display-flex flex-column padding-bottom">
						<label for="vip_login">Login</label>
						<input v-model="form_vip.login" id="vip_login" type="text">
					</div>
					<div class="display-flex flex-column padding-bottom">
						<label for="vip_name">Nickname</label>
						<input v-model="form_vip.name" id="vip_name" type="text">
					</div>
					<button @click="give_vip" class="perform">PERFORM</button>
				</div>
				<div class="display-flex flex-column align-center">
					<span class="admin-func_span">Update user data</span>
					<div class="display-flex flex-column padding-bottom">
						<label for="update-oldNickname">Old nickname</label>
						<input v-model="form_update.oldName" id="update-oldNickname" type="text">
					</div>
					<div class="display-flex flex-column padding-bottom">
						<label for="update-newNickname">New nickname</label>
						<input v-model="form_update.newName" id="update-newNickname" type="text">
					</div>
					<button @click="update_user" class="perform">PERFORM</button>
				</div>
				<div class="display-flex flex-column align-center">
					<span class="admin-func_span">Delete user</span>
					<div class="display-flex flex-column padding-bottom">
						<label for="delete_login">Login</label>
						<input v-model="form_delete.login" id="delete_login" type="text">
					</div>
					<div class="display-flex flex-column padding-bottom">
						<label for="delete_nickname">Nickname</label>
						<input v-model="form_delete.name" id="delete_nickname" type="text">
					</div>
					<button id="per" @click="delete_user" class="perform">PERFORM</button>
				</div>
			</div>
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
				newName: ''
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
			if (this.form_update.oldName !== '' && this.form_update.newName !== '') {
				this.$axios.put('/api/user/updateUser', this.form_update)
				.then((res) => {
					this.message = res.data.message
					this.show = true
					setTimeout(() => {
						this.show = false
					}, 2000);
				})
				this.form_update = {
					oldName: '',
					newName: ''
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
					}, 2000);
				})
				this.form_delete = {
					login: '',
					name: ''
				}
			}
		},
		give_vip() {
			if (this.form_vip.login !== '' && this.form_vip.name !== '') {
				this.$axios.put('/api/user/vipUser', this.form_vip)
				.then((res) => {
					this.message = res.data.message
					this.show = true
					setTimeout(() => {
						this.show = false
					}, 2000);
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
	justify-content: center
	background: rgba(255, 255, 255, 0.05)
	padding: 36px

.admin-func
	display: grid
	grid-template-columns: repeat(3, 1fr)
	gap: 48px
	padding-left: 50px

.admin-func
	label
		padding-bottom: 7px
		font-size: 14px

.admin-func_span
	padding-bottom: 28px

.find_span
	padding-bottom: 28px
	font-size: 16px

.find_area
	padding-right: 60px

.admin_label
	padding-bottom: 7px
	font-size: 14px

.loupe
	display: flex
	justify-content: center
	align-items: center
	border: 0
	width: 30px
	height: 30px
	background: $red

.perform
	width: 120px
	height: 30px
	background: $red
	border: 0
	font-size: 14px
	font-weight: 500
	
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
	width: 50vw
	height: 25vh 
	background: rgba(255, 255, 255, 0.05) 
	padding: 16px 
	margin-top: 20px 
	& > span
		text-align: center 
		border-bottom: 1px solid white 
		width: 140px
		margin-bottom: 20px
		letter-spacing: .1em

input
	width: 140px 
	height: 30px 
	font-size: 14px 
	border: 0 
	border-bottom: 1px solid white 
	background: rgba(255, 255, 255, .1) 
	color: white 
</style>
