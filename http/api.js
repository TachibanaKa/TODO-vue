import {post,fetch,patch,put} from '../http/request'

//接口封装
let api = {
  login:'user/login',              //登陆
  register:'user/register',        //注册
  getTodo:'todo/getTodo',          //获取某个用户所有的todo
  updateTodo: 'todo/updateTodo',   //修改某个todo 
  delTodo:'todo/delTodo',          //删除某个todo
  createTodo:'todo/createTodo',    //创建todo
}
//登陆
async function login (params){
  let data = null
  await fetch(api.login,params).then( res=>{
    data = res
  })
  return data
}
//注册
async function register (params){
  let data = null
  await fetch(api.register,params).then(res=>{
    data = res
  })
  return data
}
//获取某个用户所有的todo
async function getTodo (params){
  let data = null
  await fetch(api.getTodo,params).then(res=>{
    data = res
  })
  return data
}
//修改某个todo
async function updateTodo (params){
  let data = null
  await fetch(api.updateTodo,params).then(res=>{
    data = res
  })
  return data
}
//删除某个todo
async function delTodo (params){
  let data = null
  await fetch(api.delTodo,params).then(res=>{
    data = res
  })
  return data
}
//创建todo
async function createTodo (params){
  let data = null
  await fetch(api.createTodo,params).then(res=>{
    data = res
  })
  return data
}
export {
  login,
  register,
  getTodo,
  updateTodo,
  delTodo,
  createTodo,
}