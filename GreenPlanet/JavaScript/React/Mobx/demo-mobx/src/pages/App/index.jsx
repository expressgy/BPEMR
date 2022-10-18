
import {userStore } from '@/store'
import {autorun} from 'mobx'
import {useEffect} from 'react'
export default function App(){
    useEffect(() => {
        const a = autorun(() => {
            console.log(userStore.name)
            console.log(userStore.sex)
        })
        setTimeout(() => {
            userStore.setName('荷西')
        })
        return () => {
            console.log('卸载')
            a()
        }
    },[0])

    return(
        <div>APP</div>
    )
}