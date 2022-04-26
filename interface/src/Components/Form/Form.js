import {eyeColors, skinColors, hairColors, races} from "./datalists.js";
import styles from "./Form.module.scss";

const Form = () => (
    <form action="." method="GET" className={styles.Form}>
        <div>
            <input type="text"/>
            <label>
                Name
            </label>
        </div>

        <div>
            <input type="text"/>
            <label>
                Gender
            </label>
        </div>

        <div>
            <input type="text" list="eyeColor"/>
            <label>
                Eye color
            </label>

            <datalist id="eyeColor">
                {eyeColors.map((value) => {
                    return <option value={value.toLowerCase()} />
                })}
            </datalist>
        </div>

        <div>
            <input type="text" list="race" />
            <label>
                Race
            </label>

            <datalist id="race">
                {races.map((value) => {
                    return <option value={value.toLowerCase()} />
                })}
            </datalist>
        </div>

        <div>
            <input type="text" list="hairColor" />
            <label>
                Hair color
            </label>

            <datalist id="hairColor">
                {hairColors.map((value) => {
                        return <option value={value.toLowerCase()} />
                })}
            </datalist>
        </div>

        <div>
            <input type="text" list="skinColor"/>
            <label>
                Skin color
            </label>

            <datalist id="skinColor">
                {skinColors.map((value) => {
                        return <option value={value.toLowerCase()} />
                })}
            </datalist>
        </div>

        <div>
            <input type="number"/>
            <label>
                Height
            </label>
        </div>

        <div>
            <input type="number"/>
            <label>
                Weight
            </label>
        </div>

        <div>
            <input type="range"/>
            <label>
                Intelligence
            </label>
        </div>

        <div>
            <input type="range"/>
            <label>
                Strength
            </label>
        </div>

        <div>
            <input type="range"/>
            <label>
                Speed
            </label>
        </div>

        <div>
            <input type="range"/>
            <label>
                Durability
            </label>
        </div>

        <div>
            <input type="range"/>
            <label>
                Power
            </label>
        </div>

        <div>
            <input type="range"/>
            <label>
                Combat
            </label>
        </div>
    </form>
)

export default Form;