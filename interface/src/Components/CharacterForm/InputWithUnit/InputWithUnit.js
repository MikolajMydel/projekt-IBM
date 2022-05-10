import styles from "./InputWithUnit.module.scss";

const InputWithUnit = (props) => {
    return (
        <>
            <input
                className={`${styles.Input} ${props.className}`}
                type={props.type}
                maxLength={props.maxLength}
                max={props.max}
                min={props.min}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
            >
            </input>
            <div className={styles.InputUnit}>
                {props.unit}
            </div>
        </>
    )
}

export default InputWithUnit;