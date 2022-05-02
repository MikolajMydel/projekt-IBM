import {eyeColors, skinColors, hairColors, races} from "./datalists.js";
import styles from "./CharacterForm.module.scss";
import react from 'react';

const extractFormData = (form, fields) => {
    const formData = {};
    let inputValue;

    for (let field of fields){
        inputValue = form[field].value;
        formData[field] = inputValue;
    }

    const stats = ["intelligence",
    "strength", "speed", "durability", "power", "combat"]

    formData["total"] = 0;
    for (let parameter of stats){
        formData["total"] += formData[parameter];
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

    constructor() {
        super();
        this.state = {
            "pageNumber": 0,
            "pagesValidity": [false, false, false],

        }
    }

    fields = [
        "name", "gender", "eyeColor", "race", "hairColor",
        "skinColor", "height", "weight", "intelligence",
        "strength", "speed", "durability", "power", "combat"
    ]

    onSubmit = (e) => {
        e.preventDefault();
        const characterInfo = extractFormData(e.target, this.fields);
        //Object.keys(characterInfo)

        const payload = {"input_data":
            [{"fields": Object.keys(characterInfo),
            "values": [Object.values(characterInfo)]
            }]
        }

        postData("/api/character", payload).then(
            data => {
                const predictions = data.predictions;
                for (let prediction of predictions){
                    alert(prediction.values[0]);
                }
            }
        )
    }

    changePage = (pageNumber) => {
        this.setState({
            "currentPage": pageNumber,
        })
    }

    validatePage = (e, pageNumber) => {
        const childNodes = Array.from(e.currentTarget.childNodes);
        const childInputs = [];

        while ( childNodes.length !== 0 ){
            const node = childNodes.pop();
            if (node.tagName){
                const nodeType = node.tagName.toLowerCase();

                if (nodeType === "input") childInputs.push(node);
                else {
                    childNodes.push( ...node.childNodes );
                }
            }
        }

        let isValid = true;
        for(let input of childInputs){
            if(!input.validity.valid) isValid = false;
        }
        if ( this.state.pagesValidity[pageNumber] !== isValid ) {
            const pagesValidity = [...this.state.pagesValidity];
            pagesValidity[pageNumber] = isValid;
            this.setState({"pagesValidity": pagesValidity});
        }
    }

    render() {
        return (
            <div className={styles.form_wrapper}>
                <div className={styles.form_navigation}>
                    <button className={`
                        ${styles.form_navigationButton}
                        ${this.state.pagesValidity[0] ? styles.form_navigationButtonValid : ""}
                    `}
                        onClick={ () => this.changePage(0)}
                    ></button>

                    <button className={`
                        ${styles.form_navigationButton}
                        ${this.state.pagesValidity[1] ? styles.form_navigationButtonValid : ""}
                    `}
                        onClick={ () => this.changePage(1)}
                    ></button>

                    <button className={`
                        ${styles.form_navigationButton}
                        ${this.state.pagesValidity[2] ? styles.form_navigationButtonValid : ""}
                    `}
                        onClick={ () => this.changePage(2)}
                    ></button>

                </div>
                <form action="." method="GET"
                    className={styles.form}
                    onSubmit={this.onSubmit}
                    style={{
                        // variable needed to paginate using css
                        "--page-number": this.state.currentPage,
                    }}
                >
                    <div className={styles.form_page} onKeyDown={ (e) => this.validatePage(e, 0) }>
                        <h2 className={styles.form_pageHeader}>Personal data</h2>
                        <div className={styles.form_group}>
                            <input required type="text" className={styles.form_input} placeholder=" "
                                name="name"
                                />
                            <label className={styles.form_label}>
                                Name
                            </label>
                        </div>

                        <div className={styles.form_group}>
                            <input required type="text" className={styles.form_input} placeholder=" "
                                name="gender" />
                            <label className={styles.form_label}>
                                Gender
                            </label>
                        </div>
                    </div>
                    <div className={styles.form_page} onKeyDown={ (e) => this.validatePage(e, 1)}>
                    <h2 className={styles.form_pageHeader}>Appearance</h2>
                        <div className={styles.form_group}>
                            <input required type="text" list="eyeColor" className={styles.form_input} placeholder=" "
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
                        <input required type="text" list="race" className={styles.form_input} placeholder=" "
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
                        <input required type="text" list="hairColor" className={styles.form_input} placeholder=" "
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
                        <input required type="text" list="skinColor" className={styles.form_input} placeholder=" "
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
                        <input required type="number" className={styles.form_input} placeholder=" "
                            name="height"/>
                        <label className={styles.form_label}>
                            Height
                        </label>
                    </div>

                    <div className={styles.form_group}>
                        <input required type="number" className={styles.form_input} placeholder=" "
                            name="weight"/>
                        <label className={styles.form_label}>
                            Weight
                        </label>
                    </div>
                    </div>
                    <div className={styles.form_page} onKeyDown={ (e) => this.validatePage(e, 2) }>
                        <h2 className={styles.form_pageHeader}>Statistics</h2>
                        <div className={styles.form_range}>
                            <label>
                                Intelligence
                            </label><br/>
                            <input required type="range" name="intelligence" />
                        </div>

                        <div className={styles.form_range}>
                            <label>
                                Strength
                            </label><br/>
                            <input required type="range" name="strength" />
                        </div>

                        <div className={styles.form_range}>
                            <label>
                                Speed
                            </label><br/>
                            <input required type="range" name="speed" />
                        </div>

                        <div className={styles.form_range}>
                            <label>
                                Durability
                            </label><br/>
                            <input required type="range" name="durability" />
                        </div>

                        <div className={styles.form_range}>
                            <label>
                                Power
                            </label><br/>
                            <input required type="range" name="power" />
                        </div>

                        <div className={styles.form_range}>
                            <label>
                                Combat
                            </label><br/>
                            <input required type="range" name="combat" />
                        </div>
                        <input type="submit" value="Check" className={styles.form_button}>
                        </input>
                    </div>
                </form>
            </div>
        )
    }
}

export default CharacterForm;