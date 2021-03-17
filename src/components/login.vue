<template>
  <div class="login">
    <el-dialog
      title="登陆"
      v-model="state.action.isDialog"
      width="40%"
      :before-close="loginClose"
    >
      <el-form
        label-width="100px"
        v-model="state.action.loginInfo"
        ref="loginFrom"
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
          <el-button type="primary" @click="toLogin">登陆</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmit, useContext } from "vue";
import { login } from "/http/api.js";
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
    loginInfo: null,
  },
  post: {
    account: null,
    password: null,
  },
});
state.action.isDialog = props.isDialog;

const loginClose = () => {
  state.action.isDialog = false;
};
const loginOpen = () => {
  state.action.isDialog = true;
};
const toLogin = async() => {
  let res = await login(state.post);
  if (res.code == 200) {
    state.action.isDialog = false;
    sessionStorage.setItem("token", res.token);
    store.commit('setUserData',res.token)
    ElMessage.success({
      message: "登陆成功",
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
  loginOpen() {
    state.action.isDialog = true;
    console.log("loginOpen");
  },
});
</script>

<style lang="scss" scoped></style>
