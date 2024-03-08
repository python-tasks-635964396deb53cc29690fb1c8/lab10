const STATE_DEFAULT = 0;

export class Message {
    constructor(state, message) {
        this.state = state;
        this.message = message;
    }
}

export class Observer {
    update(message) {}
}

export class Observable {
    addObserver(observer) {}
    removeObserver(observer) {}
    notifyAll() {}
}