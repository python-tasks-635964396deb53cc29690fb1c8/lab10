import cs from './ObserverScreen.module.css';
import HorizontalContainer from "../containers/HorizontalContainer";
import VerticalContainer from "../containers/VerticalContainer";
import {useState} from "react";
import CardWithTitle from "../containers/CardWithTitle";
import {Card, Subject} from '../utils/helpers';

let observablesStorage = [];
let observersStorage = [];

function searchCard(cardUUID) {
    return observersStorage.filter(card => card.cardUUID === cardUUID)[0];
}

function searchSubject(subjectUUID) {
    return observablesStorage.filter(subject => subject.subjectUUID === subjectUUID)[0];
}

function subjectContainsCard(subjectUUID, cardUUID) {
    const subject = searchSubject(subjectUUID);
    for (let i = 0; i < subject.observers.length; i++) {
        if (subject.observers[i].cardUUID === cardUUID) {
            return true;
        }
    }
    return false;
}

const ObserverScreen = ({log, className}) => {
    const [observables, setObservables] = useState([]);
    const [observers, setObservers] = useState([]);

    function createObserver() {
        const card = new Card(crypto.randomUUID(), `Observer ${observersStorage.length + 1}`);
        card.setCallback(() => animCard(card));
        observersStorage.push(card);
        setObservers(prev => [...prev, <CardWithTitle cardUuid={card.cardUUID} title={card.title} draggable={true}/>]);
        log(`Created card: ${JSON.stringify(card)}`);
    }

    function createObservable() {
        const subject = new Subject(crypto.randomUUID(), `Subject ${observablesStorage.length + 1}`);
        observablesStorage.push(subject);
        setObservables(prev => [...prev,
            <VerticalContainer
                containerUUID={subject.subjectUUID}
                containerName={subject.containerName}
                width="20svw" height="100%"
                elements={[]}
                onTopClick={(e) => subjectStateChange(e, subject)}
                onDrop={(e) => dropCard(e.currentTarget.getAttribute("data-container-uuid"), JSON.parse(e.dataTransfer.getData("application/json")))}/>
        ]);
        log(`Created subject: ${JSON.stringify(subject)}`);
    }

    function dropCard(subjectUUID, card) {
        if (subjectContainsCard(subjectUUID, card.uuid)) return;

        const subject = searchSubject(subjectUUID);
        const realCard = searchCard(card.uuid);
        subject.addObserver(realCard);

        const elms = observablesStorage.map(subject => {
            return <VerticalContainer
                containerUUID={subject.subjectUUID}
                containerName={subject.containerName}
                width="20svw" height="100%"
                elements={subject.observers.map(observer => <CardWithTitle cardUuid={observer.cardUUID}
                                                                           title={observer.title} draggable={false}/>)}
                onTopClick={(e) => subjectStateChange(e, subject)}
                onDrop={(e) => dropCard(e.currentTarget.getAttribute("data-container-uuid"), JSON.parse(e.dataTransfer.getData("application/json")))}/>
        });
        setObservables(elms);
    }

    function subjectStateChange(e, subject) {
        const state = subject.subjectState;
        const result = window.confirm(`Вот текущее состояние ${subject.containerName}:\n${state}
                                                \nМожет быть вы хотите изменить его?`);
        let newState = null;
        if (result && (newState = window.prompt("Введите новое состояние."))) {
            subject.subjectState = newState;
            subject.notifyAll();
        }
    }

    function animCard(card) {
        const elms = document.querySelectorAll(`*[data-card-uuid="${card.cardUUID}"]`);
        elms.forEach(elm => {
            elm.animate({background: "red"}, 400)
                .onfinish = () => elm.animate({background: "green"}, 400)
                .onfinish = () => elm.animate({background: "yellow"}, 400);
        })
    }

    return (
        <div className={cs.screen + (className ? ' ' + className : '')}>
            <HorizontalContainer
                width="70%"
                elements={observables}/>
            <div className={cs.backlogMenu}>
                <VerticalContainer
                    containerName="Backlog"
                    width="100%"
                    height="90%"
                    elements={observers}/>
                <div className={cs.backlogButtons}>
                    <button onClick={createObservable}>Observable</button>
                    <button onClick={createObserver}>Observer</button>
                </div>
            </div>
        </div>
    );
}

export default ObserverScreen;
