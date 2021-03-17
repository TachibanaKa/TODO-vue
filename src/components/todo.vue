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
          <span class="add-temp">+</span>
          <div></div>
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
  </div>
</template>
<script setup>
import Login from "./login.vue";
import Register from "./register.vue";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
const loginRef = ref(null);
const registerRef = ref(null);
const store = useStore()
const state = reactive({
  action: {
    isDialog: false,
  },
  show: {
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
});
const loginOpen = () => {
  loginRef.value.loginOpen();
};
const menuSelect = (e) => {
  console.log(e);
};
const registerOpen = () => {
  registerRef.value.registerOpen();
}
console.log(store)
</script>

<style lang="scss" scoped>
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
