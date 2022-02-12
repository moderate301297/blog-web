<template>
  <div class="in-container">
    <div class="head">Interrelated List</div>
    <ul
      v-loading="loading"
      class="content-list"
      element-loading-text="processing"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
    >
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <router-link class="content-row title" :to="'/article/' + item._id">{{ item.title }}</router-link>
        <p class="content-row">view&ensp;{{ item.viewCount }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { interrelated } from '@/api/article.js'
export default {
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: true,
      list: []
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      const params = { articleId: this.articleId, limit: 8 }
      interrelated(params).then(
        res => {
          this.loading = false
          this.list = res.data.data
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.in-container {
  width: 100%;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 10px;
  padding-bottom: 10px;

  .head {
    color: #2e3135;
    border-bottom: 1px solid hsla(0,0%,59.2%,.2);
    padding: 12px 10px;
    font-size: 14px;
  }

  .content-list {
    margin: 10px;
    padding: 0;
    min-height: 50px;

    .list-item {
      list-style: none;
      line-height: 15px;
      margin-bottom: 10px;

      .content-row {
        margin: 0;
        padding: 0;
        font-size: 12px;
        margin-bottom: 5px;
      }

      .title {
        font-size: 14px;
        color: #000;
        cursor: pointer;
        line-height: 18px;

        &:hover {
          color: #007fff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
