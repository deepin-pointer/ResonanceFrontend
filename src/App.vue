<script setup lang="ts">
import { ref } from "vue"
import { useRequest } from 'vue-hooks-plus'
import WebHeader from "./components/Header.vue"
import DataTable from "./components/Table.vue"
import CityDialog from "./components/CityDialog.vue"
import GoodsDiaglog from "./components/GoodsDialog.vue"
import { useStaticStore } from "./stores/static";
import { useDynamicStore } from "./stores/dynamic";
import { logo } from "./assets/assets"

const staticDataStore = useStaticStore();
const dynamicDataStore = useDynamicStore();

staticDataStore.reloadData();

function reloadDynamicData() {
  const city_num= staticDataStore.city_list.length;
  const goods_num= staticDataStore.goods_list.length;
  if(city_num>0 && goods_num>0)
    return dynamicDataStore.reloadData(goods_num, city_num).catch((error)=>{
      if(error==="Dynamic data size error")
        staticDataStore.reloadData()
    });
  else
    return new Promise(()=>{})
}

useRequest(reloadDynamicData,{
  pollingInterval: 5000,
  pollingWhenHidden: false,
})

const city_dialog = ref(null)
const goods_dialog = ref(null)

const openCityDialog = () => {
  if (city_dialog.value){
    (city_dialog.value as typeof CityDialog).openDialog(-1)
  }
}

const openGoodsDialog = () => {
  if (goods_dialog.value){
    (goods_dialog.value as typeof CityDialog).openDialog(-1)
  }
}
</script>

<template>
  <el-container>
    <el-header>
      <WebHeader :icon="logo" title="雷索纳斯市场统计"></WebHeader>
    </el-header>
    <el-main>
      <DataTable @city-dialog="openCityDialog" @goods-dialog="openGoodsDialog"/>
    </el-main>
  </el-container>
  <CityDialog ref="city_dialog"/>
  <GoodsDiaglog ref="goods_dialog"/>
</template>

<style scoped>
</style>
