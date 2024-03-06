<script setup lang="ts">
import { ref } from "vue"
import axios from 'axios'
import { useDark } from "@vueuse/core";
import { useRequest } from 'vue-hooks-plus'
import WebHeader from "./components/Header.vue"
import DataTable from "./components/Table.vue"
import CityDialog from "./components/CityDialog.vue"
import GoodsDialog from "./components/GoodsDialog.vue"
import LoginDialog from "./components/LoginDialog.vue"
import { useStaticStore } from "./stores/static";
import { useDynamicStore } from "./stores/dynamic";
import { usePersistStore } from "./stores/persist";
import { logo } from "./assets/assets"

useDark();

const staticDataStore = useStaticStore();
const dynamicDataStore = useDynamicStore();
const persistDataStore = usePersistStore()

axios.interceptors.request.use(function (config) {
  const token = persistDataStore.token
  if (token!="") {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

function reloadDynamicData(): Promise<null> {
  return new Promise((resolve) => {
    const city_num = staticDataStore.city_list.length;
    const goods_num = staticDataStore.goods_list.length;
    if (city_num > 0 && goods_num > 0)
      dynamicDataStore.reloadData(goods_num, city_num).then(() => {
        resolve(null)
      }).catch((error) => {
        if (error === "Dynamic data size error")
          staticDataStore.reloadData()
      });
    else
      resolve(null);
  })
}
const { run } = useRequest(reloadDynamicData, {
  manual: true,
  pollingInterval: 5000,
  pollingWhenHidden: false,
})
staticDataStore.reloadData().then(() => {
  run()
})
const city_dialog = ref(null)
const goods_dialog = ref(null)
const login_dialog = ref(null)

const openCityDialog = () => {
  if (city_dialog.value) {
    (city_dialog.value as typeof CityDialog).openDialog(-1)
  }
}

const openGoodsDialog = () => {
  if (goods_dialog.value) {
    (goods_dialog.value as typeof CityDialog).openDialog(-1)
  }
}

const openLoginDialog = () => {
  if (login_dialog.value) {
    (login_dialog.value as typeof LoginDialog).openDialog()
  }
}
</script>

<template>
  <el-container>
    <el-header>
      <WebHeader :icon="logo" title="雷索纳斯市场统计" @login="openLoginDialog()"></WebHeader>
    </el-header>
    <el-main>
      <DataTable @city-dialog="openCityDialog()" @goods-dialog="openGoodsDialog()" />
    </el-main>
  </el-container>
  <CityDialog ref="city_dialog" />
  <GoodsDialog ref="goods_dialog" />
  <LoginDialog ref="login_dialog" />
</template>

<style scoped></style>
