<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container animated fadeInUp">
      <h3>Number phone</h3>
      <el-form>
        <el-form-item>
          <el-input v-model="mobile" placeholder="Input number phone" />
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%;"
            :loading="loading"
            @click="submit"
          >Submit</el-button>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <router-link to="/" type="text" style="width: 100%;text-align: center;color: #007fff;">Home</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { bindMobile } from '@/api/user.js'
import AppHeader from '@/components/Header/index'
import { validMobile } from '@/utils/validate.js'
import { sendCode } from '@/api/code.js'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      loading: false,
      code: '',
      mobile: '',
      codeCount: 0,
      timer: null
    }
  },
  methods: {

    submit() {
      if (this.vsubmit()) {
        this.loading = true
        const params = { mobile: this.mobile, code: this.code }
          bindMobile(params).then(
            res => {
              this.loading = false
              this.$message({
                message: 'send code successfully',
                type: 'success'
              })
              this.$store.dispatch('user/getUserInfo').then(res => this.$router.push('/user/info'))
            },
            error => {
              console.error(error)
              this.loading = false
            }
          )
      }
    },

    vsubmit() {
      const mobile = this.mobile
      if (mobile === '') {
        this.$message('number phone is inputed')
        return false
      }
      if (!validMobile(mobile)) {
        this.$message('number phone is incorrect')
        return false
      }
      if (this.code === '') {
        this.$message('code is inputed')
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
        this.$message('number phone is incorrect')
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
.container {
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

    .el-steps {
      width: 100%;
      margin: 0 auto;
    }

    .el-form {
      width: 70%;
      margin: 0 auto;
      margin-top: 30px;

      .code-btn {
        color: #007fff;
        position: relative;
        right: 10px;
      }
    }

    /deep/ .el-step__title.is-process {
      font-weight: normal;
    }
  }
}
</style>
