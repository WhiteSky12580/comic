<template>
  <div class="comic">
    <div class="example" v-if="value">
      <a-spin size="large" />
    </div>
    <div v-if="pic">
      <a-button type="primary" class="btn1" @click="backHome()"
        >返回首页</a-button
      >
      <a-button class="btn2" @click="collect()" v-if="!show">收藏漫画</a-button>
      <a-button class="btn2" type="primary" v-if="show">已经收藏</a-button>
    </div>
    <div class="title" v-if="pic">
      <img :src="pic" alt="" />
      <div class="introduce">
        <h2>{{ name }}</h2>
        <p>
          {{ introduce }}
        </p>
      </div>
    </div>
    <div class="content">
      <span v-for="i in contents" :key="i" @click="getComic(i)">{{
        i.content
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";
export default class Comic extends Vue {
  value = true;
  name: any;
  pic: any = null;
  data: any;
  introduce: any;
  contents: Array<any> = [];
  username: any;
  id: any;
  beforeCreate() {
    this.data = this.$route.query;
    if (localStorage.getItem("username")) {
      this.username = localStorage.getItem("username");
    }
    if (localStorage.getItem("id")) {
      this.id = localStorage.getItem("id");
    }
  }
  beforeMount() {
    // console.log(this.data)
    this.getCollect();
    if (this.data.url)
      axios.get("api/api/comic/content?url=" + this.data.url).then((res) => {
        // console.log(res);
        if (res.data.data.data[0]) {
          this.contents = res.data.data.data;
        }
        this.introduce = res.data.data.introduce;
        this.name = res.data.data.name;
        this.pic = res.data.data.picurl;
        this.value = false;
      });
  }
  show = false;
  // mounted() {
  //   for (let i of this.collectComic) {
  //     if (i.url == this.data.url) {
  //       this.show = true;
  //     }
  //   }
  // }

  getComic(i: any): void {
    if (this.id) {
      axios
        .get(
          "api/api/comic/history?userId=" +
            this.id +
            "&name=" +
            this.name +
            "&pic=" +
            this.pic +
            "&url=" +
            this.data.url
        )
        .then((res) => {
          // console.log(res);
        });
    }
    this.$router.push({
      name: "Content",
      query: i,
    });
  }
  backHome(): void {
    this.$router.push("/");
  }
  //收藏漫画
  collect() {
    if (this.id)
      axios
        .get(
          "api/api/comic/collect?userId=" +
            this.id +
            "&name=" +
            this.name +
            "&pic=" +
            this.pic +
            "&url=" +
            this.data.url
        )
        .then((res) => {
          // console.log(res);
          this.getCollect();
        });
  }
  collectComic: any;
  getCollect(): void {
    if (this.id)
      axios.get("api/api/comic/getCollect?userId=" + this.id).then((res) => {
        // console.log(res.data.data);
        this.collectComic = res.data.data;
        for (let i of this.collectComic) {
          if (i.url == this.data.url) {
            console.log(this.data.url);
            this.show = true;
          }
        }
      });
  }
}
</script>
<style lang="scss" scoped>
.example {
  position: absolute;
  width: 90%;
  height: 500px;
  text-align: center;
  // background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 200px 50px;
  margin: 20px 0;
}
.comic {
  margin: 0 auto;
  padding: 40px;
  width: 800px;
  position: relative;
  // background-color: rgb(44, 156, 201);
  .btn1 {
    position: absolute;
    top: 40px;
    right: 0;
  }
  .btn2 {
    position: absolute;
    top: 80px;
    right: 0;
  }
  .content {
    width: 100%;
    margin: 40px 0;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    // background-color: rgb(66, 170, 109);
    span {
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
      display: inline-block;
      width: 110px;
      height: 36px;
      margin: 4px;
      text-align: center;
      line-height: 32px;
      border: 1px solid rgb(223, 223, 223);
      // background-color: rgb(235, 140, 235);
      border-radius: 1px;
    }
  }
  .title {
    display: flex;
    img {
      width: 140px;
      height: 180px;
      margin-right: 50px;
    }
    .introduce {
      width: 80%;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      h2 {
        margin: 20px 0;
      }
      p {
        width: 100%;
        color: rgba(0, 0, 0, 0.56);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        // white-space: nowrap;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    }
  }
}
</style>