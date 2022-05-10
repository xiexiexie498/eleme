/* ajax模块 */
import axios from 'axios'

export default function ajax (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      let dataStr = ''
      //Objecet.keys 会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&' // http://localhost:3000/shops?latitude=40.10038&longitude=11636867
      })
      if (dataStr) {
        // slice---（数组、字符串的方法）第一个参数是从什么位置开始，第二个参数是保留到什么位置（第二个参数指定就不被包含在内）
        //     ---不会影响原字符串、数组，将截取的数组字符串作为返回值返回
        dataStr = dataStr.slice(0, -1) // (0, -1) 取出字符串中的从0到最后一位,不包括最后一位
        // splice---（仅数组的方法）第一个参数是从哪里开始删除，第二个参数是删除几个，第三个参数以后就是添加（可以传递一些元素，这些元素会插入到第一个参数索引前边）
        //      ---会影响原数组，将被删除的元素作为返回值返回
        // dataStr.splice(-1,1)
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    // 处理服务器相应
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
