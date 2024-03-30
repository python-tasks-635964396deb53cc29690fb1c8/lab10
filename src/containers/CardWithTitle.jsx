import cs from './CardWithTitle.module.css'

const CardWithTitle = ({title, className, draggable, cardUuid, onDbClick, onRightClick}) => {
    function onDoubleClick(e) {
        onDbClick && onDbClick(e);
    }

    function onContextMenu(e) {
        e.preventDefault();
        onRightClick && onRightClick(e);
    }

    return (
        <div
            onContextMenu={onContextMenu}
            onDoubleClick={onDoubleClick}
            onDragStart={(e) => e.dataTransfer.setData("application/json", JSON.stringify({uuid: cardUuid, title: title}))}
            data-card-uuid={cardUuid}
            draggable={draggable}
            className={cs.card + (className ? ' ' + className : '')}>
            <h5 className={cs.title}>{title}</h5>
        </div>
    );
}

export default CardWithTitle;
