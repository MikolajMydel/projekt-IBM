import {eyeColors, skinColors, hairColors, races} from "./datalists.js";
import styles from "./CharacterForm.module.scss";
import react from 'react';

const extractFormData = (form, fields) => {
    const formData = {};

    for (let field of fields){
        formData[field] = form[field].value;
    }

    return formData;
}
class CharacterForm extends react.Component {

    fields = [
        "name", "gender", "eyeColor", "race", "hairColor",
        "skinColor", "height", "weight", "intelligence",
        "strength", "speed", "durability", "power", "combat",
    ]

    onSubmit = (e) => {
        e.preventDefault();
        const characterInfo = extractFormData(e.target, this.fields);
    }

    render() {
        return (
            <form action="." method="GET"
                className={styles.Form}
                onSubmit={this.onSubmit}
            >
                <div>
                    <input type="text" name="name" />
                    <label>
                        Name
                    </label>
                </div>

                <div>
                    <input type="text" name="gender" />
                    <label>
                        Gender
                    </label>
                </div>

                <div>
                    <input type="text" list="eyeColor" name="eyeColor" />
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
                    <input type="text" list="race" name="race" />
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
                    <input type="text" list="hairColor" name="hairColor" />
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
                    <input type="text" list="skinColor" name="skinColor" />
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
                    <input type="number" name="height"/>
                    <label>
                        Height
                    </label>
                </div>

                <div>
                    <input type="number" name="weight" />
                    <label>
                        Weight
                    </label>
                </div>

                <div>
                    <input type="range" name="intelligence" />
                    <label>
                        Intelligence
                    </label>
                </div>

                <div>
                    <input type="range" name="strength" />
                    <label>
                        Strength
                    </label>
                </div>

                <div>
                    <input type="range" name="speed" />
                    <label>
                        Speed
                    </label>
                </div>

                <div>
                    <input type="range" name="durability" />
                    <label>
                        Durability
                    </label>
                </div>

                <div>
                    <input type="range" name="power" />
                    <label>
                        Power
                    </label>
                </div>

                <div>
                    <input type="range" name="combat" />
                    <label>
                        Combat
                    </label>
                </div>

                <input type="submit" value="Check">
                </input>
            </form>
        )
    }
}

export default CharacterForm;