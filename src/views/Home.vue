<template>
  <div>
    <div class="search">
      <div>
        <div class="login" v-if="!user">
          <span @click="login()">登录</span>
          <span @click="register()">注册</span>
        </div>
        <div class="login" v-if="user">
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
      </div>
      <div class="header">
        <div class="input">
          <input
            type="text"
            placeholder="请输入搜索的漫画名"
            v-model="searchvale"
            @keyup.enter="onSearch()"
          />
          <a @click="onSearch()">搜索</a>
        </div>
        <div class="main">
          <div class="type">
            <div class="name">
              <router-link to="/">首页</router-link>
            </div>
            <div class="name">
              <router-link to="/list/new">最近更新</router-link>
            </div>
            <div class="name">
              <router-link to="/list/shaonian">少年漫画</router-link>
            </div>
            <div class="name">
              <router-link to="/list/shaonv">少女漫画</router-link>
            </div>
            <div class="name">
              <router-link to="/list/qingnain">青年漫画</router-link>
            </div>
            <div class="name">
              <router-link to="/list/nvxing">女性漫画</router-link>
            </div>
          </div>
        </div>
      </div>
      <ul v-if="recommend">
        <div class="title">
          <h2>最新连载漫画</h2>
          <span class="more">更多内容</span>
        </div>
        <li v-for="item in sp" :key="item.name" @click="goComic(item)">
          <a class="pic">
            <img :src="item.pic" referrerpolicy="no-referrer" />
            <p>{{ item.name }}</p>
            <!-- <span>{{ item.type }}</span> -->
          </a>
        </li>
      </ul>
      <ul v-if="recommend">
        <div class="title">
          <h2>少年漫画</h2>
          <span class="more">更多内容</span>
        </div>
        <li v-for="item in sa" :key="item.name" @click="goComic(item)">
          <a class="pic">
            <img :src="item.pic" referrerpolicy="no-referrer" />
            <p>{{ item.name }}</p>
            <!-- <span>{{ item.type }}</span> -->
          </a>
        </li>
      </ul>
      <ul v-if="recommend">
        <div class="title">
          <h2>少女漫画</h2>
          <span class="more">更多内容</span>
        </div>
        <li v-for="item in sc" :key="item.name" @click="goComic(item)">
          <a class="pic">
            <img :src="item.pic" referrerpolicy="no-referrer" />
            <p>{{ item.name }}</p>
            <!-- <span>{{ item.type }}</span> -->
          </a>
        </li>
      </ul>
      <ul v-if="recommend">
        <div class="title">
          <h2>青年漫画</h2>
          <span class="more">更多内容</span>
        </div>
        <li v-for="item in sd" :key="item.name" @click="goComic(item)">
          <a class="pic">
            <img :src="item.pic" referrerpolicy="no-referrer" />
            <p>{{ item.name }}</p>
            <!-- <span>{{ item.type }}</span> -->
          </a>
        </li>
      </ul>
      <ul v-if="recommend">
        <div class="title">
          <h2>女性漫画</h2>
          <span class="more">更多内容</span>
        </div>
        <li v-for="item in se" :key="item.name" @click="goComic(item)">
          <a class="pic">
            <img :src="item.pic" referrerpolicy="no-referrer" />
            <p>{{ item.name }}</p>
            <!-- <span>{{ item.type }}</span> -->
          </a>
        </li>
      </ul>

      <ul>
        <h2 v-if="sb[0]">搜索结果</h2>
        <li v-for="item in sb" :key="item.name" @click="goComic(item)">
          <a class="pic">
            <img :src="item.pic" referrerpolicy="no-referrer" />
            <p>{{ item.name }}</p>
            <!-- <span>{{ item.type }}</span> -->
          </a>
        </li>
      </ul>
      <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
import axios from "axios";
@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  user = false;
  username: any;
  sa: Array<any> = [];
  sb: Array<any> = [];
  sc: Array<any> = [];
  sd: Array<any> = [];
  se: Array<any> = [];
  sp: Array<any> = [];
  recommend = true;
  searchvale: any;
  value = ref<string>("");
  mounted() {
    this.getList();
    this.getList1();
    //检查是否登录
    if (window.localStorage.getItem("username")) {
      this.username = window.localStorage.getItem("username");
      this.user = true;
    }
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
  //登录
  login(): void {
    this.$router.push("/login");
  }
  //登出
  logout(): void {
    window.localStorage.clear();
    this.user = false;
  }
  //注册
  register(): void {
    this.$router.push("/register");
  }
  //获取推荐列表
  getList(): void {
    axios.get("api/api/comic/list").then((res) => {
      this.sp = res.data.data;
    });
  }
  getList1(): void {
    axios.get("api/api/comic/list1").then((res) => {
      this.sa = res.data.data.boy;
      this.sc = res.data.data.girl;
      this.sd = res.data.data.youth;
      this.se = res.data.data.female;
    });
  }
  //搜索的方法
  onSearch(): void {
    if (this.searchvale) {
      this.sb = [];
      // axios.get("api/api/comic/search?name=" + this.searchvale).then((res) => {
      //   // console.log(res.data.data)
      //   if (res.data.data) this.sb.push(res.data.data);
      // });
      axios
        .get("api/api/comic/searchbn?name=" + this.searchvale)
        .then((res) => {
          if (res.data.data[0].name != "") {
            this.sb = res.data.data;
          }
          this.recommend = false;
        });
    } else {
      this.sb = [];
      this.recommend = true;
    }
  }
  goComic(item: any): void {
    const i = { url: item.url };
    this.$router.push({
      name: "Comic",
      query: i,
    });
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  margin-bottom: 20px;
  .type {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: rgb(80, 165, 235);
    a {
      color: white;
    }
    .name {
      cursor: pointer;
      width: 120px;
      height: 40px;
      margin: 0 5px;
      line-height: 40px;
      text-align: center;
      color: white;
      font-size: 18px;
      background-color: rgb(80, 165, 235);
    }
    .name:hover {
      background-color: rgb(107, 187, 233);
    }
  }
}
.search {
  // position: relative;
  width: 800px;
  margin: 50px auto;
  background-color: #fff;
  .login {
    position: absolute;
    top: 10px;
    right: 100px;
    span {
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .input {
    height: 100px;
    // text-align: center;
    display: flex;
    justify-content: center;
    // background: url('../assets/image/head_bg.jpg') no-repeat;
    a {
      display: inline-block;
      width: 50px;
      height: 38px;
      color: white;
      line-height: 38px;
      text-align: center;
      border-radius: 0 2px 2px 0;
      border-left: 1px solid #1890ff;
      background-color: #1890ff;
    }
    a:hover {
      background-color: #40a9ff;
    }
    input {
      outline-style: none;
      padding: 4px 10px;
      width: 400px;
      height: 38px;
      border: 1px solid #ccc;
      border-right: none;
      border-radius: 2px 0 0 2px;
    }
    input:focus {
      border-color: #66afe9;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
    }
  }
  //comic
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
