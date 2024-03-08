import cs from './App.module.css'
import ObserverScreen from "./screens/ObserverScreen";
import LogScreen from "./screens/LogScreen";
import {useState} from "react";

const App = () => {
    const [ messages, setMessages ] = useState(['Init messages area.']);

    return (
        <div className={cs.app}>
            <ObserverScreen className={cs.observer} />
            <LogScreen
                msgList={messages}
                width="20svw"
                height="100svh" />
        </div>
    );
}

export default App;
