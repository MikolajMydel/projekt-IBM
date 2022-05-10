import {eyeColors, skinColors, hairColors, races} from "./datalists.js";
import styles from "./CharacterForm.module.scss";
import react from 'react';

import InputWithUnit from "./InputWithUnit/InputWithUnit";
import InputRange from "./InputRange/InputRange.js";
import PageNavigation from "./PageNavigation/PageNavigation.js";
import CharactersList from "./CharactersList/CharactersList";

import * as Api from "./api.js";
import examples from "./characterExamples.js";
class CharacterForm extends react.Component {

    constructor() {
        super();
        this.state = {
            "pageNumber": 0,
            "pagesValidity": [false, false, false],

            "charactersData": examples,
            "editedCharacter": undefined,

        }

        this.fields = [
            "name", "gender", "eyeColor", "race", "hairColor",
            "skinColor", "height", "weight", "intelligence",
            "strength", "speed", "durability", "power", "combat", "total",
        ];

        this.ref = react.createRef();
        this.pagesQuantity = 3;
    }

    checkCharactersAlignment = (e) => {
        e.preventDefault();
        this.setState({
            "loading": true
        });

        const characters = this.state.charactersData;
        const charactersWithoutAlignment = [];

        for (let character of characters){
            charactersWithoutAlignment.push(character.slice(0, 15));
        }

        const payload = {"input_data":
            [
            {
                "fields": this.fields,
                "values": charactersWithoutAlignment
            }
            ]
        }

        Api.postData("/api/character", payload).then(
            data => {
                const predictions = data.predictions;
                const charactersCopy = [...this.state.charactersData];

                for (let predictionIndex in predictions[0].values){
                    charactersCopy[predictionIndex][15] = predictions[0].values[predictionIndex][0];
                }

                this.setState({
                    "charactersData": charactersCopy,
                    "loading": false,
                });
            }
        )
    }

    addCharacter = (characterInfo) => {
        const charactersCopy = [...this.state.charactersData];
        const editedCharacter = this.state.editedCharacter;

        if (typeof editedCharacter === "undefined") charactersCopy.push(characterInfo);
        else {
            charactersCopy[editedCharacter] = characterInfo;
        }

        this.setState({
            "charactersData": charactersCopy,
        });

        this.resetForm();
    }

    removeCharacter = (characterIndex) => {
        const charactersCopy = [...this.state.charactersData];
        charactersCopy.splice(characterIndex, 1);
        this.setState({
            "charactersData": charactersCopy,
        });
    }

    editCharacter = (characterIndex) => {
        const characterInfo = this.state.charactersData[characterIndex];

        const childNodes = Array.from(this.ref.current.childNodes);
        const childInputs = [];

        while ( childNodes.length !== 0 ){
            const node = childNodes.pop();
            if (node.tagName){
                const nodeType = node.tagName.toLowerCase();

                if ((nodeType === "input")
                    && (node.type === "number" || node.type === "text"))
                    childInputs.push(node);
                else {
                    childNodes.push( ...node.childNodes );
                }
            }
        }

        childInputs.reverse();

        for (let inputIndex in childInputs){
            childInputs[inputIndex].value = characterInfo[inputIndex];
        }

        this.setState({
            "editedCharacter": characterIndex,
            "pagesValidity": [true, true, true],
        });
    }

    resetForm = () => {
        this.ref.current.reset();
        this.changePage(0);

        this.setState({
            "pagesValidity": [false, false, false],
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const characterInfo = Api.extractFormData(e.target, this.fields);

        this.addCharacter(Object.values(characterInfo));
    }

    changePage = (pageNumber) => {
        if (pageNumber < 0)
            pageNumber = 0
        else if (pageNumber > this.pagesQuantity - 1)
            pageNumber = this.pagesQuantity - 1;

        this.setState({
            "pageNumber": pageNumber,
        })
    }

    goBackwards = (e) => {
        e.preventDefault();
        this.changePage(this.state.pageNumber - 1);
    }

    goForwards = (e) => {
        e.preventDefault();
        this.changePage(this.state.pageNumber + 1);
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
            <>
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
                            "--page-number": this.state.pageNumber,
                        }}

                        ref={this.ref}
                    >
                        <div className={styles.form_page}
                            onKeyDown={ (e) => this.validatePage(e, 0) }
                            onBlur={ (e) => this.validatePage(e, 0)}
                            >
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
                            <PageNavigation goForwards={this.goForwards} />
                        </div>
                        <div className={styles.form_page}
                            onBlur={ (e) => this.validatePage(e, 1)}
                            onKeyDown={ (e) => this.validatePage(e, 1)}>
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
                                <InputWithUnit
                                    type="number"
                                    className={styles.form_input}
                                    placeholder=" "
                                    name="height"
                                    unit="cm"
                                    min="0"
                                    required={true}
                                />
                                <label className={styles.form_label}>
                                    Height
                                </label>
                            </div>

                            <div className={styles.form_group}>
                                <InputWithUnit
                                        type="number"
                                        className={styles.form_input}
                                        placeholder=" "
                                        name="weight"
                                        unit="kg"
                                        min="0"
                                        required={true}
                                />
                                <label className={styles.form_label}>
                                    Weight
                                </label>
                            </div>

                            <PageNavigation goBackwards={this.goBackwards} goForwards={this.goForwards} />

                        </div>
                        <div className={styles.form_page} onClick={ (e) => this.validatePage(e, 2) }>
                            <h2 className={styles.form_pageHeader}>Statistics</h2>
                            <InputRange
                                required={true}
                                name="intelligence"
                                min={0}
                                max={400}
                            />

                            <InputRange
                                required={true}
                                name="strength"
                                min={0}
                                max={400}
                            />

                            <InputRange
                                required={true}
                                name="speed"
                                min={0}
                                max={400}
                            />

                            <InputRange
                                required={true}
                                name="durability"
                                min={0}
                                max={400}
                            />

                            <InputRange
                                required={true}
                                name="power"
                                min={0}
                                max={400}
                            />

                            <InputRange
                                required={true}
                                name="combat"
                                min={0}
                                max={400}
                            />

                            <PageNavigation goBackwards={this.goBackwards}/>
                            <input type="submit" value="Add character" className={styles.form_button}>
                            </input>
                        </div>
                    </form>
                </div>
                {this.state.charactersData.length !== 0 ?
                    <CharactersList
                        characters={this.state.charactersData}
                        check={this.checkCharactersAlignment}
                        removeCharacter={this.removeCharacter}
                        editCharacter={this.editCharacter}
                        loading={this.state.loading}
                        fields={this.fields}
                    /> : ""
                }
            </>
        )
    }
}

export default CharacterForm;