const STATE_DEFAULT = 0;
const STATE_NEWSTATE = 1;

export class Message {
    constructor(state, message) {
        this.state = state;
        this.message = message;
    }
}

class Observer {
    update(message) {}
}

export class Card extends Observer {
    constructor(cardUUID, title) {
        super();
        this.cardUUID = cardUUID;
        this.title = title;
        this.observable = null;
    }

    update(message) {
        this.callback(message);
    }

    setCallback(f) {
        this.callback = f;
    }
}

class Observable {
    addObserver(observer) {}
    removeObserver(observer) {}
    contain(observer) {}
    notifyAll() {}
}

export class Subject extends Observable {
    constructor(subjectUUID, containerName) {
        super();
        this.subjectUUID = subjectUUID;
        this.containerName = containerName;
        this.subjectState = {};
        this.observers = [];
        this.createDate = Date.now();
    }

    addObserver(observer) {
        observer.observable = this;
        this.observers.push(observer);
    }

    removeObserver(observer) {
        observer.observable = null;
        this.observers = this.observers.filter(obs => observer.cardUUID !== obs.cardUUID);
    }

    contain(observer) {
        return !!this.observers.filter(obs => obs.cardUUID === observer.cardUUID)[0];
    }

    notifyAll(message) {
        this.observers.forEach(observer => observer.update(message));
    }

    setState(newState) {
        this.subjectState = newState;
        this.notifyAll(new Message(STATE_NEWSTATE, this));
    }
}
