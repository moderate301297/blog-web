<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container animated fadeInUp">
      <h3>Change Password</h3>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.password" placeholder="fill in new password" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password2" placeholder="fill in confirm password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" :loading="loading" @click="submit">Change</el-button>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <router-link to="/" type="text" style="width: 100%;text-align: center;color: #007fff;">返回首页</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { resetPassword } from '@/api/user.js'
import AppHeader from '@/components/Header/index'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        password: '',
        password2: ''
      },
      timer: null
    }
  },

  methods: {

    submit() {
      if (this.vsubmit()) {
        console.log('xxx')
        this.loading = true
        const parmas = { password: this.form.password }
        resetPassword(parmas).then(
          res => {
            this.loading = false
            this.$message({
              message: 'send successfully',
              type: 'success'
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
      const password = this.form.password
      if (password === '') {
        this.$message('password is required')
        return false
      }
      if (password.length < 6) {
        this.$message('password min 6 character')
        return false
      }
      if (password !== this.form.password2) {
        this.$message('password confirm not like together')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @import '~@/styles/variables';
   width: 100%;
   height: 100vh;
   overflow-x: hidden;
   overflow-y: -webkit-overlay;
   overflow-y: overlay;

   @media screen and (max-width: 922px){
     background: #fff;
   }

  .content-container {
    width: 100%;
    max-width: 470px;
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 7%;
    background: #fff;
    border-radius: 4px;
    padding: 30px;
    padding-bottom: 5px;

    @media screen and (max-width: 922px){
      margin-top: 0;
    }

    h3 {
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      margin: 0;
      padding: 0;
      margin-bottom: 30px;
    }

    .el-form {
      width: 80%;
      margin: 0 auto;

      .code-btn {
        color: #007fff;
        position: relative;
        right: 10px;
      }
    }
  }
}
</style>
