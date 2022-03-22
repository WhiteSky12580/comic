<template>
  <div>
    <ul class="list">
      <div class="title">
        <h2>少年漫画</h2>
      </div>
      <li v-for="item in sb" :key="item.name" @click="goComic(item)">
        <a class="pic">
          <img :src="item.pic" referrerpolicy="no-referrer" />
          <p>{{ item.name }}</p>
          <!-- <span>{{ item.type }}</span> -->
        </a>
      </li>
    </ul>
    <br />
    <div class="page">
        <a-pagination v-model:current="current" simple :total="500" @change="getlist()"/>
    </div>
    <br>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";
export default class extends Vue {
  current = 1;
  sb: Array<any> = [];
  beforeMount() {
    axios.get("api/comic/shaonian?number=1").then((res) => {
      // console.log(res)
      this.sb = res.data.data;
    });
  }
  getlist(): void {
    //   alert(this.current)
    axios.get("api/comic/shaonian?number="+this.current).then((res) => {
      this.sb = res.data.data;
      window.scrollTo(0,0);
    });
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
.page {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
}
.list {
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
</style>