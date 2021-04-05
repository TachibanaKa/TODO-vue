<template>
  <div class="todo-action">
    <el-dialog
      :title="props.type == 'add' ? '新增' : '修改'"
      v-model="state.action.isDialog"
      width="40%"
      :before-close="IsTodos"
    >
      <el-form
        label-width="100px"
        v-model="state.action.todoInfo"
        ref="todoFrom"
      >
        <el-form-item label="标题">
          <el-input
            type="title"
            v-model="state.post.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="计划完成日期">
          <el-date-picker v-model="state.post.deadline" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
/* 标题、优先级（四象限和暂存区）、添加日期、更新日期、完成日期、状态 */
import { updateTodo, createTodo } from "/http/api.js";
import { reactive, defineProps, useContext, onBeforeMount, watch } from "vue";
import { ElMessage } from "element-plus";

const ctx = useContext();
const props = defineProps({
  type: String,         //添加还是修改
  isDialog: Boolean,    //是否打开对话框
  value: Object,        //当前选中的值
  init: Function,       //更新页面数据函数
  priority: Number,     //优先级
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
    addTime: '',
    updateTime: '',
    status: '',
    lastTime: '',
    deadline: '',
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
const IsTodos = () => {
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
  IsTodos();
};


ctx.expose({
  IsTodos,
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
