<template>
    <div>
        
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
export default class personal extends Vue {
     username: any;
  id: any;
  mounted() {
    if (localStorage.getItem("username")) {
      this.username = localStorage.getItem("username");
    }
    if (localStorage.getItem("id")) {
      this.id = localStorage.getItem("id");
    }
  }
}
</script>

<style lang="scss" scoped>

</style>