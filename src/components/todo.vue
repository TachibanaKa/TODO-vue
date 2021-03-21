<template>
  <div class="todo">
    <!-- 导航栏 -->
    <el-menu
      default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      @select="menuSelect"
    >
      <el-menu-item index="1">待做事项</el-menu-item>
      <el-menu-item index="2">日历</el-menu-item>
      <el-menu-item index="3">我的</el-menu-item>
      <div class="user-action">
        <span class="el-menu-item" @click="loginOpen">登陆</span>
        <span class="el-menu-item" @click="registerOpen">注册</span>
      </div>
    </el-menu>
    <!-- main -->
    <el-container class="main">
      <el-container>
        <el-aside width="25%" class="temp">
          <span>收纳箱</span>
          <span class="add-temp" @click="IsTemp('add')">+</span>
          <ul v-if="state.show.tempTodoArr">
            <li v-for="(item) in state.show.tempTodoArr" :key="item.id" class="temp-item">
              <span>{{item.title}}</span>
              <el-button type="primary" size="mini" round plain @click="IsTemp('update',item)">修改</el-button>
              <el-button type="danger" size="mini" round plain @click="del('temp',item)">删除</el-button>
              </li>
          </ul>
        </el-aside>
        <el-main class="main-center">
          <div class="left-top sort">
            <div class="title">
              <span>紧急不重要</span><span class="add">+</span>
            </div>
            <div class="content"></div>
          </div>
          <div class="right-top sort">
            <div class="title">
              <span>紧急重要</span><span class="add">+</span>
            </div>
            <div class="content"></div>
          </div>
          <div class="left-bottom sort">
            <div class="title">
              <span>不紧急不重要</span><span class="add">+</span>
            </div>
            <div class="content"></div>
          </div>
          <div class="right-bottom sort">
            <div class="title">
              <span>重要不紧急</span><span class="add">+</span>
            </div>
            <div class="content"></div>
          </div>
        </el-main>
        <el-aside width="20%">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in state.show.activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-aside>
      </el-container>
    </el-container>
    <Login :isDialog="state.action.isDialog" ref="loginRef" />
    <Register :isDialog="state.action.isDialog" ref="registerRef" />
    <TempAction :isDialog="state.action.isDialog" :type="state.action.tempType" :value="state.action.tempValue" :init="tempInit"  ref="tempAction" />
  </div>
</template>
<script setup>
import Login from "./login.vue";
import Register from "./register.vue";
import TempAction from "./tempAction.vue"
import { reactive, ref, onMounted,watch } from "vue";
import { useStore } from "vuex";
import {getTodo, delTodo} from "/http/api.js"
import { ElMessage } from "element-plus";

const loginRef = ref(null);
const registerRef = ref(null);
const tempAction = ref(null);
const store = useStore()
const state = reactive({
  action: {
    isDialog: false,
    tempType: 'add',
    tempValue: '',
  },
  show: {
    tempTodoArr:[],
    activities: [
      {
        content: "活动按期开始",
        timestamp: "2018-04-15",
      },
      {
        content: "通过审核",
        timestamp: "2018-04-13",
      },
      {
        content: "创建成功",
        timestamp: "2018-04-11",
      },
    ],
  },
  post:{
    userId:null
  }
});
const tempInit = async()=>{
  state.post.userId = store.state.userData.userId
  let res = await getTodo(state.post)
  if(res.code == 200){
    state.show.tempTodoArr = res.data
  }
}
const loginOpen = () => {
  loginRef.value.loginOpen();
};
const menuSelect = (e) => {
  console.log(e);
};
const registerOpen = () => {
  registerRef.value.registerOpen();
}
const IsTemp = (type, item) =>{
  state.action.tempType = type
  if(type == 'update'){
    state.action.tempValue = item
    tempAction.value.IsTemp(tempInit)
  }else{
    tempAction.value.IsTemp()
  }
}
const del = async(type, item)=>{
  if(type=='temp'){
    let res = await delTodo({id:item.id})
    if(res.code == 200){
      ElMessage.success({
        message: "删除成功",
        type: "success",
      });
    }
  }
  tempInit()
}
onMounted(()=>{
  tempInit()
})
watch(
  ()=>store.state.userData,(newValue, oldValue)=>{
    tempInit()
  }
)

</script>

<style lang="scss" scoped>
ul{
  padding: 0;
}
li {
  list-style: none;
  text-align: left;
}
.user-action{
  width: 20%;
  float: right;

  span{
    display: inline-block;
    width: 50%;
    text-align: center;
  }
}
.main {
  margin-top: 15px;
  .temp {
    border-right: 1px solid #ccc;
    height: 80vh;
    .temp-item{
      width: 100%;
      span{
        display: inline-block;
        width: 55%;
      }
    }
    .add-temp {
      margin-left: 15px;
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border: 1px solid #ccc;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .main-center {
    display: flex;
    flex-wrap: wrap;
    .sort {
      width: 50%;
      height: 50%;
      display: inline-block;
      .add {
        font-size: 20px;
        margin-left: 10px;
      }
    }
    .left-top {
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .right-top {
      box-sizing: border-box;
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .left-bottom {
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }
    .right-bottom {
      box-sizing: border-box;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }
  }
}
</style>
