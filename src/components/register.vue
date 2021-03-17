<template>
  <div class="register">
    <el-dialog
      title="注册"
      v-model="state.action.isDialog"
      width="40%"
      :before-close="registerClose"
    >
      <el-form
        label-width="100px"
        v-model="state.action.registerInfo"
        ref="registerFrom"
      >
        <el-form-item label="账号">
          <el-input
            type="account"
            v-model="state.post.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="state.post.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toRegister">注册</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmit, useContext } from "vue";
import { register } from "/http/api.js";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
const store = useStore()
const props = defineProps({
  isDialog: Boolean,
});
const ctx = useContext();
const state = reactive({
  action: {
    isDialog: true,
    registerInfo: null,
  },
  post: {
    account: null,
    password: null,
  },
});
state.action.isDialog = props.isDialog;

const registerClose = () => {
  state.action.isDialog = false;
};
const registerOpen = () => {
  state.action.isDialog = true;
};
const toRegister = async() => {
  let res = await register(state.post);
  if (res.code == 200) {
    state.action.isDialog = false;
    ElMessage.success({
      message: "注册成功,请登录",
      type: "success",
    });
  }else{
    ElMessage.error(res.data);
  }
  
};
const reset = () => {
  state.post.account = "";
  state.post.password = "";
};
ctx.expose({
  registerOpen() {
    state.action.isDialog = true;
  },
});
</script>

<style lang="scss" scoped></style>
