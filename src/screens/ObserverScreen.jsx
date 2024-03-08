import cs from './ObserverScreen.module.css'
import HorizontalContainer from "../containers/HorizontalContainer";
import VerticalContainer from "../containers/VerticalContainer";
import {useState} from "react";

const ObserverScreen = ({className}) => {
    const [ observables, setObservables ] = useState([]);
    const [ observers, setObservers ] = useState([]);

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
                    <button>Observable</button>
                    <button>Observer</button>
                </div>
            </div>
        </div>
    );
}

export default ObserverScreen;
