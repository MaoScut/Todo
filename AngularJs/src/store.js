import uuid from 'uuid';

export default class Store {
    constructor(STORE_KEY) {
        this.key = STORE_KEY;
        // const dataObj = this.readData();
        this.list = this.readData();
        // this.hideDone = dataObj.hideDone;
    }
    readData() {
        return JSON.parse(localStorage.getItem(this.key));
    }
    save() {
        this.list.sort(function(obj1, obj2) {
            return obj1.achieveTime-obj2.achieveTime;
        });
        localStorage.setItem(this.key, JSON.stringify(this.list));
    }
    add(detail, achieveTime) {
        this.list.push(TodoObj(detail, achieveTime));
        this.save();
    }
    delete(id) {
        const i = this.list.findIndex(obj => obj.id == id);
        this.list.splice(i,1);
        this.save();
    }
    // 完成了就是完成了，不会再变成不完成
    check(id) {
        const i = this.list.findIndex(obj => obj.id == id);
        this.list[i].done = true;
        this.save();
    }
    toggleShowed(id) {
        const i = this.list.findIndex(obj => obj.id == id);
        this.list[i] = !this.list[i];
        this.save();
    }
}

function TodoObj(detail, achieveTime) {
    return {
        id: uuid.v4(),
        createdTime: Date.now(),
        done: false,
        detail,
        achieveTime,
        showed: true,
    }
}
