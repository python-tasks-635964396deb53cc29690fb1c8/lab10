import cs from './LogScreen.module.css'

const LogScreen = ({msgList, width, height}) => {
    return (
        <div style={{width: width, height: height}} className={cs.container}>
            { msgList.map((msg, i) => <span key={i} className={cs.message}>{msg}</span>) }
        </div>
    );
}

export default LogScreen;
