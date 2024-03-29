import cs from './HorizontalContainer.module.css'

const HorizontalContainer = ({width, elements}) => {
    return (
        <div style={{width: width}} className={cs.container}>
            {
                elements.map((elm, i) =>
                    <div
                        className={cs.element}
                        key={i}>
                        {elm}
                    </div>
                )
            }
        </div>
    );
}

export default HorizontalContainer;
