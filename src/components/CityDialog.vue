<template>
  <el-dialog v-model="visible" title="添加城市" width="500">
    <el-form :model="form">
      <el-form-item label="城市名称">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="城市备注">
        <el-input v-model="form.note" autocomplete="off" />
      </el-form-item>
      <el-table :data="form.distance" border stripe>
        <el-table-column label="城市" prop="city" />
        <el-table-column label="距离">
          <template #default="scope">
            <el-form-item v-if="scope && scope.$index >= 0" label=" " :prop="`form.distance.${scope.$index}.distance`">
              <el-input-number v-model="scope.row.distance" controls=""/>
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
import { CityForm } from "../interfaces/view";
import { City } from "../interfaces/static";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "WebHeader",
  data() {
    const staticDataStore = useStaticStore();
    const visible = ref(false);
    const city = -1;
    const form: Ref<CityForm> = ref({
      name: "",
      note: "",
      distance: [],
    });
    for (var i = 0; i < staticDataStore.city_list.length; i++) {
      form.value.distance.push({ city: staticDataStore.city_list[i].name, distance: 0 });
    }

    const submit = () => {
      const city: City = {
        name: form.value.name,
        note: form.value.note,
        distance: []
      }
      form.value.distance.forEach((dist) => {
        city.distance.push(dist.distance)
      })
      try {
        staticDataStore.addCity(city);
      }
      catch (e) {
        ElMessage({
          message: `创建失败:${e}`,
          type: 'error',
        })
      }
    }

    return { visible, staticDataStore, form, submit, city };
  },
  methods: {
    openDialog(city: number) {
      if (city < 0) {
        this.form.name = ""
        this.form.note = ""
        this.form.distance = []
        for (var i = 0; i < this.staticDataStore.city_list.length; i++) {
          this.form.distance.push({ city: this.staticDataStore.city_list[i].name, distance: 0 });
        }
        this.city = -1;
      } else {
        this.form.name = this.staticDataStore.city_list[city].name
        this.form.note = this.staticDataStore.city_list[city].note
        this.form.distance = []
        for (var i = 0; i < this.staticDataStore.city_list[city].distance.length; i++) {
          this.form.distance.push({ city: this.staticDataStore.city_list[i].name, distance: this.staticDataStore.city_list[city].distance[i] });
        }
        this.city = city;
      }
      this.visible = true;
    }
  }
});
</script>

<style scoped></style>
