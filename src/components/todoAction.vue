<template>
    <div class="todo-action">
    <el-dialog
      :title="props.type == 'add' ? '新增' : '修改'"
      v-model="state.action.isDialog"
      width="40%"
      :before-close="todoClose"
    >
      <el-form
        label-width="100px"
        v-model="state.action.todoInfo"
        ref="todoFrom"
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
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>

</script>

<style>

</style>