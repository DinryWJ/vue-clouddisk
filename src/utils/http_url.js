import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  objBase,
  modelBase
} from './config'

const errorMsg = '服务器内部错误'
const errorMsg401 = '登录超时，请重新登录'
const errorFn = err => {
  console.log(err.response.status)
  let status = err.response.status
  if (status == 500) {
    Message.error(errorMsg)
  }
  if (status == 401) {
    Message.error(errorMsg401)
  }
  return err
}
const codeerror = d => {
  if (d.data != null && d.data.code == 401) {
    Message.error(d.data.msg)
  }
  return d
}

//http request拦截器
axios.interceptors.request.use(
  config =>{
      var token = sessionStorage.getItem('token');
      if(token){
          // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = token;
      }
      return config;
  },
  err =>{
      return Promise.reject(err);
  }
)

// //http response拦截器
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:
                  // 返回 401 清除token信息并跳转到登录页面
                  store.commit(types.LOGOUT);
                  router.replace({
                      path: 'login',
                      query: {redirect: router.currentRoute.fullPath}
                  })
          }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
/*const imgpost = (_url, obj) => axios({
  
  method: 'post',
  url: url + _url,
  data: obj,
  headers: {
    "Accept": "application/json;charset=utf-8",
    "Content-Type": undefined
  },
  processData: false,
  contentType: false
}).then(codeerror).catch(errorFn)*/
const post = (_url, obj) => axios.post(_url, obj, objBase).then(codeerror).catch(errorFn)
const post2 = (_url, body) => axios.post(_url, body, modelBase).then(codeerror).catch(errorFn)

/*登陆*/
const login = (username, password) => post('/login/login', username, password)
/*注册*/
const register = (parameters) => post('/login/register', parameters)
const test = () => post('/article')
export default {
  login,
  register,
  test
}