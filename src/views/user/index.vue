<template>
  <div class="app-container">
    <div class="setting-box">
      <h1>Personal Information</h1>
      <ul class="setting-list">
        <li class="item">
          <span class="label">Avatar</span>
          <div class="avatar-wrapper">
            <img :src="userInfo.avatar || defaultAvatar" class="user-avatar">
          </div>
          <div class="action-box">
            <div class="hint">Supports jpg、png images with a size of less than 300KB</div>
            <el-upload
              ref="upload"
              :action="path"
              :file-list="files"
              :multiple="false"
              :limit="1"
              :headers="headers"
              :auto-upload="true"
              :name="'file'"
              :on-exceed="onExceed"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :show-file-list="false"
            >
              <el-button
                :loading="loading"
                type="primary"
                size="mini"
                style="padding: 5px 7px;"
              >Upload</el-button>
            </el-upload>
          </div>
        </li>
        <li class="item">
          <span class="label">username</span>
          <div class="input-wrapper">
            <el-input v-model="userInfo.username" disabled placeholder="Fill in your username" />
          </div>
          <div class="action-box">
            <el-button v-if="userInfo.username" type="text" disabled style="color: #C0C4CC;">
              <span><i class="el-icon-lock" />Unchangeable</span>
            </el-button>
            <el-button v-else type="text" @click="usernamePrompt">
              <span><i class="el-icon-lock" />Change</span>
            </el-button>
          </div>
        </li>
        <li class="item">
          <span class="label">Nick Name</span>
          <div class="input-wrapper">
            <el-input
              ref="nicknameIput"
              v-model="form.nickname"
              placeholder="fill in your nickname"
              @focus="nicknameIputFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!opVisible.nickname" type="text" @click="nicknameIputFocus">
              <span><i class="el-icon-edit" />Change</span>
            </el-button>
            <span v-show="opVisible.nickname">
              <el-button type="text" style="color: #999;" @click="cancelNickname">Cancel</el-button>
              <el-button type="text" @click="saveNickname">Save</el-button>
            </span>
          </div>
        </li>
        <li class="item">
          <span class="label">Email</span>
          <div class="input-wrapper">
            <el-input v-model="form.email" disabled placeholder="fill in your email" />
          </div>
          <div class="action-box">
            <router-link type="text" to="/email-validate">
              <span><i class="el-icon-message" />{{ form.email?'Change email':'Input email' }}</span>
            </router-link>
          </div>
        </li>

        <li class="item">
          <span class="label">Introduction</span>
          <div class="input-wrapper">
            <el-input
              ref="briefIput"
              v-model="form.brief"
              type="textarea"
              :rows="2"
              placeholder="fill in your introduction"
              @focus="briefIputFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!opVisible.brief" type="text" @click="briefIputFocus">
              <span><i class="el-icon-edit" />Change</span>
            </el-button>
            <span v-show="opVisible.brief">
              <el-button type="text" style="color: #999;" @click="cancelBrief">Cancel</el-button>
              <el-button type="text" @click="saveBrief">Save</el-button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAccessToken } from '@/utils/auth'
import { updateUser, bindUsername } from '@/api/user.js'
export default {
  name: 'User',
  data() {
    return {
      opVisible: {
        nickname: false,
        brief: false
      },
      path: process.env.VUE_APP_BASE_API + '/users/avatar/upload/',
      files: [],
      loading: false,
      userInfo: '',
      form: {
        nickname: '',
        email: '',
        brief: ''
      }
    }
  },

  computed: {
    ...mapGetters([
      'defaultAvatar'
    ]),
    headers() {
      var val = {
        Authorization: 'Bearer ' + getAccessToken()
      }
      return val
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      const userInfo = this.$store.getters.userInfo
      this.path = this.path + userInfo._id
      this.userInfo = userInfo
      this.username = userInfo.username
      this.form.nickname = userInfo.nickname
      this.form.email = this.sensitiveEmail(userInfo.email)
      this.form.brief = userInfo.introducation
    },

    nicknameIputFocus() {
      this.$refs.nicknameIput.focus()
      this.opVisible.nickname = true
    },

    cancelNickname() {
      this.form.nickname = this.userInfo.nickname
      this.opVisible.nickname = false
    },

    saveNickname() {
      const data = { nickname: this.form.nickname, userId: this.userInfo._id }
      this.updateUser(data, 0)
    },

    briefIputFocus() {
      this.$refs.briefIput.focus()
      this.opVisible.brief = true
    },

    cancelBrief() {
      this.form.brief = this.userInfo.brief
      this.opVisible.brief = false
    },

    saveBrief() {
      const data = { introducation: this.form.brief, userId: this.userInfo._id }
      this.updateUser(data, 3)
    },

    updateUser(data, index) {
      return new Promise(async(resolve, reject) => {
        await updateUser(data).then(
          res => {
            switch (index) {
              case 0:
                this.opVisible.nickname = false
                break
              case 1:
                this.opVisible.brief = false
                break
            }
            this.$message({
              message: 'send successfully',
              type: 'success'
            })
            resolve()
          },
          error => {
            reject(error)
          }
        )
        await this.$store.dispatch('user/getUserInfo')
        this.init()
      })
    },

    onExceed() {
      this.loading = false
    },

    uploadSuccess(res, file, fileList) {
      if (res.code !== 200) {
        console.error(res.message)
        this.$message.error('Upload error')
        return
      }
      console.log(file, fileList)
      const reader = new FileReader()
      reader.onload = (e) => {
        this.userInfo.avatar = e.target.result
        console.log('this.userInfo.avatar', this.userInfo.avatar)
      }
      reader.readAsDataURL(file)
      this.loading = false
      this.$message({
        message: 'Send successfully',
        type: 'success'
      })
      this.$store.dispatch('user/getUserInfo').then(res => this.init())
    },

    uploadError(err) {
      console.error(err)
      this.loading = false
      this.$message.error('Upload image error')
    },

    beforeUpload(file) {
      this.loading = true
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt300KB = file.size / 1000 < 300
      if (!isImg) {
        this.$message.error('format image invalid')
        this.loading = false
      }
      if (!isLt300KB) {
        this.$message.error('size image max 300KB')
        this.loading = false
      }
      return isImg && isLt300KB
    },

    usernamePrompt() {
      this.$prompt('字母开头，允许2-16字节，允许字母数字下划线，并且用户名成功填写后不允许修改。', '填写用户名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z][a-zA-Z0-9_]{1,15}$/,
        inputErrorMessage: '用户名格式不正确'
      }).then(({ value }) => {
        const params = { username: value }
        bindUsername(params).then(
          res => {
            this.$message({
              message: '绑定成功',
              type: 'success'
            })
            this.$store.dispatch('user/getUserInfo').then(res => this.init())
          }
        )
      }).catch(() => {
        // TODO
      })
    },

    sensitiveEmail(email) {
      return email ? email.substr(0, 2) + '****' + email.substr(email.indexOf('@')) : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 10px;
  box-sizing: border-box;
  background: #eee;
  min-height: calc(100vh - 50px);
  position: relative;

  @media screen and (max-width: 922px){
    padding: 0;
    margin: 0;
  }

  .setting-box {
    margin-top: 2vh;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 600px;
    max-width: 100%;
    background: #fff;

    padding: 20px;
    padding-top: 10px;

    h1 {
      font-size: 20px;
      font-weight: 700;
      padding: 0;
      padding-bottom: 10px;
    }

    .setting-list {
      margin: 0;
      padding: 0;

      .item {
        list-style: none;
        border-top: 1px solid #f1f1f1;
        padding: 20px 0;
        line-height: 24px;
        display: flex;
        align-items: center;

        .label {
          min-width: 60px;
        }

        .input-wrapper {
          flex: 1;

          & /deep/ .el-input__inner {
            border: none;
            border-bottom: none;
            border-radius: 0;
            background: #fff!important;
          }

          & /deep/ .el-textarea__inner {
            border: none;
            border-bottom: none;
            border-radius: 0;
          }

          & /deep/ .el-input__prefix {
            display: none;
          }
        }

        .action-box {
          font-size: 12px;
          color: #007fff;
          margin-right: 10px;
          margin-left: 10px;

          .hint {
              color: #909090;
              font-size: 12px;
          }
        }

        .el-button--text {
          font-weight: 400;
          font-size: 12px;
          color: #007fff;
        }

        .avatar-wrapper {
          position: relative;
          margin-right: 10px;

          .user-avatar {
            cursor: pointer;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style>
