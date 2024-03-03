<template>
  <el-container>
    <el-header>
      <WebHeader icon="images/logo.png" title="雷索纳斯市场统计"></WebHeader>
    </el-header>
    <el-main>
      <DataTable />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WebHeader from "./components/Header.vue";
import DataTable from "./components/Table.vue";

export default defineComponent({
  name: "App",
  components: {
    WebHeader,
    DataTable,
  },
});
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
