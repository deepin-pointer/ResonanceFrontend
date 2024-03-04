<template>
  <el-row type="flex" align="middle">
    <el-col :span="4">
      <img :src="icon" />
    </el-col>
    <el-col :span="16" align="center">
      <h1>{{ title }}</h1>
    </el-col>
    <el-col :span="4" align="right">
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

<style scoped>
img {
  width: 50px;
  height: 50px;
}

h1 {
  width: fit-content;
}
</style>
