import cs from './VerticalContainer.module.css'

const VerticalContainer = ({containerName, elements, height, width, onDrop, className, containerUUID, onTopClick}) => {
    function topClick() {
        onTopClick && onTopClick();
    }

    return (
        <div
            data-container-uuid={containerUUID}
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
            style={{height: height, width: width}}
            className={cs.container + (className ? ' ' + className : '')}>
            <div style={onTopClick ? {cursor: "pointer"} : {}} className={cs.title} onClick={topClick}>
                <span>{containerName}</span>
            </div>
            <div className={cs.elms}>
                {
                    elements.map((elm, i) =>
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
