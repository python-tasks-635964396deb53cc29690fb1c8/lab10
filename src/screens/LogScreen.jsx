import cs from './LogScreen.module.css'

const LogScreen = ({msgList}) => {
    return (
        <div>
            { msgList.map((msg, i) => <span key={i} className={cs.message}>{msg}</span>) }
        </div>
    );
}

export default LogScreen;
