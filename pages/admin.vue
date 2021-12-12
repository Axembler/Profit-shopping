<template>
	<div class="main">
		<span>ADMIN PANEL</span>
		<div class="admin-form">
			<div class="admin-form_first display-flex flex-column align-center">
				<span class="find_span">Find a user by his</span>
				<div class="display-flex">
					<div class="display-flex flex-column find_area">
						<label class="admin_label" for="email">Email</label>
						<div class="display-flex padding-bottom">
							<input v-model.trim="form_find_email.email" id="email" type="text">
							<button @click="find_user_email" class="loupe"><img src="~/static/images/loupe.png"></button>
						</div>
					</div>
					<div class="display-flex flex-column">
						<label class="admin_label" for="nickname">Nickname</label>
						<div class="display-flex padding-bottom">
							<input v-model.trim="form_find_nickname.nickname" id="nickname" type="text">
							<button @click="find_user_nickname" class="loupe"><img src="~/static/images/loupe.png"></button>
						</div>
					</div>
				</div>
				<button @click="find_users" class="perform">FIND USERS</button>
			</div>
			<div class="admin-func">
				<div class="display-flex flex-column align-center">
					<span class="admin-func_span">Give out VIP</span>
					<div class="display-flex flex-column padding-bottom">
						<label for="vip_email">Email</label>
						<input v-model="form_vip.email" id="vip_email" type="text">
					</div>
					<div class="display-flex flex-column padding-bottom">
						<label for="vip_nickname">Nickname</label>
						<input v-model="form_vip.nickname" id="vip_nickname" type="text">
					</div>
					<button @click="give_vip" class="perform">PERFORM</button>
				</div>
				<div class="display-flex flex-column align-center">
					<span class="admin-func_span">Update user data</span>
					<div class="display-flex flex-column padding-bottom">
						<label for="update-oldNickname">Old nickname</label>
						<input v-model="form_update.oldNickname" id="update-oldNickname" type="text">
					</div>
					<div class="display-flex flex-column padding-bottom">
						<label for="update-newNickname">New nickname</label>
						<input v-model="form_update.newNickname" id="update-newNickname" type="text">
					</div>
					<button @click="update_user" class="perform">PERFORM</button>
				</div>
				<div class="display-flex flex-column align-center">
					<span class="admin-func_span">Delete user</span>
					<div class="display-flex flex-column padding-bottom">
						<label for="delete_email">Email</label>
						<input v-model="form_delete.email" id="delete_email" type="text">
					</div>
					<div class="display-flex flex-column padding-bottom">
						<label for="delete_nickname">Nickname</label>
						<input v-model="form_delete.nickname" id="delete_nickname" type="text">
					</div>
					<button id="per" @click="delete_user" class="perform">PERFORM</button>
				</div>
			</div>
		</div>
		<div class="output-place">
			<span>OUTPUT</span>
			<!-- <div v-if="message.length">
				<ul v-for="item in message" :key="item.index">
					<ul v-if="item.message.role">
						<li>id: {{ item.message._id }}</li>
						<li>nickname: {{ item.message.nickname }}</li>
						<li>role: {{ item.message.role }}</li>
						<li>email: {{ item.message.email }}</li>
						<li>password: {{ item.message.password }}</li>
						<li>updated: {{ item.message.updated }}</li>
					</ul>
					<div class="it-padding" v-for="it in item.message" :key="it.index">
						<ul v-if="it.role">
							<li>id: {{ it._id }}</li>
							<li>nickname: {{ it.nickname }}</li>
							<li>role: {{ it.role }}</li>
							<li>email: {{ it.email }}</li>
							<li>password: {{ it.password }}</li>
							<li>updated: {{ it.updated }}</li>
						</ul>
					</div>
					<span v-if="!item.message.role">{{ item.message }}</span>
					<small class="item-date">{{ item.date }}</small>
				</ul>
			</div> -->
			<div v-if="message.length">
				<ul v-for="item in message" :key="item._id">

					<ul v-if="item.message.role">
						<li>id: {{ item.message._id }}</li>
						<li>nickname: {{ item.message.nickname }}</li>
						<li>role: {{ item.message.role }}</li>
						<li>email: {{ item.message.email }}</li>
						<li>password: {{ item.message.password }}</li>
						<li>updated: {{ item.message.updated }}</li>
					</ul>

					<ul v-for="it in item.message" :key="it._id" v-if="it.role">
						<li>id: {{ it._id }}</li>
						<li>nickname: {{ it.nickname }}</li>
						<li>role: {{ it.role }}</li>
						<li>email: {{ it.email }}</li>
						<li>password: {{ it.password }}</li>
						<li>updated: {{ it.updated }}</li>
					</ul>

					<component :is="!item.message && !it.role">{{ item.message }}</component>
					<!-- <span v-if="!item && !it">{{ item.message }}</span> -->

					<small class="item-date">{{ item.date }}</small>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { required, email, minLength, maxLength, helpers } from 'vuelidate/lib/validators'

export default {
	data() {
		return {
			message: [],
			
			form_find_email: {
				email: ''
			},
			form_find_nickname: {
				nickname: ''
			},
			form_delete: {
				email: '',
				nickname: ''
			},
			form_update: {
				oldNickname: '',
				newNickname: ''
			},
			form_vip: {
				email: '',
				nickname: '',
				oldRole: 'User',
				newRole: 'VIP'
			}
		}
	},
	methods: {
		find_user_email() {
			if (this.form_find_email.email !== '') {
				this.$axios.get('/api/user/getEmail', {params: this.form_find_email})
				.then((res) => this.message.push(res.data))
				this.form_find_email = {
					email: ''
				}
			}
		},
		find_user_nickname() {
			if (this.form_find_nickname.nickname !== '') {
				this.$axios.get('/api/user/getNickame', {params: this.form_find_nickname})
				.then((res) => this.message.push(res.data))
				this.form_find_nickname = {
					nickname: ''
				}
			}
		},
		find_users() {
			this.$axios.get('/api/user/getUsers')
			.then((res) => this.message.push(res.data))
		},
		update_user() {
			if (this.form_update.oldNickname !== '' && this.form_update.newNickname !== '') {
				this.$axios.put('/api/user/updateUser', this.form_update)
				.then((res) => this.message.push(res.data))
				this.form_update = {
					oldNickname: '',
					newNickname: ''
				}
			}
		},
		delete_user() {
			if (this.form_delete.email !== '' && this.form_delete.nickname !== '') {
				this.$axios.delete('/api/user/deleteUser', {params: this.form_delete})
				.then((res) => this.message.push(res.data))
				this.form_delete = {
					email: '',
					nickname: ''
				}
			}
		},
		give_vip() {
			if (this.form_vip.email !== '' && this.form_vip.nickname !== '') {
				this.$axios.put('/api/user/vipUser', this.form_vip)
				.then((res) => this.message.push(res.data))
				this.form_vip = {
					email: '',
					nickname: ''
				}
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
	align-items: flex-start
	width: 50vw
	height: 28vh 
	overflow: auto
	-webkit-overflow-scrolling: touch
	background: rgba(255, 255, 255, 0.05) 
	padding: 16px 
	margin-top: 20px 
	& > span
		text-align: center 
		border-bottom: 1px solid white 
		width: 100%
		margin-bottom: 20px
		letter-spacing: .1em
		opacity: 0.8
.item-date
	opacity: 0.5
	font-size: 12px
.it-padding
	padding-bottom: 16px
input
	width: 140px 
	height: 30px 
	font-size: 14px 
	border: 0 
	border-bottom: 1px solid white 
	background: rgba(255, 255, 255, .1) 
	color: white
ul, li
	text-align: left
	list-style-type: none
	padding: 0
@media (max-width: 1120px)
	.admin-form
		flex-direction: column
		width: 480px
	.admin-form_first
		margin-bottom: 50px
		padding: 26px
		background: #4444
		& > div
			flex-direction: column
		.find_area
			padding: 0
	.admin-func
		flex-direction: column
		grid-template-columns: unset
		padding: 0
		& > div
			background: #4444
			padding: 16px
	.output-place
		width: 480px
@media (max-width: 540px)
	.main
		& > span
			font-size: 16px
	.admin-form
		width: 300px
	.output-place
		width: 300px
</style>
