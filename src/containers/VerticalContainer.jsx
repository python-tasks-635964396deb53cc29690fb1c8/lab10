import cs from './VerticalContainer.module.css'

const VerticalContainer = ({containerName, elms, height, width, onDrop, className}) => {
    return (
        <div
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
            style={{height: height, width: width}}
            className={cs.container + (className ? ' ' + className : '')}>
            <div className={cs.title}>
                <span>{containerName}</span>
            </div>
            <div className={cs.elms}>
                {
                    elms.map((elm, i) =>
                        <div
                            key={i}
                            className={cs.elm}>
                            {elm}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default VerticalContainer;
