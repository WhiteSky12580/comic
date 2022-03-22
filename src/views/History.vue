<template>
  <div>
    <div class="header">
      <div>
        <a-button type="primary" class="btn1" @click="backHome()"
          >返回首页</a-button
        >
      </div>
      <div class="dropdown">
        <span>{{ username }}</span>
        <div class="dropdown-content">
          <p @click="collect()">收藏</p>
          <p @click="history()">历史</p>
          <p @click="personal()">个人中心</p>
          <p @click="logout()">退出账号</p>
        </div>
      </div>
    </div>
    <div class="comic">
      <ul>
        <div class="title">
          <h2>历史漫画</h2>
        </div>
        <li v-for="item in sb" :key="item.name" @click="goComic(item)">
          <a class="pic">
            <img :src="item.pic" referrerpolicy="no-referrer" />
            <p>{{ item.name }}</p>
            <!-- <span>{{ item.type }}</span> -->
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";

export default class collect extends Vue {
  sb: Array<any> = [];
  username: any;
  id: any;
  beforeCreate() {
    if (localStorage.getItem("username")) {
      this.username = localStorage.getItem("username");
    }
    if (localStorage.getItem("id")) {
      this.id = localStorage.getItem("id");
    }
  }
  beforeMount() {
    this.getCollect();
  }
  collect() {
    this.$router.push("/collect");
  }
  history() {
    this.$router.push("/history");
  }
  personal() {
    this.$router.push("/personal");
  }
  backHome(): void {
    this.$router.push("/");
  }
  //登出
  logout(): void {
    window.localStorage.clear();
    this.$router.push("/");
  }
  goComic(item: any): void {
    const i = { url: item.url };
    this.$router.push({
      name: "Comic",
      query: i,
    });
  }
  getCollect(): void {
    if (this.id)
      axios.get("api/api/comic/getHistory?userId=" + this.id).then((res) => {
        console.log(res.data.data);
        this.sb = res.data.data;
      });
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.comic {
  width: 800px;
  margin: 80px auto;
  ul {
    width: 800px;
    overflow: hidden;
    // justify-content: space-between;
    // flex-wrap: wrap;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .more {
        display: inline-block;
        margin-right: 60px;
        color: rgb(124, 124, 124);
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
      }
    }
    li:hover {
      background-color: rgb(238, 238, 238);
    }
    li {
      padding: 10px;
      width: 140px;
      border: 1px solid rgb(223, 223, 223);
      float: left;
      .pic {
        display: block;
        color: #000;
        text-align: center;
        img {
          width: 100%;
          height: 160px;
        }
        p {
          margin: 2px 0;
          // padding: 0 4px;
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
        }
        span {
          color: rgb(177, 177, 177);
          font-size: 14px;
        }
      }
    }
  }
}
//下拉菜单
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  // padding: 12px 16px;
  p {
    // text-align: center;
    margin: 10px 0 0 0;
    height: 30px;
    line-height: 30px;
  }
  p:hover {
    background-color: rgb(190, 218, 231);
  }
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>