<template>
  <el-dialog v-model="visible" title="添加商品" width="500">
    <el-form :model="form">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品备注">
        <el-input v-model="form.note" autocomplete="off" />
      </el-form-item>
      <el-form-item label="当地特产">
        <el-checkbox v-model="form.special" />
      </el-form-item>
      <el-form-item label="原产地">
        <el-select v-model="form.origin">
          <el-option v-for="(city, index) in cities" :label="city.name" :value="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="基础数量">
        <el-input v-model="form.count" autocomplete="off" />
      </el-form-item>
      <el-table :data="form.info" border stripe>
        <el-table-column label="城市" prop="city" />
        <el-table-column label="基础价格">
          <template #default="scope">
            <el-form-item v-if="scope && scope.$index >= 0" label=" " :prop="`form.info.${scope.$index}.base`">
              <el-input v-model="scope.row.amount"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from "vue";
import { useStaticStore } from "../stores/static";
import { GoodsForm } from "../interfaces/view";

export default defineComponent({
  name: "WebHeader",
  data() {
    const staticDataStore = useStaticStore();
    const visible = ref(false);
    const cities = toRef(staticDataStore.city_list);
    const form: GoodsForm = {
      name: "",
      note: "",
      special: false,
      origin: 0,
      count: 0,
      info: [],
    };
    for (var i = 0; i < cities.value.length; i++) {
      form.info.push({ city: cities.value[i].name, base: 0 });
    }

    return { visible, cities, form };
  },
  methods: {
    openDialog(_goods: number) {
      this.visible = true;
    }
  }
});
</script>

<style scoped></style>
