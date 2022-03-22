<template>
  <div class="bc">
    <div class="main" v-if="isShow"></div>
    <div class="content">
      <div class="last"><h1 @click="last()">点击阅读上一话</h1></div>
      <div class="title">
        <a-button type="primary" class="btn" @click="back()">返回目录</a-button>
        <p>{{ title }}</p>
        <a-button type="primary" class="btn1" @click="backHome()" >返回首页</a-button>
      </div>
      <div class="pic">
        <img
          v-for="(item, index) in sb"
          :key="index"
          :src="item"
          alt="图片丢失"
        />
      </div>
      <div class="next"><h1 @click="next()">点击阅读下一话</h1></div>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
// import { StarOutlined } from '@ant-design/icons-vue';
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import { inject } from "vue";
export default class Comic extends Vue {
  title: any;
  reload: any = inject("reload");
  data: any;
  sb: Array<any> = [];
  isShow = false;
  height = document.body.clientHeight;
  xurl: any;
  surl: any;
  comicUrl: any;
  beforeCreate() {
    this.data = this.$route.query;
  }
  beforeMount() {
    // console.log(this.data);
    if (this.data)
      axios.get("api/api/comic/pic?url=" + this.data.url).then((res) => {
        //图片载入
        this.title = res.data.data.chapter;
        this.sb = res.data.data.pic;
        if (this.sb[0].slice(0, 5) != "https") {
          this.sb = this.sb.map((i) => {
            i = "https://img.hngxgt.net/" + i;
            return i;
          });
        }
        this.xurl = res.data.data.url.xurl;
        this.surl = res.data.data.url.surl;
        this.comicUrl = res.data.data.comicUrl;
      });
  }

  showMain(): void {
    this.isShow = !this.isShow;
    console.log(this.height);
  }
  next(): void {
    console.log(this.xurl);
    if (this.xurl) {
      this.$router
        .push({
          name: "Content",
          query: {
            url: this.xurl,
          },
        })
        .then(() => location.reload());
    } else {
      this.warning();
    }
  }
  last(): void {
    if (this.surl) {
      this.$router
        .push({
          name: "Content",
          query: {
            url: this.surl,
          },
        })
        .then(() => location.reload());
    } else {
      this.warning();
    }
  }
  warning(): void {
    message.warning("没有更多章节");
  }
  back(): void {
    this.$router.push({
      path: "/comic",
      query: {
        url: this.comicUrl,
      },
    });
  }
  backHome(): void {
    this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
.bc {
  position: relative;
  width: 100%;
  height: 760px;
  overflow: hidden;
  background-color: #dff1fd;
}
.main {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100px;
  background-color: #484e61;
}
.next,
.last {
  width: 800px;
  height: 120px;
  cursor: pointer;
  background-color: #313131;
  h1 {
    text-align: center;
    line-height: 120px;
    font-size: 40px;
    color: #f4f4f4;
  }
}
.content {
  position: relative;
  margin: 0 auto;
  width: 800px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .title {
    position: relative;
    text-align: center;
    width: 100%;
    height: 60px;
    background-color: #fefefe;
    .btn {
      position: absolute;
      top: 10px;
      left: 0px;
    }
    .btn1 {
      position: absolute;
      top: 15px;
      right: 0px;
    }
    p {
      display: inline-block;
      width: 660px;
      height: 60px;
      overflow: hidden;
      line-height: 60px;
      // text-align: center;
      // background-color: rgb(145, 40, 40);
      color: #17a2e7;
      font-size: 18px;
      font-weight: 400;
    }
  }
  .pic {
    width: 100%;
    img {
      width: 800px;
    }
  }
}
</style>