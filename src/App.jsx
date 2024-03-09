import cs from './App.module.css'
import ObserverScreen from "./screens/ObserverScreen";
import LogScreen from "./screens/LogScreen";
import {useState} from "react";

const App = () => {
    const [ messages, setMessages ] = useState(['Init messages area.']);

    function log(message) {
        const date = new Date();
        setMessages(prev => [...prev,
            `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}: ${message}`]);
    }

    return (
        <div className={cs.app}>
            <ObserverScreen className={cs.observer} log={log} />
            <LogScreen
                msgList={messages}
                width="20svw"
                height="100svh" />
        </div>
    );
}

export default App;
