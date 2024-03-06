<template>
    <el-dialog v-model="visible" title="登录" width="300">
      <el-form :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.user" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
      </el-form>
  
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="visible = false; submit();">
            登录
          </el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { usePersistStore } from "../stores/persist";
  import { login } from "../apis/backend";
  
  export default defineComponent({
    name: "LoginDialog",
    data() {
      const persistDataStore = usePersistStore();
      const visible = ref(false);
      const form = ref({
        user: persistDataStore.user,
        password: "",
      });
  
      const submit = () => {
        login(form.value.user, form.value.password).then((result)=>{
          persistDataStore.user=form.value.user
          persistDataStore.token=result.data["token"]
        })
      }
  
      return { visible, form, submit };
    },
    methods: {
      openDialog() {
        this.form.password = "";
        this.visible = true;
      }
    }
  });
  </script>
  
  <style scoped></style>