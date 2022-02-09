<template>
  <el-dialog
    top="25vh"
    width="318px"
    custom-class="login-dialog"
    :close-on-click-modal="false"
    :show-close="false"
    :visible="login_visible"
    :lock-scroll="false"
  >
    <span slot="title">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        class="btn tab"
        :class="{ active: active === index }"
        @click="tabClick(index)"
      >{{ item }}</span>
      <button
        type="button"
        aria-label="Close"
        class="el-dialog__headerbtn"
        @click="bClose"
      >
        <i class="el-dialog__close el-icon el-icon-close" />
      </button>
    </span>

    <el-input v-if="active === 0" v-model="username" placeholder="Input username" />
    <el-input v-else v-model="phone" placeholder="Input number phone" />
    <el-input v-if="active === 0" v-model="password" placeholder="Input password" />
    <el-button type="primary" size="medium" :loading="loading" @click="login">Submit</el-button>
    <p class="tip">
      <el-checkbox v-if="active === 0" v-model="checked">Remmember</el-checkbox>
      <span class="active btn" :class="{ right: active === 0 }" @click="forgetClick">Forget password?</span>
    </p>
    <p style="clear: both;">
      Note: Agree to display immediately after registration
      <span style="color: #007fff;">
        <span class="btn" @click="terms">User</span>
        <span class="btn" @click="privacy">Sercurity Policy</span>
      </span>
    </p>
    <div class="third-login">
      <p class="name">Resgister public</p>
      <div class="icon-box">
        <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101881036&redirect_uri=https://www.poile.cn/oauth&state=1">
          <svg-icon icon-class="qq-login" class="icon" />
        </a>
        <a href="https://github.com/login/oauth/authorize?client_id=bded74b0f0213e6d1a85&scope=user:email&state=2">
          <svg-icon icon-class="github-login" class="icon" />
        </a>
        <a href="https://gitee.com/oauth/authorize?client_id=18348ed893d47d047a79fb0a395fe1c8c481720021096bc5afe2a90a4e6ec557&redirect_uri=https%3A%2F%2Fwww.poile.cn%2Foauth&response_type=code&state=3">
          <svg-icon icon-class="gitee-login" class="icon" />
        </a>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// import { validMobile } from '@/utils/validate.js'
import { mapGetters } from 'vuex'
// import { setRemember, getRemember } from '@/utils/auth.js'
// import { sendCode } from '@/api/code.js'
export default {
  data() {
    return {
      username: '',
      password: '',
      phone: '',
      tabs: ['Login username'],
      active: 0,
      checked: false,
      loading: false,
      codeCount: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters(['login_visible', 'login_username', 'login_password'])
  },

  mounted() {
    this.username = this.login_username || ''
    this.password = this.login_password || ''
    // this.checked = getRemember() === '1'
  },

  methods: {

    terms() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/terms')
    },

    privacy() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/privacy')
    },

    bClose() {
      this.code = ''
      this.active = 0
      this.$store.commit('login/CHANGE_VISIBLE', false)
    },

    tabClick(index) {
      this.active = index
    },

    login() {
      this.$store.commit('user/SET_TOKEN', null)
      if (this.active === 0) {
        this.passwordLogin()
      } else {
        this.codeLogin()
      }
    },

    passwordLogin() {
      const username = this.username
      const password = this.password
      if (username === '') {
        this.$message('username is required')
        return
      }
      if (this.password === '') {
        this.$message('password is required')
        return
      }
      const params = {
        username: username,
        password: password,
        status: 'on-line'
      }
      this.loading = true
      new Promise(async(resolve, reject) => {
        try {
          await this.$store.dispatch('user/accountLogin', params)
          // await this.$store.dispatch('user/getUserInfo')
          // const accessRoutes = await this.$store.dispatch('permission/generateRoutes', roles)
          // this.$router.addRoutes(accessRoutes)
          // const checked = this.checked
          // setRemember(checked ? '1' : '0')
          // if (checked) {
          //   this.$store.dispatch('login/setUsernameAndPassword', params)
          // } else {
          //   this.$store.dispatch('login/clearUsernameAndPassword')
          // }
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

    forgetClick() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/reset-password')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-dialog {
  font-size: 14px;

  .tab {
    padding-right: 10px;
    font-weight: bold;
  }

  .active {
    color: #007fff;
  }

  .el-input {
    margin-bottom: 10px;
  }

  .el-button {
    width: 100%;
  }

  .code-btn {
    color: #007fff;
    position: relative;
    top: 10px;
    right: 5px;
  }

  .tip {
    margin-bottom: 20px;
    padding: 0 2px;

    .right {
      float: right;
    }
  }

  .third-login {
    width: 100%;

    .name {
      color: #999;
      display: flex;
      align-items: center;
      font-size: 16px;
      margin: 23px 0;

      &:before {
        content: "";
        height: 1px;
        background: #999;
        flex: 1;
        margin-right: 10px;
        opacity: .8;
      }

      &:after {
        content: "";
        height: 1px;
        flex: 1;
        background: #999;
        margin-left: 10px;
        opacity: .8;
      }
    }

    .icon-box {
      display: flex;
      box-sizing: border-box;
      justify-content: center;
      margin-top: 10px;
      margin-bottom: 5px;

      .icon {
        height: 28px;
        width: 28px;
        margin: 0 15px;
      }
    }
  }
}
</style>
