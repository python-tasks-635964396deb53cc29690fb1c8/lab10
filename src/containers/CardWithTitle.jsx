import cs from './CardWithTitle.module.css'

const CardWithTitle = ({title, className, draggable, cardUuid}) => {
    return (
        <div
            data-card-uuid={cardUuid}
            draggable={draggable}
            className={cs.card + (className ? ' ' + className : '')}>
            <h5 className={cs.title}>{title}</h5>
        </div>
    );
}

export default CardWithTitle;
