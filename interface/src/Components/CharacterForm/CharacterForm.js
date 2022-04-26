import {eyeColors, skinColors, hairColors, races} from "./datalists.js";
import styles from "./CharacterForm.module.scss";
import react from 'react';

class CharacterForm extends react.Component {
    render() {
        return (
            <div className={styles.form_wrapper}>
                <form action="." method="GET"
                    className={styles.Form}
                >
                    <div className={styles.form_group}>
                        <input type="text" className={styles.form_input} placeholder=" "/>
                        <label className={styles.form_label}>
                            Name
                        </label>
                    </div>

                    <div className={styles.form_group}>
                        <input type="text" className={styles.form_input} placeholder=" "/>
                        <label className={styles.form_label}>
                            Gender
                        </label>
                    </div>

                    <div className={styles.form_group}>
                        <input type="text" list="eyeColor" className={styles.form_input} placeholder=" "/>
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
                        <input type="text" list="race" className={styles.form_input} placeholder=" "/>
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
                        <input type="text" list="hairColor" className={styles.form_input} placeholder=" "/>
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
                        <input type="text" list="skinColor" className={styles.form_input} placeholder=" "/>
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
                        <input type="number" className={styles.form_input} placeholder=" "/>
                        <label className={styles.form_label}>
                            Height
                        </label>
                    </div>

                    <div className={styles.form_group}>
                        <input type="number" className={styles.form_input} placeholder=" "/>
                        <label className={styles.form_label}>
                            Weight
                        </label>
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Intelligence
                        </label><br/>
                        <input type="range"/>
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Strength
                        </label><br/>
                        <input type="range"/>
                        
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Speed
                        </label><br/>
                        <input type="range"/>
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Durability
                        </label><br/>
                        <input type="range"/>
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Power
                        </label><br/>
                        <input type="range"/>
                    </div>

                    <div className={styles.form_range}>
                        <label>
                            Combat
                        </label><br/>
                        <input type="range"/>
                    </div>

                    <input type="submit" value="Check" className={styles.form_button}>
                    </input>
                </form>
            </div>
        )
    }
}

export default CharacterForm;