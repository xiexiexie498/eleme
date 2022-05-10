import Mock from 'mockjs'
import data from './data.json'

// 返回goods接口
Mock.mock('/goods', {code: 0, data: data.goods})
// 返回ratings接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 返回info接口
Mock.mock('/info', {code: 0, data: data.info})

// export default 不需要向外暴露任何东西,只需要保证能够执行即可
