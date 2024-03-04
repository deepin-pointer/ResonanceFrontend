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
          <el-table-column label="城市" prop="city"/>
          <el-table-column label="距离">
            <template #default="scope">
              <el-form-item
                v-if="scope && scope.$index >= 0"
                label=" "
                :prop="`form.distance.${scope.$index}.distance`"
              >
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
import { defineComponent, toRef, ref, Ref } from "vue";
import { useStaticStore } from "../stores/static";
import { CityForm } from "../interfaces/view";

export default defineComponent({
  name: "WebHeader",
  data() {
    const staticDataStore = useStaticStore();
    const visible = ref(false); 
    const cities = toRef(staticDataStore.city_list);
    const form:Ref<CityForm> = ref({
      name: "",
      note: "",
      distance: [],
    });
    for (var i = 0; i < cities.value.length; i++) {
      form.value.distance.push({ city: cities.value[i].name, distance: 0 });
    }

    return { visible, cities, form };
  },
  methods: {
    openDialog(_city: number) {
      this.visible=true;
    }
  }
});
</script>

<style scoped>
</style>
