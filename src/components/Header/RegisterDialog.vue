<template>
  <el-dialog
    title="Register"
    top="25vh"
    width="318px"
    custom-class="register-dialog"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :lock-scroll="false"
  >
    <el-input
      v-model="username"
      placeholder="Input username(2-16 characters)"
    />
    <el-input v-model="email" placeholder="input email" />
    <el-input v-model="password" placeholder="Input password" />
    <el-button
      type="primary"
      size="medium"
      :loading="loading"
      @click="submit"
    >Submit</el-button>
    <p>
      Note: Agree to display immediately after registration
      <span style="color: #007fff">
        <span class="btn" @click="terms">User</span>
        <span class="btn" @click="privacy">Sercurity Policy</span>
      </span>
    </p>
  </el-dialog>
</template>

<script>
import { register } from '@/api/user.js'
import { validEmail } from '@/utils/validate.js'
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      loading: false,
      visible: false
    }
  },
  methods: {
    bClose() {
      this.visible = false
      this.username = ''
      this.email = ''
      this.password = ''
    },

    open() {
      this.visible = true
    },

    terms() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/terms')
    },

    privacy() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/privacy')
    },

    submit() {
      if (this.vsubmit()) {
        const data = {
          username: this.username,
          password: this.password,
          email: this.email
        }
        this.loading = true
        register(data).then(
          (res) => {
            const params = { username: this.username, password: this.password, status: 'on-line' }
            new Promise(async(resolve, reject) => {
              try {
                await this.$store.dispatch('user/accountLogin', params)
                // await this.$store.dispatch('user/getUserInfo')
                this.$message({
                  message: 'send successfully',
                  type: 'success'
                })
                this.loading = false
                this.bClose()
                resolve()
              } catch (error) {
                this.loading = false
                console.error(error)
                reject(error)
              }
            })
          },
          (error) => {
            console.error(error)
            this.loading = false
          }
        )
      }
    },

    vsubmit() {
      const username = this.username
      if (username === '') {
        this.$message('username is inputed')
        return false
      }
      if (!/^[a-zA-Z][a-zA-Z0-9_]{1,15}$/.test(username)) {
        this.$message('username validate error')
        return false
      }

      const email = this.email
      if (email === '') {
        this.$message('number phone is inputed')
        return false
      }
      if (!validEmail(email)) {
        this.$message('format email is inccorect')
        return false
      }

      const password = this.password
      if (password === '') {
        this.$message('password is inputed')
        return false
      }

      if (password.length < 6) {
        this.$message('password is minximum 6')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.register-dialog {
  font-size: 14px;

  .el-input {
    margin-bottom: 10px;
  }

  .el-button {
    width: 100%;
    margin-bottom: 20px;
  }

  .login-tip {
    text-align: center;
    color: #007fff;
    margin-bottom: 10px;
  }

  .code-btn {
    color: #007fff;
    position: relative;
    top: 10px;
    right: 5px;
  }
}
</style>
