import {eyeColors, skinColors, hairColors, races} from "./datalists.js";
import styles from "./CharacterForm.module.scss";
import react from 'react';

const extractFormData = (form, fields) => {
    const formData = {};
    let inputValue;

    for (let field of fields){
        inputValue = form[field].value;
        if (inputValue.length !== 0)
            formData[field] = inputValue;

    }

    return formData;
}

async function postData(url, data){
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',

        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify(data),
    });

    return response.json();
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
        //Object.keys(characterInfo)
        const payload = {"input_data":
            {"fields": Object.keys(characterInfo),
            "values": [[Object.values(characterInfo)]]
            }};

        postData("/api/character", payload).then(
            data => console.log(data)
        )
    }

    render() {
        return (
            <div className={styles.form_wrapper}>
                <form action="." method="GET"
                    className={styles.Form}
                    onSubmit={this.onSubmit}
                >
                    <div className={styles.form_group}>
                        <input type="text" className={styles.form_input} placeholder=" "
                            name="name" />
                        <label className={styles.form_label}>
                            Name
                        </label>
                    </div>

                    <div className={styles.form_group}>
                        <input type="text" className={styles.form_input} placeholder=" "
                            name="gender" />
                        <label className={styles.form_label}>
                            Gender
                        </label>
                    </div>

                    <div className={styles.form_group}>
                        <input type="text" list="eyeColor" className={styles.form_input} placeholder=" "
                            name="eyeColor"/>
                        <label className={styles.form_label}>
                            Eye color
                        </label>

                        <datalist id="eyeColor">
                            {eyeColors.map((value) => {
                                return <option value={value.toLowerCase()} />
                            })}
                        </datalist>
                    </div>

                    <div className={styles.form_group}>
                        <input type="text" list="race" className={styles.form_input} placeholder=" "
                            name="race" />
                        <label className={styles.form_label}>
                            Race
                        </label>

                        <datalist id="race">
                            {races.map((value) => {
                                return <option value={value.toLowerCase()} />
                            })}
                        </datalist>
                    </div>

                    <div className={styles.form_group}>
                        <input type="text" list="hairColor" className={styles.form_input} placeholder=" "
                            name="hairColor"/>
                        <label className={styles.form_label}>
                            Hair color
                        </label>

                        <datalist id="hairColor">
                            {hairColors.map((value) => {
                                    return <option value={value.toLowerCase()} />
                            })}
                        </datalist>
                    </div>

                    <div className={styles.form_group}>
                        <input type="text" list="skinColor" className={styles.form_input} placeholder=" "
                            name="skinColor" />
                        <label className={styles.form_label}>
                            Skin color
                        </label>

                        <datalist id="skinColor">
                            {skinColors.map((value) => {
                                    return <option value={value.toLowerCase()} />
                            })}
                        </datalist>
                    </div>

                    <div className={styles.form_group}>
                        <input type="number" className={styles.form_input} placeholder=" "
                            name="height"/>
                        <label className={styles.form_label}>
                            Height
                        </label>
                    </div>

                    <div className={styles.form_group}>
                        <input type="number" className={styles.form_input} placeholder=" "
                            name="weight"/>
                        <label className={styles.form_label}>
                            Weight
                        </label>
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Intelligence
                        </label><br/>
                        <input type="range" name="intelligence" />
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Strength
                        </label><br/>
                        <input type="range" name="strength" />
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Speed
                        </label><br/>
                        <input type="range" name="speed" />
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Durability
                        </label><br/>
                        <input type="range" name="durability" />
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Power
                        </label><br/>
                        <input type="range" name="power" />
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Combat
                        </label><br/>
                        <input type="range" name="combat" />
                    </div>
                    <input type="submit" value="Check" className={styles.form_button}>
                    </input>
                </form>
            </div>
        )
    }
}

export default CharacterForm;