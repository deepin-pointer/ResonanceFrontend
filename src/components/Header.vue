<template>
  <el-row align="middle" type="flex">
    <el-col :span="4">
      <img :src="icon" />
    </el-col>
    <el-col :span="16">
      <h1>{{ title }}</h1>
    </el-col>
    <el-col :span="4">
      <el-button type="primary">Login</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WebHeader",
  props: {
    icon: String,
    title: String,
  },
});
</script>

<style scoped lang="stylus">
img
  width: 50px
  height: 50px
</style>
