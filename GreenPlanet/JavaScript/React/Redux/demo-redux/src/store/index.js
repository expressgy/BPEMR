// 引入createStore方法，创建redux中最为核心的Store对象
import {createStore} from 'redux'
// 引入reducer
import myReducer from './reducer'
// 暴露store
export default createStore(myReducer)
