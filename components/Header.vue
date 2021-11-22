<template>
      <header>
            <NuxtLink exact active-class="active" to="/" class="logo">PROFIT SHOPPING</NuxtLink>
            <div class="buttons">
                  <NuxtLink exact active-class="active" to="/auth" class="button"><p>Sign in</p><img src="~/static/images/sign_in.png" class="auth-icon"></NuxtLink>
                  <NuxtLink exact active-class="active" to="/register" class="button"><p>Sign up</p><img src="~/static/images/sign_up.png" class="auth-icon"></NuxtLink>
                  <NuxtLink exact active-class="active" to="/admin" class="button admin"><p>Admin</p><img src="~/static/images/admin.png" class="auth-icon"></NuxtLink>
            </div>
      </header>
</template>

<script>
export default {
      methods: {
            home() {
                  this.$router.push('/')
            },
            sign_up() {
                  this.$router.push('/register')
            },
            sign_in() {
                  this.$router.push('/auth')
            }
      }
}
</script>

<style lang="sass" scoped>
header
  display: flex
  justify-content: space-between
  align-items: center
  height: 12vh

.logo
  cursor: pointer
  text-align: center
  font-family: Vidaloka
  font-size: 32px
  font-weight: 600
  letter-spacing: 0.3em
  padding-left: 5%
  color: white

.buttons
  display: grid
  gap: 20px
  grid-template-columns: repeat(3, 1fr)
  width: auto
  margin-right: 5%

.button
  display: flex
  align-items: center
  justify-content: center
  padding: 10px
  background: rgba(0, 220, 130, 0.7)
  color: #1D1128
  font-size: 18px
  text-align: center
  font-weight: 500
  letter-spacing: .07em

.admin
  background: rgba(235, 70, 70, 0.6)

.button
  > p
    margin-right: 10px

.auth-icon
  width: 22px
</style>