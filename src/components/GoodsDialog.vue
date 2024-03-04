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
          <el-option v-for="(city, index) in staticDataStore.city_list" :label="city.name" :value="index" />
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
        <el-button type="primary" @click="visible = false; submit();">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useStaticStore } from "../stores/static";
import { GoodsForm } from "../interfaces/view";
import { ElMessage } from 'element-plus'
import { Goods } from "../interfaces/static";

export default defineComponent({
  name: "WebHeader",
  data() {
    const staticDataStore = useStaticStore();
    const visible = ref(false);
    const goods = -1;
    const form:Ref<GoodsForm> = ref({
      name: "",
      note: "",
      special: false,
      origin: 0,
      count: 0,
      info: [],
    });
    for (var i = 0; i < staticDataStore.city_list.length; i++) {
      form.value.info.push({ city: staticDataStore.city_list[i].name, base: 0 });
    }

    const submit = ()=>{
      const goods: Goods={
        name: form.value.name,
        note: form.value.note,
        special: form.value.special,
        origin: form.value.origin,
        count: form.value.count,
        base: []
      }
      form.value.info.forEach((info)=>{
        goods.base.push(info.base)
      })
      try{
        staticDataStore.addGoods(goods);
      }
      catch(e){
        ElMessage({
          message: `创建失败:${e}`,
          type: 'error',
        })
      }
    }

    return { visible, form, submit, goods, staticDataStore };
  },
  methods: {
    openDialog(goods: number) {
      if (this.staticDataStore.city_list.length==0){
        ElMessage({
          showClose: true,
          message: '请先新建城市！',
          type: 'error',
        })
      }
      else{
        if (goods < 0) {
          this.form.name = ""
          this.form.note = ""
          this.form.special= false
          this.form.origin= 0
          this.form.count= 0
          this.form.info = []
          for (var i = 0; i < this.staticDataStore.city_list.length; i++) {
            this.form.info.push({ city: this.staticDataStore.city_list[i].name, base: 0 });
          }
          this.goods = -1;
        } else {
          const staticDataStore = useStaticStore();
          const goods_list=staticDataStore.goods_list
          this.form.name = goods_list[goods].name
          this.form.note = goods_list[goods].note
          this.form.special = goods_list[goods].special
          this.form.origin = goods_list[goods].origin
          this.form.count = goods_list[goods].count
          this.form.info = []
          for (var i = 0; i < goods_list[goods].base.length; i++) {
            this.form.info.push({ city: this.staticDataStore.city_list[i].name, base: goods_list[goods].base[i] });
          }
          this.goods = goods;
        }
        this.visible = true;
      }
    }
  }
});
</script>

<style scoped></style>
