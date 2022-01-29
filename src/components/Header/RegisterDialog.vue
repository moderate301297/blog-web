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
    <el-input v-model="username" placeholder="Input username(2-16 characters)" />
    <el-input v-model="mobile" placeholder="input number phone" />
    <el-input v-model="code" placeholder="Input code">
      <span v-show="!codeCount" slot="suffix" class="code-btn btn" @click="sendCode">send Code</span>
      <el-button
        v-show="codeCount"
        slot="suffix"
        type="primary"
        size="mini"
        disabled
        style="margin-top: 6px;"
      >{{ codeCount }}s</el-button>
    </el-input>
    <el-input v-model="password" placeholder="Input password" />
    <el-button type="primary" size="medium" :loading="loading" @click="submit">Submit</el-button>
    <p>Note: Agree to display immediately after registration
    <span style="color: #007fff;">
      <span class="btn" @click="terms">User</span>
      <span class="btn" @click="privacy">Sercurity Policy</span>
    </span>
    </p>
  </el-dialog>
</template>

<script>
import { sendCode } from '@/api/code.js'
import { register } from '@/api/user.js'
import { validMobile } from '@/utils/validate.js'
export default {
  data() {
    return {
      username: '',
      mobile: '',
      code: '',
      password: '',
      codeCount: 0,
      timer: null,
      loading: false,
      visible: false
    }
  },
  methods: {
    bClose() {
      this.visible = false
      this.username = ''
      this.mobile = ''
      this.code = ''
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
          mobile: this.mobile,
          code: this.code
        }
        this.loading = true
        register(data).then(
          res => {
            const params = { username: this.username, password: this.password }
            new Promise(async(resolve, reject) => {
              try {
                await this.$store.dispatch('user/accountLogin', params)
                const { roles } = await this.$store.dispatch('user/getUserInfo')
                const accessRoutes = await this.$store.dispatch('permission/generateRoutes', roles)
                this.$router.addRoutes(accessRoutes)
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
          error => {
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
      if (!(/^[a-zA-Z][a-zA-Z0-9_]{1,15}$/.test(username))) {
        this.$message('username validate error')
        return false
      }

      const mobile = this.mobile
      if (mobile === '') {
        this.$message('number phone is inputed')
        return false
      }
      if (!validMobile(mobile)) {
        this.$message('format number phone is error')
        return false
      }

      const code = this.code
      if (code === '') {
        this.$message('code is inputed')
        return false
      }

      const password = this.password
      if (password === '') {
        this.$message('password is inputed')
        return false
      }

      if (password.length < 6) {
        this.$message('format password is error')
        return false
      }
      return true
    },

    sendCode() {
      const mobile = this.mobile
      if (mobile === '') {
        this.$message('number phone is inputed')
        return
      }
      if (!validMobile(mobile)) {
        this.$message('format number phone is error')
        return
      }

      const TIME_COUNT = 120
      if (!this.timer) {
        this.codeCount = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.codeCount > 0 && this.codeCount <= TIME_COUNT) {
            this.codeCount--
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      const params = { mobile: mobile }
      sendCode(params).then(
        res => {
          this.$message({
            message: 'send code successfully',
            type: 'success'
          })
        }
      )
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
