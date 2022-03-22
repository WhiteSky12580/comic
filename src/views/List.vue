<template>
  <div style="width: 800px; margin: 0 auto">
    <div>
      <div style="margin-bottom: 50px">
        <div class="login" v-if="!user">
          <span @click="login()">登录</span>
          <span @click="register()">注册</span>
        </div>
        <div class="login" v-if="user">
          <div class="dropdown">
            <span> {{ username }} </span>
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
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Vue } from "vue-class-component";
export default class extends Vue {
  username: any;
  id: any;
  user = true;
  beforeCreate() {
    if (localStorage.getItem("username")) {
      this.username = localStorage.getItem("username");
    }
    if (localStorage.getItem("id")) {
      this.id = localStorage.getItem("id");
    }
  }
  mounted() {
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
}
</script>

<style lang="scss" scoped>
a {
  color: white;
}
.main {
  width: 100%;
  margin-bottom: 20px;
  .type {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: rgb(80, 165, 235);
    .name {
      cursor: pointer;
      width: 150px;
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
.login {
  position: absolute;
  top: 10px;
  right: 200px;
  span {
    margin-right: 20px;
    cursor: pointer;
  }
}
.search {
  // position: relative;
  width: 800px;
  margin: 50px auto;
  background-color: #fff;
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