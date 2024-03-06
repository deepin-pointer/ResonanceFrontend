<template>
  <el-row type="flex" align="middle">
    <el-col :span="4">
      <img :src="icon" />
    </el-col>
    <el-col :span="16" align="center">
      <h1>{{ title }}</h1>
    </el-col>
    <el-col :span="4" align="right">
      <el-button v-if="persistDataStore.token==''" @click="$emit('login')" type="primary">登录</el-button>
      <el-popconfirm v-else width="220" title="是否确定退出？" @confirm="persistDataStore.token=''">
        <template #reference>
          <el-button type="danger">退出</el-button>
        </template>
      </el-popconfirm>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePersistStore } from "../stores/persist";

export default defineComponent({
  name: "WebHeader",
  props: {
    icon: String,
    title: String,
  },
  data(){
    const persistDataStore = usePersistStore()
    return {persistDataStore}
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
