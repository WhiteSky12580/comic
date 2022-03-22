<template>
  <div class="all">
    <form action="" class="login">
      <p>Comic</p>
      <input type="text" placeholder="账号" v-model="account" />
      <input type="text" placeholder="用户名" v-model="username" />
      <input type="password" placeholder="密码" v-model="pwd" />
      <input type="password" placeholder="确认密码" v-model="repwd" />
      <input type="button" class="btn" value="注册" @click="register()" />
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { message } from "ant-design-vue";
import axios from "axios";
export default class Register extends Vue {
  account: string | undefined;
  username: string | undefined;
  pwd: string | undefined;
  repwd: string | undefined;
  register(): void {
    if (this.account && this.username && this.pwd && this.repwd) {
      if (this.pwd == this.repwd) {
        axios
          .post(
            "api/api/register?username=" +
              this.username +
              "&pwd=" +
              this.pwd +
              "&account=" +
              this.account
          )
          .then((res) => {
            console.log(res)
            if (res.data.data.success) {
              message.success(res.data.data.message);
              message.success("自动跳转到登录页面");
              this.$router.push('/login');
            }
            else{
              message.warning(res.data.data.message);
            }
          });
      } else {
        message.warning("两次输入密码不一致");
      }
    } else {
      message.warning("资料未填写完全");
    }
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
  height: 500px;
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