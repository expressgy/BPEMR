import { observable, action, computed, makeObservable} from "mobx";


class UserStore {
    name = 'kangkang000';
    sex =  '男';
    userObj = {
        name: 'kangkang000',
        age: 23,
        token: '12345689'
    }

    constructor() {
        // mobx6 和以前版本这是最大的区别
        makeObservable(this, {
            name: observable,
            sex: observable,
            userObj: observable,
            setName: action,
            titleName: computed
        });

    }

    setName(v) {
        console.log('触发action');
        this.name = v;
    }
    setUserObj(obj) {
        this.userObj = obj;
    }

    get titleName(){
        return this.name+'___111';
    }
    get userObject() {
        return this.userObj;
    }
}

export default UserStore