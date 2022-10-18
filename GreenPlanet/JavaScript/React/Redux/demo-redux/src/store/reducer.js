/*
    1. 该文件用于创建一个为XXX组件服务的reducer，reducer的本质是一个函数
    2. reducer函数会接收到俩个参数，分别是：之前的状态（preState），动作对象（action）
*/
import { INCREMENT,DECREMENT } from "./constants" // 引入常量
const initState = 0 // 初始化数据
export default function Reducer(preStete = initState,action) {
    // 从动作（action）对象里面取出要干嘛，以及这件事的数据
    const {type,data} = action
    // 根据type决定如何加工数据
    switch(type){
        case INCREMENT:
            return preStete + data
        case DECREMENT:
            return preStete - data
        default:
            return preStete
    }
}
