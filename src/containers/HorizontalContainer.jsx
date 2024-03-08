import cs from './HorizontalContainer.module.css'

const HorizontalContainer = ({width, elms}) => {
    return (
        <div style={{width: width}} className={cs.container}>
            {
                elms.map((elm, i) =>
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
