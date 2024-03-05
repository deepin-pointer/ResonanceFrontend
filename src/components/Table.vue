<template>
  <el-table @header-click="headerClick" :data="profitData">
    <el-table-column label="商品">
      <el-table-column prop="goods_city" label="产地" width="150" />
      <el-table-column prop="goods" label="名称" width="150" />
      <el-table-column prop="goods_price" label="原价" width="60" />
      <el-table-column prop="goods_rate" label="价位" width="60" />
      <el-table-column prop="goods_trend" label="趋势" width="60" fixed="left" />
    </el-table-column>
    <el-table-column label="销售地点">
      <el-table-column v-for="(city, index) in cities" :label="city.name" :key="`goods_${index}`">
        <el-table-column :prop="`goods_${index}_rate`" label="价位" width="60" />
        <el-table-column :prop="`goods_${index}_trend`" label="趋势" width="60" />
        <el-table-column :prop="`goods_${index}_profit`" label="利润" width="60" />
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStaticStore } from "../stores/static";
import { useDynamicStore } from "../stores/dynamic";
import { TableRow } from "../interfaces/view";

export default defineComponent({
  name: "DataTable",
  data() {
    const staticDataStore = useStaticStore();
    const dynamicDataStore = useDynamicStore();
    const cities = storeToRefs(staticDataStore).city_list;

    const profitData = computed(() => {
      const data = [];
      const goods = staticDataStore.goods_list;
      const cities = staticDataStore.city_list;
      for (var i = 0; i < goods.length; i++) {
        if(dynamicDataStore.rate.length<=i)
          break;
        const entry: TableRow = {
          goods_city: cities[goods[i].origin].name,
          goods: goods[i].name,
          goods_price: goods[i].base[goods[i].origin],
          goods_rate: Math.abs(dynamicDataStore.rate[i][goods[i].origin]),
          goods_trend: dynamicDataStore.rate[i][goods[i].origin] > 0,
        };
        for (var j = 0; j < cities.length; i++) {
          if(dynamicDataStore.rate[i].length<=j)
            break;
          entry[`goods_${j}_rate`] = Math.abs(dynamicDataStore.rate[i][j]);
          entry[`goods_${j}_trend`] = dynamicDataStore.rate[i][j] > 0;
          entry[`goods_${j}_profit`] =
            (goods[i].base[j] * Math.abs(dynamicDataStore.rate[i][j]) -
              goods[i].base[goods[i].origin] *
              Math.abs(dynamicDataStore.rate[i][goods[i].origin])) /
            100;
        }
        data.push(entry);
      }
      return data;
    });

    const headerClick = (column: any, _event: Event) => {
      if (column.label === "商品") {
        this.$emit("goods-dialog", -1);
      } else if (column.label === "销售地点") {
        this.$emit("city-dialog", -1);
      }
    }

    return {
      cities,
      profitData,
      headerClick,
    };
  },
});
</script>

<style scoped></style>
