<template>
    <div class="main">
        <span>ADMIN PANEL</span>
        <div class="admin-form">
            <div class="action-place">
                <div class="action-place-form">
                    <span>Find a user by his</span>
                    <div>
                        <label for="login">Login</label>
                        <input v-model="form.login" id="login" type="text">
                    </div>
                    <div>
                        <label for="nickname">Nickname</label>
                        <input v-model="form.nickname" id="nickname" type="text">
                    </div>
                </div>
                <div class="action-place-form">
                    <span>Change user data</span>
                    <div>
                        <label for="old-nickname">Old nickname</label>
                        <input id="old-nickname" type="text">
                    </div>
                    <div>
                        <label for="new-nickname">New nickname</label>
                        <input id="new-nickname" type="text">
                    </div>
                    <div>
                        <label for="repeat-new-nickname">Repeat new nickname</label>
                        <input id="repeat-new-nickname" type="text">
                    </div>
                </div>
            </div>
            <button @click="perform()" class="perform">PERFORM</button>
            <div class="output-place">
                <span>OUTPUT</span>
                <ul v-if="findUser !== null" class="output">
                    <li>id: {{findUser._id}}</li> 
                    <li>nickname: {{findUser.name}}</li> 
                    <li>login: {{findUser.login}}</li>
                    <li>password: {{findUser.password}}</li>
                </ul>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    data() {
        return {
            findUser: null,
            form: {
                login: '',
                nickname: ''
            }
        }
    },
    methods: {
        perform(){
            console.log(this.form)
            this.findUser = null
            //Только с get
            this.$axios.get('/api/user/getLogin', {params: this.form})
            .then((res) => this.findUser = res.data)

            this.$axios.get('/api/user/getNickname', {params: this.form})
            .then((res) => this.findUser = res.data)
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 8vh - 12vh);
}
.main > span {
    padding-bottom: 20px;
    font-weight: 400;
    font-size: 28px;
    letter-spacing: 0.15em;
    text-align: center;
}
.admin-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 36px;
}
.admin-form > button {
    width: 200px;
    height: 40px;
    color: #1D1128;
    background: rgba(104, 101, 247, 0.75);
    border: 0;
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    letter-spacing: .1em;
}
.action-place {
    display: grid;
    gap: 80px;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    padding-bottom: 20px;
}
.action-place > div {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    width: 100%;
}
.action-place label {
    padding-bottom: 7px;
    font-size: 14px;
}
.action-place-form > div {
    display: flex;
    flex-direction: column;
}
.action-place-form > span {
    font-weight: 500;
}
.output {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    list-style: none;
    padding: 0;
}
.output-place {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45vw;
    height: 25vh;
    background: rgba(255, 255, 255, 0.05);
    padding: 16px;
    margin-top: 20px;
}
.output-place > span {
    text-align: center;
    border-bottom: 1px solid white;
    width: 140px;
    font-weight: 500;
    margin-bottom: 20px;
}
input {
    width: 160px;
    height: 30px;
    font-size: 15px;
    border: 0;
    border-bottom: 1px solid white;
    background: rgba(255, 255, 255, .1);
    color: white;
}
</style>
