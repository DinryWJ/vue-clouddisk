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
const get = (_url,obj) => axios.get(_url,objBase).then(codeerror).catch(errorFn)

/*登陆*/
const login = (username, password) => post('/login/login', username, password)
/*注册*/
const register = (parameters) => post('/login/register', parameters)
/*判断用户是否存在*/
const valid = (username) => get('/login/valid?username='+username)
/*验证登陆状态*/
const validAuth = () => get('/require_auth')
export default {
  login,
  register,
  valid,
  validAuth
}