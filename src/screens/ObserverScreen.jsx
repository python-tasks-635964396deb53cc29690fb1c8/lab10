import cs from './ObserverScreen.module.css'
import HorizontalContainer from "../containers/HorizontalContainer";
import VerticalContainer from "../containers/VerticalContainer";
import {useState} from "react";
import CardWithTitle from "../containers/CardWithTitle";
import {Message, Card, Subject} from '../utils/helpers'

const ObserverScreen = ({log, className}) => {
    const [ observablesObjects, setObservablesObjects ] = useState([]);
    const [ observersObjects, setObserversObjects ] = useState([]);
    const [ observables, setObservables ] = useState([]);
    const [ observers, setObservers ] = useState([]);
    const [ observerGroups, setObserverGroups ] = useState([]);

    function createObserver() {
        const card = new Card(crypto.randomUUID());
        setObservers(prev =>
            [...prev, <CardWithTitle cardUuid={card.cardUUID} title={`Observer ${prev.length + 1}`} draggable={true} />]);
        setObserversObjects(prev => [...prev, card]);
        log(`Created observer ${JSON.stringify(card)}.`);
    }

    function getObserverGroup(groupUUID) {
        for (let i = 0; i < observerGroups.length; i++) {
            if (observerGroups[i].uuid === groupUUID) {
                return observerGroups[i].items;
            }
        }
        return null;
    }

    function createObserverGroup(groupUUID) {
        if (getObserverGroup(groupUUID) === null) {
            setObserverGroups(prev => [...prev, {uuid: groupUUID, items: []}]);
        }
    }

    function appendObserverGroup(groupUUID, element) {
        setObserverGroups(prev => {
            const group = getObserverGroup(groupUUID);
            group.items.push(element);
            return [...prev.filter(el => el.uuid !== group.uuid), group];
        });
    }

    function createObservable() {
        const subject = new Subject(crypto.randomUUID(), {});
        createObserverGroup(subject.subjectUUID);
        setObservables(prev=> [
            ...prev,
            <VerticalContainer
                containerUUID={subject.subjectUUID}
                containerName={`Subject ${prev.length + 1}`}
                width="20vw"
                height="100%"
                elms={[]}
                onDrop={(e) => console.log(e)} />
        ]);
        setObservablesObjects(prev => [...prev, subject]);
        log(`Created subject ${JSON.stringify(subject)}`);
    }

    return (
        <div className={cs.screen + (className ? ' ' + className : '')}>
            <HorizontalContainer
                width="70%"
                elms={observables} />
            <div className={cs.backlogMenu}>
                <VerticalContainer
                    containerName="Backlog"
                    width="100%"
                    height="90%"
                    elms={observers} />
                <div className={cs.backlogButtons}>
                    <button onClick={createObservable}>Observable</button>
                    <button onClick={createObserver}>Observer</button>
                </div>
            </div>
        </div>
    );
}

export default ObserverScreen;
