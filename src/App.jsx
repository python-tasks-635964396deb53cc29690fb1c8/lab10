import LogScreen from "./screens/LogScreen";
import {useEffect, useState} from 'react'

const App = () => {
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        for (let i = 0; i < 100; i++) {
            setMessages(prev => [...prev, `message: ${i}`]);
        }
    }, []);

    return (
        <LogScreen msgList={messages} />
    );
}

export default App;
