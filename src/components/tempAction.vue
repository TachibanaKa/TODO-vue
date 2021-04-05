<template>
  <div class="temp-action">
    <el-dialog
      :title="props.type == 'add' ? '新增' : '修改'"
      v-model="state.action.isDialog"
      width="40%"
      :before-close="IsTemp"
    >
      <el-form
        label-width="100px"
        v-model="state.action.tempInfo"
        ref="tempFrom"
      >
        <el-form-item label="暂存事项">
          <el-input
            type="account"
            v-model="state.post.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="优先级" v-if="props.type == 'update'">
          <el-input
            type="number"
            v-model="state.post.priority"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { updateTodo, createTodo } from "/http/api.js";
import { reactive, defineProps, useContext, onBeforeMount, watch } from "vue";
import { ElMessage } from "element-plus";

const ctx = useContext();
const props = defineProps({
  type: String,
  isDialog: Boolean,
  value: Object,
  init: Function,
});

const state = reactive({
  action: {
    isDialog: false,
  },
  post: {
    title: "",
    userId: "",
    priority: 0,
    id: 0,
  },
});

/* 初始化值 */
const initTemp = () => {
  switch (props.type) {
    case "add":
      state.post.title = "";
      break;

    case "update":
      state.post.title = props.value.title;
      state.post.id = props.value.id;
      break;
  }
};
const IsTemp = () => {
  state.action.isDialog = !state.action.isDialog;
};
/* 删除或者修改收纳箱 */
const confirm = async () => {
  if (props.type == "add") {
    let res = await createTodo(state.post);
    if (res.code == 200) {
      props.init && props.init()
      state.post.title = "";
      ElMessage.success({
        message: "添加成功",
        type: "success",
      });
    }
  } else {
    let res = await updateTodo({ id: state.post.id, newData: state.post });
    if (res.code == 200) {
      props.init && props.init()
      ElMessage.success({
        message: "修改成功",
        type: "success",
      });
    }
  }
  IsTemp();
};

const changePrior = ()=>{
  
}
ctx.expose({
  IsTemp,
  confirm,
});

watch(
  [() => props.type, () => props.value.id],
  ([newType, newId], [oldType, oldId]) => {
    state.post.title = props.value.title;
    state.post.id = props.value.id;
    if (newType == "add") {
      state.post.title = "";
    }
  }
);
</script>

<style></style>
