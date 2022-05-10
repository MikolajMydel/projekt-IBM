import { useState } from "react";
import styles from "./InputRange.module.scss";

const InputRange = (props) => {
    const [value, setValue] = useState(200);

    const synchronize = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className={styles.Input}>
            <label className={styles.InputLabel}>
                {props.name}
            </label>
            <input
                type="range"
                onInput={synchronize}
                value={value}

                min={props.min}
                max={props.max}
                name={props.name}
                required={props.required}

                className={styles.InputRange}
            />
            <input
                type="number"
                onChange={synchronize}
                value={value}

                min={props.min}
                max={props.max}

                className={styles.InputNumber}
            />
        </div>
    )
}

export default InputRange;