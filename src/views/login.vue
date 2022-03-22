<template>
  <div class="all">
    <form action="" class="login">
      <p>Comic</p>
      <input type="text" placeholder="账号" v-model="account" />
      <input type="password" placeholder="密码" v-model="pwd" />
      <input type="button" class="btn" value="登录" @click="login()" />
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import { message } from "ant-design-vue";
export default class Login extends Vue {
  account: string | undefined;
  pwd: string | undefined;
  login(): void {
    if (this.account && this.pwd) {
      axios
        .get("api/api/login?user=" + this.account + "&pwd=" + this.pwd)
        .then((res) => {
          if (res.data.message) {
            this.erroring(res.data.message);
          } else {
            message.success("登录成功");
            window.localStorage.setItem("id", res.data.data.id);
            window.localStorage.setItem("username", res.data.data.username);
            this.$router.push("/");
          }
        });
    }
    else{
        message.warning("未填写账号或密码")
    }
  }
  mounted(){
    message.warning("试用账号：admin  密码：123")
  }
  erroring(msg: string): void {
    message.warning(msg);
  }
}
</script>

<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100vh;
  background: url("../assets/image/06.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.login {
  position: absolute;
  top: 50%;
  margin-top: -200px;
  left: 50%;
  margin-left: -200px;
  /* absolute居中的一种方法 */
  background-color: whitesmoke;
  width: 400px;
  height: 400px;
  border-radius: 25px;
  text-align: center;
  padding: 5px 40px;
  box-sizing: border-box;
  /* 这样padding就不会影响大小 */
}

p {
  font-size: 42px;
  font-weight: 600;
}

input {
  background-color: whitesmoke;
  width: 100%;
  height: 48px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid silver;
  /* 下面的会覆盖上面的步伐 */
  outline: none;
  font-size: 22px;
}

.btn {
  background-color: #59c2c5;
  width: 38%;
  height: 48px;
  border-radius: 8px;
  margin-top: 40px;
  font-size: 28px;
  font-weight: 600;
  color: white;
}
.btn:hover {
  background-color: #59c2a0;
}
</style>