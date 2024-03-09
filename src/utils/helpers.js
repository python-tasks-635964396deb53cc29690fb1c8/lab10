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
    constructor(cardUUID) {
        super();
        this.cardUUID = cardUUID;
    }

    update(message) {
        this.callback();
    }

    setCallback(f) {
        this.callback = f;
    }
}

class Observable {
    addObserver(observer) {}
    removeObserver(observer) {}
    notifyAll() {}
}

export class Subject extends Observable {
    constructor(subjectUUID, subjectState) {
        super();
        this.subjectUUID = subjectUUID;
        this.subjectState = subjectState;
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => observer.cardUUID !== obs.cardUUID);
    }

    notifyAll(message) {
        this.observers.forEach(observer => observer.update(message));
    }

    setState(newState) {
        this.subjectState = newState;
        this.notifyAll(new Message(STATE_NEWSTATE, this));
    }
}
