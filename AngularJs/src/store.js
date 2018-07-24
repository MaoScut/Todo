import uuid from 'uuid';

export default class Store {
    constructor(STORE_KEY) {
        this.key = STORE_KEY;
        const dataObj = this.readData();
        this.list = dataObj.list;
        this.hideDone = dataObj.hideDone;
    }
    readData() {
        return JSON.parse(localStorage.getItem(this.key));
    }
    save() {
        localStorage.setItem(this.key, JSON.stringify({
            hideDone: this.hideDone,
            list: this.list,
        }));
    }
    add(detail) {
        this.list.push(TodoObj(detail));
        this.save();
    }
    delete(id) {
        const i = this.list.findIndex(obj => obj.id == id);
        this.list.splice(i,1);
        this.save();
    }
    toggleCheck(id) {
        const i = this.list.findIndex(obj => obj.id == id);
        this.list[i].done = !this.list[i].done;
        this.save();
    }
    toggleHideDone() {
        this.hideDone = !this.hideDone;
        this.save();
    }
}

function TodoObj(detail) {
    return {
        id: uuid.v4(),
        time: Date.now(),
        done: false,
        detail,
    }
}